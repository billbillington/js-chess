var _ = require('lodash');
var np = require('named-parameters');
var JSChess = require('../../../js-chess.js');

module.exports = function(args) {
  var army = np.parse(args).require('army').values().army;
  return new JSChess.Piece({
    name: 'classic king',
    army: army
  });
};
