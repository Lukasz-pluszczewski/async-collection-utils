# Async Utility Functions

A well tested and typed collection of map, forEach, reduce, filter etc. utility functions supporting arrays, sets, maps, plain objects, iterators in both async and synchronous versions.

* [Core Concepts](#core-concepts)
* [Usage](#usage)
  * [Import](#import)
  * [Array Utilities](#array-utilities)
    * [Sequential](#sequential)
    * [Parallel](#parallel)
  * [Object Utilities](#object-utilities)
    * [Sequential](#sequential-1)
    * [Parallel](#parallel-1)
  * [Using Break and Last](#using-break-and-last)
  * [Synchronous](#synchronous)
  * [Helpers](#helpers)
* [Changelog](#changelog)

## Core Concepts
Each method (except for "forEach" and all "toArray" utilities) returns the same type as the input: asyncMap(new Map(), () => {}) returns Promise<Map> etc.



- **Break**: A symbol that can be returned to stop the iteration.
- **Last**: A utility that wraps a value. When returned, it stops the iteration and the provided value becomes the final output.

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
Each type of utility has both async and sync versions. These return the same type as the input. The "toArray" utilities accept the same input but always return an array.

|               | map | flatMap | filter | reduce | forEach |
|:--------------|:---:|:-------:|:------:|:------:|:-------:|
| async         |  ✅  |    ✅    |   ✅    |   ✅    |    ✅    |
| sync          |  ✅  |    ✅    |   ✅    |   ✅    |    ✅    |
| toArray async |  ✅  |    ✅    |   ✅    |  n/a   |   n/a   |
| toArray sync  |  ✅  |    ✅    |   ✅    |  n/a   |   n/a   |

### Input/output support map

|                                       | Array<T>          | Set<T>            | Map<K, T>          | Record<K, T>          | TypedArray<T>          | Iterable<T>                | AsyncIterable<T>           |
|---------------------------------------|-------------------|-------------------|--------------------|-----------------------|------------------------|----------------------------|----------------------------|
| asyncMap<TInput, R>                   | Promise<Array<R>> | Promise<Set<R>>   | Promise<Map<K, R>> | Promise<Record<K, R>> | Promise<TypedArray<R>> | Promise<AsyncGenerator<R>> | Promise<AsyncGenerator<R>> |
| map<TInput, R>                        | Array<R>          | Set<R>            | Map<K, R>          | Record<K, R>          | TypedArray<R>          | Generator<R>               | ❌                          |
| asyncMapToArray<TInput, R>            | Promise<Array<R>> | Promise<Array<R>> | Promise<Array<R>>  | Promise<Array<R>>     | Promise<Array<R>>      | Promise<Array<R>>          | Promise<Array<R>>          |
| mapToArray<TInput, R>                 | Array<R>          | Array<R>          | Array<R>           | Array<R>              | Array<R>               | Array<R>                   | ❌                          |
| asyncFlatMap<TInput, R \| R[]>        | Promise<Array<R>> | Promise<Set<R>>   | ❌                  | ❌                     | Promise<TypedArray<R>> | Promise<AsyncGenerator<R>> | Promise<AsyncGenerator<R>> |
| flatMap<TInput, R \| R[]>             | Array<R>          | Set<R>            | ❌                  | ❌                     | TypedArray<R>          | Generator<R>               | ❌                          |
| asyncFlatMapToArray<TInput, R \| R[]> | Promise<Array<R>> | Promise<Array<R>> | Promise<Array<R>>  | Promise<Array<R>>     | Promise<Array<R>>      | Promise<Array<R>>          | Promise<Array<R>>          |
| flatMapToArray<TInput, R \| R[]>      | Array<R>          | Array<R>          | Array<R>           | Array<R>              | Array<R>               | Array<R>                   | ❌                          |
| asyncFilter<TInput, boolean>          | Promise<Array<R>> | Promise<Set<R>>   | Promise<Map<K, R>> | Promise<Record<K, R>> | Promise<TypedArray<R>> | Promise<AsyncGenerator<R>> | Promise<AsyncGenerator<R>> |   
| filter<TInput, boolean>               | Array<R>          | Set<R>            | Map<K, R>          | Record<K, R>          | TypedArray<R>          | Generator<R>               | ❌                          |  
| asyncFilterToArray<TInput, boolean>   | Promise<Array<R>> | Promise<Array<R>> | Promise<Array<R>>  | Promise<Array<R>>     | Promise<Array<R>>      | Promise<Array<R>>          | Promise<Array<R>>          |   
| filterToArray<TInput, boolean>        | Array<R>          | Array<R>          | Array<R>           | Array<R>              | Array<R>               | Array<R>                   | ❌                          |  
| asyncReduce<TInput, R>                | Promise<R>        | Promise<R>        | Promise<R>         | Promise<R>            | Promise<R>             | Promise<R>                 | Promise<R>                 |
| reduce<TInput, R>                     | R                 | R                 | R                  | R                     | R                      | R                          | ❌                          |
| asyncForEach<TInput, void>            | void              | void              | void               | void                  | void                   | void                       | void                       |
| forEach<TInput, void>                 | void              | void              | void               | void                  | void                   | void                       | ❌                          |

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
