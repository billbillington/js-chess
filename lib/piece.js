var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args){
  parsedArgs = np.parse(args).
    require('army').
    require('name').
    require('moves').
    default('isKing', false).
    require('isKing', 'boolean').
    values();

  var army = parsedArgs.army;
  var name = parsedArgs.name;
  var moves = parsedArgs.moves;
  var isKing = parsedArgs.isKing;

  var instance = {
    army: army,
    name : name,
    attackedSquares: attackedSquares,
    moveSquares: moveSquares,
    possibleMoves: possibleMoves,
    isKing: function(){ return isKing; }
  };

  return instance;

  function possibleMoves(board){
    var allSquares = attackedSquares(board).concat(moveSquares(board));

    return _.uniq(allSquares, function(square) {
      return JSON.stringify([square.row, square.col]);
    });
  }

  function attackedSquares(board) {
    var allSquares = _.flatten(
      _.map(moves, function(move) {
        return move({
          piece: instance,
          board: board
        }).attackedSquares;
      })
    );

    return _.uniq(allSquares, function(square) {
      return JSON.stringify([square.row, square.col]);
    });
  }

  function moveSquares(board) {
    var allSquares = _.flatten(
      _.map(moves, function(move) {
        return move({
          piece: instance,
          board: board
        }).moveSquares;
      })
    );

    return _.uniq(allSquares, function(square) {
      return JSON.stringify([square.row, square.col]);
    });
  }
};
