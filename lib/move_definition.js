var _ = require('lodash');
var np = require('named-parameters');
var MovementIterator = require('./movement_iterator.js');
var Move = require('./move.js');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('name', 'string').
    require('directions', 'array').
    default('limit', Infinity).
    require('limit', 'positive integer').
    default('type', 'moveOrTake').
    require('type', 'string').
    default('vetoCondition', function(){}).
    require('vetoCondition').
    values();

  var name = parsedArgs.name;
  var moveLimit = parsedArgs.limit;
  var type = validateMoveType(parsedArgs.type);
  var vetoCondition = parsedArgs.vetoCondition;

  var advanceFunction = _.compose.apply(this,
    _.map(parsedArgs.directions, function(direction) {
      return directionAdvanceFunction(direction);
    })
  );

  return {
    name: function() { return name; },
    getMoves: getMoves
  };

  function getMoves(args) {
    var parsedArgs = np.parse(args).
      require('piece', 'object').
      require('board', 'object').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;

    var currentLocation = board.pieceLocation({ piece: piece });

    var movementIterator = new MovementIterator({
      location: currentLocation,
      bounds: board.bounds(),
      advanceFunction: advanceFunction,
      limit: moveLimit
    });

    var moves = [];

    while(movementIterator.inBounds()) {
      if (!takeOnly(type) && board.spaceUnoccupied({ location: movementIterator.location() })){
        if(!vetoCondition({
            piece: piece,
            location: currentLocation,
            destination: movementIterator.location()
        })) {
          moves.push(
            new Move({
              name: name,
              piece: piece,
              board: board,
              destination: movementIterator.location(),
              attacked: attacks(type)
            })
          );
        }
      } else if (!moveOnly(type) && board.couldTake({ piece: piece, location: movementIterator.location() })){
        if(!vetoCondition({
          piece: piece,
          location: currentLocation,
          destination: movementIterator.location()
        })) {
          moves.push(
            new Move({
              name: name,
              piece: piece,
              board: board,
              destination: movementIterator.location(),
              attacked: true
            })
          );
        }
      } else {
        break;
      }
      movementIterator.advanceLocation();
    }

    return moves;
  }

  function validateMoveType(type) {
    var validMoveTypes = [
      'moveOrTake',
      'moveOnly',
      'takeOnly'
    ];

    if(!_.include(validMoveTypes, type)) {
      throw(new Error('Unsupported moveType: ' + type));
    }
    return type;
  }

  function attacks(type) {
    return !moveOnly(type);
  }

  function takeOnly(type) {
    return type == 'takeOnly';
  }

  function moveOnly(type) {
    return type == 'moveOnly';
  }

  function directionAdvanceFunction(direction) {
    var func;

    if(direction == 'up') {
      func = function(currentLocation) {
        return {
          row: currentLocation.row - 1,
          col: currentLocation.col
        };
      };
    } else if (direction == 'down') {
      func = function(currentLocation) {
        return {
          row: currentLocation.row + 1,
          col: currentLocation.col
        };
      };

    } else if (direction == 'left') {
      func = function(currentLocation) {
        return {
          row: currentLocation.row,
          col: currentLocation.col - 1
        };
      };
    } else if (direction == 'right') {
      func = function(currentLocation) {
        return {
          row: currentLocation.row,
          col: currentLocation.col + 1
        };
      };
    } else {
      throw('unsupported direction');
    }

    return func;
  }
};
