var TwoDimensionalFixedArray = require('./two_dementional_fixed_array.js');
var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  parsedArgs = np.parse(args).
    require('army1', 'object').
    require('army2', 'object').
    values();

  var rowCount = 8;
  var colCount = 8;

  var spaces = new TwoDimensionalFixedArray({ rowCount: rowCount, colCount: colCount });
  var armies = [parsedArgs.army1, parsedArgs.army2];

  var instance = {
    rowCount: function() { return rowCount; },
    colCount: function() { return colCount; },
    bounds: bounds,
    addPiece: addPiece,
    move: move,
    get: get,
    couldTake: couldTake,
    spaceUnoccupied: spaceUnoccupied,
    activePieces: activePieces,
    king: king,
    pieceTaken: pieceTaken,
    pieceUnderAttack: pieceUnderAttack,
    pieceLocation: pieceLocation
  };

  return instance;

  function move(args) {
    var parsedArgs = np.parse(args).
      require('pieceLocation', 'object').
      require('destination', 'object').
      values();

    var pieceLocation = parsedArgs.pieceLocation;
    var destination = parsedArgs.destination;

    var piece = spaces.remove({ location: pieceLocation });
    var targetPiece = spaces.remove({ location: destination });

    if(targetPiece) {
      registerTake(targetPiece);
    }

    spaces.set({
      item: piece,
      location: destination
    });
  }

  function registerTake(piece) {
    piece.army.killPiece({ piece: piece });
  }

  function get(args) {
    var parsedArgs = np.parse(args).
      require('location', 'object').
      values();

    var location = parsedArgs.location;

    return spaces.get({
      location: location
    });
  }

  function addPiece(args) {
    var parsedArgs = np.parse(args).
      require('piece', 'object').
      require('location', 'object').
      values();

    var piece = parsedArgs.piece;
    var location = parsedArgs.location;

    if (spaceUnoccupied({ location: location })) {
      addToActivePieces(piece);
      spaces.set({ item: piece, location: location });
    } else {
      throw('space taken');
    }
  }

  function bounds() {
    return {
      minRow: 0,
      maxRow: colCount - 1,
      minCol: 0,
      maxCol: colCount - 1
    };
  }

  function couldTake(args) {
    var parsedArgs = np.parse(args).
      require('location', 'object').
      require('piece', 'object').
      values();

    var location = parsedArgs.location;

    var targetPiece = spaces.get({ location: location });

    if(targetPiece) {
      return parsedArgs.piece.army !== targetPiece.army;
    } else {
      return false;
    }
  }

  function spaceUnoccupied(args){
    var parsedArgs = np.parse(args).
      require('location', 'object').
      values();

    var location = parsedArgs.location;

    return spaces.get({ location: location }) === undefined;
  }

  function addToActivePieces(piece) {
    var army = piece.army;

    army.addPiece({ piece: piece });
  }

  function king(args) {
    var parsedArgs = np.parse(args).
      require('army', 'object').
      values();

    var army = parsedArgs.army;

    if(army.king()) {
      return army.king();
    } else {
      throw(new Error("Army has no king"));
    }
  }

  function pieceTaken(args) {
    var parsedArgs = np.parse(args).
      require('piece', 'object').
      values();

    var piece = parsedArgs.piece;

    return _.contains(
      piece.army.takenPieces(),
      piece
    );
  }

  function pieceLocation(args) {
    var parsedArgs = np.parse(args).
      require('piece', 'object').
      values();

    var piece = parsedArgs.piece;
    var result = spaces.find({ item: piece });

    if(!result){
      throw(new Error('piece not found'));
    }

    return result;
  }

  function activePieces(args) {
    var parsedArgs = np.parse(args).
      require('army', 'object').
      values();
    var army = parsedArgs.army;

    return army.activePieces();
  }

  function pieceUnderAttack(args) {
    var parsedArgs = np.parse(args).
      require('piece', 'object').
      values();

    var piece = parsedArgs.piece;
    var location = pieceLocation({ piece: piece });

    return _(armies).
      without(piece.army).
      any(function (army) {
        return _.any(army.activePieces(), function(activePiece) {
          return _.any(activePiece.possibleMoves({ board: instance }), function(move) {
            return _.isEqual(move.destination(), location);
          });
        });
      });
  }
};
