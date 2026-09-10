import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export async function asyncMapToSet<TUpdateValue>(
  iterable: true,
  callback: (
    item: number,
    index: number,
    iterable: true,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<Set<TUpdateValue>>;

export async function asyncMapToSet<
  TCollection extends unknown[],
  TUpdateValue,
>(
  array: TCollection,
  callback: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<Set<TUpdateValue>>;

export async function asyncMapToSet<
  TCollection extends Set<unknown>,
  TUpdateValue,
>(
  set: TCollection,
  callback: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<Set<TUpdateValue>>;

export async function asyncMapToSet<
  TCollection extends Map<unknown, unknown>,
  TUpdateValue,
>(
  map: TCollection,
  callback: (
    item: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<Set<TUpdateValue>>;

export async function asyncMapToSet<
  TCollection extends TypedArray,
>(
  typedArray: TCollection,
  callback: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => Promise<
    TCollection[number] | typeof Break | LastClass<TCollection[number]>
  >,
): Promise<Set<TUpdateValue>>;

export async function asyncMapToSet<
  TCollection extends Iterable<unknown, unknown>,
  TUpdateValue,
>(
  iterable: TCollection,
  callback: (
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<Set<TUpdateValue>>;

export async function asyncMapToSet<
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
): Promise<Set<TUpdateValue>>;

export async function asyncMapToSet<
  TCollection extends Record<string, unknown>,
  TUpdateValue,
>(
  obj: TCollection,
  callback: (
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<Set<TUpdateValue>>;

export async function asyncMapToSet(
  iterable: unknown,
  callback: (...args: any[]) => Promise<unknown>,
): Promise<Set<unknown>> {
  const result = new Set();
  if (iterable === true) {
    for (let i = 0; ; i++) {
      const mapped = await callback(i, i, true);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.add(mapped.value);
        break;
      }
      result.add(mapped);
    }
    return result;
  }

  if (Array.isArray(iterable) || ArrayBuffer.isView(iterable)) {
    const arr = Array.isArray(iterable) ? iterable : (iterable as TypedArray);
    let i = 0;
    for (const item of arr as any) {
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

  if (iterable instanceof Set) {
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
    for (const [key, value] of iterable) {
      const mapped = await callback(value, key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.add(mapped.value);
        break;
      }
      result.add(mapped);
    }
    return result;
  }

  if (isPlainObject(iterable)) {
    for (const key of Object.keys(iterable)) {
      const mapped = await callback((iterable as any)[key], key, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        result.add(mapped.value);
        break;
      }
      result.add(mapped);
    }
    return result;
  }

  // Fallback for async iterables
  let i = 0;
  for await (const item of iterable as AsyncIterable<unknown>) {
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
