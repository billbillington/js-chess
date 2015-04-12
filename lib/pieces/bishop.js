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

  var moveDefinitions = [
    new MoveDefinition({
      name: 'diagonal left up',
      directions: ['left', 'up'] }
    ),
    new MoveDefinition({
      name: 'diagonal right up',
      directions: ['right', 'up']
    }),
    new MoveDefinition({
      name: 'diagonal left down',
      directions: ['left', 'down']
    }),
    new MoveDefinition({
      name: 'diagonal right down',
      directions: ['right', 'down']
    })
  ];

  return new Piece({
    id: id,
    name: 'bishop',
    army: army,
    moveCount: moveCount,
    moveDefinitions: moveDefinitions
  });
};
