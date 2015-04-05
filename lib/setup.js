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

  var initialized = initializeFunction(idGenerator, Board, Armies);

  var board = initialized.board;
  var armies = initialized.armies;

  return {
    perform: perform
  };

  function perform() {
    return performFunction(board, armies);
  }

  function initializeFunction(idGenerator, Board, Armies) {
    validateArmies(Armies);

    var armies = [];
    armies.push(
      new Armies[0]({
        idGenerator: idGenerator,
        forwardDirection: 'down'
      })
    );
    armies.push(
      new Armies[1]({
        idGenerator: idGenerator,
        forwardDirection: 'up'
      })
    );

    var board = new Board({
      army1: armies[0],
      army2: armies[1]
    });

    validateBoard(board);

    return {
      board: board,
      armies: armies
    };
  }

  function performFunction(board, armies) {
    var backlinePieceRanks = ['rook', 'bishop', 'knight', 'queen', 'king', 'knight', 'bishop', 'rook'];

    // Setup Army 1
    _.each(backlinePieceRanks, function(rank, n) {
      board.addPiece({
        piece: new armies[0].Piece(rank)(), location: { row: 0, col: n }
      });
    });

    _.times(8, function(n) {
      board.addPiece({
        piece: new armies[0].Piece('pawn')(), location: { row: 1, col: n }
      });
    });


    // Setup Army 2
    _.times(8, function(n) {
      board.addPiece({
        piece: new armies[1].Piece('pawn')(), location: { row: 6, col: n }
      });
    });

    _.each(backlinePieceRanks, function(rank, n) {
      board.addPiece({
        piece: new armies[1].Piece(rank)(), location: { row: 7, col: n }
      });
    });

    return {
      board: board,
      armies: armies
    };
  }

  function validateBoard(board){
    if(board.colCount != 8 || board.rowCount != 8){
      throw('board size must be 8 x 8');
    }
  }

  function validateArmies(Armies){
    if(Armies.length != 2){
      throw('please supply 2 armies');
    }
  }
};
