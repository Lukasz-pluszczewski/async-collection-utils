import {
  Break,
  CustomAsyncIterable,
  CustomIterable,
  isPlainObject,
  LastClass,
  TypedArray,
} from "./shared";

export async function asyncMapToArray<
  TCollection extends unknown[],
  TUpdateValue,
>(
  array: TCollection,
  callback: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<TUpdateValue[]>;

export async function asyncMapToArray<
  TCollection extends Set<unknown>,
  TUpdateValue,
>(
  set: TCollection,
  callback: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<TUpdateValue[]>;

export async function asyncMapToArray<
  TCollection extends Map<unknown, unknown>,
  TUpdateValue,
>(
  map: TCollection,
  callback: (
    item: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<TUpdateValue[]>;

export async function asyncMapToArray<TCollection extends TypedArray>(
  typedArray: TCollection,
  callback: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => Promise<
    TCollection[number] | typeof Break | LastClass<TCollection[number]>
  >,
): Promise<TCollection[number][]>;

export async function asyncMapToArray<
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
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<TUpdateValue[]>;

export async function asyncMapToArray<
  TCollection extends CustomAsyncIterable<unknown, unknown>,
  TUpdateValue,
>(
  asyncIterable: TCollection,
  callback: (
    item: TCollection extends CustomAsyncIterable<infer TValue, unknown>
      ? TValue
      : never,
    index: number,
    iterable: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<TUpdateValue[]>;

export async function asyncMapToArray<
  TCollection extends Record<string | number | symbol, unknown>,
  TUpdateValue,
>(
  obj: TCollection,
  callback: (
    value: TCollection[keyof TCollection],
    key: keyof TCollection & string,
    object: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<TUpdateValue[]>;

export async function asyncMapToArray(
  iterable: unknown,
  callback: (...args: any[]) => Promise<unknown>,
): Promise<unknown[]> {
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
    const result = [];
    let i = 0;
    for (const item of iterable) {
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

  if (iterable instanceof Map) {
    const result = [];
    for (const [key, value] of iterable) {
      const mapped = await callback(value, key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.push(mapped.value);
        break;
      }
      result.push(mapped);
    }
    return result;
  }

  if (ArrayBuffer.isView(iterable)) {
    const result = [];
    let i = 0;
    for (const value of iterable as TypedArray) {
      const mapped = await callback(value, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.push(mapped.value);
        break;
      }
      result.push(mapped);
    }
    return result;
  }

  if (isPlainObject(iterable)) {
    const result = [];
    for (const key of Object.keys(iterable)) {
      const mapped = await callback(iterable[key], key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.push(mapped.value);
        break;
      }
      result.push(mapped);
    }
    return result;
  }

  const result = [];
  let i = 0;
  for await (const item of iterable as Iterable<unknown>) {
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
