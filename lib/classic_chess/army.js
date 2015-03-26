var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../js-chess.js');
var Pawn = JSChess.Pieces.Pawn;
var Bishop = JSChess.Pieces.Bishop;
var Knight = JSChess.Pieces.Knight;
var Rook = JSChess.Pieces.Rook;
var Queen = JSChess.Pieces.Queen;
var King = JSChess.Pieces.King;

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('forwardDirection', 'string').
    values();

  var forwardDirection = parsedArgs.forwardDirection;

  return new JSChess.Army({
    forwardDirection: forwardDirection,
    pieces: {
      pawn:   Pawn,
      bishop: Bishop,
      knight: Knight,
      rook:   Rook,
      queen:  Queen,
      king:   King
    }
  });
};
