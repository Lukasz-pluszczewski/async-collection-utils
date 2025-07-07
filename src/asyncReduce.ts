import {
  Break,
  CustomAsyncIterable,
  CustomIterable,
  isPlainObject,
  LastClass,
  TypedArray,
} from "./shared";

export async function asyncReduce<
  TCollection extends unknown[],
  TAccumulator = TCollection extends Array<infer TValue> ? TValue : never,
>(
  array: TCollection,
  callback: (
    acc: TAccumulator,
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => Promise<TAccumulator | typeof Break | LastClass<TAccumulator>>,
  initialValue?: TAccumulator,
): Promise<TAccumulator>;

export async function asyncReduce<
  TCollection extends Set<unknown>,
  TAccumulator = TCollection extends Set<infer TValue> ? TValue : never,
>(
  set: TCollection,
  callback: (
    acc: TAccumulator,
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => Promise<TAccumulator | typeof Break | LastClass<TAccumulator>>,
  initialValue?: TAccumulator,
): Promise<TAccumulator>;

export async function asyncReduce<
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
  ) => Promise<TAccumulator | typeof Break | LastClass<TAccumulator>>,
  initialValue?: TAccumulator,
): Promise<TAccumulator>;

export async function asyncReduce<
  TCollection extends TypedArray,
  TAccumulator = TCollection[number],
>(
  typedArray: TCollection,
  callback: (
    acc: TAccumulator,
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => Promise<TAccumulator | typeof Break | LastClass<TAccumulator>>,
  initialValue?: TAccumulator,
): Promise<TAccumulator>;

export async function asyncReduce<
  TCollection extends CustomIterable<unknown, unknown>,
  TAccumulator = TCollection extends CustomIterable<infer TValue, unknown>
    ? TValue
    : never,
>(
  iterable: TCollection,
  callback: (
    acc: TAccumulator,
    item: TCollection extends CustomIterable<infer TValue, unknown>
      ? TValue
      : never,
    index: number,
    iterable: TCollection,
  ) => Promise<TAccumulator | typeof Break | LastClass<TAccumulator>>,
  initialValue?: TAccumulator,
): Promise<TAccumulator>;

export async function asyncReduce<
  TCollection extends CustomAsyncIterable<unknown, unknown>,
  TAccumulator = TCollection extends CustomAsyncIterable<infer TValue, unknown>
    ? TValue
    : never,
>(
  asyncIterable: TCollection,
  callback: (
    acc: TAccumulator,
    item: TCollection extends CustomAsyncIterable<infer TValue, unknown>
      ? TValue
      : never,
    index: number,
    iterable: TCollection,
  ) => Promise<TAccumulator | typeof Break | LastClass<TAccumulator>>,
  initialValue?: TAccumulator,
): Promise<TAccumulator>;

export async function asyncReduce<
  TCollection extends Record<string | number | symbol, unknown>,
  TAccumulator = TCollection[keyof TCollection],
>(
  obj: TCollection,
  callback: (
    acc: TAccumulator,
    value: TCollection[keyof TCollection],
    key: keyof TCollection & string,
    object: TCollection,
  ) => Promise<TAccumulator | typeof Break | LastClass<TAccumulator>>,
  initialValue?: TAccumulator,
): Promise<TAccumulator>;

export async function asyncReduce(
  iterable: unknown,
  callback: (...args: any[]) => Promise<unknown>,
  initialValue?: unknown,
): Promise<unknown> {
  if (Array.isArray(iterable)) {
    let acc = initialValue;
    for (let i = 0; i < iterable.length; i++) {
      const result = await callback(acc, iterable[i], i, iterable);
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

  if (iterable instanceof Map) {
    let acc = initialValue;
    for (const [key, value] of iterable) {
      const result = await callback(acc, value, key, iterable);
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
      const result = await callback(acc, value, i++, iterable);
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
      const result = await callback(acc, iterable[key], key, iterable);
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
  for await (const item of iterable as Iterable<unknown>) {
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
