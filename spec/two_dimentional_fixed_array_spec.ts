import { TwoDimentionalFixedArray } from '../src/js-chess';

describe("TwoDimentionalFixedArray", function() {
  var rowCount: number;
  var colCount: number;

  beforeEach(function(){
    rowCount = 1;
    colCount = 1;
  });

  it("Should construct successfully", function() {
    new TwoDimentionalFixedArray(rowCount, colCount);
  });

  describe("rowCount", function() {
    it("Should match rowCount passed in", function() {
      let subject = new TwoDimentionalFixedArray(rowCount, colCount);
      expect(subject.rowCount).toEqual(rowCount);
    });

    describe("negative values", function() {
      beforeEach(function() {
        rowCount = -1;
      });

      it("should fail to build", function(){
        expect(
          () => { new TwoDimentionalFixedArray(rowCount, colCount) }
        ).toThrowError(
          'rowCount must be a positive integer'
        )
      });
    });
  });

  describe("colCount", function() {
    it("Should match colCount passed in", function() {
      let subject = new TwoDimentionalFixedArray(rowCount, colCount);
      expect(subject.colCount).toEqual(colCount);
    });

    describe("negative values", function() {
      beforeEach(function() {
        colCount = -1;
      });

      it("should fail to build", function(){
        expect(
          () => { new TwoDimentionalFixedArray(rowCount, colCount) }
        ).toThrowError(
          'colCount must be a positive integer'
        )
      });
    });
  });

  describe("Getting and Setting", function(){
    describe("Get on empty location", function(){
      it("should return undefined", function(){
        let rowCount = 2;
        let colCount = 2;
        let subject = new TwoDimentionalFixedArray<Object>(2, 2);

        let emptyRow = 1;
        let emptyCol = 1;
        expect(
          subject.get(emptyRow, emptyCol)
        ).toEqual(
          undefined
        )
      });
    });

    describe("accesing out of bounds", function(){
      describe("col is negative value", function(){
        it("should raise argument error", function(){
          let rowCount = 2;
          let colCount = 2;
          let subject = new TwoDimentionalFixedArray<Object>(2 ,2);

          let row = 1;
          let col = -1;
          expect(
            () => { subject.get(row, col) }
          ).toThrowError("supplied index out of bounds")
        });
      });

      describe("row is negative value", function(){
        it("should raise argument error", function(){
          let rowCount = 2;
          let colCount = 2;
          let subject = new TwoDimentionalFixedArray<Object>(2 ,2);

          let row = -1;
          let col = 1;
          expect(
            () => { subject.get(row, col) }
          ).toThrowError("supplied index out of bounds")
        });
      });

      describe("row is too large", function(){
        it("should raise argument error", function(){
          let rowCount = 2;
          let colCount = 2;
          let subject = new TwoDimentionalFixedArray<Object>(2 ,2);

          let row = 2;
          let col = 1;
          expect(
            () => { subject.get(row, col) }
          ).toThrowError("supplied index out of bounds")
        });
      });

      describe("col is too large", function(){
        it("should raise argument error", function(){
          let rowCount = 2;
          let colCount = 2;
          let subject = new TwoDimentionalFixedArray<Object>(2 ,2);

          let row = 1;
          let col = 2;
          expect(
            () => { subject.get(row, col) }
          ).toThrowError("supplied index out of bounds")
        });
      });
    });

    describe("setting out of bounds", function(){
      describe("col is negative value", function(){
        it("should raise argument error", function(){
          let rowCount = 2;
          let colCount = 2;
          let subject = new TwoDimentionalFixedArray<Object>(2 ,2);

          let row = 1;
          let col = -1;
          expect(
            () => { subject.get(row, col) }
          ).toThrowError("supplied index out of bounds")
        });
      });

      describe("row is negative value", function(){
        it("should raise argument error", function(){
          let rowCount = 2;
          let colCount = 2;
          let subject = new TwoDimentionalFixedArray<Object>(2 ,2);

          let row = -1;
          let col = 1;
          expect(
            () => { subject.get(row, col) }
          ).toThrowError("supplied index out of bounds")
        });
      });

      describe("row is too large", function(){
        it("should raise argument error", function(){
          let rowCount = 2;
          let colCount = 2;
          let subject = new TwoDimentionalFixedArray<Object>(2 ,2);

          let row = 2;
          let col = 1;
          expect(
            () => { subject.get(row, col) }
          ).toThrowError("supplied index out of bounds")
        });
      });

      describe("coll is too large", function(){
        it("should raise argument error", function(){
          let rowCount = 2;
          let colCount = 2;
          let subject = new TwoDimentionalFixedArray<Object>(2 ,2);

          let row = 1;
          let col = 2;
          expect(
            () => { subject.get(row, col) }
          ).toThrowError("supplied index out of bounds")
        });
      });
    });

    describe("Setting and retrieving data", function(){
      it("should return data from stored location", function(){
        let data = { "test": "data" };
        let rowCount = 2;
        let colCount = 2;
        let subject = new TwoDimentionalFixedArray<Object>(rowCount, colCount);

        let insertRow = 1;
        let insertCol = 0;
        subject.set(data, insertRow, insertCol);
        expect(
          subject.get(insertRow, insertCol)
        ).toEqual(
          data
        )
      });
    });

    describe("Removing data ", function(){
      it("should remove data from the specified location", function(){
        let data = { "test": "data" };
        let rowCount = 2;
        let colCount = 2;
        let subject = new TwoDimentionalFixedArray<Object>(rowCount, colCount);

        let insertRow = 1;
        let insertCol = 1;
        subject.set(data, insertRow, insertCol);
        let removed = subject.remove(insertRow, insertCol);

        expect(removed).toEqual(data);
        expect(
          subject.get(insertRow, insertCol)
        ).toBeUndefined();
      });
    });
  });
});
