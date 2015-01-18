var ClassicChess = require('../classic-chess.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('moving a peice', function() {
    var army1 = new ClassicChess.Army();
    var army2 = new ClassicChess.Army();

    var board = new ClassicChess.Board({
      army1: army1,
      army2: army2
    });

    var whiteRook1 = new army1.Piece('rook')();
    var whiteRook2 = new army1.Piece('rook')();

    var blackRook1 = new army2.Piece('rook')();

    board.addPiece({ piece: whiteRook1, row: 1, col: 5 });
    board.addPiece({ piece: whiteRook2, row: 1, col: 2 });
    board.addPiece({ piece: blackRook1, row: 3, col: 5 });

    console.log();
    console.log(whiteRook1.attackedSquares(board));
  });
});
