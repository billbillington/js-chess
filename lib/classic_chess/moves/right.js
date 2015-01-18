var _ = require('lodash');
var np = require('named-parameters');

module.exports = function() {
  return function (args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;
    var currentLocation = board.location(piece);

    var attackedSquares = [];
    var row = currentLocation.row;

    for(col = currentLocation.col + 1; col < board.colCount; col++){
      var location = { row: row, col: col };

      if (board.spaceUnoccupied(row, col)){
        attackedSquares.push(location);
      } else if (board.couldTake({ piece: piece, location: location })){
        attackedSquares.push(location);
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
