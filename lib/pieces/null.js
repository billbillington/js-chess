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

  var moveDefinitions = [];

  return new Piece({
    id: id,
    name: 'null',
    army: army,
    moveDefinitions: moveDefinitions
  });
};
