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
      name: 'left',
      directions: ['left'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'right',
      directions: ['right'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'up',
      directions: ['up'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'down',
      directions: ['down'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'left up',
      directions: ['left', 'up'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'right up',
      directions: ['right', 'up'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'left down',
      directions: ['left', 'down'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'right down',
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
