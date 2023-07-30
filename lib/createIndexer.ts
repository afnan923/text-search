import { SearchIndex } from "./searchIndex";

export function createIndexer(field: string | string[], displayField?: string) {
  const firstField = Array.isArray(field) ? field[0] : field;
  const display = typeof displayField !== 'string' ? firstField : displayField;

  return (arr: readonly Record<string, string>[]) => arr.reduce((hash, item) => {
    hash.set(item, new SearchIndex(item, field, display));

    return hash;
  }, new WeakMap<Record<string, string>, SearchIndex>());
}
