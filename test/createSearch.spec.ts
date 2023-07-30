import { deepStrictEqual } from "node:assert";
import { createSearch } from "../lib/createSearch";
import { fixture } from "./fixture";

describe('search', () => {
  it('should work', () => {
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
});
