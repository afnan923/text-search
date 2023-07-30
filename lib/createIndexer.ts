import { SearchIndex } from "./searchIndex";
import { isArray, isString } from "./utils";
import { Field, ItemToSearch } from "./types";

export function createIndexer(field: Field, displayField?: string) {
  const firstField = isArray(field) ? field[0] : field;
  const displayOrFirstField = isString(displayField) ? displayField : firstField;

  return <T extends ItemToSearch>(list: ReadonlyArray<T>) => {
    const map = new WeakMap<T, SearchIndex<T>>();

    for (let i = list.length - 1; i >= 0; i--) {
      map.set(list[i], new SearchIndex(list[i], field, displayOrFirstField));
    }

    return map;
  };
}
