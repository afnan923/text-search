export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isArray(list: unknown): list is unknown[] | readonly unknown[] {
  return Array.isArray(list);
}
