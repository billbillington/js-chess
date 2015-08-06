var _ = require('lodash');
var IDGenerator = require('../lib/id_generator.js');
var JSChess = require('../js-chess.js');
var Serialiser = require('../lib/serialiser.js');
var fs = require('fs');

describe('Serialiser', function() {
  describe('serialise()', function() {
    it('serialises undefined as null', function(){

      expect(Serialiser.serialise(undefined)).
        toEqual({ graph: null, repository: {} });
    });

    it('serialises null as null', function(){
      expect(Serialiser.serialise(null)).
        toEqual({ graph: null, repository: {} });
    });

    it('serialises a string as itself', function(){
      expect(Serialiser.serialise('foo')).
        toEqual({ graph: 'foo', repository: {} });
    });

    it('serialises a number as itself', function(){
      expect(Serialiser.serialise(34.43)).
        toEqual({ graph: 34.43, repository: {} });
    });

    it('can serialise a nested array', function(){
      expect(
        Serialiser.serialise([undefined, 'hi', 34.34, ['fo', undefined]])
      ).toEqual({
        graph: [null, 'hi', 34.34, ['fo', null]],
        repository: {}
      });
    });

    it('cannot serialise a random object', function(){
      expect(function(){
        Serialiser.serialise({ foo: 'bar' });
      }).toThrow(new Error('unsupported object type'));
    });

    it('cannnot serialise an array with an random object in it', function(){
      expect(function(){
        Serialiser.serialise([ 1, 2, 3, {} ]);
      }).toThrow(new Error('unsupported object type'));
    });


    it('it can serialise any object with serialise() function defined on it', function(){
      var jsonRepresentation = { foo: 'faz', baz: 'bar'};

      var objectWithToJOSN = {
        type: function(){ return 'Blah'; },
        id: function() { return 2; },
        jsChessSerialise: function(){
          return jsonRepresentation;
        }
      };

      expect(
        Serialiser.serialise(objectWithToJOSN)
      ).toEqual({
        graph: { id: 2, type: 'Blah' },
        repository: {
          'Blah': { 2:  jsonRepresentation }
        }
      });
    });

    it('it can serialise an array with an object with jsChessSerialise() function defined on it', function(){
      var jsonRepresentation = { foo: 'faz', baz: 'bar'};

      var objectWithToJOSN = {
        type: function(){ return 'Blah'; },
        id: function() { return 2; },
        jsChessSerialise: function(){
          return jsonRepresentation;
        }
      };

      expect(
        Serialiser.serialise([ 1, 2, 3, objectWithToJOSN], {})
      ).toEqual({
        graph: [ 1, 2, 3, { id: 2, type: 'Blah' } ],
        repository: {
          'Blah': { 2:  jsonRepresentation }
        }
      });
    });

    it('Serialise Chess board', function(){
      var idGenerator = new IDGenerator();

      var game = new JSChess.Game({
        id: idGenerator.nextID(),
        idGenerator: idGenerator
      });

      var expected = JSON.parse(fs.readFileSync('./states/classic_chess_setup.json', 'utf8'));
      expect(Serialiser.serialise(game)).toEqual(expected);
    });
  });

  describe('deserialise()', function(){
    it('can serialise a nested array', function(){
      expect(
        Serialiser.deserialise({
          graph: [null, 'hi', 34.34, ['fo', null]],
          repository: {}
        })
      ).toEqual(
        [null, 'hi', 34.34, ['fo', null]]
      );
    });

    fit('deserialise chess game', function(){
      var json = JSON.parse(fs.readFileSync('./states/classic_chess_setup.json', 'utf8'));

      var game = Serialiser.deserialise(json);
      expect(game).toEqual({});
    });
  });
});
