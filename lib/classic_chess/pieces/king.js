var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');
var Moves = require('../moves.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moves = [
    new Moves.Continuous({
      directions: ['left'],
      limit: 1
    }),
    new Moves.Continuous({
      directions: ['right'],
      limit: 1
    }),
    new Moves.Continuous({
      directions: ['up'],
      limit: 1
    }),
    new Moves.Continuous({
      directions: ['down'],
      limit: 1
    }),
    new Moves.Continuous({
      directions: ['left', 'up'],
      limit: 1
    }),
    new Moves.Continuous({
      directions: ['right', 'up'],
      limit: 1
    }),
    new Moves.Continuous({
      directions: ['left', 'down'],
      limit: 1
    }),
    new Moves.Continuous({
      directions: ['right', 'down'],
      limit: 1
    })
  ];

  return new JSChess.Piece({
    name: 'classic king',
    army: army,
    moves: moves
  });
};
