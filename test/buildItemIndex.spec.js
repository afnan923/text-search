const assert = require('assert');
const buildTokens = require('../lib/buildItemIndex');
const fixture = require('./fixture.json');

describe('createIndex', () => {
  it('should compare itself with another tokens', () => {
    const a = buildTokens({
      title: 'Foo',
      description: 'Bar'
    }, ['title', 'description']);
    const b = buildTokens({
      title: 'Foo',
      description: 'Bar'
    }, ['title', 'description']);
    const c = buildTokens({
      title: 'Foo 1',
      description: 'Bar'
    }, ['title', 'description'],);
    const d = buildTokens({
      title: 'Foo',
      description: 'Bar 1'
    }, ['title', 'description']);

    assert.deepStrictEqual(a.compareWith(b), 0);
    assert.deepStrictEqual(a.compareWith(c), -1);
    assert.deepStrictEqual(a.compareWith(d), -1);
    assert.deepStrictEqual(a.compareWith(d), -1);
    assert.deepStrictEqual(c.compareWith(d), 1);
    assert.deepStrictEqual(d.compareWith(a), 1);
  });

  it('should work for a single field', () => {
    const tokens1 = buildTokens(fixture[0], 'title');
    assert.deepStrictEqual(
      tokens1.tokens,
      ['star', 'wars', 'episode', 'iv', 'a', 'new', 'hope']
    );

    const tokens2 = buildTokens(fixture[1], 'title');
    assert.deepStrictEqual(
      tokens2.tokens,
      ['star', 'wars', 'episode', 'v', 'the', 'empire', 'strikes', 'back']
    );

    const tokens3 = buildTokens(fixture[2], 'title');
    assert.deepStrictEqual(
      tokens3.tokens,
      ['star', 'wars', 'episode', 'vi', 'return', 'of', 'the', 'jedi']
    );
  });

  it('should work for the multiple fields', () => {
    assert.deepStrictEqual(
      buildTokens(fixture[0], ['title', 'description']).tokens,
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
    assert.deepStrictEqual(
      buildTokens(fixture[1], ['title', 'description']).tokens,
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
    assert.deepStrictEqual(
      buildTokens(fixture[2], ['title', 'description']).tokens,
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
});
