const tokenize = require('./tokenize');
const createIndexer = require('./createIndexer');

function comparator(ta, tb) {
  if (ta[0] === tb[0]) {
    return ta[1].compareWith(tb[1]);
  }

  return ta[0] > tb[0] ? 1 : -1;
}

function createSearch(field, displayField) {
  const indexer = createIndexer(field, displayField);

  return (arr) => {
    const indexHash = indexer(arr);

    return (query) => {
      const queryTokens = tokenize(query);

      const temp = [];

      for (let j = 0; j < arr.length; j++) {
        const item = arr[j];
        const itemIndex = indexHash.get(item);

        let found = true;
        let rel = Infinity;

        for (let i = 0; i < queryTokens.length; i++) {
          const qt = queryTokens[i];
          const tIndex = itemIndex.tokens.findIndex(token => {
            return token.indexOf(qt) === 0;
          });

          if (tIndex < 0) {
            found = false;
            break;
          }

          const pos = itemIndex.getPositionOf(qt);

          if (pos > -1) {
            rel = Math.min(pos, rel);
          }
        }

        if (found) {
          temp.push([rel, itemIndex, item]);
        }
      }

      temp.sort(comparator);

      return temp.map(tuple => tuple[2]);
    };
  };
}

module.exports = createSearch;
