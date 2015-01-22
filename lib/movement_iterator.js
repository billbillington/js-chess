var _ = require('lodash');
var np = require('named-parameters');

module.exports = function(args) {
  var parsedArgs = np.parse(args).
    require('location', 'object').
    require('bounds', 'object').
    require('advanceFunction').
    default('limit', Infinity).
    require('limit', 'positive integer').
    values();

  var bounds = parsedArgs.bounds;
  var startLocation = parsedArgs.location;
  var advanceFunction = parsedArgs.advanceFunction;
  var limit = parsedArgs.limit;

  var currentLocation = _.clone(startLocation);

  var iterations = 0;

  advanceLocation();

  return {
    inBounds: inBounds,
    advanceLocation: advanceLocation,
    location: location
  };

  function location() {
    return currentLocation;
  }

  function advanceLocation(){
    currentLocation = advanceFunction(currentLocation);
    iterations++;
  }

  function inBounds(){
    return (
      iterations <= limit &&
      currentLocation.row >= bounds.minRow &&
      currentLocation.row <= bounds.maxRow &&
      currentLocation.col >= bounds.minCol &&
      currentLocation.col <= bounds.maxCol
    );
  }
};
