var _ = require('lodash');
var np = require('named-parameters');

module.exports = function() {
  return function(args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('currentLocation').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;
    var currentLocation = parsedArgs.currentLocation;

    var attackedSquares = [];
    var row = currentLocation.row;

    for(col = currentLocation.col - 1; col >= 0; col--){
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
