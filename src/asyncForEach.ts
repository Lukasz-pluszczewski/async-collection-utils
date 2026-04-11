import { Break, isPlainObject, TypedArray } from "./shared";

export async function asyncForEach(
  iterable: true,
  callback: (
    item: number,
    index: number,
    iterable: true,
  ) => Promise<void | typeof Break>,
): Promise<void>;

export async function asyncForEach<TCollection extends unknown[]>(
  array: TCollection,
  callback: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => Promise<void | typeof Break>,
): Promise<void>;

export async function asyncForEach<TCollection extends Set<unknown>>(
  set: TCollection,
  callback: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => Promise<void | typeof Break>,
): Promise<void>;

export async function asyncForEach<TCollection extends Map<unknown, unknown>>(
  map: TCollection,
  callback: (
    item: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => Promise<void | typeof Break>,
): Promise<void>;

export async function asyncForEach<TCollection extends TypedArray>(
  typedArray: TCollection,
  callback: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => Promise<void | typeof Break>,
): Promise<void>;

export async function asyncForEach<
  TCollection extends Iterable<unknown, unknown>,
>(
  iterable: TCollection,
  callback: (
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) => Promise<void | typeof Break>,
): Promise<void>;

export async function asyncForEach<
  TCollection extends AsyncIterable<unknown, unknown>,
>(
  asyncIterable: TCollection,
  callback: (
    item: TCollection extends AsyncIterable<infer TValue, unknown>
      ? TValue
      : never,
    index: number,
    iterable: TCollection,
  ) => Promise<void | typeof Break>,
): Promise<void>;

export async function asyncForEach<
  TCollection extends Record<string, unknown>,
>(
  obj: TCollection,
  callback: (
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) => Promise<void | typeof Break>,
): Promise<void>;

export async function asyncForEach(
  iterable: unknown,
  callback: (...args: any[]) => Promise<void | typeof Break>,
): Promise<void> {
  if (iterable === true) {
    for (let i = 0; ; i++) {
      if ((await callback(i, i, true)) === Break) break;
    }
    return;
  }

  if (Array.isArray(iterable)) {
    for (let i = 0; i < iterable.length; i++) {
      if ((await callback(iterable[i], i, iterable)) === Break) break;
    }
    return;
  }

  if (iterable instanceof Set) {
    let i = 0;
    for (const item of iterable) {
      if ((await callback(item, i++, iterable)) === Break) break;
    }
    return;
  }

  if (iterable instanceof Map) {
    for (const [key, value] of iterable) {
      if ((await callback(value, key, iterable)) === Break) break;
    }
    return;
  }

  if (ArrayBuffer.isView(iterable)) {
    let i = 0;
    for (const value of iterable as TypedArray) {
      if ((await callback(value, i++, iterable)) === Break) break;
    }
    return;
  }

  if (isPlainObject(iterable)) {
    for (const key of Object.keys(iterable)) {
      if ((await callback(iterable[key], key, iterable)) === Break) break;
    }
    return;
  }

  let i = 0;
  for await (const item of iterable as Iterable<unknown>) {
    if ((await callback(item, i++, iterable)) === Break) break;
  }
  return;
}
