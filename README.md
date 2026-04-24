# Async Utility Functions

A well tested and typed collection of map, forEach, reduce, filter etc. utility functions supporting arrays, sets, maps, plain objects, iterators, and a synthetic infinite `true` source where applicable in both async and synchronous versions.

## Core Concepts
Each method (except for `forEach`, all `*ToArray` utilities, and all `*ToGenerator` utilities) returns the same type as the input: `asyncMap(new Map(), () => {})` returns `Promise<Map>` etc.

- **Break**: A symbol that can be returned to stop the iteration.
- **Last**: A utility that wraps a value. When returned, it stops the iteration and the provided value becomes the final output.
- **`true` input**: Passing `true` creates an infinite numeric source (`0, 1, 2, ...`). The callback receives `(index, index, true)` and must eventually stop with `Break` or `Last(...)`.

## Usage
### Basic
```javascript
import { asyncMap, map, asyncReduce, Break, Last } from 'async-collection-utils';

const data = [1, 2, 3];
const result = await asyncMap(data, async (item) => Promise.resolve(item * 2));
// result: [2, 4, 6]

const data = new Set([1, 2, 3]);
const result = await asyncMap(data, async (item) => Promise.resolve(item + 1));
// result: Set { 2, 3, 4 }

const data = { a: 1, b: 2, c: 3 };
const result = map(data, async (value, key) => value + key);
// result: { a: '1a', b: '2b', c: '3c' }

const cursor = model.find({}).cursor();
const result = await asyncReduce(cursor, async (acc, item) => Promise.resolve(acc + item.value), 0);
// result: number
```

### Utilities table
Each type of utility has both async and sync versions. Base utilities return the same type as the input. The `*ToArray` utilities always return an array, and the `*ToGenerator` utilities always return a generator or async generator.

|                   | map | flatMap | filter | reduce | forEach |
|:------------------|:---:|:-------:|:------:|:------:|:-------:|
| async             |  ✅  |    ✅    |   ✅    |   ✅    |    ✅    |
| sync              |  ✅  |    ✅    |   ✅    |   ✅    |    ✅    |
| toArray async     |  ✅  |    ✅    |   ✅    |  n/a   |   n/a   |
| toArray sync      |  ✅  |    ✅    |   ✅    |  n/a   |   n/a   |
| toGenerator async |  ✅  |    ✅    |   ✅    |  n/a   |   n/a   |
| toGenerator sync  |  ✅  |    ✅    |   ✅    |  n/a   |   n/a   |

### Infinite Source With `true`
`true` is supported by `*ToArray`, `*ToGenerator`, `reduce`, `asyncReduce`, `forEach`, and `asyncForEach`. The base `map`, `flatMap`, and `filter` families do not accept `true`.

```javascript
import {
  Break,
  Last,
  mapToArray,
  mapToGenerator,
  asyncFlatMapToGenerator,
  reduce,
} from 'async-collection-utils';

const mapped = mapToGenerator(true, (value) => {
  if (value === 3) return Break;
  return value * 2;
});
// mapped: Generator<number> that yields 0, 2, 4

const collected = mapToArray(true, (value) => {
  if (value === 3) return Last(value * 2);
  return value * 2;
});
// collected: [0, 2, 4, 6]

const total = reduce(true, (acc, value) => {
  if (value === 4) return Break;
  return acc + value;
}, 0);
// total: 6

const flattened = await asyncFlatMapToGenerator(true, async (value) => {
  if (value === 2) return Last([20, 21]);
  return [value, value + 10];
});
// flattened: AsyncGenerator<number> yielding 0, 10, 1, 11, 20, 21
```

When the input is `true`, return values follow the utility category rather than mirroring the input:
- `*ToArray` utilities return arrays
- `*ToGenerator` utilities return generators or async generators
- `reduce` returns the accumulator
- `forEach` returns `void`

### API Matrix

| Utility                   | Array | Set | Map | TypedArray | Plain Object | Iterable | AsyncIterable | `true` |
|---------------------------|:-----:|:---:|:---:|:----------:|:------------:|:--------:|:-------------:|:------:|
| `map`                     |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ❌       |   ❌    |
| `asyncMap`                |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ✅       |   ❌    |
| `mapToArray`              |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ❌       |   ✅    |
| `asyncMapToArray`         |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ✅       |   ✅    |
| `mapToGenerator`          |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ❌       |   ✅    |
| `asyncMapToGenerator`     |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ✅       |   ✅    |
| `flatMap`                 |   ✅   |  ✅  |  ❌  |     ✅      |      ❌       |    ✅     |       ❌       |   ❌    |
| `asyncFlatMap`            |   ✅   |  ✅  |  ❌  |     ✅      |      ❌       |    ✅     |       ✅       |   ❌    |
| `flatMapToArray`          |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ❌       |   ✅    |
| `asyncFlatMapToArray`     |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ✅       |   ✅    |
| `flatMapToGenerator`      |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ❌       |   ✅    |
| `asyncFlatMapToGenerator` |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ✅       |   ✅    |
| `filter`                  |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ❌       |   ❌    |
| `asyncFilter`             |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ✅       |   ❌    |
| `filterToArray`           |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ❌       |   ✅    |
| `asyncFilterToArray`      |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ✅       |   ✅    |
| `filterToGenerator`       |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ❌       |   ✅    |
| `asyncFilterToGenerator`  |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ✅       |   ✅    |
| `reduce`                  |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ❌       |   ✅    |
| `asyncReduce`             |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ✅       |   ✅    |
| `forEach`                 |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ❌       |   ✅    |
| `asyncForEach`            |   ✅   |  ✅  |  ✅  |     ✅      |      ✅       |    ✅     |       ✅       |   ✅    |
| `batch`                   |   ✅   |  ✅  |  ❌  |     ❌      |      ❌       |    ✅     |       ✅       |   ❌    |


### Usage with iterables
All functions accept iterables ()

### Map functions
#### map
```javascript
import { map } from 'async-collection-utils';

const results = map([1, 2, 3], (item) => item * 2);
// results: [2, 4, 6]

const results = map(new Set([1, 2, 3]), (item) => item * 2);
// results: Set { 2, 4, 6 }

const results = map({ a: 1, b: 2, c: 3 }, (value, key) => value + key);
// results: { a: '1a', b: '2b', c: '3c' }

const results = map(new Map([['a', 1], ['b', 2], ['c', 3]]), (value, key) => value + key);
// results: Map { a: '1a', b: '2b', c: '3c' }

const results = map(model.find({}).cursor(), (item) => parseInt(item.value));
// results: Generator<number>

const generator = function* () {
  yield 1;
  yield 2;
  yield 3;
};
const results = map(generator(), async (item) => item * 2);
// results: Generator<number>
```

#### asyncMap
```javascript
import { asyncMap } from 'async-collection-utils';

const results = await asyncMap([1, 2, 3], async (item) => Promise.resolve(item * 2));
// results: [2, 4, 6]

const results = await asyncMap(new Set([1, 2, 3]), async (item) => Promise.resolve(item * 2));
// results: Set { 2, 4, 6 }

const results = await asyncMap({ a: 1, b: 2, c: 3 }, async (value, key) => Promise.resolve(value + key));
// results: { a: '1a', b: '2b', c: '3c' }

const results = await asyncMap(new Map([['a', 1], ['b', 2], ['c', 3]]), async (value, key) => Promise.resolve(value + key));
// results: Map { a: '1a', b: '2b', c: '3c' }

const results = await asyncMap(model.find({}).cursor(), async (item) => Promise.resolve(parseInt(item.value)));
// results: AsyncGenerator<number>

const asyncGenerator = function* () {
  yield 1;
  yield 2;
  yield 3;
};
const results = await asyncMap(generator(), async (item) => Promise.resolve(item * 2));
// results: AsyncGenerator<number>

const generator = function* () {
  yield 1;
  yield 2;
  yield 3;
};
const results = await asyncMap(generator(), async (item) => Promise.resolve(item * 2));
// results: AsyncGenerator<number>
```

#### mapToArray
```javascript
import { mapToArray } from 'async-collection-utils';

const results = mapToArray([1, 2, 3], (item) => item * 2);
// results: [2, 4, 6]

const results = mapToArray(new Set([1, 2, 3]), (item) => item * 2);
// results: [2, 4, 6]

const results = mapToArray({ a: 1, b: 2, c: 3 }, (value, key) => value + key);
// results: ['1a', '2b', '3c']

const results = mapToArray(new Map([['a', 1], ['b', 2], ['c', 3]]), (value, key) => value + key);
// results: ['1a', '2b', '3c']

const results = mapToArray(model.find({}).cursor(), (item) => parseInt(item.value));
// results: number[]

const generator = function* () {
  yield 1;
  yield 2;
  yield 3;
};
const results = mapToArray(generator(), async (item) => item * 2);
// results: [2, 4, 6]
```

### Using Break and Last
You can use `Break` to finish the iteration early in all functions.

```javascript
const data = [1, 2, 3, 4, 5];
const result = await asyncFlatMap(data, async (item) => {
  if (item === 3) return Break;
  return item * 2;
});
// result: [2, 4]
```

```javascript
const data = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const result = await asyncMap(data, async (value) => {
  if (value === 3) return Break;
  return value * 2;
});
// result: { a: 2, b: 4 }
```

You can use `Last` wrapper, to finish the iteration early while still returning last value. It works in all `map`, `flatMap`, `reduce` and `filter` functions.

```javascript
const data = [1, 2, 3, 4, 5];
const result = await asyncFlatMap(data, async (item) => {
  if (item === 3) return Last(item * 2);
  return item * 2;
});
// result: [2, 4, 6]
```

```javascript
const data = [1, 2, 3, 4, 5];
const reduced = await asyncReduce(data, async (acc, item) => {
  if (item === 3) return Last(acc + item);
  return acc + item;
}, 0);
// result: 6
```

### Helpers
Two helpers used internally are exported as well:

- `entries`: The same as `Object.entries` but with better typings
    ```javascript
    import { entries } from 'async-collection-utils';
  
    enum SomeEnum {
      foo = 'foo',
      bar = 'bar',
    }
    const obj = { [SomeEnum.foo]: 1, [SomeEnum.bar]: 2 };
    const result: [SomeEnum, number][] = await entries(obj);
    // result: [[SomeEnum.foo, 1], [SomeEnum.bar, 2]]
    ```

- `keys`: The same as `Object.keys` but with better typings
    ```javascript
    import { keys } from 'async-collection-utils';
  
    enum SomeEnum {
      foo = 'foo',
      bar = 'bar',
    }
    const obj = { [SomeEnum.foo]: 1, [SomeEnum.bar]: 2 };
    const result: SomeEnum[] = await keys(obj);
    // result: [SomeEnum.foo, SomeEnum.bar]
    ```

## Array-like objects
Methods are not generic meaning that they won't treat array-like objects as arrays. They will be iterated over just like plain objects.

```javascript
import { map } from 'async-collection-utils';

const obj = { 0: 'a', 1: 'b', length: 2 };
const result = map(obj, (value, key) => value + key);
// result: { 0: 'a0', 1: 'b1', length: '2length' }
```

## Notes
- Remember to always pass async iteratee to async functions; otherwise, type inference will fail

## Changelog

### 1.0.0
- Initial release

### 1.1.0
- Added synchronous utilities
- Added `entries` and `keys` helpers

### 2.0.0
- BREAKING CHANGE: complete rewrite of the library 
- All async utilities accept: arrays, sets, maps, typed arrays, iterators, async iterators and plain objects and return the same type as the input
- All async utilities have sync counterparts
- All sync utilities accept: arrays, sets, maps, typed arrays, iterators, and plain objects and return the same type as the input
- Utilities available:
  - asyncMap
  - map
  - asyncMapToArray
  - mapToArray
  - asyncFlatMap
  - flatMap
  - asyncFlatMapToArray
  - flatMapToArray
  - asyncFilter
  - filter
  - asyncFilterToArray
  - filterToArray
  - asyncReduce
  - reduce
  - asyncForEach
  - forEach
  - batch
  - entries
  - keys
