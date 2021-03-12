const buildTokens = require('./buildTokens');

const createIndexer = (field) => (arr) => {
  return arr.reduce((hash, item) => {
    hash.set(item, buildTokens(field, item));

    return hash;
  }, new WeakMap());
};

module.exports = createIndexer;
