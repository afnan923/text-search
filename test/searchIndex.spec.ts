import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import fc from "fast-check";
import { SearchIndex } from "../lib/searchIndex";

describe('SearchIndex', () => {
  it('should compare two equal indexes', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.stringOf(fc.mixedCase(fc.hexa())),
          description: fc.stringOf(fc.mixedCase(fc.hexa()))
        }),
        (obj) => {
          const index1 = new SearchIndex(obj, ['title', 'description']);
          const index2 = new SearchIndex({ ...obj }, ['title', 'description']);

          deepStrictEqual(index1.compareWith(index2), 0);
        }
      )
    );
  });

  it('should compare two indexes with first value longer than second', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.stringOf(fc.mixedCase(fc.hexa())),
          description: fc.stringOf(fc.mixedCase(fc.hexa())),
          delta: fc.stringOf(fc.mixedCase(fc.hexa()), { minLength: 1 })
        }),
        (obj) => {
          const obj2 = {
            ...obj,
            title: obj.title + obj.delta
          };

          const index1 = new SearchIndex(obj, ['title', 'description']);
          const index2 = new SearchIndex(obj2, ['title', 'description']);

          deepStrictEqual(index1.compareWith(index2), -1);
          deepStrictEqual(index2.compareWith(index1), 1);
        }
      )
    );
  });

  it('should compare two indexes with second value longer than second', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.stringOf(fc.mixedCase(fc.hexa())),
          description: fc.stringOf(fc.mixedCase(fc.hexa())),
          delta: fc.stringOf(fc.mixedCase(fc.hexa()), { minLength: 1 })
        }),
        (obj) => {
          const obj2 = {
            ...obj,
            description: obj.description + obj.delta
          };

          const index1 = new SearchIndex(obj, ['title', 'description']);
          const index2 = new SearchIndex(obj2, ['title', 'description']);

          deepStrictEqual(index1.compareWith(index2), -1);
          deepStrictEqual(index2.compareWith(index1), 1);
        }
      )
    );
  });
});
