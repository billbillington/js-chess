var _ = require('lodash');
var np = require('named-parameters');
var MovementIterator = require('./movement_iterator.js');

module.exports = function(args) {
  parsedArgs = np.parse(args).
    require('directions', 'array').
    default('limit', Infinity).
    require('limit', 'positive integer').
    default('moveOnly', false).
    require('moveOnly', 'boolean').
    values();

  var moveLimit = parsedArgs.limit;
  var moveOnly = parsedArgs.moveOnly;

  var advanceFunction = _.compose.apply(this,
    _.map(parsedArgs.directions, function(direction) {
      return directionAdvanceFunction(direction);
    })
  );

  return function(args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;
    var currentLocation = board.location(piece);

    var attackedSquares;
    var moveSquares;

    var movementIterator = new MovementIterator({
      location: currentLocation,
      bounds: board.bounds(),
      advanceFunction: advanceFunction,
      limit: moveLimit
    });

    if(moveOnly){
      moveSquares = calculateMoveSquares(movementIterator);
    } else {
      attackedSquares = calculateAttackedSquares(movementIterator);
    }

    return {
      moveSquares: moveSquares || [],
      attackedSquares: attackedSquares || []
    };

    function calculateMoveSquares(movementIterator){
      var result = [];
      while(movementIterator.inBounds()) {
        if (board.canMoveIntoSpace({ piece: piece, location: movementIterator.location() })){
          result.push(movementIterator.location());
        } else {
          break;
        }
        movementIterator.advanceLocation();
      }
      return result;
    }

    function calculateAttackedSquares(movementIterator){
      var result = [];
      while(movementIterator.inBounds()) {
        if (board.canMoveIntoSpace({ piece: piece, location: movementIterator.location() })){
          result.push(movementIterator.location());
        } else if (board.couldTake({ piece: piece, location: movementIterator.location() })){
          result.push(movementIterator.location());
          break;
        } else {
          break;
        }
        movementIterator.advanceLocation();
      }
      return result;
    }
  };

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
