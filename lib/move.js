var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('name', 'string').
    require('piece', 'object').
    require('board', 'object').
    require('destination', 'object').
    require('attacked', 'boolean').
    values();

  var name = parsedArgs.name;
  var piece = parsedArgs.piece;
  var board = parsedArgs.board;
  var destination = parsedArgs.destination;
  var attacked = parsedArgs.attacked;

  return {
    name: function() { return name; },
    destination: function() { return destination; },
    perform: perform
  };

  function perform() {
    board.move({
      pieceLocation: board.pieceLocation({ piece: piece }),
      destination: destination
    });

    piece.moveCount++;
  }
};
