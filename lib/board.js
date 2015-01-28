var TwoDimensionalFixedArray = require('./two_dementional_fixed_array.js');
var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  parsedArgs = np.parse(args).
    require('army1').
    require('army2').
    values();

  var rowCount = 8;
  var colCount = 8;

  var spaces = new TwoDimensionalFixedArray({ rowCount: rowCount, colCount: colCount });
  var armyData = [];

  armyData.push({
    army: parsedArgs.army1,
    activePieces: [],
    takenPieces: []
  });

  armyData.push({
    army: parsedArgs.army2,
    activePieces: [],
    takenPieces: []
  });

  var instance = {
    rowCount: rowCount,
    colCount: colCount,
    bounds: bounds,
    addPiece: addPiece,
    move: move,
    get: get,
    attackedSquares: attackedSquares,
    couldTake: couldTake,
    canMoveIntoSpace: canMoveIntoSpace,
    activePieces: activePieces,
    pieceLocation: pieceLocation
  };

  return instance;

  function move(args) {
    var parsedArgs = np.parse(args).
      require('pieceLocation', 'object').
      require('destination', 'object').
      values();

    var pieceLocation = parsedArgs.pieceLocation;
    var destination = parsedArgs.destination;

    var piece = spaces.remove({ location: pieceLocation });
    var targetPiece = spaces.remove({ location: destination });

    if(targetPiece) {
      registerTake(targetPiece);
    }

    spaces.set({
      item: piece,
      location: destination
    });
  }

  function registerTake(piece) {
    var armyData = dataFor(piece.army);
    armyData.takenPieces.push(piece);
    armyData.activePieces = _.without(armyData.activePieces, piece);
  }

  function get(args) {
    parsedArgs = np.parse(args).
      require('location', 'object').
      values();

    var location = parsedArgs.location;

    return spaces.get({
      location: location
    });
  }

  function addPiece(args) {
    parsedArgs = np.parse(args).
      require('piece').
      require('location').
      values();

    var piece = parsedArgs.piece;
    var location = parsedArgs.location;

    if (spaceUnoccupied(location)) {
      addToActivePieces(piece);
      spaces.set({ item: piece, location: location });
    } else {
      throw('space taken');
    }
  }

  function attackedSquares(army){
    var armyData = dataFor(army);

    var result = _.map(armyData.activePieces, function(piece) {
      return piece.attackedSquares(instance);
    });

    result.push(armyData.king.attackedSquares(instance));

    return _.uniq(_.flatten(result), function(square) {
      return JSON.stringify([square.row, square.col]);
    });
  }

  function bounds() {
    return {
      minRow: 0,
      maxRow: colCount - 1,
      minCol: 0,
      maxCol: colCount - 1
    };
  }

  function couldTake(args) {
    var parsedArgs = np.parse(args).
      require('location').
      require('piece').
      values();

    var location = parsedArgs.location;

    targetPiece = spaces.get({ location: location });
    return parsedArgs.piece.army !== targetPiece.army;
  }

  function canMoveIntoSpace(args) {
    var parsedArgs = np.parse(args).
      require('location', 'object').
      require('piece', 'object').
    values();

    var location = parsedArgs.location;

    return spaceUnoccupied(location);
  }

  function spaceUnoccupied(location){
    return spaces.get({ location: location }) === undefined;
  }

  function dataFor(army) {
    data = _.find(armyData, function(data) {
      return data.army === army;
    });

    if(data) {
      return data;
    } else {
      throw('data not found');
    }
  }

  function addToActivePieces(piece) {
    var armyData = dataFor(piece.army);
    if(piece.isKing(piece)) {
      armyData.king = piece;
    } else {
      armyData.activePieces.push(piece);
    ;}
  }

  function pieceLocation(piece) {
    var result = spaces.find(piece);

    if(!result){
      throw(new Error('piece not found'));
    }

    return result;
  }

  function activePieces(args) {
    parsedArgs = np.parse(args).
      require('army').
      values();

    var armyData = dataFor(parsedArgs.army);

    return armyData.activePieces.concat([armyData.king]);
  }
};
