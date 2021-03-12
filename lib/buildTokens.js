const tokenize = require('./tokenize');

function buildTokens(field, item) {
  if (Array.isArray(field)) {
    return field.reduce((acc, f) => [...acc, ...tokenize(item[f])], []);
  }

  return tokenize(item[field]);
}

module.exports = buildTokens;
