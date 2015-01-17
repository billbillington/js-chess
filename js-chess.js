module.exports = function() {
  return {
    Board: require('./lib/board.js'),
    Army: require('./lib/army.js'),
    Piece: require('./lib/piece.js')
  };
}();
