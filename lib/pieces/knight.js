var _ = require('lodash');
var np = require('named-parameters');
var MoveDefinition = require('./../move_definition.js');
var Piece = require('./../piece.js');

function Knight(args) {
  if(!(this instanceof Knight)){
    throw new Error('Constructor called without new keyword');
  }

  var parsedArgs = np.parse(args).
      require('id', 'positive integer').
      require('army', 'object').
      require('moveCount', 'non-negative integer').
      values();
  var id = parsedArgs.id;
  var army = parsedArgs.army;
  var moveCount = parsedArgs.moveCount;

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

  this._piece = new Piece({
    id: id,
    rank: 'knight',
    army: army,
    moveCount: moveCount,
    moveDefinitions: moveDefinitions
  });
}

Knight.prototype = _.reduce( _.keys(Piece.prototype), function(result, key){
    result[key] = function() {
      return this._piece[key].apply(this._piece, arguments);
    };
    return result;
  }, {});

module.exports = Knight;
