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

  var verticalDirections = _.flatten(
    _.map(['up', 'down'], function(direction) {
      return [
        [direction, direction, 'left'],
        [direction, direction, 'right']
      ];
    }),
    true
  );

  var horizontalDirections = _.flatten(
    _.map(['left', 'right'], function(direction) {
      return [
        [direction, direction, 'up'],
        [direction, direction, 'down']
      ];
    }),
    true
  );

  var moveDirections = verticalDirections.concat(horizontalDirections);

  var moveDefinitions = _.map(moveDirections, function(directions) {
    return MoveDefinition({
      name: 'kight jump',
      directions: directions,
      limit: 1
    });
  });

  return new Piece({
    id: id,
    name: 'knight',
    army: army,
    moveDefinitions: moveDefinitions
  });
};
