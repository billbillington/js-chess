var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');
var Moves = require('../moves.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moves = [
    new Moves.Continuous({ directions: ['left', 'up'] }),
    new Moves.Continuous({ directions: ['right', 'up'] }),
    new Moves.Continuous({ directions: ['left', 'down'] }),
    new Moves.Continuous({ directions: ['right', 'down'] })
  ];

  return new JSChess.Piece({
    name: 'classic bishop',
    army: army,
    moves: moves
  });
};
