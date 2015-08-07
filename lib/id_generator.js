var _ = require('lodash');
var np = require('named-parameters');

var IDGenerator = function(args){
  var parsedArgs = np.parse(args).
    default('lastID', 0).
    require('lastID', 'non-negative integer').
    values();

  this._lastID = parsedArgs.lastID;

  if(parsedArgs.id) {
    this._id = parsedArgs.id;
  } else {
    this._id = this.nextID();
  }
};


IDGenerator.prototype.nextID = function() {
  this._lastID++;
  return this._lastID;
};

IDGenerator.prototype.id = function() {
  return this._id;
};

IDGenerator.prototype.type = function() {
  return 'IDGenerator';
};

IDGenerator.prototype.jsChessSerialise = function(repository) {
  return { lastID: this._lastID };
};

module.exports = IDGenerator;
