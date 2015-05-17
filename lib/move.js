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
  var destination = parsedArgs.destination;
  var attacked = !!attackedPiece;

  return {
    name: function() { return name; },
    destination: function() { return destination; },
    perform: perform
  };

  function perform() {
    board.move({
      from: board.pieceLocation({ piece: piece }),
      to: destination
    });

    piece.moveCount++;
  }
};
