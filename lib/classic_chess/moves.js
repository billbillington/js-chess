var Left = require('./moves/left.js');
var Right = require('./moves/right.js');
var Up = require('./moves/up.js');
var Down = require('./moves/down.js');
var DiagonalLeftUp = require('./moves/diagonal_left_up.js');
var DiagonalRightUp = require('./moves/diagonal_right_up.js');
var DiagonalLeftDown = require('./moves/diagonal_left_down.js');
var DiagonalRightDown = require('./moves/diagonal_right_down.js');

module.exports = {
  leftMove: new Left(),
  rightMove: new Right(),
  upMove: new Up(),
  downMove: new Down(),
  diagonalLeftUpMove: new DiagonalLeftUp(),
  diagonalRightUpMove: new DiagonalRightUp(),
  diagonalLeftDownMove: new DiagonalLeftDown(),
  diagonalRightDownMove: new DiagonalRightDown()
};
