const assert = require('assert');
const createIndex = require('../lib/createIndexer');

const fixture = [
  {
    title: 'Star Wars: Episode IV - A New Hope',
    description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, ' +
      'a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying ' +
      'battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.'
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    description: 'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, ' +
      'Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by ' +
      'Darth Vader and a bounty hunter named Boba Fett all over the galaxy.'
  },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    description: 'After a daring mission to rescue Han Solo from Jabba the Hutt, ' +
      'the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile, ' +
      'Luke struggles to help Darth Vader back from the dark side without falling into the Emperor\'s trap.'
  }
];

describe('createIndex', () => {

  it('should work for a single field', () => {
    const indexer = createIndex('title');
    const index = indexer(fixture);

    assert.deepStrictEqual(index[0], ['star', 'wars', 'episode', 'iv', 'a', 'new', 'hope'])
    assert.deepStrictEqual(index[1], ['star', 'wars', 'episode', 'v', 'the', 'empire', 'strikes', 'back']);
    assert.deepStrictEqual(index[2], ['star', 'wars', 'episode', 'vi', 'return', 'of', 'the', 'jedi']);
  });

  it('should work for the multiple fields', () => {
    const indexer = createIndex(['title', 'description']);
    const index = indexer(fixture);

    assert.deepStrictEqual(index[0], [
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
    ])
    assert.deepStrictEqual(index[1], [
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
    ]);
    assert.deepStrictEqual(index[2], [
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
    ]);
  });
});
