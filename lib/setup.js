var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  parsedArgs = np.parse(args).
    require('Board').
    require('Armies', 'array').
    require('initializeFunction').
    require('performFunction').
    values();

  var Board = parsedArgs.Board;
  var Armies = parsedArgs.Armies;
  var initializeFunction = parsedArgs.initializeFunction;
  var performFunction = parsedArgs.performFunction;

  var initialized = initializeFunction(Board, Armies);

  var board = initialized.board;
  var armies = initialized.armies;

  return {
    perform: perform
  };

  function perform() {
    return performFunction(board, armies);
  }
};
