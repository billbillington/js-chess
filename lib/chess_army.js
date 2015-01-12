var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('name', 'string').
    require('pieces', 'object').
    values();

  var name = parsedArgs.name;
  var pieceConstructors = _.clone(parsedArgs.pieces);

  return {
    name: name,
    pieceConstructor: pieceConstructor
  };

  function pieceConstructor(rank){
    if(!pieceConstructors[rank]){
      throw("this army doesn not countain a peice for rank '" + rank + "'");
    }
    return pieceConstructors[rank];
  }
};
