import { deepStrictEqual } from "node:assert";
import fc from 'fast-check';
import { tokenize } from "../lib/tokenize";

describe("tokenize", () => {
  it("should tokenize empty strings and return an empty array", () => {
    fc.assert(
      fc.property(fc.constant(""), (input: string) => {
        const result = tokenize(input);
        deepStrictEqual(result, []);
      })
    );
  });

  it("should tokenize strings with only special characters and return an empty array", () => {
    const args = fc.stringOf(fc.stringMatching(/^\W+$/), { minLength: 1 });
    fc.assert(
      fc.property(args, (input: string) => {
        const result = tokenize(input);
        deepStrictEqual(result, []);
      })
    );
  });

  it("should tokenize strings with only numbers and return an empty array", () => {
    const args = fc.stringOf(fc.mixedCase(fc.hexa()), { minLength: 1 });
    fc.assert(
      fc.property(args, (input: string) => {
        const result = tokenize(input);
        deepStrictEqual(result, [input.toLowerCase()]);
      })
    );
  });

  it("should tokenize strings with multiple spaces", () => {
    const args = fc.stringOf(fc.stringMatching(/^\w+$/), { minLength: 1 });
    fc.assert(
      fc.property(args, (input: string) => {
        const inputWithSpaces = `   ${input}   `;
        const result = tokenize(inputWithSpaces);
        deepStrictEqual(result, [input.toLowerCase()]);
      })
    );
  });
});
