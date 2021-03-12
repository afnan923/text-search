const assert = require('assert');
const createIndexer = require('../lib/createIndexer');
const fixture = require('./fixture.json');

describe('createIndexer', () => {
  it('should return a WeakMap', () => {
    const indexer = createIndexer('title');
    const index = indexer(fixture);

    assert.deepStrictEqual(index.constructor, WeakMap);

    assert.deepStrictEqual(
      index.get(fixture[0]),
      ['star', 'wars', 'episode', 'iv', 'a', 'new', 'hope']
    );
    assert.deepStrictEqual(
      index.get(fixture[1]),
      ['star', 'wars', 'episode', 'v', 'the', 'empire', 'strikes', 'back']
    );
    assert.deepStrictEqual(
      index.get(fixture[2]),
      ['star', 'wars', 'episode', 'vi', 'return', 'of', 'the', 'jedi']
    );
  });
});
