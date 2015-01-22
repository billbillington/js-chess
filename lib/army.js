var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('name', 'string').
    require('pieces', 'object').
    require('forwardDirection', 'string').
    values();

  var name = parsedArgs.name;
  var forwardDirection = parsedArgs.forwardDirection;
  var Pieces = _.clone(parsedArgs.pieces);

  var instance = {
    name: name,
    forwardDirection: forwardDirection,
    Piece: Piece
  };

  return instance;

  function Piece(rank){
    if(!Pieces[rank]){
      throw("this army doesn not countain a piece for rank '" + rank + "'");
    }
    return function() { return Pieces[rank]({ army: instance }); };
  }
};
