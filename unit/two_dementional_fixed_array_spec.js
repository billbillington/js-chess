var TwoDimensionalFixedArray = require("../lib/two_dementional_fixed_array.js");
var _ = require('lodash');

describe('TwoDimensionalFixedArray', function() {
  describe('intialisation from dimentions', function() {
    var validArgs = { rowCount: 11, colCount: 9 };

    describe('with no arguments', function() {
      it('should raise an error about supplying arguments', function() {
        expect(function() {
          new TwoDimensionalFixedArray.fromDimentions();
        }).toThrow();
      });
    });

    describe('with valid arguments', function() {
      it('should instantiate without errors', function() {
        new TwoDimensionalFixedArray.fromDimentions(validArgs);
      });

      it('should report the correct column count', function() {
        expect(
          new TwoDimensionalFixedArray.fromDimentions(validArgs).colCount()
        ).toEqual(validArgs.colCount);
      });

      it('should report the correct row count', function() {
        expect(
          new TwoDimensionalFixedArray.fromDimentions(validArgs).rowCount()
        ).toEqual(validArgs.rowCount);
      });
    });

    describe('without suppliy a rowCount', function() {
      it('should raise an error about supplying the argument', function() {
        var args = _.omit(validArgs, 'rowCount');

        expect(function() {
          new TwoDimensionalFixedArray.fromDimentions(args);
        }).toThrow();
      });
    });

    describe('without suppliy a colCount', function() {
      it('should raise an error about supplying the argument', function() {
        var args = _.omit(validArgs, 'colCount');

        expect(function() {
          new TwoDimensionalFixedArray.fromDimentions(args);
        }).toThrow();
      });
    });
  });

  describe('initializing from array', function() {
    describe('with no arguments', function() {
      it('should raise an error about supplying arguments', function() {
        expect(function() {
          new TwoDimensionalFixedArray.fromArray();
        }).toThrow();
      });
    });

    describe('supplying a symetrical array', function() {
      var array = [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [1, 2, 3, 4, 5]];

      it('should not raise an error', function(){
        expect(function() {
          new TwoDimensionalFixedArray.fromArray({ data: array });
        }).not.toThrow();
      });

      it('should report correct row count', function() {
        expect(
          new TwoDimensionalFixedArray.fromArray({ data: array }).rowCount()
        ).toEqual(3);
      });

      it('should report correct col count', function() {
        expect(
          new TwoDimensionalFixedArray.fromArray({ data: array }).colCount()
        ).toEqual(5);
      });
    });

    describe('supplying jagged  array', function() {
      var array = [[1, 2], [5, 4, 3, 2, 1], [1, 2, 3]];

      it('should not raise an error', function(){
        expect(function() {
          new TwoDimensionalFixedArray.fromArray({ data: array });
        }).not.toThrow();
      });

      it('should report correct row count', function() {
        expect(
          new TwoDimensionalFixedArray.fromArray({ data: array }).rowCount()
        ).toEqual(3);
      });

      it('should take count of longest column', function() {
        expect(
          new TwoDimensionalFixedArray.fromArray({ data: array }).colCount()
        ).toEqual(5);
      });
    });

    describe('supplying an array containing non arrays', function() {
      var array = [[1, 2], undefined, [1, 2, 3]];

      it('should raise an error about the argument supplied', function(){
        expect(function() {
          new TwoDimensionalFixedArray.fromArray({ data: array });
        }).toThrow();
      });
    });
  });

  describe('set()', function() {
    var anyObject = {};

    describe('called with valid parameters', function() {
      it('should not throw an error', function() {
        subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 3, rowCount: 3 });
        expect(function() {
          subject.set({ item: anyObject, location: { row: 2, col: 2 } });
        }).not.toThrow();
      });
    });

    describe('when no arguments are supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 3, rowCount: 3 });
        expect(function() {
          subject.set();
        }).toThrow();
      });
    });

    describe('when negative row index supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 3, rowCount: 3 });
        expect(function() {
          subject.set({ item: anyObject, location: { row: -1, col: 1 } });
        }).toThrow();
      });
    });

    describe('when negative col index supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 3, rowCount: 3 });
        expect(function() {
          subject.set({ item: anyObject, location: { row: 1, col: -1 } });
        }).toThrow();
      });
    });

    describe('when out of bounds row index is supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 2, rowCount: 2 });
        expect(function() {
          subject.set({ item: anyObject, location: {row: 2, col: 1 } });
        }).toThrow();
      });
    });

    describe('when out of bounds col index is supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 2, rowCount: 2 });
        expect(function() {
          subject.set({ item: anyObject, location: { row: 1, col: 2 } });
        }).toThrow();
      });
    });
  });

  describe('get()', function() {
    var anyObject = {};

    describe('when no arguments are supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 2, rowCount: 2 });
        expect(function() { subject.get(); }).toThrow();
      });
    });
  });

  describe('called with valid parameters', function() {
    it('should not throw an error', function() {
      subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 3, rowCount: 3 });
      expect(function() {
        subject.get({ location: { row: 2, col: 2 } });
      }).not.toThrow();
    });
  });

  describe('when negative row index supplied', function() {
    it('should throw an error', function() {
      subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 3, rowCount: 3 });
      expect(function() {
        subject.get({ location: { row: -1, col: 1 } });
      }).toThrow();
    });
  });

  describe('when negative col index supplied', function() {
    it('should throw an error', function() {
      subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 3, rowCount: 3 });
      expect(function() {
        subject.get({ location: { row: 1, col: -1 } });
      }).toThrow();
    });
  });

  describe('when out of bounds row index is supplied', function() {
    it('should throw an error', function() {
      subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 2, rowCount: 2 });
      expect(function() {
        subject.get({ location: { row: 2, col: 1 } });
      }).toThrow();
    });
  });

  describe('when out of bounds col index is supplied', function() {
    it('should throw an error', function() {
      subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 2, rowCount: 2 });
      expect(function() {
        subject.get({ location: { row: 1, col: 2 } });
      }).toThrow();
    });
  });

  describe('object storage and retreival', function() {
    describe('attempting to access empty location', function() {
      it('should return undefined', function() {
        subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 2, rowCount: 2 });
        expect(subject.get({ location: { row:1, col:1 } })).toBe(undefined);
      });
    });

    describe('storing object and reteiving it', function() {
      it('should return the object', function() {
        stored_object = jasmine.createSpy('stored object');
        subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 2, rowCount: 2 });
        subject.set({ item: stored_object, location: { row: 0, col: 1 } });
        expect(subject.get({ location: { row:0, col:1 } })).toBe(stored_object);
      });
    });

    describe('object replacement', function() {
      it('should return the object', function() {
        object1 = jasmine.createSpy('object 1');
        object2 = jasmine.createSpy('object 2');
        subject = new TwoDimensionalFixedArray.fromDimentions({ colCount: 2, rowCount: 2 });
        subject.set({ item: object1, location: { row: 0, col: 1 } });
        subject.set({ item: object2, location: { row: 0, col: 1 } });
        expect(subject.get({ location: { row: 0, col:1 } })).toBe(object2);
      });
    });
  });
});
