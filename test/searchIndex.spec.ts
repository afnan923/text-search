import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import { SearchIndex } from "../lib/searchIndex";
import { fixture } from "./fixture";

describe('SearchIndex', () => {
  it('should compare itself with another tokens', () => {
    const a = { title: 'Foo', description: 'Bar' };
    const b = { title: 'Foo 1', description: 'Bar' };
    const c = { title: 'Foo', description: 'Bar 1' };

    const fields = ['title', 'description'];

    deepStrictEqual(new SearchIndex(a, fields).compareWith(new SearchIndex(a, fields)), 0);
    deepStrictEqual(new SearchIndex(a, fields).compareWith(new SearchIndex(b, fields)), -1);
    deepStrictEqual(new SearchIndex(a, fields).compareWith(new SearchIndex(c, fields)), -1);

    deepStrictEqual(new SearchIndex(b, fields).compareWith(new SearchIndex(a, fields)), 1);
    deepStrictEqual(new SearchIndex(b, fields).compareWith(new SearchIndex(b, fields)), 0);
    deepStrictEqual(new SearchIndex(b, fields).compareWith(new SearchIndex(c, fields)), 1);

    deepStrictEqual(new SearchIndex(c, fields).compareWith(new SearchIndex(a, fields)), 1);
    deepStrictEqual(new SearchIndex(c, fields).compareWith(new SearchIndex(b, fields)), -1);
    deepStrictEqual(new SearchIndex(c, fields).compareWith(new SearchIndex(c, fields)), 0);
  });

  it('should work for a single field', () => {
    const tokens1 = new SearchIndex(fixture[0], 'title');
    deepStrictEqual(
      tokens1.tokens,
      ['star', 'wars', 'episode', 'iv', 'a', 'new', 'hope']
    );

    const tokens2 = new SearchIndex(fixture[1], 'title');
    deepStrictEqual(
      tokens2.tokens,
      ['star', 'wars', 'episode', 'v', 'the', 'empire', 'strikes', 'back']
    );

    const tokens3 = new SearchIndex(fixture[2], 'title');
    deepStrictEqual(
      tokens3.tokens,
      ['star', 'wars', 'episode', 'vi', 'return', 'of', 'the', 'jedi']
    );
  });

  it('should work for the multiple fields', () => {
    deepStrictEqual(
      new SearchIndex(fixture[0], ['title', 'description']).tokens,
      [
        'star', 'wars', 'episode', 'iv',
        'a', 'new', 'hope', 'luke',
        'skywalker', 'joins', 'forces', 'with',
        'a', 'jedi', 'knight', 'a',
        'cocky', 'pilot', 'a', 'wookiee',
        'and', 'two', 'droids', 'to',
        'save', 'the', 'galaxy', 'from',
        'the', 'empires', 'world', 'destroying',
        'battle', 'station', 'while', 'also',
        'attempting', 'to', 'rescue', 'princess',
        'leia', 'from', 'the', 'mysterious',
        'darth', 'vader'
      ]
    );
    deepStrictEqual(
      new SearchIndex(fixture[1], ['title', 'description']).tokens,
      [
        'star', 'wars', 'episode', 'v',
        'the', 'empire', 'strikes', 'back',
        'after', 'the', 'rebels', 'are',
        'brutally', 'overpowered', 'by', 'the',
        'empire', 'on', 'the', 'ice',
        'planet', 'hoth', 'luke', 'skywalker',
        'begins', 'jedi', 'training', 'with',
        'yoda', 'while', 'his', 'friends',
        'are', 'pursued', 'by', 'darth',
        'vader', 'and', 'a', 'bounty',
        'hunter', 'named', 'boba', 'fett',
        'all', 'over', 'the', 'galaxy'
      ]
    );
    deepStrictEqual(
      new SearchIndex(fixture[2], ['title', 'description']).tokens,
      [
        'star', 'wars', 'episode', 'vi',
        'return', 'of', 'the', 'jedi',
        'after', 'a', 'daring', 'mission',
        'to', 'rescue', 'han', 'solo',
        'from', 'jabba', 'the', 'hutt',
        'the', 'rebels', 'dispatch', 'to',
        'endor', 'to', 'destroy', 'the',
        'second', 'death', 'star', 'meanwhile',
        'luke', 'struggles', 'to', 'help',
        'darth', 'vader', 'back', 'from',
        'the', 'dark', 'side', 'without',
        'falling', 'into', 'the', 'emperors',
        'trap'
      ]
    );
  });

  it('should reflect the order of the fields', () => {
    notDeepStrictEqual(
      new SearchIndex(fixture[0], ['title', 'description']).tokens,
      new SearchIndex(fixture[0], ['description', 'title']).tokens,
    );
  });
});
