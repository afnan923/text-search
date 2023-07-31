import { deepStrictEqual } from 'node:assert';
import fc from 'fast-check';
import { tokenize } from '../lib/tokenize';

describe('tokenize', () => {
  it('should tokenize empty string and return an empty array', () => {
    fc.assert(
      fc.property(
        fc.constant(''),
        (input) => {
          const result = tokenize(input);
          deepStrictEqual(result, []);
        }
      )
    );
  });

  it('should tokenize strings with only special characters and return an empty array', () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.stringMatching(/^\W+$/), { minLength: 1 }),
        (input) => {
          const result = tokenize(input);
          deepStrictEqual(result, []);
        }
      )
    );
  });

  it('should tokenize strings with alpha-numeric characters', () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.stringMatching(/^\w+$/), { minLength: 1 }),
        (input) => {
          const result = tokenize(input);
          deepStrictEqual(result, [input.toLowerCase()]);
        }
      )
    );
  });

  it('should tokenize strings with multiple spaces', () => {
    fc.assert(
      fc.property(
        fc.stringOf(fc.stringMatching(/^\w+$/), { minLength: 1 }),
        (input) => {
          const inputWithSpaces = `   ${input}   `;
          const result = tokenize(inputWithSpaces);
          deepStrictEqual(result, [input.toLowerCase()]);
        }
      )
    );
  });

  it('should ignore quotes while tokenizing', () => {
    fc.assert(
      fc.property(
        fc.tuple(
          fc.stringOf(fc.mixedCase(fc.hexa()), { minLength: 1 }),
          fc.stringOf(fc.mixedCase(fc.hexa()), { minLength: 1 })
        ),
        fc.stringOf(fc.constantFrom('"', '\''), { minLength: 1, maxLength: 1 }),
        (tuple, delimiter) => {
          const result = tokenize(tuple.join(delimiter));
          deepStrictEqual(result, [tuple.join('').toLowerCase()]);
        }
      )
    );
  });

  it('should tokenize text', () => {
    fc.assert(
      fc.property(
        fc.lorem(),
        (input) => {
          const result = tokenize(input);
          deepStrictEqual(result, input.split(/\s+/));
        }
      )
    );
  });
});
