var JSChess = require('../js-chess.js');
var IDGenerator = require('../lib/id_generator.js');
var _ = require('lodash');

describe('Pawn', function() {
  var idGenerator = new IDGenerator();

  it('unblocked can move forward one or two squares', function() {
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

    pawn = board.addPiece({
      army: army1,
      rank: 'pawn',
      location: { row: 0, col: 2 }
    });

    var possibleMoves = pawn.possibleMoves({ board: board });

    expect(possibleMoves.length).toEqual(2);
    expect(possibleMoves[0].name()).toEqual('forward', 'forward one space move not found');
    expect(possibleMoves[0].destination()).toEqual({ row: 1, col: 2 }, 'forward one space move not found');
    expect(possibleMoves[1].name()).toEqual('forward', 'forward two spaces move not found');
    expect(possibleMoves[1].destination()).toEqual({ row: 2, col: 2 }, 'forward two spaces move not found');
  });

  it('cannot move 2 squares after first move', function() {
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

    pawn = board.addPiece({
      army: army1,
      rank: 'pawn',
      moveCount: 1,
      location: { row: 0, col: 2 }
    });

    var possibleMoves = pawn.possibleMoves({ board: board });

    expect(possibleMoves.length).toEqual(1);
    expect(possibleMoves[0].name()).toEqual('forward', 'forward one space move not found');
    expect(possibleMoves[0].destination()).toEqual({ row: 1, col: 2 }, 'forward one space move not found');
  });

  it('2 second move blocked', function() {
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

    pawn = board.addPiece({
      army: army1,
      rank: 'pawn',
      location: { row: 0, col: 2 }
    });

    board.addPiece({
      army: army2,
      rank: 'null',
      location: { row: 2, col: 2 }
    });

    var possibleMoves = pawn.possibleMoves({ board: board });

    expect(possibleMoves.length).toEqual(1);
    expect(possibleMoves[0].name()).toEqual('forward', 'forward one space move not found');
    expect(possibleMoves[0].destination()).toEqual({ row: 1, col: 2 }, 'forward one space move not found');
  });

  it('Movement completely blocked', function() {
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

    pawn = board.addPiece({
      army: army1,
      rank: 'pawn',
      location: { row: 0, col: 2 }
    });

    board.addPiece({
      army: army2,
      rank: 'null',
      location: { row: 1, col: 2 }
    });

    var possibleMoves = pawn.possibleMoves({ board: board });

    expect(possibleMoves.length).toEqual(0);
  });
});
