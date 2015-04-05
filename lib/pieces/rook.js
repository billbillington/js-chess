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
    new MoveDefinition({ directions: ['left'] }),
    new MoveDefinition({ directions: ['right'] }),
    new MoveDefinition({ directions: ['up'] }),
    new MoveDefinition({ directions: ['down'] })
  ];

  return new Piece({
    id: id,
    name: 'rook',
    army: army,
    moveDefinitions: moveDefinitions
  });
};
