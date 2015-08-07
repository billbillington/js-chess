var _ = require('lodash');
var IDGenerator = require('../lib/id_generator.js');
var JSChess = require('../js-chess.js');
var Serialiser = require('../lib/serialiser.js');

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

      var expected = {
        graph: {
          id: 2,
          type: 'Game'
        },
        repository: {
          'Game': {
            2: {
              idGenerator: { id: 1, type: 'IDGenerator' },
              player1: {
                name: 'Player 1',
                army: { type: 'Army', id: 3 }
              },
              player2: {
                name: 'Player 2',
                army: { type: 'Army', id: 4 }
              },
              moves: [],
              board: { type: 'Board', id: 5 }
            }
          },
          'Army': {
            3: {
              idGenerator: { id: 1, type: 'IDGenerator' },
              activePieces: [
                { id: 6,  type: 'Piece' },
                { id: 7,  type: 'Piece' },
                { id: 8,  type: 'Piece' },
                { id: 9,  type: 'Piece' },
                { id: 10,  type: 'Piece' },
                { id: 11, type: 'Piece' },
                { id: 12, type: 'Piece' },
                { id: 13, type: 'Piece' },
                { id: 14, type: 'Piece' },
                { id: 15, type: 'Piece' },
                { id: 16, type: 'Piece' },
                { id: 17, type: 'Piece' },
                { id: 18, type: 'Piece' },
                { id: 19, type: 'Piece' },
                { id: 20, type: 'Piece' },
                { id: 21, type: 'Piece' }
              ],
              takenPieces: [],
              king: { type: 'Piece', id: 10 },
              forwardDirection: 'down'
            },
            4: {
              idGenerator: { id: 1, type: 'IDGenerator' },
              activePieces: [
                { id: 22, type: 'Piece' },
                { id: 23, type: 'Piece' },
                { id: 24, type: 'Piece' },
                { id: 25, type: 'Piece' },
                { id: 26, type: 'Piece' },
                { id: 27, type: 'Piece' },
                { id: 28, type: 'Piece' },
                { id: 29, type: 'Piece' },
                { id: 30, type: 'Piece' },
                { id: 31, type: 'Piece' },
                { id: 32, type: 'Piece' },
                { id: 33, type: 'Piece' },
                { id: 34, type: 'Piece' },
                { id: 35, type: 'Piece' },
                { id: 36, type: 'Piece' },
                { id: 37, type: 'Piece' }
              ],
              takenPieces: [],
              king: { type: 'Piece', id: 34 },
              forwardDirection: 'up'
            }
          },
          'Board': {
            5: {
              armies: [
                { id: 3, type: 'Army' },
                { id: 4, type: 'Army' }
              ],
              spaces: [
                [
                  { id: 6, type: 'Piece' },
                  { id: 7, type: 'Piece' },
                  { id: 8, type: 'Piece' },
                  { id: 9, type: 'Piece' },
                  { id: 10, type: 'Piece' },
                  { id: 11, type: 'Piece' },
                  { id: 12, type: 'Piece' },
                  { id: 13, type: 'Piece' }
                ],
                [
                  { id: 14, type: 'Piece' },
                  { id: 15, type: 'Piece' },
                  { id: 16, type: 'Piece' },
                  { id: 17, type: 'Piece' },
                  { id: 18, type: 'Piece' },
                  { id: 19, type: 'Piece' },
                  { id: 20, type: 'Piece' },
                  { id: 21, type: 'Piece' }
                ],
                [],
                [],
                [],
                [],
                [
                  { id: 22, type: 'Piece' },
                  { id: 23, type: 'Piece' },
                  { id: 24, type: 'Piece' },
                  { id: 25, type: 'Piece' },
                  { id: 26, type: 'Piece' },
                  { id: 27, type: 'Piece' },
                  { id: 28, type: 'Piece' },
                  { id: 29, type: 'Piece' }
                ],
                [
                  { id: 30, type: 'Piece' },
                  { id: 31, type: 'Piece' },
                  { id: 32, type: 'Piece' },
                  { id: 33, type: 'Piece' },
                  { id: 34, type: 'Piece' },
                  { id: 35, type: 'Piece' },
                  { id: 36, type: 'Piece' },
                  { id: 37, type: 'Piece' }
                ]
              ]
            }
          },
          'IDGenerator': {
            1: { lastID: 37 }
          },
          'Piece': {
            6: {
              army: { id: 3, type: 'Army' },
              rank: 'rook',
              isKing: false,
              moveCount: 0
            },
            7: {
              army: { id: 3, type: 'Army' },
              rank: 'bishop',
              isKing: false,
              moveCount: 0
            },
            8: {
              army: { id: 3, type: 'Army' },
              rank: 'knight',
              isKing: false,
              moveCount: 0
            },
            9: {
              army: { id: 3, type: 'Army' },
              rank: 'queen',
              isKing: false,
              moveCount: 0
            },
            10: {
              army: { id: 3, type: 'Army' },
              rank: 'king',
              isKing: true,
              moveCount: 0
            },
            11: {
              army: { id: 3, type: 'Army' },
              rank: 'knight',
              isKing: false,
              moveCount: 0
            },
            12: {
              army: { id: 3, type: 'Army' },
              rank: 'bishop',
              isKing: false,
              moveCount: 0
            },
            13: {
              army: { id: 3, type: 'Army' },
              rank: 'rook',
              isKing: false,
              moveCount: 0
            },
            14: {
              army: { id: 3, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            15: {
              army: { id: 3, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            16: {
               army: { id: 3, type: 'Army' },
               rank: 'pawn',
               isKing: false,
               moveCount: 0
            },
            17: {
              army: { id: 3, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            18: {
              army: { id: 3, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            19: {
              army: { id: 3, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            20: {
              army: { id: 3, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            21: {
              army: { id: 3, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            22: {
              army: { id: 4, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            23: {
              army: { id: 4, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            24: {
              army: { id: 4, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            25: {
              army: { id: 4, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            26: {
              army: { id: 4, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            27: {
              army: { id: 4, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            28: {
              army: { id: 4, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            29: {
              army: { id: 4, type: 'Army' },
              rank: 'pawn',
              isKing: false,
              moveCount: 0
            },
            30: {
              army: { id: 4, type: 'Army' },
              rank: 'rook',
              isKing: false,
              moveCount: 0
            },
            31: {
              army: { id: 4, type: 'Army' },
              rank: 'bishop',
              isKing: false,
              moveCount: 0
            },
            32: {
              army: { id: 4, type: 'Army' },
              rank: 'knight',
              isKing: false,
              moveCount: 0
            },
            33: {
              army: { id: 4, type: 'Army' },
              rank: 'queen',
              isKing: false,
              moveCount: 0
            },
            34: {
              army: { id: 4, type: 'Army' },
              rank: 'king',
              isKing: true,
              moveCount: 0
            },
            35: {
              army: { id: 4, type: 'Army' },
              rank: 'knight',
              isKing: false,
              moveCount: 0
            },
            36: {
              army: { id: 4, type: 'Army' },
              rank: 'bishop',
              isKing: false,
              moveCount: 0
            },
            37: {
              army: { id: 4, type: 'Army' },
              rank: 'rook',
              isKing: false,
              moveCount: 0
            }
          }
        }
      };

      expect(Serialiser.serialise(game)).toEqual(expected);
    });
  });
});
