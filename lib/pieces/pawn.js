var _ = require('lodash');
var np = require('named-parameters');
var MoveDefinition = require('./../move_definition.js');
var Piece = require('./../piece.js');

function Pawn(args) {
  if(!(this instanceof Pawn)){
    throw new Error('Constructor called without new keyword');
  }

  var parsedArgs = np.parse(args).
      require('id', 'positive integer').
      require('moveCount', 'non-negative integer').
      require('army', 'object').
      values();

  var id = parsedArgs.id;
  var army = parsedArgs.army;
  var moveCount = parsedArgs.moveCount;

  var forwardDirection = army.forwardDirection();

  var moveDefinitions = [
    new MoveDefinition({
      name: 'forward right attack',
      directions: [forwardDirection, 'right'],
      limit: 1,
      type: 'takeOnly'
    }),
    new MoveDefinition({
      name: 'forward',
      directions: [forwardDirection],
      limit: 2,
      type: 'moveOnly',
      vetoCondition: function(context) {
        if(doubleMove()) {
          return context.piece.moveCount() !== 0;
        }

        function doubleMove(){
          return Math.abs(context.location.row - context.destination.row) === 2;
        }
      }
    }),
    new MoveDefinition({
      name: 'forward left attack',
      directions: [forwardDirection, 'left'],
      limit: 1,
      type: 'takeOnly'
    })
  ];

  this._piece = new Piece({
    id: id,
    rank: 'pawn',
    army: army,
    moveCount: moveCount,
    moveDefinitions: moveDefinitions
  });
}

Pawn.prototype = _.reduce( _.keys(Piece.prototype), function(result, key){
    result[key] = function() {
      return this._piece[key].apply(this._piece, arguments);
    };
    return result;
  }, {});

module.exports = Pawn;
