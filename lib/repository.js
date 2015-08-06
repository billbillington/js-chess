var _ = require('lodash');
var np = require('named-parameters');
var Piece = require('./piece.js');
var Game = require('./game.js');
var Board = require('./board.js');
var Army = require('./army.js');
var IDGenerator = require('./id_generator.js');

function Repository(args){
  var parsedArgs = np.parse(args).
    require('data', 'object').
    values();

  this._data = parsedArgs.data;
  this._objects = {};
}

Repository.prototype.data = function() {
  return this._data;
};

Repository.prototype.add = function(item) {
  type = item.type();
  id = item.id();

  this._data[type] = this._data[type] || {};
  if(!this._data[type][id]) {
    this._data[type][id] = 'pending';
    this._data[type][id] = item.jsChessSerialise(this);
  }

  return {
    id: item.id(),
    type: item.type()
  };
};

Repository.prototype.dataFor = function(reference){
  return this._data[reference.type][reference.id];
};

Repository.prototype._objectFor = function(reference){
  this._objects[reference.type] = this._objects[reference.type] || {};
  return this._objects[reference.type][reference.id];
};

Repository.prototype.dereference = function(reference){
  if(!this._objectFor(reference)){
    this._objects[reference.type][reference.id] = getType(reference.type).jsChessDeserialise(this.dataFor(reference), this);
  }
  return this._objectFor(reference);
};

function getType(type){
  result = {
    'Board': Board,
    'IDGenerator': IDGenerator,
    'Piece': Piece,
    'Army': Army,
    'Game': Game
  }[type];

  if(!result) {
    throw new Error('unsupported type');
  }

  return result;
}

module.exports = Repository;
