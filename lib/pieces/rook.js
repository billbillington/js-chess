var _ = require('lodash');
var np = require('named-parameters');
var MoveDefinition = require('./../move_definition.js');
var Piece = require('./../piece.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moveDefinitions = [
    new MoveDefinition({ directions: ['left'] }),
    new MoveDefinition({ directions: ['right'] }),
    new MoveDefinition({ directions: ['up'] }),
    new MoveDefinition({ directions: ['down'] })
  ];

  return new Piece({
    name: 'rook',
    army: army,
    moveDefinitions: moveDefinitions
  });
};
