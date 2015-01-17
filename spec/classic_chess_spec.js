var Chess = require('../js-chess.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('', function() {
    var army1 = new Chess.ClassicChessArmy();
    var army2 = new Chess.ClassicChessArmy();

    var board = new Chess.ChessBoard({
      army1: army1,
      army2: army2
    });

    var setup = new Chess.ClassicChessSetup();

    setup.perform({
      board: board,
      army1: army1,
      army2: army2
    });
  });
});
