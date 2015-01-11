var ChessBoard = require("../chess_board.js");
var _ = require('lodash');

describe('ChessBoard', function() {
  describe('intialisation', function() {
    describe('with no arguments', function() {
      it('should throw an error', function() {
        expect(function() {
          new ChessBoard();
        }).toThrow();
      });
    });

    describe('supplying two armies', function() {
      it('should initiailise without errors', function() {
        var army1 = jasmine.createSpy('army 1');
        var army2 = jasmine.createSpy('army 2');

        expect(function() {
          new ChessBoard({
            army1: army1,
            army2: army2
          });
        }).not.toThrow();
      });
    });
  });
});
