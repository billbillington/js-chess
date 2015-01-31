var ClassicChess = require('../classic-chess.js');
var GuiBoard = require('../lib/gui_board.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('everything', function() {
    var game = new ClassicChess.Game();


    var guiBoard = new GuiBoard({
      board: game.board(),
      player1: game.player1(),
      player2: game.player2()
    });

    guiBoard.print();

    console.log(game.currentTurnInfo());
  });
});
