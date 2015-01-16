var _ = require('lodash');
var np = require('named-parameters');

module.exports = function() {
  return {
    perform: perform
  };

  function perform(args) {
    parsedArgs = np.parse(args).
      require('board').
      require('army1').
      require('army2').
      values();

    var board = parsedArgs.board;
    var army1 = parsedArgs.army1;
    var army2 = parsedArgs.army2;

    // Setup Army 1
    _.each(['rook', 'bishop', 'knight', 'queen', 'king', 'knight', 'bishop', 'rook'], function(rank, n) {
      board.addPiece(new army1.pieceConstructor(rank)(), { row: 0, col: n });
    });

    _.times(8, function(n) {
      board.addPiece(new army1.pieceConstructor('pawn')(), { row: 1, col: n });
    });


    // Setup Army 2
    _.times(8, function(n) {
      board.addPiece(new army1.pieceConstructor('pawn')(), { row: 6, col: n });
    });

    _.each(['rook', 'bishop', 'knight', 'queen', 'king', 'knight', 'bishop', 'rook'], function(rank, n) {
      board.addPiece(new army1.pieceConstructor(rank)(), { row: 7, col: n });
    });
  }
};
