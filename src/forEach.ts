import { Break, isPlainObject, TypedArray } from "./shared";

export function forEach(
  iterable: true,
  callback: (item: number, index: number, iterable: true) => void | typeof Break,
): void;

export function forEach<TCollection extends unknown[]>(
  array: TCollection,
  callback: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => void | typeof Break,
): void;

export function forEach<TCollection extends Set<unknown>>(
  set: TCollection,
  callback: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => void | typeof Break,
): void;

export function forEach<TCollection extends Map<unknown, unknown>>(
  map: TCollection,
  callback: (
    item: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => void | typeof Break,
): void;

export function forEach<TCollection extends TypedArray>(
  typedArray: TCollection,
  callback: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => void | typeof Break,
): void;

export function forEach<TCollection extends Iterable<unknown, unknown>>(
  iterable: TCollection,
  callback: (
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) => void | typeof Break,
): void;

export function forEach<
  TCollection extends Record<string, unknown>,
>(
  obj: TCollection,
  callback: (
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) => void | typeof Break,
): void;

export function forEach(
  iterable: unknown,
  callback: (...args: any[]) => void | typeof Break,
): void {
  if (iterable === true) {
    for (let i = 0; ; i++) {
      if (callback(i, i, true) === Break) break;
    }
    return;
  }

  if (Array.isArray(iterable)) {
    for (let i = 0; i < iterable.length; i++) {
      if (callback(iterable[i], i, iterable) === Break) break;
    }
    return;
  }

  if (iterable instanceof Set) {
    let i = 0;
    for (const item of iterable) {
      if (callback(item, i++, iterable) === Break) break;
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
    let i = 0;
    for (const value of iterable as TypedArray) {
      if (callback(value, i++, iterable) === Break) break;
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
  for (const item of iterable as Iterable<unknown>) {
    if (callback(item, i++, iterable) === Break) break;
  }
  return;
}
