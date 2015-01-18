var Left = require('./moves/left.js');
var Right = require('./moves/right.js');
var Up = require('./moves/up.js');
var Down = require('./moves/down.js');
var DiagonalLeftUp = require('./moves/diagonal_left_up.js');
var DiagonalRightUp = require('./moves/diagonal_right_up.js');
var DiagonalLeftDown = require('./moves/diagonal_left_down.js');
var DiagonalRightDown = require('./moves/diagonal_right_down.js');

module.exports = {
  Left: Left,
  Right: Right,
  Up: Up,
  Down: Down,
  DiagonalLeftUp: DiagonalLeftUp,
  DiagonalRightUp: DiagonalRightUp,
  DiagonalLeftDown: DiagonalLeftDown,
  DiagonalRightDown: DiagonalRightDown
};
