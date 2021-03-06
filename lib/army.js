var _ = require('lodash');
var np = require('named-parameters');
var PieceConstructors = require('./piece_constructors.js');

function Army(args){
  var parsedArgs = np.parse(args).
    require('idGenerator', 'object').
    require('id', 'positive integer').
    require('forwardDirection', 'string').
    values();

  this._activePieces = [];
  this._takenPieces = [];
  this._king = null;

  this._idGenerator = parsedArgs.idGenerator;
  this._id = parsedArgs.id;
  this._forwardDirection = parsedArgs.forwardDirection;
}

Army.prototype.activePieces = function() {
  return this._activePieces;
};

Army.prototype.takenPieces = function() {
  return this._takenPieces;
};

Army.prototype.king = function() {
  return this._king;
};

Army.prototype.forwardDirection = function() {
  return this._forwardDirection;
};

Army.prototype.taken = function(args) {
  var parsedArgs = np.parse(args).
    require('piece', 'object').
    values();
  var piece = parsedArgs.piece;

  if(piece.army() !== this){
    throw(new Error("Piece not in this army"));
  }

  return _.contains(this._takenPieces, piece);
};

Army.prototype.inCheck = function(args) {
  var parsedArgs = np.parse(args).
    require('board', 'object').
    values();
  var board = parsedArgs.board;

  return board.pieceUnderAttack({ piece: this._king });
};

Army.prototype.createPiece = function(args) {
  var parsedArgs = np.parse(args).
    require('rank', 'string').
    require('moveCount', 'non-negative integer').
    values();
  var rank = parsedArgs.rank;
  var moveCount = parsedArgs.moveCount;

  var piece = this._Piece(rank)({ moveCount: moveCount });

  if(piece.isKing()) {
    //TODO: Throw if king already there?
    this._king = piece;
  }

  this._activePieces.push(piece);
  return piece;
};

Army.prototype.killPiece = function(args) {
  var parsedArgs = np.parse(args).
    require('piece', 'object').
    values();
  var piece = parsedArgs.piece;

  this._activePieces = _.without(this._activePieces, piece);
  this._takenPieces.push(piece);
};

Army.prototype._Piece = function(rank){
  if(!PieceConstructors.forRank(rank)){
    throw(new Error("this army doesn not countain a piece for rank '" + rank + "'"));
  }

  var army = this;
  var idGenerator = this._idGenerator;

  return function(args) {
    var parsedArgs = np.parse(args).
      require('moveCount', 'non-negative integer').
      values();

    var moveCount = parsedArgs.moveCount;

    var constructor = PieceConstructors.forRank(rank);

    var piece = new constructor({
      id: idGenerator.nextID(),
      army: army,
      moveCount: moveCount
    });

    return piece;
  };
};

module.exports = Army;
