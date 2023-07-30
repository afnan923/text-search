import { tokenize } from "./tokenize";
import { createIndexer } from "./createIndexer";
import type { SearchIndex } from "./searchIndex";

type SearchTuple = [number, SearchIndex, Record<string, string>];

function comparator(ta: SearchTuple, tb: SearchTuple) {
  if (ta[0] === tb[0]) {
    return ta[1].compareWith(tb[1]);
  }

  return ta[0] > tb[0] ? 1 : -1;
}

export function createSearch(field: string | string[], displayField?: string) {
  const indexer = createIndexer(field, displayField);

  return (arr: readonly Record<string, string>[]) => {
    const indexHash = indexer(arr);

    return (query: string) => {
      const queryTokens = tokenize(query);
      const temp: SearchTuple[] = [];

      for (let j = 0; j < arr.length; j++) {
        const item = arr[j];
        const searchIndex = indexHash.get(item);

        if (!searchIndex) {
          break;
        }

        let found = true;
        let rel = Infinity;

        for (let i = 0; i < queryTokens.length; i++) {
          const qt = queryTokens[i];
          const tIndex = searchIndex.findTokenIndex(qt);

          if (tIndex < 0) {
            found = false;
            break;
          }

          const pos = searchIndex.getPositionOf(qt);

          if (pos > -1) {
            rel = Math.min(pos, rel);
          }
        }

        if (found) {
          temp.push([rel, searchIndex, item]);
        }
      }

      temp.sort(comparator);

      return temp.map(tuple => tuple[2]);
    };
  };
}
