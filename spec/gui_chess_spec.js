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

    var player1 = {
      name: 'Player 1',
      army: setupComponents.armies[0]
    };
    var player2 = {
      name: 'Player 2',
      army: setupComponents.armies[1]
    };
    var board = setupComponents.board;

    var guiBoard = new GuiBoard({
      board: board,
      player1: player1,
      player2: player2
    });

    var army1Pieces = board.activePieces({
      army: player1.army
    });

    var piece = army1Pieces[10];
    var pieceLocation = board.pieceLocation({ piece: piece });
    var possibleMoves = piece.possibleMoves({ board: board });

    guiBoard.print();

    possibleMoves[0].perform();

    guiBoard.print();
  });
});
