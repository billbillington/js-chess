var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('piece', 'object').
    require('board', 'object').
    require('destination', 'object').
    require('attacked', 'boolean').
    values();

  var piece = parsedArgs.piece;
  var board = parsedArgs.board;
  var destination = parsedArgs.destination;
  var attacked = parsedArgs.attacked;

  return {
    destination: function() { return destination; },
    perform: perform
  };

  function perform() {
    board.move({
      pieceLocation: board.pieceLocation({ piece: piece }),
      destination: destination
    });
  }
};
