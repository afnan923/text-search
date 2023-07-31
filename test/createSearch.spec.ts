import { deepStrictEqual } from 'node:assert';
import fc from 'fast-check';
import { createSearch } from '../lib/createSearch';
import { fixture } from './fixture';

describe('search', () => {
  it('should work', () => {
    const indexer = createSearch('title');

    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            title: fc.lorem()
          }),
          { minLength: 10, maxLength: 100 }
        ),
        (list) => {
          const search = indexer(list);

          fc.assert(
            fc.property(
              fc.stringMatching(/^[a-z]$/),
              (query) => {
                const result = search(query);
                const rx = new RegExp(`\\b(${query}\\w*)\\b`);
                const expected = list.filter(item => rx.test(item.title)).length;

                deepStrictEqual(result.length, expected);
              }
            )
          );
        }
      )
    );
  });

  it('should work for a field', () => {
    const search = createSearch('title')(fixture);

    const result1 = search('wars');
    deepStrictEqual(result1, [fixture[0], fixture[1], fixture[2]]);

    const result2 = search('Hope');
    deepStrictEqual(result2, [fixture[0]]);

    const result3 = search('the');
    deepStrictEqual(result3, [fixture[1], fixture[2]]);
  });

  it('should work for the multiple fields', () => {
    const search = createSearch(['title', 'description'])(fixture);

    const result1 = search('Jedi');
    deepStrictEqual(result1, [fixture[2], fixture[0], fixture[1]]);

    const result2 = search('the');
    deepStrictEqual(result2, [fixture[1], fixture[2], fixture[0]]);
  });

  it('should work for the display field', () => {
    const search = createSearch(['title', 'description'], 'description')(fixture);

    const result1 = search('Jedi');
    deepStrictEqual(result1, [fixture[0], fixture[1], fixture[2]]);

    const result2 = search('Darth Empire');
    deepStrictEqual(result2, [fixture[1], fixture[0]]);
  });
});
