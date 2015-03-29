var JSChess = require('../js-chess.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('everything', function() {
    var army1 = new JSChess.Army({ forwardDirection: 'down' });
    var army2 = new JSChess.Army({ forwardDirection: 'up' });

    var board = new JSChess.Board({
      army1: army1,
      army2: army2
    });

    var player1 =  {
      name: 'Player 1',
      army: army1
    };

    var player2 =  {
      name: 'Player 2',
      army: army2
    };

    defendingPiece = new army1.Piece('king')();
    board.addPiece({
      piece: defendingPiece,
      location: { row: 0, col: 2 }
    });

    attackingPiece = new army2.Piece('queen')();
    board.addPiece({
      piece: attackingPiece,
      location: { row: 7, col: 2 }
    });

    expect(board.pieceUnderAttack({
      piece: defendingPiece
    })).toBe(true);
  });
});
