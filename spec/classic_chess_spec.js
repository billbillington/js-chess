var ClassicChess = require('../classic-chess.js');
var GuiBoard = require('../lib/gui_board.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('everything', function() {
    var game = new ClassicChess.Game();
    var board = game.board();

    var guiBoard = new GuiBoard({
      board: board,
      player1: game.player1(),
      player2: game.player2()
    });

    guiBoard.print();

    var turnInfo = game.currentTurnInfo();
    for (var turns = 1; turns <= 4; turns++) {
      console.log('* ' + turnInfo.player().name + ' *');
      var piece = _.sample(turnInfo.movablePieces());
      _.sample(piece.possibleMoves({ board: board })).perform();
      guiBoard.print();
    }
  });
});
