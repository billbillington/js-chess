var ClassicChess = require('../classic-chess.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('everything', function() {
    var army1 = new ClassicChess.Army();
    var army2 = new ClassicChess.Army();

    var board = new ClassicChess.Board({
      army1: army1,
      army2: army2
    });

    var setup = new ClassicChess.Setup();

    setup.perform({
      board: board,
      army1: army1,
      army2: army2
    });

    //Player 1 turn
    var pieces = board.activePieces({ army: army1 });
  });
});
