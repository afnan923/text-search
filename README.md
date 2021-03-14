# text-search

Example

```
import createSearch from 'text-search';

const indexer = createSearch('title'); // ['title', 'description']

const filter = indexer(list);

const results = filter('foo bar');
```
