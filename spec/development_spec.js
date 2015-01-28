var ClassicChess = require('../classic-chess.js');
var GuiBoard = require('../lib/gui_board.js');
var _ = require('lodash');

describe('Classic Chess', function() {
  it('moving a peice', function() {
    var army1 = new ClassicChess.Army({ forwardDirection: 'down' });
    var army2 = new ClassicChess.Army({ forwardDirection: 'up' });

    var board = new ClassicChess.Board({
      army1: army1,
      army2: army2
    });

    var attackingPiece = new army1.Piece('pawn')();
    //var freindlyPiece = new army1.Piece('rook')();
    //var enemyPiece = new army2.Piece('rook')();

    board.addPiece({ piece: attackingPiece, location: { row: 2, col: 4 } });
    //board.addPiece({ piece: freindlyPiece, location: { row: 5, col: 3 } });
    //board.addPiece({ piece: enemyPiece, location: { row: 5, col: 5 } });

    var guiBoard = new GuiBoard({
      board: board,
      army1: army1,
      army2: army2
    });

    guiBoard.print();

    var possibleMoves = attackingPiece.possibleMoves({ board: board });

    console.log('current location:');

    console.log('possible moves:');
    console.log(board.pieceLocation({ piece: attackingPiece }));
    console.log(_.map(possibleMoves, function(move) {
      return move.destination();
    }));

    possibleMoves[0].perform({
      board: board
    });

    guiBoard.print();

    possibleMoves = attackingPiece.possibleMoves({ board: board });

    console.log('current location:');
    console.log(board.pieceLocation({ piece: attackingPiece }));
    console.log('possible moves:');
    console.log(_.map(possibleMoves, function(move) {
      return move.destination();
    }));
  });
});
