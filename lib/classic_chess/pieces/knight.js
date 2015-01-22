var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

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

  var moves = _.map(moveDirections, function(directions) {
    return JSChess.Move({
      directions: directions,
      limit: 1
    });
  });

  return new JSChess.Piece({
    name: 'classic knight',
    army: army,
    moves: moves
  });
};
