var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('pieces', 'object').
    require('forwardDirection', 'string').
    values();

  var forwardDirection = parsedArgs.forwardDirection;
  var Pieces = _.clone(parsedArgs.pieces);

  var instance = {
    forwardDirection: forwardDirection,
    Piece: Piece
  };

  return instance;

  function Piece(rank){
    if(!Pieces[rank]){
      throw(new Error("this army doesn not countain a piece for rank '" + rank + "'"));
    }
    return function() { return Pieces[rank]({ army: instance }); };
  }
};
