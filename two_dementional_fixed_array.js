var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('rowCount', 'non-negative integer').
    require('colCount', 'non-negative integer').
    values();

  var arr = [];
  var rowCount = parsedArgs.rowCount;
  var colCount = parsedArgs.colCount;

  return {
    set: set,
    get: get
  };

  function set(item, args) {
    var parsedArgs = np.parse(args).
      require('row', 'non-negative integer').
      require('col', 'non-negative integer').
      values();

    validateIndex(parsedArgs.row, parsedArgs.col);

    var row = parsedArgs.row;
    var col = parsedArgs.col;

    growArray(row, col);

    arr[row][col] = item;
  };

  function get(args) {
    var parsedArgs = np.parse(args).
      require('row', 'non-negative integer').
      require('col', 'non-negative integer').
      values();

    validateIndex(parsedArgs.row, parsedArgs.col);

    var row = parsedArgs.row;
    var col = parsedArgs.col;

    growArray(row, col);

    return arr[row][col];
  }

  function growArray(row, col){
    if (!_.isArray(arr[row])) {
      arr[row] = [];
    }
  }

  function validateIndex(row, col) {
    if (row >= rowCount) {
      throw('supplied row index out of bounds');
    }
    if (col >= colCount) {
      throw('supplied col index out of bounds');
    }
  };
};
