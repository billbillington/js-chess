var ClassicChess = require('../classic-chess.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('moving a peice', function() {
    var army1 = new ClassicChess.Army({ forwardDirection: 'down' });
    var army2 = new ClassicChess.Army({ forwardDirection: 'up' });

    var board = new ClassicChess.Board({
      army1: army1,
      army2: army2
    });

    var attackingPiece = new army1.Piece('knight')();
    var freindlyPiece = new army1.Piece('rook')();
    var enemyPiece = new army2.Piece('rook')();

    board.addPiece({ piece: attackingPiece, location: { row: 4, col: 4 } });
    board.addPiece({ piece: freindlyPiece, location: { row: 4, col: 1 } });
    board.addPiece({ piece: enemyPiece, location: { row: 3, col: 7 } });

    console.log();
    console.log("Current Location: " + JSON.stringify(board.location(attackingPiece)));
    console.log("Attacked Squares: " + JSON.stringify(attackingPiece.attackedSquares(board)));
  });
});
