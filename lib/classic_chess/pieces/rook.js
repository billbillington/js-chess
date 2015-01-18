var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;
  var movements = [];

  var instance = new JSChess.Piece({
    name: 'classic rook',
    army: army,
    attackedSquares: attackedSquares
  });

  return instance;

  function attackedSquares(board) {
    var currentLocation = board.location(instance);

    return [].concat(
      leftMove(currentLocation, board),
      rightMove(currentLocation, board),
      upMove(currentLocation, board),
      downMove(currentLocation, board)
    );
  }

  function leftMove(currentLocation, board) {
    var squares = [];
    var row = currentLocation.row;

    for(col = currentLocation.col - 1; col >= 0; col--){
      if (board.spaceUnoccupied(row, col)){
        squares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: instance, row: row, col: col })){
        squares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }

    return squares;
  }

  function rightMove(currentLocation, board) {
    var squares = [];
    var row = currentLocation.row;

    for(col = currentLocation.col + 1; col < board.colCount; col++){
      if (board.spaceUnoccupied(row, col)){
        squares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: instance, row: row, col: col })){
        squares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }

    return squares;
  }

  function upMove(currentLocation, board) {
    var squares = [];
    var col = currentLocation.col;

    for(row = currentLocation.row - 1; row >= 0; row--){
      if (board.spaceUnoccupied(row, col)){
        squares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: instance, row: row, col: col })){
        squares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }

    return squares;
  }

  function downMove(currentLocation, board) {
    var squares = [];
    var col = currentLocation.col;

    for(row = currentLocation.row + 1; row < board.rowCount; row++){
      if (board.spaceUnoccupied(row, col)){
        squares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: instance, row: row, col: col })){
        squares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }

    return squares;
  }
};
