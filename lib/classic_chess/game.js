var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../js-chess.js');
var Setup = require('./setup.js');
var Army = require('./army.js');

module.exports = function(args){
  var parsedArgs = np.parse(args).
    default('turnLimit', Infinity).
    require('turnLimit', 'positive integer').
    require('turnLimit', 'non-zero integer').
    values();

  var turnLimit = parsedArgs.turnLimit;

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
    currentTurnInfo: currentTurnInfo,
    inProgress: inProgress,
    result: result,
    makeMove: makeMove
  };

  function inProgress(){
    return !(turnLimitReached() ||
      kingWin() ||
      staleMate());
  }

  function result() {
    var gameResult;
    if( turnLimitReached() ) {
      gameResult = 'Timed Draw';
    } else if ( kingWin() ) {
      gameResult = winner().name + " wins";
    } else if( staleMate() ) {
      gameResult = 'Stale Mate';
    } else {
      gameResult = 'N/A';
    }
    return gameResult;
  }

  function turnLimitReached(){
    return turnNumber > turnLimit;
  }

  function winner(){
    if(winnerExists()) {
      return _.find(players(), function(player) {
        return !kingTaken(player);
      });
    }
  }

  function players() {
    return [player1, player2];
  }

  function winnerExists() {
    return _.any(players(), function(player) {
      return kingTaken(player);
    });
  }

  function kingWin() {
    return winner() !== undefined;
  }

  function kingTaken(player){
    var king = board.king({ army: player.army });
    return board.pieceTaken({
      piece: king
    });
  }

  function staleMate() {
    return _.any(players(), function(player) {
      return movablePieces(player).length === 0;
    });
  }

  function makeMove(args) {
    var parsedArgs = np.parse(args).
      require('move', 'object').
      values();

    var move = parsedArgs.move;
    move.perform();
    turnNumber++;
  }

  function currentTurnInfo(){
    var player = whosTurn();
    return {
      player: function(){ return player; },
      turnNumber: function () { return turnNumber; },
      movablePieces: function(){ return movablePieces(player); }
    };
  }

  function whosTurn(){
    return ((turnNumber % 2) !== 0) ? player1 : player2;
  }

  function movablePieces(player) {
    return _.select(board.activePieces({ army: player.army }), function(piece){
      return piece.possibleMoves({ board: board }).length !== 0;
    });
  }
};
