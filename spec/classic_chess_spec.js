var ClassicChess = require('../classic-chess.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('everything', function() {
    var setup = new ClassicChess.Setup({
      Board: ClassicChess.Board,
      Armies: [ClassicChess.Army, ClassicChess.Army]
    });

    setupComponents = setup.perform();

    var army1 = setupComponents.armies[0];
    var army2 = setupComponents.armies[1];
    var board = setupComponents.board;

    //Player 1 turn
    var pieces = board.activePieces({ army: army1 });
  });
});
