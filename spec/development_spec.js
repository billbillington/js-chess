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

    var attackingPiece = new army1.Piece('rook')();
    //var freindlyPiece = new army1.Piece('rook')();
    //var enemyPiece = new army2.Piece('rook')();

    board.addPiece({ piece: attackingPiece, location: { row: 4, col: 4 } });
    //board.addPiece({ piece: freindlyPiece, location: { row: 4, col: 1 } });
    //board.addPiece({ piece: enemyPiece, location: { row: 3, col: 7 } });

    var guiBoard = new GuiBoard({
      board: board,
      army1: army1,
      army2: army2
    });

    console.log("piece location: " + JSON.stringify(board.pieceLocation(attackingPiece)));
    console.log("possible moves: " + JSON.stringify(attackingPiece.possibleMoves({ board: board })));

    guiBoard.print();


    //attackingPiece.possibleMoves({ board: board })[0].perform({
    //  board: board
    //});

    //console.log("piece location: " + JSON.stringify(board.pieceLocation(attackingPiece)));

    //guiBoard.print();

  });
});
