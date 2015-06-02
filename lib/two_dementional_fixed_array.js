var _ = require('lodash');
var np = require('named-parameters');


module.exports.fromArray = fromArray;
module.exports.fromDimentions = fromDimentions;

function fromDimentions(args) {
  var parsedArgs = np.parse(args).
    require('rowCount', 'non-negative integer').
    require('colCount', 'non-negative integer').
    values();

  var rowCount = parsedArgs.rowCount;
  var colCount = parsedArgs.colCount;
  var array = initArray(rowCount, colCount);

  function initArray(rows, cols){
    var result = [];
    for(row = 0; row < rows; row++) {
      result[row] = [];
    }
    return result;
  }

  return new fromArray({
    rowCount: rowCount,
    colCount: colCount,
    data: array
  });
}

function fromArray(args) {
  var parsedArgs = np.parse(args).
    require('rowCount', 'non-negative integer').
    require('colCount', 'non-negative integer').
    require('data', 'array').
    values();

  var rowCount = parsedArgs.rowCount;
  var colCount = parsedArgs.colCount;

  var data = normaliseData(parsedArgs.data);

  return {
    set: set,
    remove: remove,
    rowCount: function() { return rowCount; },
    colCount: function() { return colCount; },
    get: get,
    find: find
  };

  function normaliseData(data){
    result = [];
    for(row = 0; row < rowCount; row++){
      var resultRow = [];
      var dataRow = data[row] || [];
      if( !_.isArray(dataRow) ) {
        throw new Error('Must supply a multi dimentional array');
      }

      for(col = 0; col < colCount; col++){
        if(dataRow[col]){
          resultRow[col] = dataRow[col];
        }
      }
      result[row] = resultRow;
    }
    return result;
  }

  function remove(args){
    var parsedArgs = np.parse(args).
      require('location', 'object').
      values();

    var row = parsedArgs.location.row;
    var col = parsedArgs.location.col;

    var item = data[row][col];

    data[row][col] = undefined;

    return item;
  }

  function set(args) {
    var parsedArgs = np.parse(args).
      require('item').
      require('location', 'object').
      values();

    var item = parsedArgs.item;
    var row = parsedArgs.location.row;
    var col = parsedArgs.location.col;

    validateIndex(row, col);

    data[row][col] = item;
  }

  function get(args) {
    var parsedArgs = np.parse(args).
      require('location', 'object').
      values();

    var row = parsedArgs.location.row;
    var col = parsedArgs.location.col;

    validateIndex(row, col);

    return data[row][col];
  }

  function validateIndex(row, col) {
    if (row < 0 || row >= rowCount) {
      throw('supplied row index (' + row + ') out of bounds');
    }
    if (col < 0 || col >= colCount) {
      throw('supplied col index (' + col + ') out of bounds');
    }
  }

  function find(args) {
    var parsedArgs = np.parse(args).
      require('item').
      values();

    var item = parsedArgs.item;

    var foundRow = -1;
    var foundCol = -1;

    for (row = 0; row < rowCount; row++) {
      for (col = 0; col < colCount; col++) {
        if(data[row][col] === item) {
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
}
