var _ = require('lodash');
var np = require('named-parameters');

var Pawn = require('./pieces/pawn.js');
var Bishop = require('./pieces/bishop.js');
var Knight = require('./pieces/knight.js');
var Rook = require('./pieces/rook.js');
var Queen = require('./pieces/queen.js');
var King = require('./pieces/king.js');
var Null = require('./pieces/null.js');

var Pieces = {
  pawn:   Pawn,
  bishop: Bishop,
  knight: Knight,
  rook:   Rook,
  queen:  Queen,
  king:   King,
  null:   Null
};

function forRank(rank){
  return Pieces[rank];
}

module.exports = {
  forRank: forRank
};
