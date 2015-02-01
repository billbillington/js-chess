var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../js-chess.js');
var Setup = require('./setup.js');
var Army = require('./army.js');

module.exports = function(){

  var setup = new Setup({
    Board: JSChess.Board,
    Armies: [Army, Army]
  });

  setupComponents = setup.perform();

  var player1 =  {
    name: 'Player 1',
    army: setupComponents.armies[0]
  };

  var player2 =  {
    name: 'Player 2',
    army: setupComponents.armies[1]
  };

  var turnNumber = 1;

  var board = setupComponents.board;

  return {
    board: function() { return board; },
    player1: function() { return player1; },
    player2: function() { return player2; },
    currentTurnInfo: currentTurnInfo
  };

  function currentTurnInfo(){
    var player = whosTurn();
    return {
      player: function(){ return player; },
      movablePieces: function(){ return movablePieces(player); }
    };
  }

  function whosTurn(){
    return ((turnNumber % 2) === 0) ? player1 : player2;
  }

  function movablePieces(player) {
    return _.select(board.activePieces({ army: player.army }), function(piece){
      return piece.possibleMoves({ board: board }).length !== 0;
    });
  }
};
