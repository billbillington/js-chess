var TwoDimensionalFixedArray = require('./two_dementional_fixed_array.js');
var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  parsedArgs = np.parse(args).
    require('army1').
    require('army2').
    values();

  var spaces = new TwoDimensionalFixedArray({ rowCount: 64, colCount: 64 });
  var army1 = parsedArgs.army1;
  var army2 = parsedArgs.army2;

  return {
    addPiece: addPiece
  };

  function addPiece(piece, args) {
    parsedArgs = np.parse(args).
      require('row', 'non-negative integer').
      require('col', 'non-negative integer').
      values();

    var row = parsedArgs.row;
    var col = parsedArgs.col;

    existing_piece = spaces.get({ row: row, col: col });

    if (existing_piece === undefined) {
      spaces.set(piece, { row: row, col: col });
    } else {
      throw('space taken');
    }
  }
};
