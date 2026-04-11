import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export function filter<TCollection extends unknown[]>(
  array: TCollection,
  predicate: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): Array<TCollection[number]>;

export function filter<TCollection extends Set<unknown>>(
  set: TCollection,
  predicate: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): Set<TCollection extends Set<infer TValue> ? TValue : never>;

export function filter<TCollection extends Map<unknown, unknown>>(
  map: TCollection,
  predicate: (
    value: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): Map<
  TCollection extends Map<infer TKey, unknown> ? TKey : never,
  TCollection extends Map<unknown, infer TValue> ? TValue : never
>;

export function filter<TCollection extends TypedArray>(
  typedArray: TCollection,
  predicate: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): TCollection;

export function filter<TCollection extends Iterable<unknown, unknown>>(
  iterable: TCollection,
  predicate: (
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): Generator<
  TCollection extends Iterable<infer TValue, unknown> ? TValue : never
>;

export function filter<
  TCollection extends Record<string, unknown>,
>(
  obj: TCollection,
  predicate: (
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): { [K in keyof TCollection]: TCollection[K] };

export function filter(
  iterable: unknown,
  predicate: (...args: any[]) => unknown,
): unknown {
  if (Array.isArray(iterable)) {
    const result: unknown[] = [];
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
    const result = new Set();
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
    const result = new Map();
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
    const Ctor = iterable.constructor as any;
    const buffer: unknown[] = [];
    let i = 0;
    for (const value of iterable as TypedArray) {
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
    const result: Record<string, unknown> = {};
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
    for (const item of iterable as Iterable<unknown>) {
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
