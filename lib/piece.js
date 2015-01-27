var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args){
  var parsedArgs = np.parse(args).
    require('army').
    require('name').
    require('moveDefinitions', 'array').
    default('isKing', false).
    require('isKing', 'boolean').
    values();

  var army = parsedArgs.army;
  var name = parsedArgs.name;
  var moveDefinitions = parsedArgs.moveDefinitions;
  var isKing = parsedArgs.isKing;

  var instance = {
    army: army,
    name : name,
    possibleMoves: possibleMoves,
    isKing: function(){ return isKing; }
  };

  return instance;

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
