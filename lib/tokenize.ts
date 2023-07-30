import { isArray, isString } from "./utils";

export function tokenize(value: string): string[] {
  if (!isString(value)) {
    return [];
  }

  return value
    .toLowerCase()
    .replace(/["']/g, '')
    .split(/\W+/)
    .filter((part) => part.length > 0);
}
