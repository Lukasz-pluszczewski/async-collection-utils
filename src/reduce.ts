import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export function reduce<
  TCollection extends unknown[],
  TAccumulator = TCollection extends Array<infer TValue> ? TValue : never,
>(
  array: TCollection,
  callback: (
    acc: TAccumulator,
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => TAccumulator | typeof Break | LastClass<TAccumulator>,
  initialValue?: TAccumulator,
): TAccumulator;

export function reduce<
  TCollection extends Set<unknown>,
  TAccumulator = TCollection extends Set<infer TValue> ? TValue : never,
>(
  set: TCollection,
  callback: (
    acc: TAccumulator,
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => TAccumulator | typeof Break | LastClass<TAccumulator>,
  initialValue?: TAccumulator,
): TAccumulator;

export function reduce<
  TCollection extends Map<unknown, unknown>,
  TAccumulator = TCollection extends Map<unknown, infer TValue>
    ? TValue
    : never,
>(
  map: TCollection,
  callback: (
    acc: TAccumulator,
    item: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => TAccumulator | typeof Break | LastClass<TAccumulator>,
  initialValue?: TAccumulator,
): TAccumulator;

export function reduce<
  TCollection extends TypedArray,
  TAccumulator = TCollection[number],
>(
  typedArray: TCollection,
  callback: (
    acc: TAccumulator,
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => TAccumulator | typeof Break | LastClass<TAccumulator>,
  initialValue?: TAccumulator,
): TAccumulator;

export function reduce<
  TCollection extends Iterable<unknown, unknown>,
  TAccumulator = TCollection extends Iterable<infer TValue, unknown>
    ? TValue
    : never,
>(
  iterable: TCollection,
  callback: (
    acc: TAccumulator,
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) => TAccumulator | typeof Break | LastClass<TAccumulator>,
  initialValue?: TAccumulator,
): TAccumulator;

export function reduce<
  TCollection extends Record<string, unknown>,
  TAccumulator = TCollection[keyof TCollection],
>(
  obj: TCollection,
  callback: (
    acc: TAccumulator,
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) => TAccumulator | typeof Break | LastClass<TAccumulator>,
  initialValue?: TAccumulator,
): TAccumulator;

export function reduce(
  iterable: unknown,
  callback: (...args: any[]) => unknown,
  initialValue?: unknown,
): unknown {
  if (Array.isArray(iterable)) {
    let acc = initialValue;
    for (let i = 0; i < iterable.length; i++) {
      const result = callback(acc, iterable[i], i, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc = result.value;
        break;
      }
      acc = result;
    }
    return acc;
  }

  if (iterable instanceof Set) {
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

  if (iterable instanceof Map) {
    let acc = initialValue;
    for (const [key, value] of iterable) {
      const result = callback(acc, value, key, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc = result.value;
        break;
      }
      acc = result;
    }
    return acc;
  }

  if (ArrayBuffer.isView(iterable)) {
    let acc = initialValue;
    let i = 0;
    for (const value of iterable as TypedArray) {
      const result = callback(acc, value, i++, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc = result.value;
        break;
      }
      acc = result;
    }
    return acc;
  }

  if (isPlainObject(iterable)) {
    let acc = initialValue;
    for (const key of Object.keys(iterable)) {
      const result = callback(acc, iterable[key], key, iterable);
      if (result === Break) break;
      if (result instanceof LastClass) {
        acc = result.value;
        break;
      }
      acc = result;
    }
    return acc;
  }

  let acc = initialValue;
  let i = 0;
  for (const item of iterable as Iterable<unknown>) {
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
