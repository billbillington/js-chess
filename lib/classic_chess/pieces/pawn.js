var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var forwardDirection = army.forwardDirection;

  var moves = [
    new JSChess.Move({
      directions: [forwardDirection, 'right'],
      limit: 1
    }),
    new JSChess.Move({
      directions: [forwardDirection],
      limit: 1,
      moveOnly: true
    }),
    new JSChess.Move({
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
