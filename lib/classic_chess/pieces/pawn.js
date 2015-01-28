var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var forwardDirection = army.forwardDirection;

  var moveDefinitions = [
    new JSChess.MoveDefinition({
      directions: [forwardDirection, 'right'],
      limit: 1
    }),
    new JSChess.MoveDefinition({
      directions: [forwardDirection],
      limit: 1,
      moveOnly: true
    }),
    new JSChess.MoveDefinition({
      directions: [forwardDirection, 'left'],
      limit: 1
    })
  ];

  return new JSChess.Piece({
    name: 'pawn',
    army: army,
    moveDefinitions: moveDefinitions
  });
};
