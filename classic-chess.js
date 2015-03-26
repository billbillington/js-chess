var JSChess = require('./js-chess.js');
var Setup = require('./lib/classic_chess/setup.js');
var Game = require('./lib/classic_chess/game.js');

module.exports = {
  Army: JSChess.Army,
  Board: JSChess.Board,
  Setup: Setup,
  Game: Game
};

