import {
  Break,
  CustomAsyncIterable,
  CustomIterable,
  isPlainObject,
  LastClass,
  TypedArray,
} from "./shared";

export function map<TCollection extends unknown[], TUpdateValue>(
  array: TCollection,
  callback: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => TUpdateValue | typeof Break | LastClass<TUpdateValue>,
): Array<TUpdateValue>;

export function map<TCollection extends Set<unknown>, TUpdateValue>(
  set: TCollection,
  callback: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => TUpdateValue | typeof Break | LastClass<TUpdateValue>,
): Set<TUpdateValue>;

export function map<TCollection extends Map<unknown, unknown>, TUpdateValue>(
  map: TCollection,
  callback: (
    item: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => TUpdateValue | typeof Break | LastClass<TUpdateValue>,
): Map<
  TCollection extends Map<infer TKey, unknown> ? TKey : never,
  TUpdateValue
>;

export function map<TCollection extends TypedArray>(
  typedArray: TCollection,
  callback: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => TCollection[number] | typeof Break | LastClass<TCollection[number]>,
): TCollection;

export function map<
  TCollection extends CustomIterable<unknown, unknown>,
  TUpdateValue,
>(
  iterable: TCollection,
  callback: (
    item: TCollection extends CustomIterable<infer TValue, unknown>
      ? TValue
      : never,
    index: number,
    iterable: TCollection,
  ) => TUpdateValue | typeof Break | LastClass<TUpdateValue>,
): Generator<TUpdateValue>;

export function map<
  TCollection extends Record<string | number | symbol, unknown>,
  TUpdateValue,
>(
  obj: TCollection,
  callback: (
    value: TCollection[keyof TCollection],
    key: keyof TCollection & string,
    object: TCollection,
  ) => TUpdateValue | typeof Break | LastClass<TUpdateValue>,
): { [K in keyof TCollection]: TUpdateValue };

export function map(
  iterable: unknown,
  callback: (...args: any[]) => unknown,
): unknown {
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
    const result = new Set();
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
    const result = new Map();
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
    const Ctor = iterable.constructor as any;
    const arr: unknown[] = [];
    let i = 0;
    for (const value of iterable as TypedArray) {
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
    const result: Record<string, unknown> = {};
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
    for (const item of iterable as Iterable<unknown>) {
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
