var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../js-chess.js');

module.exports = function() {
  return new JSChess.Army({
    name: 'classic',
    pieces: {
      pawn: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new JSChess.Piece({
          name: 'classic pawn',
          army: army
        });
      },
      bishop: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new JSChess.Piece({
          name: 'classic bishop',
          army: army
        });
      },
      knight: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new JSChess.Piece({
          name: 'classic knight',
          army: army
        });
      },
      rook: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new JSChess.Piece({
          name: 'classic rook',
          army: army
        });
      },
      queen: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new JSChess.Piece({
          name: 'classic queen',
          army: army
        });
      },
      king: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new JSChess.Piece({
          name: 'classic king',
          army: army
        });
      }
    }
  });
};
