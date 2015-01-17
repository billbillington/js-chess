var _ = require('lodash');
var np = require('named-parameters');
var ChessArmy =  require('./chess_army.js');
var ChessPiece = require('./chess_piece.js');

module.exports = function() {
  return new ChessArmy({
    name: 'classic',
    pieces: {
      pawn: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new ChessPiece({
          name: 'classic pawn',
          army: army
        });
      },
      bishop: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new ChessPiece({
          name: 'classic bishop',
          army: army
        });
      },
      knight: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new ChessPiece({
          name: 'classic knight',
          army: army
        });
      },
      rook: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new ChessPiece({
          name: 'classic rook',
          army: army
        });
      },
      queen: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new ChessPiece({
          name: 'classic queen',
          army: army
        });
      },
      king: function(args) {
        var army = np.parse(args).require('army').values().army;
        return new ChessPiece({
          name: 'classic king',
          army: army
        });
      }
    }
  });
};
