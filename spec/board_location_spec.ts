import { BoardLocation } from '../src/js-chess';

describe("BoardLocation", function() {
  describe("supplying valid values", function(){
    var row = 3;
    var col = 4;
    var subject: BoardLocation;

    beforeEach(function(){
      subject = new BoardLocation(row, col);
    });

    it("should return correct row", function(){
      expect(subject.row()).toEqual(row);
    });

    it("should return correct col", function(){
      expect(subject.col()).toEqual(col);
    });

    describe("hash()", function(){
      it("should produce hash using row and col values", function() {
        expect(subject.hash()).toEqual('c4r3');

      });
    });
  });

  describe("instantiating with invalid values", function(){
    describe("supplying negative row", function(){
      it("should throw error", function(){
        let row = -1;
        let col = 1;

        expect(
          () => { new BoardLocation(row, col) }
        ).toThrowError(
          'row must be a positive'
        )
      });
    });

    describe("supplying negative col", function(){
      it("should throw error", function(){
        let row = 1;
        let col = -1;

        expect(
          () => { new BoardLocation(row, col) }
        ).toThrowError(
          'col must be a positive'
        )
      });
    });

    describe("supplying row out of bounds", function(){
      it("should throw error", function(){
        let row = 8;
        let col = 1;

        expect(
          () => { new BoardLocation(row, col) }
        ).toThrowError(
          'row out of bounds'
        )
      });
    });

    describe("supplying col out of bounds", function(){
      it("should throw error", function(){
        let row = 1;
        let col = 8;

        expect(
          () => { new BoardLocation(row, col) }
        ).toThrowError(
          'col out of bounds'
        )
      });
    });
  });
});
