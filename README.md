# Async Utility Functions

A collection of map, forEach, reduce, mapValues, filter etc. utility functions for both arrays and plain objects accepting asynchronous callbacks, with both sequential and parallel versions.

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

## Core Concepts

- **Break**: A symbol that can be returned to stop the iteration.
- **Last**: A utility that wraps a value. When returned, it stops the iteration and the provided value becomes the final output.

## Usage
### Import
```javascript
import { asyncMap, asyncForEach, asyncMapParallel, Break, Last } from 'async-collection-utils';
```

### Array Utilities

#### Sequential

- `asyncMap`: Iterates over the array, applies a given asynchronous function, and returns a new array.
    ```javascript
    const data = [1, 2, 3];
    const result = await asyncMap(data, async (item) => item * 2);
    // result: [2, 4, 6]
    ```

- `asyncForEach`: Iterates over the array. Does not return a value.
    ```javascript
    const data = [1, 2, 3];
    await asyncForEach(data, async (item) => console.log(item));
    ```

- `asyncReduce`: Reduces the array using an asynchronous function.
    ```javascript
    const data = [1, 2, 3];
    const sum = await asyncReduce(data, async (acc, item) => acc + item, 0);
    // result: 6
    ```
- `asyncFilter`: Iterates over the array and returns new array from elements for which async callback returned true.
   ```javascript
   const data = [1, 2, 3];
   const result = await asyncFilter(data, async (item) => item < 3);
   // result: [1, 2]
   ```


#### Parallel
These are equvalent to the above, but execute all operations in parallel.
- `asyncMapParallel`
- `asyncForEachParallel`
- `asyncFilterParallel`

### Object Utilities

#### Sequential

- `asyncMapValues`: Iterates over the object's values, applies a given asynchronous function, and returns a new object.
    ```javascript
    const obj = { a: 1, b: 2 };
    const result = await asyncMapValues(obj, async (value) => value * 2);
    // result: { a: 2, b: 4 }
    ```

- `asyncForEachValues`: Iterates over the object's values.
- `asyncReduceValues`: Reduces the object's values using an asynchronous function.
- `asyncFilterValues`: Filters the object values and returns new object.
- `asyncMapEntries`: Iterates over the object's entries, applies a given asynchronous function, and returns a resulting array.
    ```javascript
    const obj = { a: 1, b: 2 };
    const result = await asyncMapEntries(obj, async ([key, value]) => value * 2);
    // result: [2, 4]
    ```
- `asyncForEachEntries`: Iterates over the object's entries.
- `asyncReduceEntries`: Reduces the object's entries using an asynchronous function.
- `asyncFilterEntries`: Filters object entries and returns new array of entries
- `asyncMapKeys`: Iterates over the object's keys, applies a given asynchronous function, and returns a resulting array.
    ```javascript
    const obj = { a: 1, b: 2 };
    const result = await asyncMapKeys(obj, async (key) => key.toUpperCase());
    // result: ['A', 'B']
    ```
- `asyncForEachKeys`: Iterates over the object's keys.
- `asyncReduceKeys`: Reduces the object's keys using an asynchronous function.
- `asyncFilterKeys`: Filters the array of keys and returns new array of keys.

#### Parallel
These are equvalent to the above, but execute all operations in parallel.
- `asyncMapValuesParallel`
- `asyncForEachValuesParallel`
- `asyncFilterValuesParallel`
- `asyncMapEntriesParallel`
- `asyncForEachEntriesParallel`
- `asyncFilterEntriesParallel`
- `asyncMapKeysParallel`
- `asyncForEachKeysParallel`
- `asyncFilterKeysParallel`

### Using Break and Last
You can use `Break` to finish the iteration early in all `map`, `forEach` and `filter` functions.

```javascript
const data = [1, 2, 3, 4, 5];
const result = await asyncMap(data, async (item) => {
  if (item === 3) return Break;
  return item * 2;
});
// result: [2, 4]
```

```javascript
const data = { a: 1, b: 2, c: 3, d: 4, e: 5 };
const result = await asyncMapValues(data, async (value) => {
  if (value === 3) return Break;
  return value * 2;
});
// result: { a: 2, b: 4 }
```

You can use `Last` wrapper, to finish the iteration early while still returning last value. It works in all `map`, `reduce` and `filter` functions.

```javascript
const data = [1, 2, 3, 4, 5];
const result = await asyncMap(data, async (item) => {
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

### Synchronous
For convenience, library also exports synchronous versions of the utilities, with the same interfaces.

Available synchronous utilities:
- `map`
- `forEach`
- `reduce`
- `filter`
- `mapValues`
- `mapKeys`
- `mapEntries`
- `forEachValues`
- `forEachKeys`
- `forEachEntries`
- `reduceValues`
- `reduceKeys`
- `reduceEntries`
- `filterValues`
- `filterKeys`
- `filterEntries`

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

## Changelog

### 1.0.0
- Initial release

### 1.1.0
- Added synchronous utilities
- Added `entries` and `keys` helpers
