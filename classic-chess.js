var JSChess = require('./js-chess.js');
var Army = require('./lib/classic_chess/army.js');
var Setup = require('./lib/classic_chess/setup.js');
var Game = require('./lib/classic_chess/game.js');

module.exports = {
  Army: Army,
  Board: JSChess.Board,
  Setup: Setup,
  Game: Game
};

