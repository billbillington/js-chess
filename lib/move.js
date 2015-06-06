var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('name', 'string').
    require('piece', 'object').
    require('board', 'object').
    require('destination', 'object').
    values();

  var name = parsedArgs.name;
  var piece = parsedArgs.piece;
  var board = parsedArgs.board;
  var originalLocation = board.pieceLocation({ piece: piece });
  var destination = parsedArgs.destination;

  return {
    name: function() { return name; },
    destination: function() { return destination; },
    perform: perform
  };

  function perform() {
    board.move({
      from: originalLocation,
      to: destination
    });

    piece.incMoveCount();
  }
};
