var JSChess = require('../js-chess.js');
var IDGenerator = require('../lib/id_generator.js');
var _ = require('lodash');

describe('Pieces', function() {
  var idGenerator = new IDGenerator();
  var army = new JSChess.Army({
    idGenerator: idGenerator,
    id: idGenerator.nextID(),
    forwardDirection: 'up'
  });

  describe('Piece', function(){
    it('should be an instance of itself', function(){
      var piece = new JSChess.Piece({
        id: idGenerator.nextID(),
        rank: 'foo',
        moveDefinitions: [],
        moveCount: 3,
        army: army,
        direction: 'forward'
      });

      expect(piece).toEqual(jasmine.any(JSChess.Piece));
    });
  });

  describe('Pawn', function(){
    it('should be an instance of itself', function(){
      var pawn = new JSChess.Pieces.Pawn({
        id: idGenerator.nextID(),
        moveCount: 3,
        army: army,
        direction: 'forward'
      });

      expect(pawn).toEqual(jasmine.any(JSChess.Pieces.Pawn));
    });
  });

  describe('Rook', function(){
    it('should be an instance of itself', function(){
      var rook = new JSChess.Pieces.Rook({
        id: idGenerator.nextID(),
        moveCount: 3,
        army: army,
        direction: 'forward'
      });

      expect(rook).toEqual(jasmine.any(JSChess.Pieces.Rook));
    });
  });

  describe('Queen', function(){
    it('should be an instance of itself', function(){
      var queen = new JSChess.Pieces.Queen({
        id: idGenerator.nextID(),
        moveCount: 3,
        army: army,
        direction: 'forward'
      });

      expect(queen).toEqual(jasmine.any(JSChess.Pieces.Queen));
    });
  });

  describe('Null', function(){
    it('should be an instance of itself', function(){
      var null_piece = new JSChess.Pieces.Null({
        id: idGenerator.nextID(),
        moveCount: 3,
        army: army,
        direction: 'forward'
      });

      expect(null_piece).toEqual(jasmine.any(JSChess.Pieces.Null));
    });
  });

  describe('Bishop', function(){
    it('should be an instance of itself', function(){
      var bishop = new JSChess.Pieces.Bishop({
        id: idGenerator.nextID(),
        moveCount: 3,
        army: army,
        direction: 'forward'
      });

      expect(bishop).toEqual(jasmine.any(JSChess.Pieces.Bishop));
    });
  });

  describe('King', function(){
    it('should be an instance of itself', function(){
      var king = new JSChess.Pieces.King({
        id: idGenerator.nextID(),
        moveCount: 3,
        army: army,
        direction: 'forward'
      });

      expect(king).toEqual(jasmine.any(JSChess.Pieces.King));
    });
  });
});
