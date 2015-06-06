var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  parsedArgs = np.parse(args).
    require('board', 'object').
    require('army1', 'object').
    require('army2', 'object').
    default('showIDs', false).
    require('showIDs', 'boolean').
    values();

  var board = parsedArgs.board;
  var army1 = parsedArgs.army1;
  var army2 = parsedArgs.army2;
  var showIDs = parsedArgs.showIDs;

  return { print: print };

  function print() {
    console.log();

    var letterLine = '     ';
    for(col = 0; col < 8; col++){
      letterLine = letterLine + '  ' + col.toString() + '   ';
    }
    console.log(letterLine);

    console.log('     -----------------------------------------------');

    for(row = 0; row < 8; row++) {
      var line = '  ' + row.toString() + ' |';
      for(col = 0; col < 8; col++) {
        var piece = board.get({ location: { row: row, col: col } });
        if(!piece) {
          line = line + emptySquare(row, col);
        } else {
          line = line + pieceSquare(piece);
        }
      }
      console.log(line);
    }
    console.log();
  }

  function pieceSquare(piece) {
    var result = '';

    if(piece.army == army1) {
      result =  result + ' [';
    } else {
      result = result + ' <';
    }

    result = result + pieceCharCode(piece);

    if(piece.army == army1) {
      result =  result + '] ';
    } else {
      result = result + '> ';
    }

    return result;
  }

  function pieceCharCode(piece) {
    var result = '';

    if (!showIDs) {
      var splitName = piece.rank.split(' ');

      if(splitName.length === 1) {
        result = result + splitName[0][0].toUpperCase();
        result = result + splitName[0][splitName[0].length - 1];
      } else {
        result = result + splitName[0][0].toUpperCase();
        result = result + splitName[1][0].toUpperCase();
      }
    } else {
      result = piece.id.toString();

      if(result.length === 1) {
        result = '0' + result;
      }
    }

    return result;
  }

  function emptySquare(row, col){
    var squareColor;
    if((row % 2) === 0) {
      if((col % 2) === 0) {
        squareColor = 'white';
      } else {
        squareColor = 'black';
      }
    } else {
      if((col % 2) === 0) {
        squareColor = 'black';
      } else {
        squareColor = 'white';
      }
    }

    if (squareColor == 'black'){
      return ' :::: ';
    } else {
      return '      ';
    }
  }
};
