var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('rowCount', 'non-negative integer').
    require('colCount', 'non-negative integer').
    values();

  var rowCount = parsedArgs.rowCount;
  var colCount = parsedArgs.colCount;
  var arr = initArray(rowCount);

  return {
    set: set,
    get: get,
    find: find
  };

  function set(args) {
    var parsedArgs = np.parse(args).
      require('item').
      require('row', 'non-negative integer').
      require('col', 'non-negative integer').
      values();

    validateIndex(parsedArgs.row, parsedArgs.col);

    var item = parsedArgs.item;
    var row = parsedArgs.row;
    var col = parsedArgs.col;

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

    return arr[row][col];
  }

  function initArray(rows){
    var arr = [];
    for(row = 0; row < rows; row++) {
      arr[row] = [];
    }
    return arr;
  }

  function validateIndex(row, col) {
    if (row >= rowCount) {
      throw('supplied row index (' + row + ') out of bounds');
    }
    if (col >= colCount) {
      throw('supplied col index (' + col + ') out of bounds');
    }
  }

  function find(item) {
    foundRow = -1;
    foundCol = -1;

    for (row = 0; row < rowCount; row++) {
      for (col = 0; col < colCount; col++) {
        if(arr[row][col] === item) {
          foundRow = row;
          foundCol = col;
          break;
        }
      }
    }

    if (foundRow >= 0) {
      return {
        row: foundRow,
        col: foundCol
      };
    }
  }
};
