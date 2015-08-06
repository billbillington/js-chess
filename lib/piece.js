var _ = require('lodash');
var np = require('named-parameters');

function NewPiece(args){
  var parsedArgs = np.parse(args).
    require('id', 'positive integer').
    require('army').
    require('rank').
    require('moveDefinitions', 'array').
    require('moveCount', 'non-negative integer').
    default('isKing', false).
    require('isKing', 'boolean').
    values();

  this._id = parsedArgs.id;
  this._army = parsedArgs.army;
  this._rank = parsedArgs.rank;
  this._moveDefinitions = parsedArgs.moveDefinitions;
  this._isKing = parsedArgs.isKing;
  this._moveCount = parsedArgs.moveCount;
}

NewPiece.prototype.id = function(){
  return this._id;
};

NewPiece.prototype.type = function() {
  return 'Piece';
};

NewPiece.prototype.army = function(){
  return this._army;
};

NewPiece.prototype.rank = function() {
 return this._rank;
};

NewPiece.prototype.moveCount = function() {
 return this._moveCount;
};

NewPiece.prototype.incMoveCount = function(){
  this._moveCount++;
};

NewPiece.prototype.isKing = function() {
 return this._isKing;
};

NewPiece.prototype.moveCount = function(){
  return this._moveCount;
};

NewPiece.prototype.moveTo = function(args) {
  var parsedArgs = np.parse(args).
    require('location', 'object').
    require('board', 'object').
    values();

  var board = parsedArgs.board;
  var location = parsedArgs.location;

  var move = _.find(this.possibleMoves({ board: board }), function(move) {
    return move.destination().row == location.row &&
      move.destination().col == location.col;
  });

  if(move) {
    move.perform();
  } else  {
   throw(new Error("Attempt to move to invalid location: " + JSON.stringify(location)));
  }
};

NewPiece.prototype.possibleMoves = function(args){
  var parsedArgs = np.parse(args).
    require('board', 'object').
    values();

  var instance = this;

  var board = parsedArgs.board;

  var moves = [];
  _.each(this._moveDefinitions, function(definition) {
    _.each(definition.getMoves({
      piece: instance,
      board: board
    }), function(move) {
      moves.push(move);
    });
  });

  return moves;
};

NewPiece.prototype.jsChessSerialise = function(repository) {
  return {
    id: this._id,
    army: repository.add(this._army),
    rank: this._rank,
    isKing: this._isKing,
    moveCount: this._moveCount
  };
};

NewPiece.jsChessDeserialise = function(json, repository) {
  return new NewPiece({
    id: json.id,
    rank: json.rank,
    isKing: json.isKing,
    army: repository.dereference(json.army)
  });
};

module.exports = NewPiece;
