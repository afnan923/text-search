import { tokenize } from "./tokenize";

export class SearchIndex {
  readonly values: string[];

  readonly tokens: string[];

  private _displayField: string;

  constructor(item: Record<string, string>, field: string | string[], displayField?: string) {
    this.values = (Array.isArray(field) ? field : [field]).map(k => item[k]);
    this.tokens = [];

    for (let i = 0; i < this.values.length; i++) {
      const tokens = tokenize(this.values[i]);

      for (let j = 0; j < tokens.length; j++) {
        this.tokens.push(tokens[j]);
      }
    }

    this._displayField = (item[typeof displayField === 'string' ? displayField : ''] || '').toLowerCase();
  }

  compareWith(target: SearchIndex): -1 | 0 | 1 {
    const valuesA = this.values;
    const valuesB = target.values;

    for (let i = 0; i < valuesA.length; i++) {
      if (valuesA[i] !== valuesB[i]) {
        return valuesA[i] > valuesB[i] ? 1 : -1;
      }
    }

    return 0;
  }

  findTokenIndex(queryToken: string) {
    return this.tokens.findIndex(token => token.indexOf(queryToken) === 0);
  }

  getPositionOf(query: string) {
    return this._displayField.indexOf(query);
  }
}
