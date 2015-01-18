var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');
var Moves = require('../moves.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moves = [
    Moves.leftMove,
    Moves.rightMove,
    Moves.upMove,
    Moves.downMove,
    Moves.diagonalLeftUpMove,
    Moves.diagonalRightUpMove,
    Moves.diagonalLeftDownMove,
    Moves.diagonalRightDownMove
  ];

  return new JSChess.Piece({
    name: 'classic queen',
    army: army,
    moves: moves
  });
};
