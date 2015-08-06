var _ = require('lodash');
var np = require('named-parameters');

module.exports =  {
  perform: function perform(args) {
    var parsedArgs = np.parse(args).
      require('board', 'object').
      require('armies', 'array').
      values();

    var board = parsedArgs.board;
    var armies = parsedArgs.armies;

    var backlinePieceRanks = ['rook', 'bishop', 'knight', 'queen', 'king', 'knight', 'bishop', 'rook'];

    // Setup Army 1
    _.each(backlinePieceRanks, function(rank, n) {
      board.addPiece({
        army: armies[0],
        rank: rank,
        location: { row: 0, col: n }
      });
    });

    _.times(8, function(n) {
      board.addPiece({
        army: armies[0],
        rank: 'pawn',
        location: { row: 1, col: n }
      });
    });


    // Setup Army 2
    _.times(8, function(n) {
      board.addPiece({
        army: armies[1],
        rank: 'pawn',
        location: { row: 6, col: n }
      });
    });

    _.each(backlinePieceRanks, function(rank, n) {
      board.addPiece({
        army: armies[1],
        rank: rank,
        location: { row: 7, col: n }
      });
    });
  }
};
