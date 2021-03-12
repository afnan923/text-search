const curry = require('ramda/src/curry');
const converge = require('ramda/src/converge');
const unapply = require('ramda/src/unapply');
const flatten = require('ramda/src/flatten');
const map = require('ramda/src/map');

const flattenArr = unapply(flatten);

const makeTokensForField = curry((field, obj) => {
  const v = obj[field];

  return (typeof v === 'string' ? v : '')
    .toLowerCase()
    .replace(/["']/g, '')
    .split(/[\W]+/)
    .filter(Boolean);
});

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
