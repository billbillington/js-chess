var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args){
  var parsedArgs = np.parse(args).
    require('id', 'positive integer').
    require('army').
    require('rank').
    require('moveDefinitions', 'array').
    require('moveCount', 'non-negative integer').
    default('isKing', false).
    require('isKing', 'boolean').
    values();

  var id = parsedArgs.id;
  var army = parsedArgs.army;
  var rank = parsedArgs.rank;
  var moveDefinitions = parsedArgs.moveDefinitions;
  var isKing = parsedArgs.isKing;
  var moveCount = parsedArgs.moveCount;

  var instance = {
    id: id,
    army: army,
    rank : rank,
    moveTo: moveTo,
    possibleMoves: possibleMoves,
    moveCount: moveCount,
    isKing: function(){ return isKing; }
  };

  return instance;

  function moveTo(args) {
    var parsedArgs = np.parse(args).
      require('location', 'object').
      require('board', 'object').
      values();

    var board = parsedArgs.board;
    var location = parsedArgs.location;

    var move = _.find(possibleMoves({ board: board }), function(move) {
      return move.destination().row == location.row &&
        move.destination().col == location.col;
    });

    if(move) {
      move.perform();
    } else  {
     throw(new Error("Attempt to move to invalid location: " + JSON.stringify(location)));
    }
  }

  function possibleMoves(args){
    var parsedArgs = np.parse(args).
      require('board', 'object').
      values();

    var board = parsedArgs.board;

    var moves = [];
    _.each(moveDefinitions, function(definition) {
      _.each(definition.getMoves({
        piece: instance,
        board: board
      }), function(move) {
        moves.push(move);
      });
    });

    return moves;
  }
};
