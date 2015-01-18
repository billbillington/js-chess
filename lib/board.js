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
    key: 'army1',
    activePieces: []
  });

  armyData.push({
    army: parsedArgs.army2,
    key: 'army1',
    activePieces: []
  });

  return {
    rowCount: rowCount,
    colCount: colCount,
    addPiece: addPiece,
    couldTake: couldTake,
    spaceUnoccupied: spaceUnoccupied,
    activePieces: activePieces,
    location: location
  };

  function addPiece(args) {
    parsedArgs = np.parse(args).
      require('piece').
      require('row', 'non-negative integer').
      require('col', 'non-negative integer').
      values();

    var piece = parsedArgs.piece;
    var row = parsedArgs.row;
    var col = parsedArgs.col;

    existing_piece = spaces.get({ row: row, col: col });

    if (existing_piece === undefined) {
      addToActivePieces(piece);
      spaces.set({ item: piece, row: row, col: col });
    } else {
      throw('space taken');
    }
  }

  function couldTake(args) {
    var parsedArgs = np.parse(args).
      require('location').
      require('piece').
      values();

    targetPiece = spaces.get(parsedArgs.location);
    return parsedArgs.piece.army !== targetPiece.army;
  }

  function spaceUnoccupied(row, col){
    return spaces.get({ row: row, col: col }) === undefined;
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
