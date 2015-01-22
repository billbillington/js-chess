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
    activePieces: []
  });

  armyData.push({
    army: parsedArgs.army2,
    activePieces: []
  });

  return {
    rowCount: rowCount,
    colCount: colCount,
    bounds: bounds,
    addPiece: addPiece,
    couldTake: couldTake,
    canMoveIntoSpace: canMoveIntoSpace,
    activePieces: activePieces,
    location: location
  };

  function addPiece(args) {
    parsedArgs = np.parse(args).
      require('piece').
      require('location').
      values();

    var piece = parsedArgs.piece;
    var location = parsedArgs.location;

    existing_piece = spaces.get({ location: location });

    if (existing_piece === undefined) {
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
    dataFor(piece.army).activePieces.push(piece);
  }

  function location(piece) {
    return spaces.find(piece);
  }

  function activePieces(args) {
    parsedArgs = np.parse(args).
      require('army').
      values();

    return _.clone(dataFor(parsedArgs.army).activePieces);
  }
};
