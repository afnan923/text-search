const assert = require('assert');
const buildTokens = require('../lib/buildTokens');
const fixture = require('./fixture.json');

describe('createIndex', () => {
  it('should work for a single field', () => {
    assert.deepStrictEqual(
      buildTokens('title', fixture[0]),
      ['star', 'wars', 'episode', 'iv', 'a', 'new', 'hope']
    );
    assert.deepStrictEqual(
      buildTokens('title', fixture[1]),
      ['star', 'wars', 'episode', 'v', 'the', 'empire', 'strikes', 'back']
    );
    assert.deepStrictEqual(
      buildTokens('title', fixture[2]),
      ['star', 'wars', 'episode', 'vi', 'return', 'of', 'the', 'jedi']
    );
  });

  it('should work for the multiple fields', () => {
    assert.deepStrictEqual(
      buildTokens(['title', 'description'], fixture[0]),
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
      buildTokens(['title', 'description'], fixture[1]),
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
      buildTokens(['title', 'description'], fixture[2]),
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
