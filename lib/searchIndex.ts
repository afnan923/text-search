import { tokenize } from './tokenize';
import { isArray, isString } from './utils';
import { Field, ItemToSearch } from './types';

export class SearchIndex<T extends ItemToSearch> {
  private readonly tokens: string[] = [];

  private readonly values: string[] = [];

  private readonly displayValue: string = '';

  constructor(item: T, field: Field, displayField?: string) {
    const fields = isArray(field) ? field : [field];

    for (let i = 0; i < fields.length; i++) {
      const value = item[fields[i]];

      if (!isString(value)) {
        break;
      }

      this.values.push(value);
      this.tokens.push(...tokenize(value));
    }

    if (isString(displayField)) {
      const value = item[displayField];

      if (isString(value)) {
        this.displayValue = value.toLowerCase();
      }
    }
  }

  compareWith(target: SearchIndex<T>): -1 | 0 | 1 {
    const valuesA = this.values;
    const valuesB = target.values;

    for (let i = 0; i < valuesA.length; i++) {
      if (valuesA[i] !== valuesB[i]) {
        return valuesA[i] > valuesB[i] ? 1 : -1;
      }
    }

    return 0;
  }

  hasToken(queryToken: string) {
    return this.tokens.findIndex(token => token.indexOf(queryToken) === 0) >= 0;
  }

  findPosition(queryToken: string) {
    return this.displayValue.indexOf(queryToken);
  }
}
