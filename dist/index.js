var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Break: () => Break,
  Last: () => Last,
  asyncFilter: () => asyncFilter,
  asyncFilterEntries: () => asyncFilterEntries,
  asyncFilterEntriesParallel: () => asyncFilterEntriesParallel,
  asyncFilterKeys: () => asyncFilterKeys,
  asyncFilterKeysParallel: () => asyncFilterKeysParallel,
  asyncFilterParallel: () => asyncFilterParallel,
  asyncFilterValues: () => asyncFilterValues,
  asyncFilterValuesParallel: () => asyncFilterValuesParallel,
  asyncForEach: () => asyncForEach,
  asyncForEachEntries: () => asyncForEachEntries,
  asyncForEachEntriesParallel: () => asyncForEachEntriesParallel,
  asyncForEachKeys: () => asyncForEachKeys,
  asyncForEachKeysParallel: () => asyncForEachKeysParallel,
  asyncForEachParallel: () => asyncForEachParallel,
  asyncForEachValues: () => asyncForEachValues,
  asyncForEachValuesParallel: () => asyncForEachValuesParallel,
  asyncMap: () => asyncMap,
  asyncMapEntries: () => asyncMapEntries,
  asyncMapEntriesParallel: () => asyncMapEntriesParallel,
  asyncMapKeys: () => asyncMapKeys,
  asyncMapKeysParallel: () => asyncMapKeysParallel,
  asyncMapParallel: () => asyncMapParallel,
  asyncMapValues: () => asyncMapValues,
  asyncMapValuesParallel: () => asyncMapValuesParallel,
  asyncReduce: () => asyncReduce,
  asyncReduceEntries: () => asyncReduceEntries,
  asyncReduceKeys: () => asyncReduceKeys,
  asyncReduceValues: () => asyncReduceValues,
  entries: () => entries,
  filter: () => filter,
  filterEntries: () => filterEntries,
  filterKeys: () => filterKeys,
  filterValues: () => filterValues,
  forEach: () => forEach,
  forEachEntries: () => forEachEntries,
  forEachKeys: () => forEachKeys,
  forEachValues: () => forEachValues,
  keys: () => keys,
  map: () => map,
  mapEntries: () => mapEntries,
  mapKeys: () => mapKeys,
  mapValues: () => mapValues,
  reduce: () => reduce,
  reduceEntries: () => reduceEntries,
  reduceKeys: () => reduceKeys,
  reduceValues: () => reduceValues
});
module.exports = __toCommonJS(index_exports);
var Break = Symbol("BreakSymbol");
var LastClass = class {
  constructor(value) {
    this.value = value;
  }
};
var Last = (value) => new LastClass(value);
var entries = (object) => {
  const result = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      result.push([key, object[key]]);
    }
  }
  return result;
};
var keys = (object) => {
  const result = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      result.push(key);
    }
  }
  return result;
};
async function asyncMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const iterationResult = await callback(array[i], i, array);
    if (iterationResult === Break) {
      break;
    }
    if (iterationResult instanceof LastClass) {
      result.push(iterationResult.value);
      break;
    }
    result.push(iterationResult);
  }
  return result;
}
async function asyncForEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    const iterationResult = await callback(array[i], i, array);
    if (iterationResult === Break) {
      break;
    }
  }
}
async function asyncReduce(array, callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    const iterationResult = await callback(accumulator, array[i], i, array);
    if (iterationResult instanceof LastClass) {
      accumulator = iterationResult.value;
      break;
    }
    accumulator = iterationResult;
  }
  return accumulator;
}
async function asyncFilter(array, callback) {
  const result = [];
  await asyncForEach(array, async (value, index, array2) => {
    const iterationResult = await callback(value, index, array2);
    if (iterationResult instanceof LastClass) {
      if (iterationResult.value) {
        result.push(value);
      }
      return Break;
    }
    if (iterationResult === Break) {
      return Break;
    }
    if (iterationResult) {
      result.push(value);
    }
  });
  return result;
}
async function asyncMapValues(object, callback) {
  const result = {};
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = await callback(object[key], key, object);
      if (iterationResult === Break) {
        break;
      }
      if (iterationResult instanceof LastClass) {
        result[key] = iterationResult.value;
        break;
      }
      result[key] = iterationResult;
    }
  }
  return result;
}
async function asyncMapEntries(object, callback) {
  return asyncMap(entries(object), callback);
}
async function asyncMapKeys(object, callback) {
  return asyncMap(keys(object), callback);
}
async function asyncForEachValues(object, callback) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = await callback(object[key], key, object);
      if (iterationResult === Break) {
        break;
      }
    }
  }
}
async function asyncForEachEntries(object, callback) {
  await asyncForEach(entries(object), callback);
}
async function asyncForEachKeys(object, callback) {
  await asyncForEach(keys(object), callback);
}
async function asyncReduceValues(object, callback, initialValue) {
  let accumulator = initialValue;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = await callback(accumulator, object[key], key, object);
      if (iterationResult instanceof LastClass) {
        accumulator = iterationResult.value;
        break;
      }
      accumulator = iterationResult;
    }
  }
  return accumulator;
}
async function asyncReduceEntries(object, callback, initialValue) {
  return asyncReduce(entries(object), callback, initialValue);
}
async function asyncReduceKeys(object, callback, initialValue) {
  return asyncReduce(keys(object), callback, initialValue);
}
async function asyncFilterValues(object, callback) {
  const result = {};
  await asyncForEachValues(object, async (value, key, object2) => {
    const iterationResult = await callback(value, key, object2);
    if (iterationResult instanceof LastClass) {
      if (iterationResult.value) {
        result[key] = value;
      }
      return Break;
    }
    if (iterationResult === Break) {
      return Break;
    }
    if (iterationResult) {
      result[key] = value;
    }
  });
  return result;
}
async function asyncFilterKeys(object, callback) {
  return asyncFilter(keys(object), callback);
}
async function asyncFilterEntries(object, callback) {
  return asyncFilter(entries(object), callback);
}
async function asyncMapParallel(array, callback) {
  return Promise.all(array.map(callback));
}
async function asyncForEachParallel(array, callback) {
  await Promise.all(array.map(callback));
}
async function asyncFilterParallel(array, callback) {
  const result = await Promise.all(array.map(callback));
  return array.filter((_, index) => result[index]);
}
async function asyncMapValuesParallel(object, callback) {
  const result = {};
  await Promise.all(keys(object).map(async (key) => {
    result[key] = await callback(object[key], key, object);
  }));
  return result;
}
async function asyncMapEntriesParallel(object, callback) {
  return asyncMapParallel(entries(object), callback);
}
async function asyncMapKeysParallel(object, callback) {
  return asyncMapParallel(keys(object), callback);
}
async function asyncForEachValuesParallel(object, callback) {
  await Promise.all(keys(object).map(async (key) => {
    await callback(object[key], key, object);
  }));
}
async function asyncForEachEntriesParallel(object, callback) {
  await asyncForEachParallel(entries(object), callback);
}
async function asyncForEachKeysParallel(object, callback) {
  await asyncForEachParallel(keys(object), callback);
}
async function asyncFilterValuesParallel(object, callback) {
  const result = {};
  await Promise.all(keys(object).map(async (key) => {
    if (await callback(object[key], key, object)) {
      result[key] = object[key];
    }
  }));
  return result;
}
async function asyncFilterKeysParallel(object, callback) {
  const objectKeys = keys(object);
  const result = await Promise.all(objectKeys.map(async (key, index) => {
    if (await callback(key, index, objectKeys)) {
      return key;
    }
  }));
  return result.filter(Boolean);
}
async function asyncFilterEntriesParallel(object, callback) {
  const objectEntries = entries(object);
  const result = await Promise.all(objectEntries.map(async (entry, index) => {
    if (await callback(entry, index, objectEntries)) {
      return entry;
    }
  }));
  return result.filter(Boolean);
}
function map(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const iterationResult = callback(array[i], i, array);
    if (iterationResult === Break) {
      break;
    }
    if (iterationResult instanceof LastClass) {
      result.push(iterationResult.value);
      break;
    }
    result.push(iterationResult);
  }
  return result;
}
function forEach(array, callback) {
  for (let i = 0; i < array.length; i++) {
    const iterationResult = callback(array[i], i, array);
    if (iterationResult === Break) {
      break;
    }
  }
}
function reduce(array, callback, initialValue) {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    const iterationResult = callback(accumulator, array[i], i, array);
    if (iterationResult instanceof LastClass) {
      accumulator = iterationResult.value;
      break;
    }
    accumulator = iterationResult;
  }
  return accumulator;
}
function filter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const iterationResult = callback(array[i], i, array);
    if (iterationResult instanceof LastClass) {
      if (iterationResult.value) {
        result.push(array[i]);
      }
      return result;
    }
    if (iterationResult === Break) {
      return result;
    }
    if (iterationResult) {
      result.push(array[i]);
    }
  }
  return result;
}
function mapValues(object, callback) {
  const result = {};
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = callback(object[key], key, object);
      if (iterationResult === Break) {
        break;
      }
      if (iterationResult instanceof LastClass) {
        result[key] = iterationResult.value;
        break;
      }
      result[key] = iterationResult;
    }
  }
  return result;
}
function mapEntries(object, callback) {
  return map(entries(object), callback);
}
function mapKeys(object, callback) {
  return map(keys(object), callback);
}
function forEachValues(object, callback) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = callback(object[key], key, object);
      if (iterationResult === Break) {
        break;
      }
    }
  }
}
function forEachEntries(object, callback) {
  forEach(entries(object), callback);
}
function forEachKeys(object, callback) {
  forEach(keys(object), callback);
}
function reduceValues(object, callback, initialValue) {
  let accumulator = initialValue;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = callback(accumulator, object[key], key, object);
      if (iterationResult instanceof LastClass) {
        accumulator = iterationResult.value;
        break;
      }
      accumulator = iterationResult;
    }
  }
  return accumulator;
}
function reduceEntries(object, callback, initialValue) {
  return reduce(entries(object), callback, initialValue);
}
function reduceKeys(object, callback, initialValue) {
  return reduce(keys(object), callback, initialValue);
}
function filterValues(object, callback) {
  const result = {};
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = callback(object[key], key, object);
      if (iterationResult instanceof LastClass) {
        if (iterationResult.value) {
          result[key] = object[key];
        }
        return result;
      }
      if (iterationResult === Break) {
        return result;
      }
      if (iterationResult) {
        result[key] = object[key];
      }
    }
  }
  return result;
}
function filterKeys(object, callback) {
  return filter(keys(object), callback);
}
function filterEntries(object, callback) {
  return filter(entries(object), callback);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Break,
  Last,
  asyncFilter,
  asyncFilterEntries,
  asyncFilterEntriesParallel,
  asyncFilterKeys,
  asyncFilterKeysParallel,
  asyncFilterParallel,
  asyncFilterValues,
  asyncFilterValuesParallel,
  asyncForEach,
  asyncForEachEntries,
  asyncForEachEntriesParallel,
  asyncForEachKeys,
  asyncForEachKeysParallel,
  asyncForEachParallel,
  asyncForEachValues,
  asyncForEachValuesParallel,
  asyncMap,
  asyncMapEntries,
  asyncMapEntriesParallel,
  asyncMapKeys,
  asyncMapKeysParallel,
  asyncMapParallel,
  asyncMapValues,
  asyncMapValuesParallel,
  asyncReduce,
  asyncReduceEntries,
  asyncReduceKeys,
  asyncReduceValues,
  entries,
  filter,
  filterEntries,
  filterKeys,
  filterValues,
  forEach,
  forEachEntries,
  forEachKeys,
  forEachValues,
  keys,
  map,
  mapEntries,
  mapKeys,
  mapValues,
  reduce,
  reduceEntries,
  reduceKeys,
  reduceValues
});
