require('jasmine-expect');
var JSChess = require('../js-chess.js');
var IDGenerator = require('../lib/id_generator.js');
var _ = require('lodash');

describe('Pawn', function() {
  var idGenerator = new IDGenerator();

  describe('pawn unblocked from front', function() {
    describe('on first move', function(){
      var army1, army2, board, pawn, possibleMoves;

      beforeEach(function(){
        army1 = new JSChess.Army({
          idGenerator: idGenerator,
          id: idGenerator.nextID(),
          forwardDirection: 'down'
        });
        army2 = new JSChess.Army({
          idGenerator: idGenerator,
          id: idGenerator.nextID(),
          forwardDirection: 'up'
        });

        board = new JSChess.Board({
          id: idGenerator.nextID(),
          army1: army1,
          army2: army2
        });

        pawn = board.addPiece({
          army: army1,
          rank: 'pawn',
          location: { row: 0, col: 2 }
        });

        possibleMoves = pawn.possibleMoves({ board: board });
      });

      it('can move forward one square', function() {
        expect(
          _.map(possibleMoves, function(move){ return move.destination(); })
        ).toContain({ row: 1, col: 2 }, 'forward one space move not found');
      });

      it('can move forward two squares', function(){
        expect(
          _.map(possibleMoves, function(move){ return move.destination(); })
        ).toContain({ row: 2, col: 2 }, 'forward two spaces move not found');
      });
    });

    describe('after first move', function() {
      var army1, army2, board, pawn, possibleMoves;

      beforeEach(function(){
        army1 = new JSChess.Army({
          idGenerator: idGenerator,
          id: idGenerator.nextID(),
          forwardDirection: 'down'
        });
        army2 = new JSChess.Army({
          idGenerator: idGenerator,
          id: idGenerator.nextID(),
          forwardDirection: 'up'
        });

        board = new JSChess.Board({
          id: idGenerator.nextID(),
          army1: army1,
          army2: army2
        });

        pawn = board.addPiece({
          army: army1,
          rank: 'pawn',
          moveCount: 1,
          location: { row: 0, col: 2 }
        });

        possibleMoves = pawn.possibleMoves({ board: board });
      });

      it('can move forward one square', function() {
        expect(
          _.map(possibleMoves, function(move){ return move.destination(); })
        ).toContain({ row: 1, col: 2 }, 'forward one space move not found');
      });

      it('can not move forward two squares', function(){
        expect(
          _.map(possibleMoves, function(move){ return move.destination(); })
        ).not.toContain({ row: 2, col: 2 }, 'forward two spaces move not found');
      });
    });
  });

  describe('pawn completely blocked from front', function() {
    var army1, army2, board, pawn, possibleMoves;

    beforeEach(function(){
      army1 = new JSChess.Army({
        idGenerator: idGenerator,
        id: idGenerator.nextID(),
        forwardDirection: 'down'
      });
      army2 = new JSChess.Army({
        idGenerator: idGenerator,
        id: idGenerator.nextID(),
        forwardDirection: 'up'
      });

      board = new JSChess.Board({
        id: idGenerator.nextID(),
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

      possibleMoves = pawn.possibleMoves({ board: board });
    });

    it('can not move forward one square', function() {
      expect(
        _.map(possibleMoves, function(move){ return move.destination(); })
      ).not.toContain({ row: 1, col: 2 }, 'forward one space move not found');
    });

    it('can not move forward two squares', function(){
      expect(
        _.map(possibleMoves, function(move){ return move.destination(); })
      ).not.toContain({ row: 2, col: 2 }, 'forward two spaces move not found');
    });
  });

  describe('pawn blocked by peice two spaces in front', function() {
    var army1, army2, board, pawn, possibleMoves;

    beforeEach(function(){
      army1 = new JSChess.Army({
        idGenerator: idGenerator,
        id: idGenerator.nextID(),
        forwardDirection: 'down'
      });
      army2 = new JSChess.Army({
        idGenerator: idGenerator,
        id: idGenerator.nextID(),
        forwardDirection: 'up'
      });

      board = new JSChess.Board({
        id: idGenerator.nextID(),
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

      possibleMoves = pawn.possibleMoves({ board: board });
    });

    it('can move forward one square', function() {
      expect(
        _.map(possibleMoves, function(move){ return move.destination(); })
      ).toContain({ row: 1, col: 2 }, 'forward one space move not found');
    });

    it('can not move forward two squares', function(){
      expect(
        _.map(possibleMoves, function(move){ return move.destination(); })
      ).not.toContain({ row: 2, col: 2 }, 'forward two spaces move not found');
    });
  });

});
