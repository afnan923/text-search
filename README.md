# text-search

## Overview

This code contains a simple search library that allows you to create a search function
to find items in a list based on specific fields and perform a ranked search based
on a query string.

Prepare your data as a list of objects, where each object represents an item you want
to search through. Each object should have properties corresponding to the fields you
want to use for search.

The search function will return a list of items that match the query, sorted by relevance.
The relevance is determined based on the position of the query tokens in the items' fields.

The display field is used to determine the order of items with equal relevance scores.
It ensures that the search results are consistently ordered, and if no display field
is provided, the first field specified in the field parameter will be used instead.
The display field can be handy when you want to give priority to certain fields for
sorting purposes in cases where multiple items have the same relevance to the query.

## Example

```ts
import { createSearch } from '@mistakster/text-search';

const indexer = createSearch('title'); // ['title', 'description']

const search = indexer([
  {
    title: 'Star Wars: Episode IV - A New Hope',
    description: `Luke Skywalker joins forces with a Jedi Knight,
      a cocky pilot, a Wookiee and two droids to save the galaxy from
      the Empire's world-destroying battle station, while also attempting
      to rescue Princess Leia from the mysterious Darth Vader.`
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    description: `After the Rebels are brutally overpowered by
      the Empire on the ice planet Hoth, Luke Skywalker begins Jedi
      training with Yoda, while his friends are pursued by Darth Vader
      and a bounty hunter named Boba Fett all over the galaxy.`
  },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    description: `After a daring mission to rescue Han Solo from Jabba the Hutt,
      the Rebels dispatch to Endor to destroy the second Death Star. Meanwhile,
      Luke struggles to help Darth Vader back from the dark side without falling
      into the Emperor's trap.`
  }
]);

const results = search('Jedi');
```
