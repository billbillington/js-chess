var TwoDimensionalFixedArray = require('./two_dementional_fixed_array.js');
var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  parsedArgs = np.parse(args).
    require('army1').
    require('army2').
    values();

  var spaces = new TwoDimensionalFixedArray({ rowCount: 64, colCount: 64 });
  var army1 = parsedArgs.army1;
  var army2 = parsedArgs.army2;

  return {};
};
