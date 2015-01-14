var TwoDimensionalFixedArray = require("../lib/two_dementional_fixed_array.js");
var _ = require('lodash');

describe('TwoDimensionalFixedArray', function() {
  describe('intialisation', function() {
    var validArgs = { rowCount: 3, colCount: 3 };

    describe('with no arguments', function() {
      it('should raise an error about supplying arguments', function() {
        expect(function() {
          new TwoDimensionalFixedArray();
        }).toThrow();
      });
    });

    describe('with valid arguments', function() {
      it('should instantiate without errors', function() {
        new TwoDimensionalFixedArray(validArgs);
      });
    });

    describe('without suppliy a rowCount', function() {
      it('should raise an error about supplying the argument', function() {
        var args = _.omit(validArgs, 'rowCount');

        expect(function() {
          new TwoDimensionalFixedArray(args);
        }).toThrow();
      });
    });

    describe('without suppliy a colCount', function() {
      it('should raise an error about supplying the argument', function() {
        var args = _.omit(validArgs, 'colCount');

        expect(function() {
          new TwoDimensionalFixedArray(args);
        }).toThrow();
      });
    });
  });

  describe('set()', function() {
    var anyObject = {};

    describe('called with valid parameters', function() {
      it('should not throw an error', function() {
        subject = new TwoDimensionalFixedArray({ colCount: 3, rowCount: 3 });
        expect(function() {
          subject.set(anyObject, { row: 2, col: 2 });
        }).not.toThrow();
      });
    });

    describe('when no arguments are supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray({ colCount: 3, rowCount: 3 });
        expect(function() {
          subject.set();
        }).toThrow();
      });
    });

    describe('when negative row index supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray({ colCount: 3, rowCount: 3 });
        expect(function() {
          subject.set(anyObject, { row: -1, col: 1 });
        }).toThrow();
      });
    });

    describe('when negative col index supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray({ colCount: 3, rowCount: 3 });
        expect(function() {
          subject.set(anyObject, { row: 1, col: -1 });
        }).toThrow();
      });
    });

    describe('when out of bounds row index is supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray({ colCount: 2, rowCount: 2 });
        expect(function() {
          subject.set(anyObject, { row: 2, col: 1 });
        }).toThrow('supplied row index out of bounds');
      });
    });

    describe('when out of bounds col index is supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray({ colCount: 2, rowCount: 2 });
        expect(function() {
          subject.set(anyObject, { row: 1, col: 2 });
        }).toThrow('supplied col index out of bounds');
      });
    });
  });

  describe('get()', function() {
    var anyObject = {};

    describe('when no arguments are supplied', function() {
      it('should throw an error', function() {
        subject = new TwoDimensionalFixedArray({ colCount: 2, rowCount: 2 });
        expect(function() { subject.get(); }).toThrow();
      });
    });
  });

  describe('called with valid parameters', function() {
    it('should not throw an error', function() {
      subject = new TwoDimensionalFixedArray({ colCount: 3, rowCount: 3 });
      expect(function() {
        subject.get({ row: 2, col: 2 });
      }).not.toThrow();
    });
  });

  describe('when negative row index supplied', function() {
    it('should throw an error', function() {
      subject = new TwoDimensionalFixedArray({ colCount: 3, rowCount: 3 });
      expect(function() {
        subject.get({ row: -1, col: 1 });
      }).toThrow();
    });
  });

  describe('when negative col index supplied', function() {
    it('should throw an error', function() {
      subject = new TwoDimensionalFixedArray({ colCount: 3, rowCount: 3 });
      expect(function() {
        subject.get({ row: 1, col: -1 });
      }).toThrow();
    });
  });

  describe('when out of bounds row index is supplied', function() {
    it('should throw an error', function() {
      subject = new TwoDimensionalFixedArray({ colCount: 2, rowCount: 2 });
      expect(function() {
        subject.get({ row: 2, col: 1 });
      }).toThrow('supplied row index out of bounds');
    });
  });

  describe('when out of bounds col index is supplied', function() {
    it('should throw an error', function() {
      subject = new TwoDimensionalFixedArray({ colCount: 2, rowCount: 2 });
      expect(function() {
        subject.get({ row: 1, col: 2 });
      }).toThrow('supplied col index out of bounds');
    });
  });

  describe('object storage and retreival', function() {
    describe('attempting to access empty location', function() {
      it('should return undefined', function() {
        subject = new TwoDimensionalFixedArray({ colCount: 2, rowCount: 2 });
        expect(subject.get({ row:1, col:1 })).toBe(undefined);
      });
    });

    describe('storing object and reteiving it', function() {
      it('should return the object', function() {
        stored_object = jasmine.createSpy('stored object');
        subject = new TwoDimensionalFixedArray({ colCount: 2, rowCount: 2 });
        subject.set(stored_object, { row: 0, col: 1 });
        expect(subject.get({ row:0, col:1 })).toBe(stored_object);
      });
    });

    describe('object replacement', function() {
      it('should return the object', function() {
        object1 = jasmine.createSpy('object 1');
        object2 = jasmine.createSpy('object 2');
        subject = new TwoDimensionalFixedArray({ colCount: 2, rowCount: 2 });
        subject.set(object1, { row: 0, col: 1 });
        subject.set(object2, { row: 0, col: 1 });
        expect(subject.get({ row: 0, col:1 })).toBe(object2);
      });
    });
  });
});
