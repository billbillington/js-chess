var ClassicChess = require('../classic-chess.js');
var GuiBoard = require('../lib/gui_board.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('everything', function() {
    var setup = new ClassicChess.Setup({
      Board: ClassicChess.Board,
      Armies: [ClassicChess.Army, ClassicChess.Army]
    });

    setupComponents = setup.perform();

    var army1 = setupComponents.armies[0];
    var army2 = setupComponents.armies[1];
    var board = setupComponents.board;


    var guiBoard = new GuiBoard({
      board: board,
      army1: army1,
      army2: army2
    });

    var army1Pieces = board.activePieces({
      army: army1
    });

    var piece = army1Pieces[10];
    var pieceLocation = board.pieceLocation({ piece: piece });
    var possibleMoves = piece.possibleMoves({ board: board });

    guiBoard.print();

    possibleMoves[0].perform();

    guiBoard.print();
  });
});
