var JSChess = require('../js-chess.js');
var IDGenerator = require('../lib/id_generator.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('everything', function() {
    var idGenerator = new IDGenerator();

    var army1 = new JSChess.Army({
      idGenerator: idGenerator,
      forwardDirection: 'down'
    });
    var army2 = new JSChess.Army({
      idGenerator: idGenerator,
      forwardDirection: 'up'
    });


    var board = new JSChess.Board({
      idGenerator: idGenerator,
      army1: army1,
      army2: army2
    });

    var player1 =  {
      name: 'Player 1',
      army: army1
    };

    var player2 =  {
      name: 'Player 2',
      army: army2
    };

    defendingPiece = board.addPiece({
      army: army1,
      rank: 'king',
      location: { row: 0, col: 2 }
    });

    attackingPiece = board.addPiece({
      army: army2,
      rank: 'queen',
      location: { row: 7, col: 2 }
    });

    expect(board.pieceUnderAttack({
      piece: defendingPiece
    })).toEqual(true);
  });
});
