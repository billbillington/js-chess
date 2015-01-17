module.exports = function() {
  return {
    ChessBoard: require('./lib/chess_board.js'),
    ChessArmy: require('./lib/chess_army.js'),
    ChessPiece: require('./lib/chess_peice.js'),
    ClassicChessArmy: require('./lib/classic_chess_army.js'),
    ClassicChessSetup: require('./lib/classic_chess_setup.js')
  };
}();