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
  asyncFilterToArray: () => asyncFilterToArray,
  asyncFlatMap: () => asyncFlatMap,
  asyncFlatMapToArray: () => asyncFlatMapToArray,
  asyncForEach: () => asyncForEach,
  asyncMap: () => asyncMap,
  asyncMapToArray: () => asyncMapToArray,
  asyncReduce: () => asyncReduce,
  batch: () => batch,
  entries: () => entries,
  filter: () => filter,
  filterToArray: () => filterToArray,
  flatMap: () => flatMap,
  flatMapToArray: () => flatMapToArray,
  forEach: () => forEach,
  keys: () => keys,
  map: () => map,
  mapToArray: () => mapToArray,
  reduce: () => reduce
});
module.exports = __toCommonJS(index_exports);

// src/shared.ts
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
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      result.push([key, object[key]]);
    }
  }
  return result;
};
var keys = (object) => {
  const result = [];
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
};
var isPlainObject = (v) => {
  if (!v || typeof v !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(v);
  return prototype === null || prototype === Object.prototype;
};

// src/asyncMap.ts
async function asyncMap(iterable, callback) {
  if (Array.isArray(iterable)) {
    const result = [];
    for (let i = 0; i < iterable.length; i++) {
      const mapped = await callback(iterable[i], i, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.push(mapped.value);
        break;
      }
      result.push(mapped);
    }
    return result;
  }
  if (iterable instanceof Set) {
    const result = /* @__PURE__ */ new Set();
    let i = 0;
    for (const item of iterable) {
      const mapped = await callback(item, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.add(mapped.value);
        break;
      }
      result.add(mapped);
    }
    return result;
  }
  if (iterable instanceof Map) {
    const result = /* @__PURE__ */ new Map();
    for (const [key, value] of iterable) {
      const mapped = await callback(value, key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.set(key, mapped.value);
        break;
      }
      result.set(key, mapped);
    }
    return result;
  }
  if (ArrayBuffer.isView(iterable)) {
    const Ctor = iterable.constructor;
    const arr = [];
    let i = 0;
    for (const value of iterable) {
      const mapped = await callback(value, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        arr.push(mapped.value);
        break;
      }
      arr.push(mapped);
    }
    return new Ctor(arr);
  }
  if (isPlainObject(iterable)) {
    const result = {};
    for (const key of Object.keys(iterable)) {
      const mapped = await callback(iterable[key], key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result[key] = mapped.value;
        break;
      }
      result[key] = mapped;
    }
    return result;
  }
  async function* generator() {
    let i = 0;
    for await (const item of iterable) {
      const mapped = await callback(item, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        yield mapped.value;
        break;
      }
      yield mapped;
    }
  }
  return generator();
}

// src/map.ts
function map(iterable, callback) {
  if (Array.isArray(iterable)) {
    const result = [];
    for (let i = 0; i < iterable.length; i++) {
      const mapped = callback(iterable[i], i, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.push(mapped.value);
        break;
      }
      result.push(mapped);
    }
    return result;
  }
  if (iterable instanceof Set) {
    const result = /* @__PURE__ */ new Set();
    let i = 0;
    for (const item of iterable) {
      const mapped = callback(item, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.add(mapped.value);
        break;
      }
      result.add(mapped);
    }
    return result;
  }
  if (iterable instanceof Map) {
    const result = /* @__PURE__ */ new Map();
    for (const [key, value] of iterable) {
      const mapped = callback(value, key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.set(key, mapped.value);
        break;
      }
      result.set(key, mapped);
    }
    return result;
  }
  if (ArrayBuffer.isView(iterable)) {
    const Ctor = iterable.constructor;
    const arr = [];
    let i = 0;
    for (const value of iterable) {
      const mapped = callback(value, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        arr.push(mapped.value);
        break;
      }
      arr.push(mapped);
    }
    return new Ctor(arr);
  }
  if (isPlainObject(iterable)) {
    const result = {};
    for (const key of Object.keys(iterable)) {
      const mapped = callback(iterable[key], key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result[key] = mapped.value;
        break;
      }
      result[key] = mapped;
    }
    return result;
  }
  function* generator() {
    let i = 0;
    for (const item of iterable) {
      const mapped = callback(item, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        yield mapped.value;
        break;
      }
      yield mapped;
    }
  }
  return generator();
}

// src/asyncMapToArray.ts
async function asyncMapToArray(iterable, callback) {
  if (Array.isArray(iterable)) {
    const result2 = [];
    for (let i2 = 0; i2 < iterable.length; i2++) {
      const mapped = await callback(iterable[i2], i2, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result2.push(mapped.value);
        break;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (iterable instanceof Set) {
    const result2 = [];
    let i2 = 0;
    for (const item of iterable) {
      const mapped = await callback(item, i2++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result2.push(mapped.value);
        break;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (iterable instanceof Map) {
    const result2 = [];
    for (const [key, value] of iterable) {
      const mapped = await callback(value, key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result2.push(mapped.value);
        break;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (ArrayBuffer.isView(iterable)) {
    const result2 = [];
    let i2 = 0;
    for (const value of iterable) {
      const mapped = await callback(value, i2++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result2.push(mapped.value);
        break;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (isPlainObject(iterable)) {
    const result2 = [];
    for (const key of Object.keys(iterable)) {
      const mapped = await callback(iterable[key], key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result2.push(mapped.value);
        break;
      }
      result2.push(mapped);
    }
    return result2;
  }
  const result = [];
  let i = 0;
  for await (const item of iterable) {
    const mapped = await callback(item, i++, iterable);
    if (mapped === Break) break;
    if (mapped instanceof LastClass) {
      result.push(mapped.value);
      break;
    }
    result.push(mapped);
  }
  return result;
}

// src/mapToArray.ts
function mapToArray(iterable, callback) {
  if (Array.isArray(iterable)) {
    const result2 = [];
    for (let i2 = 0; i2 < iterable.length; i2++) {
      const mapped = callback(iterable[i2], i2, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result2.push(mapped.value);
        break;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (iterable instanceof Set) {
    const result2 = [];
    let i2 = 0;
    for (const item of iterable) {
      const mapped = callback(item, i2++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result2.push(mapped.value);
        break;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (iterable instanceof Map) {
    const result2 = [];
    for (const [key, value] of iterable) {
      const mapped = callback(value, key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result2.push(mapped.value);
        break;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (ArrayBuffer.isView(iterable)) {
    const result2 = [];
    let i2 = 0;
    for (const value of iterable) {
      const mapped = callback(value, i2++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result2.push(mapped.value);
        break;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (isPlainObject(iterable)) {
    const result2 = [];
    for (const key of Object.keys(iterable)) {
      const mapped = callback(iterable[key], key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result2.push(mapped.value);
        break;
      }
      result2.push(mapped);
    }
    return result2;
  }
  const result = [];
  let i = 0;
  for (const item of iterable) {
    const mapped = callback(item, i++, iterable);
    if (mapped === Break) break;
    if (mapped instanceof LastClass) {
      result.push(mapped.value);
      break;
    }
    result.push(mapped);
  }
  return result;
}

// src/asyncFlatMap.ts
async function asyncFlatMap(iterable, callback) {
  if (Array.isArray(iterable)) {
    const result = [];
    for (let i = 0; i < iterable.length; i++) {
      const mapped = await callback(iterable[i], i, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          result.push(...mapped.value);
          break;
        }
        result.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        result.push(...mapped);
        continue;
      }
      result.push(mapped);
    }
    return result;
  }
  if (iterable instanceof Set) {
    const result = /* @__PURE__ */ new Set();
    let i = 0;
    for (const item of iterable) {
      const mapped = await callback(item, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i2 = 0; i2 < mapped.value.length; i2++) {
            result.add(mapped.value[i2]);
          }
          break;
        }
        result.add(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        for (let i2 = 0; i2 < mapped.length; i2++) {
          result.add(mapped[i2]);
        }
        continue;
      }
      result.add(mapped);
    }
    return result;
  }
  if (ArrayBuffer.isView(iterable)) {
    const Ctor = iterable.constructor;
    const arr = [];
    let i = 0;
    for (const value of iterable) {
      const mapped = await callback(value, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          arr.push(...mapped.value);
          break;
        }
        arr.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        arr.push(...mapped);
        continue;
      }
      arr.push(mapped);
    }
    return new Ctor(arr);
  }
  async function* generator() {
    let i = 0;
    for await (const item of iterable) {
      const mapped = await callback(item, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i2 = 0; i2 < mapped.value.length; i2++) {
            yield mapped.value[i2];
          }
          break;
        }
        yield mapped.value;
        break;
      }
      if (Array.isArray(mapped)) {
        for (let i2 = 0; i2 < mapped.length; i2++) {
          yield mapped[i2];
        }
        continue;
      }
      yield mapped;
    }
  }
  return generator();
}

// src/flatMap.ts
function flatMap(iterable, callback) {
  if (Array.isArray(iterable)) {
    const result = [];
    for (let i = 0; i < iterable.length; i++) {
      const mapped = callback(iterable[i], i, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          result.push(...mapped.value);
          break;
        }
        result.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        result.push(...mapped);
        continue;
      }
      result.push(mapped);
    }
    return result;
  }
  if (iterable instanceof Set) {
    const result = /* @__PURE__ */ new Set();
    let i = 0;
    for (const item of iterable) {
      const mapped = callback(item, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i2 = 0; i2 < mapped.value.length; i2++) {
            result.add(mapped.value[i2]);
          }
          break;
        }
        result.add(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        for (let i2 = 0; i2 < mapped.length; i2++) {
          result.add(mapped[i2]);
        }
        continue;
      }
      result.add(mapped);
    }
    return result;
  }
  if (ArrayBuffer.isView(iterable)) {
    const Ctor = iterable.constructor;
    const arr = [];
    let i = 0;
    for (const value of iterable) {
      const mapped = callback(value, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          arr.push(...mapped.value);
          break;
        }
        arr.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        arr.push(...mapped);
        continue;
      }
      arr.push(mapped);
    }
    return new Ctor(arr);
  }
  function* generator() {
    let i = 0;
    for (const item of iterable) {
      const mapped = callback(item, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i2 = 0; i2 < mapped.value.length; i2++) {
            yield mapped.value[i2];
          }
          break;
        }
        yield mapped.value;
        break;
      }
      if (Array.isArray(mapped)) {
        for (let i2 = 0; i2 < mapped.length; i2++) {
          yield mapped[i2];
        }
        continue;
      }
      yield mapped;
    }
  }
  return generator();
}

// src/asyncFlatMapToArray.ts
async function asyncFlatMapToArray(iterable, callback) {
  if (Array.isArray(iterable)) {
    const result2 = [];
    for (let i2 = 0; i2 < iterable.length; i2++) {
      const mapped = await callback(iterable[i2], i2, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          result2.push(...mapped.value);
          break;
        }
        result2.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        result2.push(...mapped);
        continue;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (iterable instanceof Set) {
    const result2 = [];
    let i2 = 0;
    for (const item of iterable) {
      const mapped = await callback(item, i2++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i3 = 0; i3 < mapped.value.length; i3++) {
            result2.push(mapped.value[i3]);
          }
          break;
        }
        result2.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        for (let i3 = 0; i3 < mapped.length; i3++) {
          result2.push(mapped[i3]);
        }
        continue;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (iterable instanceof Map) {
    const result2 = [];
    for (const [key, value] of iterable) {
      const mapped = await callback(value, key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i2 = 0; i2 < mapped.value.length; i2++) {
            result2.push(mapped.value[i2]);
          }
          break;
        }
        result2.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        for (let i2 = 0; i2 < mapped.length; i2++) {
          result2.push(mapped[i2]);
        }
        continue;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (ArrayBuffer.isView(iterable)) {
    const result2 = [];
    let i2 = 0;
    for (const value of iterable) {
      const mapped = await callback(value, i2++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          result2.push(...mapped.value);
          break;
        }
        result2.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        result2.push(...mapped);
        continue;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (isPlainObject(iterable)) {
    const result2 = [];
    for (const key of Object.keys(iterable)) {
      const mapped = await callback(iterable[key], key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i2 = 0; i2 < mapped.value.length; i2++) {
            result2.push(mapped.value[i2]);
          }
          break;
        }
        result2.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        for (let i2 = 0; i2 < mapped.length; i2++) {
          result2.push(mapped[i2]);
        }
        continue;
      }
      result2.push(mapped);
    }
    return result2;
  }
  const result = [];
  let i = 0;
  for await (const item of iterable) {
    const mapped = await callback(item, i++, iterable);
    if (mapped === Break) break;
    if (mapped instanceof LastClass) {
      if (Array.isArray(mapped.value)) {
        for (let i2 = 0; i2 < mapped.value.length; i2++) {
          result.push(mapped.value[i2]);
        }
        break;
      }
      result.push(mapped.value);
      break;
    }
    if (Array.isArray(mapped)) {
      for (let i2 = 0; i2 < mapped.length; i2++) {
        result.push(mapped[i2]);
      }
      continue;
    }
    result.push(mapped);
  }
  return result;
}

// src/flatMapToArray.ts
function flatMapToArray(iterable, callback) {
  if (Array.isArray(iterable)) {
    const result2 = [];
    for (let i2 = 0; i2 < iterable.length; i2++) {
      const mapped = callback(iterable[i2], i2, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          result2.push(...mapped.value);
          break;
        }
        result2.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        result2.push(...mapped);
        continue;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (iterable instanceof Set) {
    const result2 = [];
    let i2 = 0;
    for (const item of iterable) {
      const mapped = callback(item, i2++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i3 = 0; i3 < mapped.value.length; i3++) {
            result2.push(mapped.value[i3]);
          }
          break;
        }
        result2.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        for (let i3 = 0; i3 < mapped.length; i3++) {
          result2.push(mapped[i3]);
        }
        continue;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (iterable instanceof Map) {
    const result2 = [];
    for (const [key, value] of iterable) {
      const mapped = callback(value, key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i2 = 0; i2 < mapped.value.length; i2++) {
            result2.push(mapped.value[i2]);
          }
          break;
        }
        result2.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        for (let i2 = 0; i2 < mapped.length; i2++) {
          result2.push(mapped[i2]);
        }
        continue;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (ArrayBuffer.isView(iterable)) {
    const result2 = [];
    let i2 = 0;
    for (const value of iterable) {
      const mapped = callback(value, i2++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          result2.push(...mapped.value);
          break;
        }
        result2.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        result2.push(...mapped);
        continue;
      }
      result2.push(mapped);
    }
    return result2;
  }
  if (isPlainObject(iterable)) {
    const result2 = [];
    for (const key of Object.keys(iterable)) {
      const mapped = callback(iterable[key], key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i2 = 0; i2 < mapped.value.length; i2++) {
            result2.push(mapped.value[i2]);
          }
          break;
        }
        result2.push(mapped.value);
        break;
      }
      if (Array.isArray(mapped)) {
        for (let i2 = 0; i2 < mapped.length; i2++) {
          result2.push(mapped[i2]);
        }
        continue;
      }
      result2.push(mapped);
    }
    return result2;
  }
  const result = [];
  let i = 0;
  for (const item of iterable) {
    const mapped = callback(item, i++, iterable);
    if (mapped === Break) break;
    if (mapped instanceof LastClass) {
      if (Array.isArray(mapped.value)) {
        for (let i2 = 0; i2 < mapped.value.length; i2++) {
          result.push(mapped.value[i2]);
        }
        break;
      }
      result.push(mapped.value);
      break;
    }
    if (Array.isArray(mapped)) {
      for (let i2 = 0; i2 < mapped.length; i2++) {
        result.push(mapped[i2]);
      }
      continue;
    }
    result.push(mapped);
  }
  return result;
}

// src/asyncFilter.ts
async function asyncFilter(iterable, predicate) {
  if (Array.isArray(iterable)) {
    const result = [];
    for (let i = 0; i < iterable.length; i++) {
      const decision = await predicate(iterable[i], i, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.push(iterable[i]);
        }
        break;
      }
      if (decision) result.push(iterable[i]);
    }
    return result;
  }
  if (iterable instanceof Set) {
    const result = /* @__PURE__ */ new Set();
    let i = 0;
    for (const item of iterable) {
      const decision = await predicate(item, i++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.add(item);
        }
        break;
      }
      if (decision) result.add(item);
    }
    return result;
  }
  if (iterable instanceof Map) {
    const result = /* @__PURE__ */ new Map();
    for (const [key, value] of iterable) {
      const decision = await predicate(value, key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.set(key, value);
        }
        break;
      }
      if (decision) result.set(key, value);
    }
    return result;
  }
  if (ArrayBuffer.isView(iterable)) {
    const Ctor = iterable.constructor;
    const buffer = [];
    let i = 0;
    for (const value of iterable) {
      const decision = await predicate(value, i++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          buffer.push(value);
        }
        break;
      }
      if (decision) buffer.push(value);
    }
    return new Ctor(buffer);
  }
  if (isPlainObject(iterable)) {
    const result = {};
    for (const key of Object.keys(iterable)) {
      const decision = await predicate(iterable[key], key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result[key] = iterable[key];
        }
        break;
      }
      if (decision) result[key] = iterable[key];
    }
    return result;
  }
  async function* generator() {
    let i = 0;
    for await (const item of iterable) {
      const decision = await predicate(item, i++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          yield item;
        }
        break;
      }
      if (decision) yield item;
    }
  }
  return generator();
}

// src/filter.ts
function filter(iterable, predicate) {
  if (Array.isArray(iterable)) {
    const result = [];
    for (let i = 0; i < iterable.length; i++) {
      const decision = predicate(iterable[i], i, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.push(iterable[i]);
        }
        break;
      }
      if (decision) result.push(iterable[i]);
    }
    return result;
  }
  if (iterable instanceof Set) {
    const result = /* @__PURE__ */ new Set();
    let i = 0;
    for (const item of iterable) {
      const decision = predicate(item, i++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.add(item);
        }
        break;
      }
      if (decision) result.add(item);
    }
    return result;
  }
  if (iterable instanceof Map) {
    const result = /* @__PURE__ */ new Map();
    for (const [key, value] of iterable) {
      const decision = predicate(value, key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.set(key, value);
        }
        break;
      }
      if (decision) result.set(key, value);
    }
    return result;
  }
  if (ArrayBuffer.isView(iterable)) {
    const Ctor = iterable.constructor;
    const buffer = [];
    let i = 0;
    for (const value of iterable) {
      const decision = predicate(value, i++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          buffer.push(value);
        }
        break;
      }
      if (decision) buffer.push(value);
    }
    return new Ctor(buffer);
  }
  if (isPlainObject(iterable)) {
    const result = {};
    for (const key of Object.keys(iterable)) {
      const decision = predicate(iterable[key], key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result[key] = iterable[key];
        }
        break;
      }
      if (decision) result[key] = iterable[key];
    }
    return result;
  }
  function* generator() {
    let i = 0;
    for (const item of iterable) {
      const decision = predicate(item, i++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          yield item;
        }
        break;
      }
      if (decision) yield item;
    }
  }
  return generator();
}

// src/asyncFilterToArray.ts
async function asyncFilterToArray(iterable, predicate) {
  if (Array.isArray(iterable)) {
    const result2 = [];
    for (let i2 = 0; i2 < iterable.length; i2++) {
      const decision = await predicate(iterable[i2], i2, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result2.push(iterable[i2]);
        }
        break;
      }
      if (decision) result2.push(iterable[i2]);
    }
    return result2;
  }
  if (iterable instanceof Set) {
    const result2 = [];
    let i2 = 0;
    for (const item of iterable) {
      const decision = await predicate(item, i2++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result2.push(item);
        }
        break;
      }
      if (decision) result2.push(item);
    }
    return result2;
  }
  if (iterable instanceof Map) {
    const result2 = [];
    for (const [key, value] of iterable) {
      const decision = await predicate(value, key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result2.push(value);
        }
        break;
      }
      if (decision) result2.push(value);
    }
    return result2;
  }
  if (ArrayBuffer.isView(iterable)) {
    const result2 = [];
    let i2 = 0;
    for (const value of iterable) {
      const decision = await predicate(value, i2++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result2.push(value);
        }
        break;
      }
      if (decision) result2.push(value);
    }
    return result2;
  }
  if (isPlainObject(iterable)) {
    const result2 = [];
    for (const key of Object.keys(iterable)) {
      const decision = await predicate(iterable[key], key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result2.push(iterable[key]);
        }
        break;
      }
      if (decision) result2.push(iterable[key]);
    }
    return result2;
  }
  const result = [];
  let i = 0;
  for await (const item of iterable) {
    const decision = await predicate(item, i++, iterable);
    if (decision === Break) break;
    if (decision instanceof LastClass) {
      if (decision.value) {
        result.push(item);
      }
      break;
    }
    if (decision) result.push(item);
  }
  return result;
}

// src/filterToArray.ts
function filterToArray(iterable, predicate) {
  if (Array.isArray(iterable)) {
    const result2 = [];
    for (let i2 = 0; i2 < iterable.length; i2++) {
      const decision = predicate(iterable[i2], i2, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result2.push(iterable[i2]);
        }
        break;
      }
      if (decision) result2.push(iterable[i2]);
    }
    return result2;
  }
  if (iterable instanceof Set) {
    const result2 = [];
    let i2 = 0;
    for (const item of iterable) {
      const decision = predicate(item, i2++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result2.push(item);
        }
        break;
      }
      if (decision) result2.push(item);
    }
    return result2;
  }
  if (iterable instanceof Map) {
    const result2 = [];
    for (const [key, value] of iterable) {
      const decision = predicate(value, key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result2.push(value);
        }
        break;
      }
      if (decision) result2.push(value);
    }
    return result2;
  }
  if (ArrayBuffer.isView(iterable)) {
    const result2 = [];
    let i2 = 0;
    for (const value of iterable) {
      const decision = predicate(value, i2++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result2.push(value);
        }
        break;
      }
      if (decision) result2.push(value);
    }
    return result2;
  }
  if (isPlainObject(iterable)) {
    const result2 = [];
    for (const key of Object.keys(iterable)) {
      const decision = predicate(iterable[key], key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result2.push(iterable[key]);
        }
        break;
      }
      if (decision) result2.push(iterable[key]);
    }
    return result2;
  }
  const result = [];
  let i = 0;
  for (const item of iterable) {
    const decision = predicate(item, i++, iterable);
    if (decision === Break) break;
    if (decision instanceof LastClass) {
      if (decision.value) {
        result.push(item);
      }
      break;
    }
    if (decision) result.push(item);
  }
  return result;
}

// src/asyncReduce.ts
async function asyncReduce(iterable, callback, initialValue) {
  if (Array.isArray(iterable)) {
    let acc2 = initialValue;
    for (let i2 = 0; i2 < iterable.length; i2++) {
      const result = await callback(acc2, iterable[i2], i2, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc2 = result.value;
        break;
      }
      acc2 = result;
    }
    return acc2;
  }
  if (iterable instanceof Set) {
    let acc2 = initialValue;
    let i2 = 0;
    for (const item of iterable) {
      const result = await callback(acc2, item, i2++, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc2 = result.value;
        break;
      }
      acc2 = result;
    }
    return acc2;
  }
  if (iterable instanceof Map) {
    let acc2 = initialValue;
    for (const [key, value] of iterable) {
      const result = await callback(acc2, value, key, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc2 = result.value;
        break;
      }
      acc2 = result;
    }
    return acc2;
  }
  if (ArrayBuffer.isView(iterable)) {
    let acc2 = initialValue;
    let i2 = 0;
    for (const value of iterable) {
      const result = await callback(acc2, value, i2++, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc2 = result.value;
        break;
      }
      acc2 = result;
    }
    return acc2;
  }
  if (isPlainObject(iterable)) {
    let acc2 = initialValue;
    for (const key of Object.keys(iterable)) {
      const result = await callback(acc2, iterable[key], key, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc2 = result.value;
        break;
      }
      acc2 = result;
    }
    return acc2;
  }
  let acc = initialValue;
  let i = 0;
  for await (const item of iterable) {
    const result = await callback(acc, item, i++, iterable);
    if (result === Break) break;
    if (result instanceof LastClass) {
      acc = result.value;
      break;
    }
    acc = result;
  }
  return acc;
}

// src/reduce.ts
function reduce(iterable, callback, initialValue) {
  if (Array.isArray(iterable)) {
    let acc2 = initialValue;
    for (let i2 = 0; i2 < iterable.length; i2++) {
      const result = callback(acc2, iterable[i2], i2, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc2 = result.value;
        break;
      }
      acc2 = result;
    }
    return acc2;
  }
  if (iterable instanceof Set) {
    let acc2 = initialValue;
    let i2 = 0;
    for (const item of iterable) {
      const result = callback(acc2, item, i2++, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc2 = result.value;
        break;
      }
      acc2 = result;
    }
    return acc2;
  }
  if (iterable instanceof Map) {
    let acc2 = initialValue;
    for (const [key, value] of iterable) {
      const result = callback(acc2, value, key, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc2 = result.value;
        break;
      }
      acc2 = result;
    }
    return acc2;
  }
  if (ArrayBuffer.isView(iterable)) {
    let acc2 = initialValue;
    let i2 = 0;
    for (const value of iterable) {
      const result = callback(acc2, value, i2++, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc2 = result.value;
        break;
      }
      acc2 = result;
    }
    return acc2;
  }
  if (isPlainObject(iterable)) {
    let acc2 = initialValue;
    for (const key of Object.keys(iterable)) {
      const result = callback(acc2, iterable[key], key, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc2 = result.value;
        break;
      }
      acc2 = result;
    }
    return acc2;
  }
  let acc = initialValue;
  let i = 0;
  for (const item of iterable) {
    const result = callback(acc, item, i++, iterable);
    if (result === Break) break;
    if (result instanceof LastClass) {
      acc = result.value;
      break;
    }
    acc = result;
  }
  return acc;
}

// src/asyncForEach.ts
async function asyncForEach(iterable, callback) {
  if (Array.isArray(iterable)) {
    for (let i2 = 0; i2 < iterable.length; i2++) {
      if (await callback(iterable[i2], i2, iterable) === Break) break;
    }
    return;
  }
  if (iterable instanceof Set) {
    let i2 = 0;
    for (const item of iterable) {
      if (await callback(item, i2++, iterable) === Break) break;
    }
    return;
  }
  if (iterable instanceof Map) {
    for (const [key, value] of iterable) {
      if (await callback(value, key, iterable) === Break) break;
    }
    return;
  }
  if (ArrayBuffer.isView(iterable)) {
    let i2 = 0;
    for (const value of iterable) {
      if (await callback(value, i2++, iterable) === Break) break;
    }
    return;
  }
  if (isPlainObject(iterable)) {
    for (const key of Object.keys(iterable)) {
      if (await callback(iterable[key], key, iterable) === Break) break;
    }
    return;
  }
  let i = 0;
  for await (const item of iterable) {
    if (await callback(item, i++, iterable) === Break) break;
  }
  return;
}

// src/forEach.ts
function forEach(iterable, callback) {
  if (Array.isArray(iterable)) {
    for (let i2 = 0; i2 < iterable.length; i2++) {
      if (callback(iterable[i2], i2, iterable) === Break) break;
    }
    return;
  }
  if (iterable instanceof Set) {
    let i2 = 0;
    for (const item of iterable) {
      if (callback(item, i2++, iterable) === Break) break;
    }
    return;
  }
  if (iterable instanceof Map) {
    for (const [key, value] of iterable) {
      if (callback(value, key, iterable) === Break) break;
    }
    return;
  }
  if (ArrayBuffer.isView(iterable)) {
    let i2 = 0;
    for (const value of iterable) {
      if (callback(value, i2++, iterable) === Break) break;
    }
    return;
  }
  if (isPlainObject(iterable)) {
    for (const key of Object.keys(iterable)) {
      if (callback(iterable[key], key, iterable) === Break) break;
    }
    return;
  }
  let i = 0;
  for (const item of iterable) {
    if (callback(item, i++, iterable) === Break) break;
  }
  return;
}

// src/batch.ts
function batch(iterable, batchSize) {
  if (batchSize <= 0) {
    throw new Error("Batch size cannot be smaller than 1");
  }
  if (Array.isArray(iterable)) {
    const result = [];
    let batch2 = [];
    for (let i = 0; i < iterable.length; i++) {
      batch2.push(iterable[i]);
      if (batch2.length === batchSize) {
        result.push(batch2);
        batch2 = [];
      }
    }
    if (batch2.length) {
      result.push(batch2);
    }
    return result;
  }
  if (iterable instanceof Set) {
    const result = /* @__PURE__ */ new Set();
    let batch2 = [];
    for (const item of iterable) {
      batch2.push(item);
      if (batch2.length === batchSize) {
        result.add(batch2);
        batch2 = [];
      }
    }
    if (batch2.length) {
      result.add(batch2);
    }
    return result;
  }
  if (iterable[Symbol.asyncIterator]) {
    async function* asyncGenerator() {
      let batch2 = [];
      for await (const item of iterable) {
        batch2.push(item);
        if (batch2.length === batchSize) {
          yield batch2;
          batch2 = [];
        }
      }
      if (batch2.length) {
        yield batch2;
      }
    }
    return asyncGenerator();
  }
  function* generator() {
    let batch2 = [];
    for (const item of iterable) {
      batch2.push(item);
      if (batch2.length === batchSize) {
        yield batch2;
        batch2 = [];
      }
    }
    if (batch2.length) {
      yield batch2;
    }
  }
  return generator();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Break,
  Last,
  asyncFilter,
  asyncFilterToArray,
  asyncFlatMap,
  asyncFlatMapToArray,
  asyncForEach,
  asyncMap,
  asyncMapToArray,
  asyncReduce,
  batch,
  entries,
  filter,
  filterToArray,
  flatMap,
  flatMapToArray,
  forEach,
  keys,
  map,
  mapToArray,
  reduce
});
