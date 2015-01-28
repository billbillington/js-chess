var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;

  var moveDefinitions= [
    new JSChess.MoveDefinition({ directions: ['left'] }),
    new JSChess.MoveDefinition({ directions: ['right'] }),
    new JSChess.MoveDefinition({ directions: ['up'] }),
    new JSChess.MoveDefinition({ directions: ['down'] }),
    new JSChess.MoveDefinition({ directions: ['left', 'up'] }),
    new JSChess.MoveDefinition({ directions: ['right', 'up'] }),
    new JSChess.MoveDefinition({ directions: ['left', 'down'] }),
    new JSChess.MoveDefinition({ directions: ['right', 'down'] })
  ];

  return new JSChess.Piece({
    name: 'queen',
    army: army,
    moveDefinitions: moveDefinitions
  });
};
