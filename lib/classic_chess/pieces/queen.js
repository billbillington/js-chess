var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');
var Moves = require('../moves.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moves = [
    new Moves.Left(),
    new Moves.Right(),
    new Moves.Up(),
    new Moves.Down(),
    new Moves.DiagonalLeftUp(),
    new Moves.DiagonalRightUp(),
    new Moves.DiagonalLeftDown(),
    new Moves.DiagonalRightDown()
  ];

  return new JSChess.Piece({
    name: 'classic queen',
    army: army,
    moves: moves
  });
};
