module.exports = function(){
  var lastID = 0;

  return {
    nextID: nextID
  };

  function nextID(){
    lastID++;
    return lastID;
  }
};
