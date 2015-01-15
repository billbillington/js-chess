var TwoDimensionalFixedArray = require('./two_dementional_fixed_array.js');
var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  parsedArgs = np.parse(args).
    require('army1').
    require('army2').
    require('setup').
    values();

  var spaces = new TwoDimensionalFixedArray({ rowCount: 64, colCount: 64 });
  var army1 = parsedArgs.army1;
  var army2 = parsedArgs.army2;
  var setup = parsedArgs.setup;

  setup.perform({ spaces: spaces, army1: army1, army2: army2 });

  return {};
};
