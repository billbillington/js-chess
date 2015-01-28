var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moveDefinitions = [
    new JSChess.MoveDefinition({
      directions: ['left'],
      limit: 1
    }),
    new JSChess.MoveDefinition({
      directions: ['right'],
      limit: 1
    }),
    new JSChess.MoveDefinition({
      directions: ['up'],
      limit: 1
    }),
    new JSChess.MoveDefinition({
      directions: ['down'],
      limit: 1
    }),
    new JSChess.MoveDefinition({
      directions: ['left', 'up'],
      limit: 1
    }),
    new JSChess.MoveDefinition({
      directions: ['right', 'up'],
      limit: 1
    }),
    new JSChess.MoveDefinition({
      directions: ['left', 'down'],
      limit: 1
    }),
    new JSChess.MoveDefinition({
      directions: ['right', 'down'],
      limit: 1
    })
  ];

  return new JSChess.Piece({
    name: 'king',
    army: army,
    isKing: true,
    moveDefinitions: moveDefinitions
  });
};
