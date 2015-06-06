var _ = require('lodash');
var np = require('named-parameters');
var PieceConstructors = require('./piece_constructors.js');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('idGenerator', 'object').
    require('id', 'positive integer').
    require('forwardDirection', 'string').
    values();

  var activePieces = [];
  var takenPieces = [];
  var king = null;

  var idGenerator = parsedArgs.idGenerator;
  var id = parsedArgs.id;
  var forwardDirection = parsedArgs.forwardDirection;

  var instance = {
    activePieces: function() { return activePieces; },
    takenPieces: function() { return takenPieces; },
    killPiece: killPiece,
    taken: taken,
    inCheck: inCheck,
    king: function() { return king; },
    forwardDirection: forwardDirection,
    createPiece: createPiece,
  };

  return instance;

  function taken(args) {
    var parsedArgs = np.parse(args).
      require('piece', 'object').
      values();
    var piece = parsedArgs.piece;

    if(piece.army !== instance){
      throw(new Error("Piece not in this army"));
    }

    return _.contains(takenPieces, piece);
  }

  function inCheck(args) {
    var parsedArgs = np.parse(args).
      require('board', 'object').
      values();
    var board = parsedArgs.board;

    return board.pieceUnderAttack({ piece: king });
  }

  function createPiece(args) {
    var parsedArgs = np.parse(args).
      require('rank', 'string').
      require('moveCount', 'non-negative integer').
      values();
    var rank = parsedArgs.rank;
    var moveCount = parsedArgs.moveCount;

    var piece = new Piece(rank)({ moveCount: moveCount });

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
    if(!PieceConstructors.forRank(rank)){
      throw(new Error("this army doesn not countain a piece for rank '" + rank + "'"));
    }
    return function(args) {
      var parsedArgs = np.parse(args).
        require('moveCount', 'non-negative integer').
        values();

      var moveCount = parsedArgs.moveCount;

      return new PieceConstructors.forRank(rank)({
        id: idGenerator.nextID(),
        army: instance,
        moveCount: moveCount
      });
    };
  }
};
