var _ = require('lodash');
var np = require('named-parameters');
var Pawn = require('./pieces/pawn.js');
var Bishop = require('./pieces/bishop.js');
var Knight = require('./pieces/knight.js');
var Rook = require('./pieces/rook.js');
var Queen = require('./pieces/queen.js');
var King = require('./pieces/king.js');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('idGenerator', 'object').
    require('forwardDirection', 'string').
    values();

  var activePieces = [];
  var takenPieces = [];
  var king = null;

  var idGenerator = parsedArgs.idGenerator;
  var forwardDirection = parsedArgs.forwardDirection;
  var Pieces = {
    pawn:   Pawn,
    bishop: Bishop,
    knight: Knight,
    rook:   Rook,
    queen:  Queen,
    king:   King
  };

  var instance = {
    activePieces: function() { return activePieces; },
    takenPieces: function() { return takenPieces; },
    killPiece: killPiece,
    king: function() { return king; },
    forwardDirection: forwardDirection,
    createPiece: createPiece,
  };

  return instance;

  function createPiece(args) {
    var parsedArgs = np.parse(args).
      require('rank', 'string').
      values();
    var rank = parsedArgs.rank;

    var piece = new Piece(rank)();

    if(piece.isKing()) {
      //TODO: Throw if king already there?
      king = piece;
    }

    activePieces.push(piece);
    return piece;
  }

  function killPiece(args){
    var parsedArgs = np.parse(args).
      require('piece', 'object').
      values();
    var piece = parsedArgs.piece;

    activePieces = _.without(activePieces, piece);
    takenPieces.push(piece);
  }

  function Piece(rank){
    if(!Pieces[rank]){
      throw(new Error("this army doesn not countain a piece for rank '" + rank + "'"));
    }
    return function() {
      return Pieces[rank]({ id: idGenerator.nextID(), army: instance });
    };
  }
};
