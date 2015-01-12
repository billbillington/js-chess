var _ = require('lodash');
var np = require('named-parameters');
var ChessArmy =  require('./chess_army.js');

module.exports = function() {
  return new ChessArmy({
    name: 'classic',
    pieces: {
      pawn:   function() { return 'classic pawn';   },
      bishop: function() { return 'clasic bishop';  },
      knight: function() { return 'classic knight'; },
      rook:   function() { return 'classic rook';   },
      queen:  function() { return 'classic queen';  },
      king:   function() { return 'classic king';   }
    }
  });
};
