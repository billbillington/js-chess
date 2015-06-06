var _ = require('lodash');
var np = require('named-parameters');
var MoveDefinition = require('./../move_definition.js');
var Piece = require('./../piece.js');

function Rook(args){
  if(!(this instanceof Rook)){
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

  var moveDefinitions = [
    new MoveDefinition({
      name: 'left',
      directions: ['left']
    }),
    new MoveDefinition({
      name: 'right',
      directions: ['right']
    }),
    new MoveDefinition({
      name: 'up',
      directions: ['up']
    }),
    new MoveDefinition({
      name: 'down',
      directions: ['down']
    })
  ];

  this._piece = new Piece({
    id: id,
    rank: 'rook',
    army: army,
    moveCount: moveCount,
    moveDefinitions: moveDefinitions
  });
}

Rook.prototype = _.reduce( _.keys(Piece.prototype), function(result, key){
    result[key] = function() {
      return this._piece[key].apply(this._piece, arguments);
    };
    return result;
  }, {});

module.exports = Rook;
