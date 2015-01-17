var Board = require("../js-chess.js").Board;
var _ = require('lodash');

describe('Board', function() {
  describe('intialisation', function() {
    describe('with no arguments', function() {
      it('should throw an error', function() {
        expect(function() {
          new Board();
        }).toThrow();
      });
    });

    describe('supplying two armies', function() {
      it('should initiailise without errors', function() {
        var army1 = jasmine.createSpy('army 1');
        var army2 = jasmine.createSpy('army 2');

        expect(function() {
          new Board({
            army1: army1,
            army2: army2
          });
        }).not.toThrow();
      });
    });
  });
});
