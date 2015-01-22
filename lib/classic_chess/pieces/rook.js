var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moves = [
    new JSChess.Move({ directions: ['left'] }),
    new JSChess.Move({ directions: ['right'] }),
    new JSChess.Move({ directions: ['up'] }),
    new JSChess.Move({ directions: ['down'] })
  ];

  return new JSChess.Piece({
    name: 'classic rook',
    army: army,
    moves: moves
  });
};
