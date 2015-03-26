var _ = require('lodash');
var np = require('named-parameters');
var MoveDefinition = require('./../move_definition.js');
var Piece = require('./../piece.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moveDefinitions= [
    new MoveDefinition({ directions: ['left'] }),
    new MoveDefinition({ directions: ['right'] }),
    new MoveDefinition({ directions: ['up'] }),
    new MoveDefinition({ directions: ['down'] }),
    new MoveDefinition({ directions: ['left', 'up'] }),
    new MoveDefinition({ directions: ['right', 'up'] }),
    new MoveDefinition({ directions: ['left', 'down'] }),
    new MoveDefinition({ directions: ['right', 'down'] })
  ];

  return new Piece({
    name: 'queen',
    army: army,
    moveDefinitions: moveDefinitions
  });
};
