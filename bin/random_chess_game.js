#! /usr/local/bin/node
var JSChess = require('../js-chess.js');
var GuiBoard = require('../lib/gui_board.js');
var _ = require('lodash');

var game = new JSChess.Game({ turnLimit: 200 });
var board = game.board();

var guiBoard = new GuiBoard({
  board: board,
  player1: game.player1(),
  player2: game.player2()
});

console.log('* Start *');
guiBoard.print();

while (game.inProgress()) {
  var turnInfo = game.currentTurnInfo();
  console.log('- Turn ' + turnInfo.turnNumber() + ' -');
  console.log('* ' + turnInfo.player().name + '\'s move *');
  var piece = _.sample(turnInfo.movablePieces());
  var move  = _.sample(piece.possibleMoves({ board: board }));
  game.makeMove({ move: move });
  guiBoard.print();
}
console.log("** Result: " + game.result() + " **");
