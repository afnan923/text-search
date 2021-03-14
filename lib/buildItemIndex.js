const tokenize = require('./tokenize');

class ItemIndex {
  constructor(item, field, displayField) {
    this._values = (Array.isArray(field) ? field : [field]).map(k => item[k]);
    this._tokens = [];

    for (let i = 0; i < this._values.length; i++) {
      const tokens = tokenize(this._values[i]);

      for (let j = 0; j < tokens.length; j++) {
        this._tokens.push(tokens[j]);
      }
    }

    this._displayField = (item[displayField] || '').toLowerCase();
  }

  get values() {
    return this._values;
  }

  get tokens() {
    return this._tokens;
  }

  compareWith(tokens) {
    const valuesA = this.values;
    const valuesB = tokens.values;

    for (let i = 0; i < valuesA.length; i++) {
      if (valuesA[i] !== valuesB[i]) {
        return valuesA[i] > valuesB[i] ? 1 : -1;
      }
    }

    return 0;
  }

  getPositionOf(query) {
    return this._displayField.indexOf(query);
  }
}

function buildItemIndex(item, field, displayField) {
  return new ItemIndex(item, field, displayField);
}

module.exports = buildItemIndex;
