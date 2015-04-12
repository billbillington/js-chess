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
    var moveNames = _.map(possibleMoves, function(moves) {
      return moves.name();
    });

    expect(possibleMoves.length).toEqual(2);
    expect(_.contains(moveNames, 'forward one space')).toEqual(true);
    expect(_.contains(moveNames, 'forward two spaces')).toEqual(true);
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
    var moveNames = _.map(possibleMoves, function(moves) {
      return moves.name();
    });

    expect(possibleMoves.length).toEqual(1);
    expect(_.contains(moveNames, 'forward one space')).toEqual(true);
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
    var moveNames = _.map(possibleMoves, function(moves) {
      return moves.name();
    });

    expect(possibleMoves.length).toEqual(1);
    expect(_.contains(moveNames, 'forward one space')).toEqual(true);
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
