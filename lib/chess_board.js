var TwoDimensionalFixedArray = require('./two_dementional_fixed_array.js');
var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  parsed_args = np.parse(args).
    require('army1').
    require('army2').
    values();

  var spaces = new TwoDimensionalFixedArray({ rowCount: 64, colCount: 64 });
  var army1 = parsed_args.army1;
  var army2 = parsed_args.army2;

  return {};
};
