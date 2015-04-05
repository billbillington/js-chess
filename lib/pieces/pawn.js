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

  var forwardDirection = army.forwardDirection;

  var moveDefinitions = [
    new MoveDefinition({
      directions: [forwardDirection, 'right'],
      limit: 1,
      type: 'takeOnly'
    }),
    new MoveDefinition({
      directions: [forwardDirection],
      limit: 1,
      type: 'moveOnly'
    }),
    new MoveDefinition({
      directions: [forwardDirection, forwardDirection],
      limit: 1,
      type: 'moveOnly',
      vetoCondition: function(piece) {
        return piece.moveCount !== 0;
      }
    }),
    new MoveDefinition({
      directions: [forwardDirection, 'left'],
      limit: 1,
      type: 'takeOnly'
    })
  ];

  return new Piece({
    id: id,
    name: 'pawn',
    army: army,
    moveDefinitions: moveDefinitions
  });
};
