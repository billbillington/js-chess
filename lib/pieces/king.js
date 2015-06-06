var _ = require('lodash');
var np = require('named-parameters');
var MoveDefinition = require('./../move_definition.js');
var Piece = require('./../piece.js');

function King(args) {
  if(!(this instanceof King)){
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
      directions: ['left'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'right',
      directions: ['right'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'up',
      directions: ['up'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'down',
      directions: ['down'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'left up',
      directions: ['left', 'up'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'right up',
      directions: ['right', 'up'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'left down',
      directions: ['left', 'down'],
      limit: 1
    }),
    new MoveDefinition({
      name: 'right down',
      directions: ['right', 'down'],
      limit: 1
    })
  ];

  this._piece = new Piece({
    id: id,
    rank: 'king',
    army: army,
    isKing: true,
    moveCount: moveCount,
    moveDefinitions: moveDefinitions
  });
}

King.prototype = _.reduce( _.keys(Piece.prototype), function(result, key){
    result[key] = function() {
      return this._piece[key].apply(this._piece, arguments);
    };
    return result;
  }, {});

module.exports = King;
