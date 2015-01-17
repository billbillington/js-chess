var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../js-chess.js');
var ClassicPawn = require('./pieces/pawn.js');
var ClassicBishop = require('./pieces/bishop.js');
var ClassicKnight = require('./pieces/knight.js');
var ClassicRook = require('./pieces/rook.js');
var ClassicQueen = require('./pieces/queen.js');
var ClassicKing = require('./pieces/king.js');

module.exports = function() {
  return new JSChess.Army({
    name: 'classic',
    pieces: {
      pawn: ClassicPawn,
      bishop: ClassicBishop,
      knight: ClassicKnight,
      rook: ClassicRook,
      queen: ClassicQueen,
      king: ClassicKing
    }
  });
};
