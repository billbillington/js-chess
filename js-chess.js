module.exports = function() {
  return {
    ChessBoard: require('./lib/chess_board.js'),
    ChessArmy: require('./lib/chess_army.js'),
    ClassicChessArmy: require('./lib/classic_chess_army.js')
  };
}();
