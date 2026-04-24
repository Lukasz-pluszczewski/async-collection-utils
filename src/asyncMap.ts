import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export async function asyncMap<TCollection extends unknown[], TUpdateValue>(
  array: TCollection,
  callback: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<Array<TUpdateValue>>;

export async function asyncMap<TCollection extends Set<unknown>, TUpdateValue>(
  set: TCollection,
  callback: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<Set<TUpdateValue>>;

export async function asyncMap<
  TCollection extends Map<unknown, unknown>,
  TUpdateValue,
>(
  map: TCollection,
  callback: (
    item: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<
  Map<TCollection extends Map<infer TKey, unknown> ? TKey : never, TUpdateValue>
>;

export async function asyncMap<TCollection extends TypedArray>(
  typedArray: TCollection,
  callback: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => Promise<
    TCollection[number] | typeof Break | LastClass<TCollection[number]>
  >,
): Promise<TCollection>;

export async function asyncMap<
  TCollection extends Iterable<unknown, unknown>,
  TUpdateValue,
>(
  iterable: TCollection,
  callback: (
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncMap<
  TCollection extends AsyncIterable<unknown, unknown>,
  TUpdateValue,
>(
  asyncIterable: TCollection,
  callback: (
    item: TCollection extends AsyncIterable<infer TValue, unknown>
      ? TValue
      : never,
    index: number,
    iterable: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncMap<
  TCollection extends Record<string, unknown>,
  TUpdateValue,
>(
  obj: TCollection,
  callback: (
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<{ [K in keyof TCollection]: TUpdateValue }>;

export async function asyncMap(
  iterable: unknown,
  callback: (...args: any[]) => Promise<unknown>,
): Promise<unknown> {
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
    const result = new Set();
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
    const result = new Map();
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
    const Ctor = iterable.constructor as any;
    const arr: unknown[] = [];
    let i = 0;
    for (const value of iterable as TypedArray) {
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
    const result: Record<string, unknown> = {};
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
    for await (const item of iterable as Iterable<unknown>) {
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
