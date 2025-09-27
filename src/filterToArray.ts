import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export function filterToArray<TCollection extends unknown[]>(
  array: TCollection,
  predicate: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): TCollection[number][];

export function filterToArray<TCollection extends Set<unknown>>(
  set: TCollection,
  predicate: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): TCollection extends Set<infer TValue> ? TValue[] : never;

export function filterToArray<TCollection extends Map<unknown, unknown>>(
  map: TCollection,
  predicate: (
    value: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): TCollection extends Map<unknown, infer TValue> ? TValue[] : never;

export function filterToArray<TCollection extends TypedArray>(
  typedArray: TCollection,
  predicate: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): TCollection[number][];

export function filterToArray<TCollection extends Iterable<unknown, unknown>>(
  iterable: TCollection,
  predicate: (
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): TCollection extends Iterable<infer TValue, unknown> ? TValue[] : never;

export function filterToArray<
  TCollection extends Record<string | number | symbol, unknown>,
>(
  obj: TCollection,
  predicate: (
    value: TCollection[keyof TCollection],
    key: keyof TCollection & string,
    object: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): TCollection[keyof TCollection][];

export function filterToArray(
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
    const result: unknown[] = [];
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

  if (iterable instanceof Map) {
    const result: unknown[] = [];
    for (const [key, value] of iterable) {
      const decision = predicate(value, key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.push(value);
        }
        break;
      }
      if (decision) result.push(value);
    }
    return result;
  }

  if (ArrayBuffer.isView(iterable)) {
    const result: unknown[] = [];
    let i = 0;
    for (const value of iterable as TypedArray) {
      const decision = predicate(value, i++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.push(value);
        }
        break;
      }
      if (decision) result.push(value);
    }
    return result;
  }

  if (isPlainObject(iterable)) {
    const result: unknown[] = [];
    for (const key of Object.keys(iterable)) {
      const decision = predicate(iterable[key], key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.push(iterable[key]);
        }
        break;
      }
      if (decision) result.push(iterable[key]);
    }
    return result;
  }

  const result: unknown[] = [];
  let i = 0;
  for (const item of iterable as Iterable<unknown>) {
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
