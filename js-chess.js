module.exports = function() {
  return {
    Board: require('./lib/board.js'),
    Army: require('./lib/army.js'),
    Piece: require('./lib/piece.js'),
    MoveDefinition: require('./lib/move_definition.js'),
    Setup: require('./lib/setup.js')
  };
}();
