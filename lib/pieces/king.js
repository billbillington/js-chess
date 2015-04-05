var _ = require('lodash');
var np = require('named-parameters');
var MoveDefinition = require('./../move_definition.js');
var Piece = require('./../piece.js');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
      require('id', 'positive integer').
      require('army', 'object').
      values();
  var id = parsedArgs.id;
  var army = parsedArgs.army;

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
    id: id,
    name: 'king',
    army: army,
    isKing: true,
    moveDefinitions: moveDefinitions
  });
};
