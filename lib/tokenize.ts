function isValueString(value: any): value is string {
  return typeof value === 'string';
}

export function tokenize(value: string): string[] {
  if (!isValueString(value)) {
    return [];
  }

  return value
    .toLowerCase()
    .replace(/["']/g, '')
    .split(/\W+/)
    .filter(Boolean);
}
