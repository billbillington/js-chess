var ChessArmy = require('../js-chess.js').ChessArmy;
var _ = require('lodash');

describe('ChessArmy', function() {
  describe('intialisation', function() {
    it('should not effect its pieces', function() {
      pieces = { king: function(){ return 'hiya'; }};
      classicArmy = new ChessArmy({ name: 'classic', pieces: pieces });
      pieces['king'] = function() { return 'byea'; };
      expect(classicArmy.Piece('king')()).toEqual('hiya');
    });
  });
});
