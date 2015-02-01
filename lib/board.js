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
    couldTake: couldTake,
    spaceUnoccupied: spaceUnoccupied,
    activePieces: activePieces,
    king: king,
    pieceTaken: pieceTaken,
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
    var parsedArgs = np.parse(args).
      require('location', 'object').
      values();

    var location = parsedArgs.location;

    return spaces.get({
      location: location
    });
  }

  function addPiece(args) {
    var parsedArgs = np.parse(args).
      require('piece', 'object').
      require('location', 'object').
      values();

    var piece = parsedArgs.piece;
    var location = parsedArgs.location;

    if (spaceUnoccupied({ location: location })) {
      addToActivePieces(piece);
      spaces.set({ item: piece, location: location });
    } else {
      throw('space taken');
    }
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
      require('location', 'object').
      require('piece', 'object').
      values();

    var location = parsedArgs.location;

    var targetPiece = spaces.get({ location: location });

    if(targetPiece) {
      return parsedArgs.piece.army !== targetPiece.army;
    } else {
      return false;
    }
  }

  function spaceUnoccupied(args){
    var parsedArgs = np.parse(args).
      require('location', 'object').
      values();

    var location = parsedArgs.location;

    return spaces.get({ location: location }) === undefined;
  }

  function dataFor(army) {
    var data = _.find(armyData, function(data) {
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
      //TODO: Throw if king already there?
      armyData.king = piece;
    } else {
      armyData.activePieces.push(piece);
    }
  }

  function king(args) {
    var parsedArgs = np.parse(args).
      require('army', 'object').
      values();

    var armyData = dataFor(parsedArgs.army);

    if(armyData.king){
      return armyData.king;
    } else {
      throw(new Error("Army has no king"));
    }
  }

  function pieceTaken(args) {
    var parsedArgs = np.parse(args).
      require('piece', 'object').
      values();

    var piece = parsedArgs.piece;

    return _.contains(
      dataFor(piece.army).takenPieces,
      piece
    );
  }

  function pieceLocation(args) {
    var parsedArgs = np.parse(args).
      require('piece', 'object').
      values();

    var piece = parsedArgs.piece;
    var result = spaces.find({ item: piece });

    if(!result){
      throw(new Error('piece not found'));
    }

    return result;
  }

  function activePieces(args) {
    var parsedArgs = np.parse(args).
      require('army', 'object').
      values();

    var armyData = dataFor(parsedArgs.army);

    var pieces = _.clone(armyData.activePieces);

    if(!_.contains(armyData.takenPieces, armyData.king)) {
      pieces.concat([armyData.king]);
    }
    return pieces;
  }
};
