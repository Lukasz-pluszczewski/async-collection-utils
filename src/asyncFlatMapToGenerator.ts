import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export async function asyncFlatMapToGenerator<TUpdateValue>(
  iterable: true,
  callback: (
    item: number,
    index: number,
    iterable: true,
  ) => Promise<
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>
  >,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncFlatMapToGenerator<
  TCollection extends unknown[],
  TUpdateValue,
>(
  array: TCollection,
  callback: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => Promise<
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>
  >,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncFlatMapToGenerator<
  TCollection extends Set<unknown>,
  TUpdateValue,
>(
  set: TCollection,
  callback: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => Promise<
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>
  >,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncFlatMapToGenerator<
  TCollection extends Map<unknown, unknown>,
  TUpdateValue,
>(
  map: TCollection,
  callback: (
    item: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => Promise<
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>
  >,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncFlatMapToGenerator<TCollection extends TypedArray>(
  typedArray: TCollection,
  callback: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => Promise<
    | TCollection[number]
    | TCollection[number][]
    | typeof Break
    | LastClass<TCollection[number] | TCollection[number][]>
  >,
): Promise<AsyncGenerator<TCollection[number]>>;

export async function asyncFlatMapToGenerator<
  TCollection extends Iterable<unknown, unknown>,
  TUpdateValue,
>(
  iterable: TCollection,
  callback: (
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) => Promise<
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>
  >,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncFlatMapToGenerator<
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
  ) => Promise<
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>
  >,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncFlatMapToGenerator<
  TCollection extends Record<string, unknown>,
  TUpdateValue,
>(
  obj: TCollection,
  callback: (
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) => Promise<
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>
  >,
): Promise<AsyncGenerator<TUpdateValue>>;

export async function asyncFlatMapToGenerator(
  iterable: unknown,
  callback: (...args: any[]) => Promise<unknown>,
): Promise<AsyncGenerator<unknown>> {
  if (iterable === true) {
    return (async function* () {
      for (let i = 0; ; i++) {
        const mapped = await callback(i, i, true);
        if (mapped === Break) break;
        if (mapped instanceof LastClass) {
          if (Array.isArray(mapped.value)) {
            for (let index = 0; index < mapped.value.length; index++) {
              yield mapped.value[index];
            }
            break;
          }
          yield mapped.value;
          break;
        }

        if (Array.isArray(mapped)) {
          for (let index = 0; index < mapped.length; index++) {
            yield mapped[index];
          }
          continue;
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
          if (Array.isArray(mapped.value)) {
            for (let index = 0; index < mapped.value.length; index++) {
              yield mapped.value[index];
            }
            break;
          }
          yield mapped.value;
          break;
        }

        if (Array.isArray(mapped)) {
          for (let index = 0; index < mapped.length; index++) {
            yield mapped[index];
          }
          continue;
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
          if (Array.isArray(mapped.value)) {
            for (let index = 0; index < mapped.value.length; index++) {
              yield mapped.value[index];
            }
            break;
          }
          yield mapped.value;
          break;
        }

        if (Array.isArray(mapped)) {
          for (let index = 0; index < mapped.length; index++) {
            yield mapped[index];
          }
          continue;
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
          if (Array.isArray(mapped.value)) {
            for (let index = 0; index < mapped.value.length; index++) {
              yield mapped.value[index];
            }
            break;
          }
          yield mapped.value;
          break;
        }

        if (Array.isArray(mapped)) {
          for (let index = 0; index < mapped.length; index++) {
            yield mapped[index];
          }
          continue;
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
          if (Array.isArray(mapped.value)) {
            for (let index = 0; index < mapped.value.length; index++) {
              yield mapped.value[index];
            }
            break;
          }
          yield mapped.value;
          break;
        }

        if (Array.isArray(mapped)) {
          for (let index = 0; index < mapped.length; index++) {
            yield mapped[index];
          }
          continue;
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
          if (Array.isArray(mapped.value)) {
            for (let index = 0; index < mapped.value.length; index++) {
              yield mapped.value[index];
            }
            break;
          }
          yield mapped.value;
          break;
        }

        if (Array.isArray(mapped)) {
          for (let index = 0; index < mapped.length; index++) {
            yield mapped[index];
          }
          continue;
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
        if (Array.isArray(mapped.value)) {
          for (let index = 0; index < mapped.value.length; index++) {
            yield mapped.value[index];
          }
          break;
        }
        yield mapped.value;
        break;
      }

      if (Array.isArray(mapped)) {
        for (let index = 0; index < mapped.length; index++) {
          yield mapped[index];
        }
        continue;
      }

      yield mapped;
    }
  })();
}
