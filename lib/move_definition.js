var _ = require('lodash');
var np = require('named-parameters');
var MovementIterator = require('./movement_iterator.js');
var Move = require('./move.js');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
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

  return {
    getMoves: getMoves
  };

  function getMoves(args) {
    var parsedArgs = np.parse(args).
      require('piece', 'object').
      require('board', 'object').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;

    var currentLocation = board.pieceLocation(piece);

    var movementIterator = new MovementIterator({
      location: currentLocation,
      bounds: board.bounds(),
      advanceFunction: advanceFunction,
      limit: moveLimit
    });

    var moves = [];

    while(movementIterator.inBounds()) {
      if (board.spaceUnoccupied({ location: movementIterator.location() })){
        moves.push(
          new Move({
            piece: piece,
            board: board,
            destination: movementIterator.location(),
            attacked: moveOnly
          })
        );
      } else if (!moveOnly && board.couldTake({ piece: piece, location: movementIterator.location() })){
        moves.push(
          new Move({
            piece: piece,
            board: board,
            destination: movementIterator.location(),
            attacked: true
          })
        );
      } else {
        break;
      }
      movementIterator.advanceLocation();
    }

    return moves;
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
