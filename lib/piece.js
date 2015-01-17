var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args){
  parsedArgs = np.parse(args).
    require('army').
    require('name').
    values();

  var army = parsedArgs.army;
  var name = parsedArgs.name;

  return {
    army: army,
    name : name
  };
};
