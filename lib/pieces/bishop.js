var _ = require('lodash');
var np = require('named-parameters');
var MoveDefinition = require('./../move_definition.js');
var Piece = require('./../piece.js');

function Bishop(args) {
  if(!(this instanceof Bishop)){
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
      name: 'diagonal left up',
      directions: ['left', 'up'] }
    ),
    new MoveDefinition({
      name: 'diagonal right up',
      directions: ['right', 'up']
    }),
    new MoveDefinition({
      name: 'diagonal left down',
      directions: ['left', 'down']
    }),
    new MoveDefinition({
      name: 'diagonal right down',
      directions: ['right', 'down']
    })
  ];

  this._piece = new Piece({
    id: id,
    rank: 'bishop',
    army: army,
    moveCount: moveCount,
    moveDefinitions: moveDefinitions
  });
}

Bishop.prototype = _.reduce( _.keys(Piece.prototype), function(result, key){
    result[key] = function() {
      return this._piece[key].apply(this._piece, arguments);
    };
    return result;
  }, {});

module.exports = Bishop;
