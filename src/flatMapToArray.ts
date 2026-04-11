import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export function flatMapToArray<TCollection extends unknown[], TUpdateValue>(
  array: TCollection,
  callback: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) =>
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>,
): TUpdateValue[];

export function flatMapToArray<TCollection extends Set<unknown>, TUpdateValue>(
  set: TCollection,
  callback: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) =>
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>,
): TUpdateValue[];

export function flatMapToArray<
  TCollection extends Map<unknown, unknown>,
  TUpdateValue,
>(
  map: TCollection,
  callback: (
    item: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) =>
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>,
): TUpdateValue[];

export function flatMapToArray<TCollection extends TypedArray>(
  typedArray: TCollection,
  callback: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) =>
    | TCollection[number]
    | TCollection[number][]
    | typeof Break
    | LastClass<TCollection[number] | TCollection[number][]>,
): TCollection[number][];

export function flatMapToArray<
  TCollection extends Iterable<unknown, unknown>,
  TUpdateValue,
>(
  iterable: TCollection,
  callback: (
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) =>
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>,
): TUpdateValue[];

export function flatMapToArray<
  TCollection extends Record<string, unknown>,
  TUpdateValue,
>(
  obj: TCollection,
  callback: (
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) =>
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>,
): TUpdateValue[];

export function flatMapToArray(
  iterable: unknown,
  callback: (...args: any[]) => unknown,
): unknown[] {
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
    const result = [];
    let i = 0;
    for (const item of iterable) {
      const mapped = callback(item, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i = 0; i < mapped.value.length; i++) {
            result.push(mapped.value[i]);
          }
          break;
        }
        result.push(mapped.value);
        break;
      }

      if (Array.isArray(mapped)) {
        for (let i = 0; i < mapped.length; i++) {
          result.push(mapped[i]);
        }
        continue;
      }

      result.push(mapped);
    }
    return result;
  }

  if (iterable instanceof Map) {
    const result = [];
    for (const [key, value] of iterable) {
      const mapped = callback(value, key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i = 0; i < mapped.value.length; i++) {
            result.push(mapped.value[i]);
          }
          break;
        }
        result.push(mapped.value);
        break;
      }

      if (Array.isArray(mapped)) {
        for (let i = 0; i < mapped.length; i++) {
          result.push(mapped[i]);
        }
        continue;
      }

      result.push(mapped);
    }
    return result;
  }

  if (ArrayBuffer.isView(iterable)) {
    const result = [];
    let i = 0;
    for (const value of iterable as TypedArray) {
      const mapped = callback(value, i++, iterable);
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

  if (isPlainObject(iterable)) {
    const result = [];
    for (const key of Object.keys(iterable)) {
      const mapped = callback(iterable[key], key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i = 0; i < mapped.value.length; i++) {
            result.push(mapped.value[i]);
          }
          break;
        }
        result.push(mapped.value);
        break;
      }

      if (Array.isArray(mapped)) {
        for (let i = 0; i < mapped.length; i++) {
          result.push(mapped[i]);
        }
        continue;
      }

      result.push(mapped);
    }
    return result;
  }

  const result = [];
  let i = 0;
  for (const item of iterable as Iterable<unknown>) {
    const mapped = callback(item, i++, iterable);
    if (mapped === Break) break;
    if (mapped instanceof LastClass) {
      if (Array.isArray(mapped.value)) {
        for (let i = 0; i < mapped.value.length; i++) {
          result.push(mapped.value[i]);
        }
        break;
      }
      result.push(mapped.value);
      break;
    }

    if (Array.isArray(mapped)) {
      for (let i = 0; i < mapped.length; i++) {
        result.push(mapped[i]);
      }
      continue;
    }

    result.push(mapped);
  }

  return result;
}
