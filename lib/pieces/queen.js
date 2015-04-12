var _ = require('lodash');
var np = require('named-parameters');
var MoveDefinition = require('./../move_definition.js');
var Piece = require('./../piece.js');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
      require('id', 'positive integer').
      require('army', 'object').
      require('moveCount', 'non-negative integer').
      values();
  var id = parsedArgs.id;
  var army = parsedArgs.army;
  var moveCount = parsedArgs.moveCount;

  var moveDefinitions= [
    new MoveDefinition({
      name: 'left',
      directions: ['left']
    }),
    new MoveDefinition({
      name: 'right',
      directions: ['right']
    }),
    new MoveDefinition({
      name: 'up',
      directions: ['up']
    }),
    new MoveDefinition({
      name: 'down',
      directions: ['down']
    }),
    new MoveDefinition({
      name: 'left up',
      directions: ['left', 'up']
    }),
    new MoveDefinition({
      name: 'right up',
      directions: ['right', 'up']
    }),
    new MoveDefinition({
      name: 'left down',
      directions: ['left', 'down']
    }),
    new MoveDefinition({
      name: 'right down',
      directions: ['right', 'down']
    })
  ];

  return new Piece({
    id: id,
    name: 'queen',
    army: army,
    moveCount: moveCount,
    moveDefinitions: moveDefinitions
  });
};
