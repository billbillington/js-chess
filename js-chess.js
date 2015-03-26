module.exports = function() {
  return {
    Board: require('./lib/board.js'),
    Army: require('./lib/army.js'),
    Piece: require('./lib/piece.js'),
    MoveDefinition: require('./lib/move_definition.js'),
    Setup: require('./lib/setup.js'),
    Pieces: {
      Pawn: require('./lib/pieces/pawn.js'),
      Bishop: require('./lib/pieces/bishop.js'),
      Knight: require('./lib/pieces/knight.js'),
      Rook: require('./lib/pieces/rook.js'),
      Queen: require('./lib/pieces/queen.js'),
      King: require('./lib/pieces/king.js')
    }
  };
}();
