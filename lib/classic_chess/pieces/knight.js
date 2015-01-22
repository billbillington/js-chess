var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moves = [
  ];

  return new JSChess.Piece({
    name: 'classic knight',
    army: army,
    moves: []
  });
};
