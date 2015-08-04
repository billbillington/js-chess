var _ = require('lodash');
var np = require('named-parameters');

function Repository(args){
  var parsedArgs = np.parse(args).
    require('data', 'object').
    values();

  this._data = parsedArgs.data;
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

module.exports = Repository;
