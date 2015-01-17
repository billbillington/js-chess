var Army = require('../js-chess.js').Army;
var _ = require('lodash');

describe('Army', function() {
  describe('intialisation', function() {
    it('should not effect its pieces', function() {
      pieces = { king: function(){ return 'hiya'; }};
      classicArmy = new Army({ name: 'classic', pieces: pieces });
      pieces['king'] = function() { return 'byea'; };
      expect(classicArmy.Piece('king')()).toEqual('hiya');
    });
  });
});
