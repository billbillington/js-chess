var _ = require('lodash');
var np = require('named-parameters');
var Repository = require('./repository.js');

function serialise(graph){
  var repository = new Repository({ data: {} });
  var serialisedGraph = serialiseItem(graph, repository);
  return { graph: serialisedGraph, repository: repository.data() };
}

function deserialise(json){
  var item = json.graph;
  var repository = new Repository({ data: json.repository });
  return deserialiseItem(item, repository);
}

function deserialiseItem(item, repository){
  if(isPrimative(item)){
    result = deserialisePrimative(item, repository);
  } else if(isReference(item)){
    result = repository.dereference(item);
  } else {
    throw new Error('unsupported object type');
  }

  return result;
}

function isReference(item) {
  return item.id && item.type;
}

function serialiseItem(item, repository){
  var result;

  if(isPrimative(item)){
    result = serialisePrimative(item, repository);
  } else if(supportsSerialisation(item)){
    result = repository.add(item);
  } else {
    throw new Error('unsupported object type');
  }

  return result;
}

function isPrimative(item){
  return _.isUndefined(item) || _.isNull(item) || _.isArray(item) || _.isNumber(item) || _.isString(item);
}

function deserialisePrimative(item, repository){
  if(_.isUndefined(item) || _.isNull(item)) {
    return null;
  } else if(_.isArray(item)) {
    return _.map(item, function(element) {
      if(isPrimative(element)){
        return serialisePrimative(element, repository);
      } else {
        return deserialiseItem(element, repository);
      }
    });
  } else if(_.isNumber(item) || _.isString(item)) {
    return item;
  } else {
    throw new Error('not a primative');
  }
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
  return _.isFunction(item.jsChessSerialise);
}

module.exports = {
  serialise: serialise,
  deserialise: deserialise
};
