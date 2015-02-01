var ClassicChess = require('../classic-chess.js');
var GuiBoard = require('../lib/gui_board.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('everything', function() {
    var army1 = new ClassicChess.Army({ forwardDirection: 'down' });
    var army2 = new ClassicChess.Army({ forwardDirection: 'up' });

    var board = new ClassicChess.Board({
      army1: army1,
      army2: army2
    });

    var player1 =  {
      name: 'Player 1',
      army: army1
    };

    var player2 =  {
      name: 'Player 2',
      army: army2
    };

    var guiBoard = new GuiBoard({
      board: board,
      player1: player1,
      player2: player2
    });

    defendingPiece = new army1.Piece('king')();
    board.addPiece({
      piece: defendingPiece,
      location: { row: 0, col: 2 }
    });

    attackingPiece = new army2.Piece('queen')();
    board.addPiece({
      piece: attackingPiece,
      location: { row: 7, col: 2 }
    });

    guiBoard.print();

    expect(board.pieceUnderAttack({
      piece: defendingPiece
    })).toBe(true);
  });
});
