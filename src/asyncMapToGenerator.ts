import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export async function asyncMapToGenerator<TUpdateValue>(
  iterable: true,
  callback: (
    item: number,
    index: number,
    iterable: true,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncMapToGenerator<
  TCollection extends unknown[],
  TUpdateValue,
>(
  array: TCollection,
  callback: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncMapToGenerator<
  TCollection extends Set<unknown>,
  TUpdateValue,
>(
  set: TCollection,
  callback: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncMapToGenerator<
  TCollection extends Map<unknown, unknown>,
  TUpdateValue,
>(
  map: TCollection,
  callback: (
    item: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncMapToGenerator<TCollection extends TypedArray>(
  typedArray: TCollection,
  callback: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => Promise<
    TCollection[number] | typeof Break | LastClass<TCollection[number]>
  >,
): Promise<AsyncGenerator<TCollection[number]>>;

export async function asyncMapToGenerator<
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

export async function asyncMapToGenerator<
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

export async function asyncMapToGenerator<
  TCollection extends Record<string, unknown>,
  TUpdateValue,
>(
  obj: TCollection,
  callback: (
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) => Promise<TUpdateValue | typeof Break | LastClass<TUpdateValue>>,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncMapToGenerator(
  iterable: unknown,
  callback: (...args: any[]) => Promise<unknown>,
): Promise<AsyncGenerator<unknown>> {
  if (iterable === true) {
    return (async function* () {
      for (let i = 0; ; i++) {
        const mapped = await callback(i, i, true);
        if (mapped === Break) break;
        if (mapped instanceof LastClass) {
          yield mapped.value;
          break;
        }
        yield mapped;
      }
    })();
  }

  if (Array.isArray(iterable)) {
    return (async function* () {
      for (let i = 0; i < iterable.length; i++) {
        const mapped = await callback(iterable[i], i, iterable);
        if (mapped === Break) break;
        if (mapped instanceof LastClass) {
          yield mapped.value;
          break;
        }
        yield mapped;
      }
    })();
  }

  if (iterable instanceof Set) {
    return (async function* () {
      let i = 0;
      for (const item of iterable) {
        const mapped = await callback(item, i++, iterable);
        if (mapped === Break) break;
        if (mapped instanceof LastClass) {
          yield mapped.value;
          break;
        }
        yield mapped;
      }
    })();
  }

  if (iterable instanceof Map) {
    return (async function* () {
      for (const [key, value] of iterable) {
        const mapped = await callback(value, key, iterable);
        if (mapped === Break) break;
        if (mapped instanceof LastClass) {
          yield mapped.value;
          break;
        }
        yield mapped;
      }
    })();
  }

  if (ArrayBuffer.isView(iterable)) {
    return (async function* () {
      let i = 0;
      for (const value of iterable as TypedArray) {
        const mapped = await callback(value, i++, iterable);
        if (mapped === Break) break;
        if (mapped instanceof LastClass) {
          yield mapped.value;
          break;
        }
        yield mapped;
      }
    })();
  }

  if (isPlainObject(iterable)) {
    return (async function* () {
      for (const key of Object.keys(iterable)) {
        const mapped = await callback(iterable[key], key, iterable);
        if (mapped === Break) break;
        if (mapped instanceof LastClass) {
          yield mapped.value;
          break;
        }
        yield mapped;
      }
    })();
  }

  return (async function* () {
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
  })();
}
