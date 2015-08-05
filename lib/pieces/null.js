var _ = require('lodash');
var np = require('named-parameters');
var MoveDefinition = require('./../move_definition.js');
var Piece = require('./../piece.js');

function Null(args) {
  if(!(this instanceof Null)){
    throw new Error('Constructor called without new keyword');
  }

  var parsedArgs = np.parse(args).
      require('id', 'positive integer').
      require('army', 'object').
      require('moveCount', 'non-negative integer').
      values();
  var id = parsedArgs.id;
  var army = parsedArgs.army;
  var moveCount = parsedArgs.moveCount;

  var forwardDirection = army.forwardDirection();

  var moveDefinitions = [];

  this._piece = new Piece({
    id: id,
    rank: 'null',
    army: army,
    moveCount: moveCount,
    moveDefinitions: moveDefinitions
  });
}

Null.prototype = _.reduce( _.keys(Piece.prototype), function(result, key){
    result[key] = function() {
      return this._piece[key].apply(this._piece, arguments);
    };
    return result;
  }, {});

module.exports = Null;
