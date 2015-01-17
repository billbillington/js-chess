var ClassicChess = require('../classic-chess.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('everything', function() {
    var army1 = new ClassicChess.Army();
    var army2 = new ClassicChess.Army();

    var board = new ClassicChess.Board({
      army1: army1,
      army2: army2
    });

    var setup = new ClassicChess.Setup();

    setup.perform({
      board: board,
      army1: army1,
      army2: army2
    });

    //Player 1 turn
    var pieces = board.activePieces({ army: army1 });
  });

  it('moving a peice', function() {
    var army1 = new ClassicChess.Army();
    var army2 = new ClassicChess.Army();

    var board = new ClassicChess.Board({
      army1: army1,
      army2: army2
    });

    var whitePawn1 = new army1.Piece('pawn')();
    var whitePawn2 = new army1.Piece('pawn')();

    var blackPawn1 = new army2.Piece('pawn')();

    board.addPiece({ piece: whitePawn1, row: 0, col: 4 });
    board.addPiece({ piece: whitePawn2, row: 1, col: 3 });
    board.addPiece({ piece: blackPawn1, row: 1, col: 5 });
  });
});
