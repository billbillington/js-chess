var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('idGenerator', 'object').
    require('Board').
    require('Armies', 'array').
    values();

  var idGenerator = parsedArgs.idGenerator;
  var Board = parsedArgs.Board;
  var Armies = parsedArgs.Armies;

  validateArmies(Armies);

  var armies = [];
  armies.push(
    new Armies[0]({
      idGenerator: idGenerator,
      id: idGenerator.nextID(),
      forwardDirection: 'down'
    })
  );
  armies.push(
    new Armies[1]({
      idGenerator: idGenerator,
      id: idGenerator.nextID(),
      forwardDirection: 'up'
    })
  );

  var board = new Board({
    army1: armies[0],
    army2: armies[1]
  });

  validateBoard(board);

  return {
    perform: perform
  };

  function perform() {
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

    return {
      board: board,
      armies: armies
    };
  }

  function validateBoard(board){
    if(board.colCount() != 8 || board.rowCount() != 8){
      throw('board size must be 8 x 8');
    }
  }

  function validateArmies(Armies){
    if(Armies.length != 2){
      throw('please supply 2 armies');
    }
  }
};
