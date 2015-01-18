var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args){
  parsedArgs = np.parse(args).
    require('army').
    require('name').
    require('moves').
    values();

  var army = parsedArgs.army;
  var name = parsedArgs.name;
  var moves = parsedArgs.moves;

  var instance = {
    army: army,
    name : name,
    attackedSquares: attackedSquares
  };

  return instance;

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
};
