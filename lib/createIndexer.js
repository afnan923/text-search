const curry = require('ramda/src/curry');
const converge = require('ramda/src/converge');
const unapply = require('ramda/src/unapply');
const flatten = require('ramda/src/flatten');
const map = require('ramda/src/map');
const tokenize = require('./tokenize');

const flattenArr = unapply(flatten);

const makeTokensForField = (field) => (obj) => tokenize(obj[field]);

function getMapper(field) {
  if (Array.isArray(field)) {
    return converge(flattenArr, map(makeTokensForField, field));
  }

  return makeTokensForField(field);
}

/**
 * @param {String|Array<String>} field of the object to index
 * @param {Array<Object>} arr
 */
function createIndexer(field, arr) {
  return map(getMapper(field), arr);
}

module.exports = curry(createIndexer);
