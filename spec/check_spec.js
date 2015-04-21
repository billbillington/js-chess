var JSChess = require('../js-chess.js');
var IDGenerator = require('../lib/id_generator.js');
var _ = require('lodash');

describe('check', function() {
  var idGenerator = new IDGenerator();

  it('when king is under attack kings should be in check', function() {
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

    king = board.addPiece({
      army: army1,
      rank: 'king',
      location: { row: 0, col: 2 }
    });

    var attackingPiece = board.addPiece({
      army: army2,
      rank: 'queen',
      location: { row: 7, col: 1 }
    });

    expect(army1.inCheck({ board: board })).toEqual(false);

    attackingPiece.moveTo({
      board: board,
      location: { row: 7, col: 2 }
    });

    expect(army1.inCheck({ board: board })).toEqual(true);
  });
});
