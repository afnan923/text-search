const buildItemIndex = require('./buildItemIndex');

const createIndexer = (field, displayField) => {
  const firstField = Array.isArray(field) ? field[0] : field;
  const display = typeof displayField !== 'string' ? firstField : displayField

  return (arr) => {
    return arr.reduce((hash, item) => {
      hash.set(item, buildItemIndex(item, field, display));

      return hash;
    }, new WeakMap());
  };
};

module.exports = createIndexer;
