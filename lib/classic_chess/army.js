var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../js-chess.js');
var ClassicPawn = require('./pieces/pawn.js');
var ClassicBishop = require('./pieces/bishop.js');
var ClassicKnight = require('./pieces/knight.js');
var ClassicRook = require('./pieces/rook.js');
var ClassicQueen = require('./pieces/queen.js');
var ClassicKing = require('./pieces/king.js');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('forwardDirection', 'string').
    values();

  var forwardDirection = parsedArgs.forwardDirection;

  return new JSChess.Army({
    forwardDirection: forwardDirection,
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
