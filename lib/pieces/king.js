var _ = require('lodash');
var np = require('named-parameters');
var MoveDefinition = require('./../move_definition.js');
var Piece = require('./../piece.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moveDefinitions = [
    new MoveDefinition({
      directions: ['left'],
      limit: 1
    }),
    new MoveDefinition({
      directions: ['right'],
      limit: 1
    }),
    new MoveDefinition({
      directions: ['up'],
      limit: 1
    }),
    new MoveDefinition({
      directions: ['down'],
      limit: 1
    }),
    new MoveDefinition({
      directions: ['left', 'up'],
      limit: 1
    }),
    new MoveDefinition({
      directions: ['right', 'up'],
      limit: 1
    }),
    new MoveDefinition({
      directions: ['left', 'down'],
      limit: 1
    }),
    new MoveDefinition({
      directions: ['right', 'down'],
      limit: 1
    })
  ];

  return new Piece({
    name: 'king',
    army: army,
    isKing: true,
    moveDefinitions: moveDefinitions
  });
};
