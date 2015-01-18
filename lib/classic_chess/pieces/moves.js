var _ = require('lodash');
var np = require('named-parameters');

module.exports = function() {

  return {
    leftMove: leftMove,
    rightMove: rightMove,
    upMove: upMove,
    downMove: downMove,
    diagonalLeftUpMove: diagonalLeftUpMove,
    diagonalRightUpMove: diagonalRightUpMove,
    diagonalLeftDownMove: diagonalLeftDownMove,
    diagonalRightDownMove: diagonalRightDownMove
  };


  function leftMove(args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('currentLocation').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;
    var currentLocation = parsedArgs.currentLocation;

    var attackedSquares = [];
    var row = currentLocation.row;

    for(col = currentLocation.col - 1; col >= 0; col--){
      if (board.spaceUnoccupied(row, col)){
        attackedSquares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: piece, row: row, col: col })){
        attackedSquares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }

    return {
      moveSquares: [],
      attackedSquares: attackedSquares
    };
  }

  function rightMove(args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('currentLocation').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;
    var currentLocation = parsedArgs.currentLocation;

    var attackedSquares = [];
    var row = currentLocation.row;

    for(col = currentLocation.col + 1; col < board.colCount; col++){
      if (board.spaceUnoccupied(row, col)){
        attackedSquares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: piece, row: row, col: col })){
        attackedSquares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }

    return {
      moveSquares: [],
      attackedSquares: attackedSquares
    };
  }

  function upMove(args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('currentLocation').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;

    var currentLocation = parsedArgs.currentLocation;
    var attackedSquares = [];
    var col = currentLocation.col;

    for(row = currentLocation.row - 1; row >= 0; row--){
      if (board.spaceUnoccupied(row, col)){
        attackedSquares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: piece, row: row, col: col })){
        attackedSquares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }

    return {
      moveSquares: [],
      attackedSquares: attackedSquares
    };
  }

  function downMove(args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('currentLocation').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;
    var currentLocation = parsedArgs.currentLocation;

    var attackedSquares = [];
    var col = currentLocation.col;

    for(row = currentLocation.row + 1; row < board.rowCount; row++){
      if (board.spaceUnoccupied(row, col)){
        attackedSquares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: piece, row: row, col: col })){
        attackedSquares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
    }

    return {
      moveSquares: [],
      attackedSquares: attackedSquares
    };
  }

  function diagonalLeftUpMove(args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('currentLocation').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;
    var currentLocation = parsedArgs.currentLocation;
    var attackedSquares = [];

    var row = currentLocation.row - 1;
    var col = currentLocation.col - 1;
    while(row >= 0 && col >= 0) {
      if (board.spaceUnoccupied(row, col)){
        attackedSquares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: piece, row: row, col: col })){
        attackedSquares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
      row--;
      col--;
    }

    return {
      moveSquares: [],
      attackedSquares: attackedSquares
    };
  }

  function diagonalRightUpMove(args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('currentLocation').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;
    var currentLocation = parsedArgs.currentLocation;
    var attackedSquares = [];

    var row = currentLocation.row - 1;
    var col = currentLocation.col + 1;
    while(row >= 0 && col < board.colCount) {
      if (board.spaceUnoccupied(row, col)){
        attackedSquares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: piece, row: row, col: col })){
        attackedSquares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
      row--;
      col++;
    }

    return {
      moveSquares: [],
      attackedSquares: attackedSquares
    };
  }

  function diagonalLeftDownMove(args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('currentLocation').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;
    var currentLocation = parsedArgs.currentLocation;
    var attackedSquares = [];

    var row = currentLocation.row + 1;
    var col = currentLocation.col - 1;
    while(row < board.rowCount && col >= 0) {
      if (board.spaceUnoccupied(row, col)){
        attackedSquares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: piece, row: row, col: col })){
        attackedSquares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
      row++;
      col--;
    }

    return {
      moveSquares: [],
      attackedSquares: attackedSquares
    };
  }

  function diagonalRightDownMove(args) {
    var parsedArgs = np.parse(args).
      require('piece').
      require('currentLocation').
      require('board').
      values();

    var board = parsedArgs.board;
    var piece = parsedArgs.piece;
    var currentLocation = parsedArgs.currentLocation;
    var attackedSquares = [];

    var row = currentLocation.row + 1;
    var col = currentLocation.col + 1;
    while(row < board.rowCount && col < board.colCount) {
      if (board.spaceUnoccupied(row, col)){
        attackedSquares.push({ row: row, col: col });
      } else if (board.couldTake({ piece: piece, row: row, col: col })){
        attackedSquares.push({ row: row, col: col });
        break;
      } else {
        break;
      }
      row++;
      col++;
    }

    return {
      moveSquares: [],
      attackedSquares: attackedSquares
    };
  }

}();
