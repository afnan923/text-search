import { tokenize } from './tokenize';
import { createIndexer } from './createIndexer';
import type { SearchIndex } from './searchIndex';
import { Field, ItemToSearch } from './types';

type SearchTuple<T extends ItemToSearch> = [number, SearchIndex<T>, T];

export function createSearch(field: Field, displayField?: string) {
  const indexer = createIndexer(field, displayField);

  return <T extends ItemToSearch>(list: ReadonlyArray<T>) => {
    const indexHash = indexer(list);

    return (query: string) => {
      const queryTokens = tokenize(query);
      const temp: SearchTuple<T>[] = [];

      for (let j = 0; j < list.length; j++) {
        const item = list[j];
        const searchIndex = indexHash.get(item);

        if (!searchIndex) {
          break;
        }

        let found = true;
        let rel = Infinity;

        for (let i = 0; i < queryTokens.length; i++) {
          const token = queryTokens[i];

          if (!searchIndex.hasToken(token)) {
            // we need all tokens to be present in the fields
            found = false;
            break;
          }

          const pos = searchIndex.findPosition(token);

          if (pos > -1) {
            // increase relevance for the items with the token in the displayField
            rel = Math.min(pos, rel);
          }
        }

        if (found) {
          temp.push([rel, searchIndex, item]);
        }
      }

      temp.sort((ta, tb) => {
        if (ta[0] === tb[0]) {
          return ta[1].compareWith(tb[1]);
        }

        return ta[0] > tb[0] ? 1 : -1;
      });

      return temp.map(tuple => tuple[2]);
    };
  };
}
