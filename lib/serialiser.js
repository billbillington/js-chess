var _ = require('lodash');
var np = require('named-parameters');
var Repository = require('./repository.js');

function serialise(graph){
  var repository = new Repository({ data: {} });
  var serialisedGraph = serialiseItem(graph, repository);
  return { graph: serialisedGraph, repository: repository.data() };
}

function serialiseItem(item, repository){
  var result;

  if(isPrimative(item)){
    result = serialisePrimative(item, repository);
  } else if(supportsSerialisation(item)){
    result = serialiseObjectReference(item, repository);
  } else {
    throw new Error('unsupported object type');
  }

  return result;
}

function isPrimative(item){
  return _.isUndefined(item) || _.isNull(item) || _.isArray(item) || _.isNumber(item) || _.isString(item);
}

function serialisePrimative(item, repository){
  if(_.isUndefined(item) || _.isNull(item)) {
    return null;
  } else if(_.isArray(item)) {
    return _.map(item, function(element) {
      if(isPrimative(element)){
        return serialisePrimative(element, repository);
      } else {
        return serialiseItem(element, repository);
      }
    });
  } else if(_.isNumber(item) || _.isString(item)) {
    return item;
  } else {
    throw new Error('not a primative');
  }
}

function supportsSerialisation(item){
  return _.isFunction(item.id) &&
    _.isFunction(item.type)    &&
    _.isFunction(item.jsChessSerialise);
}

function serialiseObjectReference(object, repository){
  var reference = repository.add(object);
  return reference;
}

module.exports = {
  serialise: serialise
};
