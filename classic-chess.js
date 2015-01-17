var JSChess = require('./js-chess.js');
var Army = require('./lib/classic_chess/army.js');
var Setup = require('./lib/classic_chess/setup.js');

module.exports = {
  Army: Army,
  Board: JSChess.Board,
  Setup: Setup
};

