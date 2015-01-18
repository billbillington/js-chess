var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args){
  parsedArgs = np.parse(args).
    require('army').
    require('name').
    require('attackedSquares').
    values();

  var army = parsedArgs.army;
  var name = parsedArgs.name;
  var attackedSquares = parsedArgs.attackedSquares;

  return {
    army: army,
    name : name,
    attackedSquares: attackedSquares
  };
};
