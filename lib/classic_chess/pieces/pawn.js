var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');
var Moves = require('../moves.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var forwardDirection = army.forwardDirection;

  var moves = [
    new Moves.Continuous({
      directions: [forwardDirection, 'right'],
      limit: 1
    }),
    new Moves.Continuous({
      directions: [forwardDirection, 'left'],
      limit: 1
    })
  ];

  return new JSChess.Piece({
    name: 'classic pawn',
    army: army,
    moves: moves
  });
};
