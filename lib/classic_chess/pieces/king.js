var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moves = [
    new JSChess.Move({
      directions: ['left'],
      limit: 1
    }),
    new JSChess.Move({
      directions: ['right'],
      limit: 1
    }),
    new JSChess.Move({
      directions: ['up'],
      limit: 1
    }),
    new JSChess.Move({
      directions: ['down'],
      limit: 1
    }),
    new JSChess.Move({
      directions: ['left', 'up'],
      limit: 1
    }),
    new JSChess.Move({
      directions: ['right', 'up'],
      limit: 1
    }),
    new JSChess.Move({
      directions: ['left', 'down'],
      limit: 1
    }),
    new JSChess.Move({
      directions: ['right', 'down'],
      limit: 1
    })
  ];

  return new JSChess.Piece({
    name: 'classic king',
    army: army,
    isKing: true,
    moves: moves
  });
};
