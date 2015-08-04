var TwoDimensionalFixedArray = require('./two_dementional_fixed_array.js');
var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  parsedArgs = np.parse(args).
    require('army1', 'object').
    require('army2', 'object').
    require('id', 'positive integer').
    values();

  var id = parsedArgs.id;
  var rowCount = 8;
  var colCount = 8;

  var foundCondition = function(a, b){
    if(!a || !b){
      return false;
    } else {
      return a.id() === b.id();
    }
  };
  var spaces = new TwoDimensionalFixedArray.fromDimentions({
    rowCount: rowCount,
    colCount: colCount,
    findCondition: function(a, b){
      if(!a || !b){
        return false;
      } else {
        return a.id() === b.id();
      }
    }
  });
  var armies = [parsedArgs.army1, parsedArgs.army2];

  var instance = {
    id: function() { return id; },
    type: function() { return 'Board'; },
    jsChessSerialise: jsChessSerialise,
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
      require('from', 'object').
      require('to', 'object').
      values();

    var from = parsedArgs.from;
    var to = parsedArgs.to;

    var piece = spaces.remove({ location: from });
    var targetPiece = spaces.remove({ location: to });

    if(targetPiece) {
      registerTake(targetPiece);
    }

    spaces.set({
      item: piece,
      location: to
    });
  }

  function registerTake(piece) {
    piece.army().killPiece({ piece: piece });
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
      require('army', 'object').
      require('rank', 'string').
      default('moveCount', 0).
      require('moveCount', 'non-negative integer').
      require('location', 'object').
      values();

    var army = parsedArgs.army;
    var rank = parsedArgs.rank;
    var location = parsedArgs.location;
    var moveCount = parsedArgs.moveCount;

    if (!spaceUnoccupied({ location: location })) {
      throw('space taken');
    }

    var piece = army.createPiece({
      rank: rank,
      moveCount: moveCount
    });
    spaces.set({ item: piece, location: location });

    return piece;
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
      return parsedArgs.piece.army() !== targetPiece.army();
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
    var army = piece.army();

    return army.taken({ piece: piece });
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
      without(piece.army()).
      any(function (army) {
        return _.any(army.activePieces(), function(activePiece) {
          return _.any(activePiece.possibleMoves({ board: instance }), function(move) {
            return _.isEqual(move.destination(), location);
          });
        });
      });
  }

  function jsChessSerialise(repository) {
    var jsonSpaces = [];

    for(var row = 0; row < spaces.rowCount(); row++) {
      jsonSpaces[row] = [];
      for(var col = 0; col < spaces.colCount(); col++) {
        var item = spaces.get({ location: { row: row, col: col } });
        if(item) {
          jsonSpaces[row][col] = repository.add(item);
        }
      }
    }

    return {
      armies: _.map(armies, function(army) {
        return repository.add(army);
      }),
      spaces: jsonSpaces
    };
  }
};
