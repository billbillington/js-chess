var _ = require('lodash');
var np = require('named-parameters');
var Setup = require('./setup.js');
var Board = require('./board.js');
var Army = require('./army.js');

module.exports = function(args){
  var parsedArgs = np.parse(args).
    require('idGenerator', 'object').
    default('turnLimit', Infinity).
    require('turnLimit', 'positive integer').
    require('turnLimit', 'non-zero integer').
    values();

  var idGenerator = parsedArgs.idGenerator;
  var turnLimit = parsedArgs.turnLimit;

  var player1 =  {
    name: 'Player 1',
    army: new Army({
      idGenerator: idGenerator,
      id: idGenerator.nextID(),
      forwardDirection: 'down'
    })
  };

  var player2 =  {
    name: 'Player 2',
    army: new Army({
      idGenerator: idGenerator,
      id: idGenerator.nextID(),
      forwardDirection: 'up'
    })
  };

  var board = new Board({
    army1: player1.army,
    army2: player2.army
  });

  Setup.perform({
    board: board,
    armies: [player1.army, player2.army]
  });

  var moves = [];

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
    return turnNumber() > turnLimit;
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
    moves.push(move);
    move.perform();
  }

  function turnNumber(){
    return moves.length + 1;
  }


  function currentTurnInfo(){
    var player = whosTurn();
    return {
      player: function(){ return player; },
      turnNumber: turnNumber,
      movablePieces: function(){ return movablePieces(player); }
    };
  }

  function whosTurn(){
    return ((turnNumber() % 2) !== 0) ? player1 : player2;
  }

  function movablePieces(player) {
    return _.select(board.activePieces({ army: player.army }), function(piece){
      return piece.possibleMoves({ board: board }).length !== 0;
    });
  }
};
