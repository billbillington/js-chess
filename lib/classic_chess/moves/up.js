var _ = require('lodash');
var np = require('named-parameters');

module.exports = function() {
  return function(args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;
    var currentLocation = board.location(piece);

    var attackedSquares = [];
    var col = currentLocation.col;

    for(row = currentLocation.row - 1; row >= 0; row--){
      if (board.spaceUnoccupied(row, col)){
        attackedSquares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: piece, row: row, col: col })){
        attackedSquares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }

    return {
      moveSquares: [],
      attackedSquares: attackedSquares
    };
  };
};

