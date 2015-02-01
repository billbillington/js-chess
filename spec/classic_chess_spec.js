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

    console.log('* Start *');
    guiBoard.print();

    for (var turns = 1; turns <= 30; turns++) {
      var turnInfo = game.currentTurnInfo();
      console.log('* ' + turnInfo.player().name + '\'s move *');
      var piece = _.sample(turnInfo.movablePieces());
      game.makeMove({ move: _.sample(piece.possibleMoves({ board: board })) });
      guiBoard.print();
    }
  });
});
