const assert = require("assert");
const createSearch = require('../lib/createSearch');
const fixture = require('./fixture.json');

describe('search', () => {
  it('should work', () => {
    const search = createSearch('title')(fixture);

    const result1 = search('wars');
    assert.deepStrictEqual(result1, [fixture[0], fixture[1], fixture[2]]);

    const result2 = search('Hope');
    assert.deepStrictEqual(result2, [fixture[0]]);

    const result3 = search('the');
    assert.deepStrictEqual(result3, [fixture[1], fixture[2]]);
  });

  it('should work for the multiple fields', () => {
    const search = createSearch(['title', 'description'])(fixture);

    const result1 = search('Jedi');
    assert.deepStrictEqual(result1, [fixture[2], fixture[0], fixture[1]]);

    const result2 = search('the');
    assert.deepStrictEqual(result2, [fixture[1], fixture[2], fixture[0]]);
  });
});
