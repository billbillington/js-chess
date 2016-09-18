import { BoardState, BoardLocation, Piece } from '../src/js-chess';

describe("BoardState", function(){
  describe("set()", function(){
    describe("when location empty", function(){
      it("should set and be retrieveable", function(){
        let subject = new BoardState();
        let piece = new Piece();
        let location = new BoardLocation(7, 7);

        subject.add(piece, location);
        expect(
          subject.get(location)
        ).toEqual(
          piece
        );
      });
    });

    describe("when location in use", function(){
      it("should raise error", function(){
        let subject = new BoardState();
        let piece = new Piece();
        let newPiece = new Piece();
        let location = new BoardLocation(7, 7);

        subject.add(piece, location);
        expect(
          () => { subject.add(newPiece, location) }
        ).toThrowError(
          'attempt to set occupied location'
        );
      });
    });
  });

  describe("getLocation()", function(){
    it("it should return location peice is stored at", function(){
      let subject = new BoardState();
      let piece = new Piece();
      let location = new BoardLocation(7, 7);

      subject.add(piece, location);
      expect(
        subject.getLocation(piece)
      ).toEqual(
        location
      )
    });
  });

  describe("remove()", function(){
    describe("when correct piece is in location", function(){
      it("", function(){
        let subject = new BoardState();
        let piece = new Piece();
        let location = new BoardLocation(7, 7);

        subject.add(piece, location);
        subject.remove(piece, location);
        expect(
          subject.get(location)
        ).toEqual(
          piece
        )
      });
    });

    describe("when different piece is in location", function(){
      it("", function(){
        let subject = new BoardState();
        let piece = new Piece();
        let otherPiece = new Piece();
        let location = new BoardLocation(7, 7);

        subject.add(otherPiece, location);
        expect(
          () => {
            subject.remove(piece, location);
          }
        ).toThrowError(
          `attempt to remove incorect piece from location ${location.hash()}`
        )
      });
    });
  });
});
