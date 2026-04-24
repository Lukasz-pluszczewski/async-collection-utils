import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export async function asyncFilterToGenerator(
  iterable: true,
  predicate: (
    item: number,
    index: number,
    iterable: true,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<AsyncGenerator<number>>;

export async function asyncFilterToGenerator<TCollection extends unknown[]>(
  array: TCollection,
  predicate: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<AsyncGenerator<TCollection[number]>>;

export async function asyncFilterToGenerator<TCollection extends Set<unknown>>(
  set: TCollection,
  predicate: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<
  AsyncGenerator<TCollection extends Set<infer TValue> ? TValue : never>
>;

export async function asyncFilterToGenerator<
  TCollection extends Map<unknown, unknown>,
>(
  map: TCollection,
  predicate: (
    value: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<
  AsyncGenerator<TCollection extends Map<unknown, infer TValue> ? TValue : never>
>;

export async function asyncFilterToGenerator<TCollection extends TypedArray>(
  typedArray: TCollection,
  predicate: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<AsyncGenerator<TCollection[number]>>;

export async function asyncFilterToGenerator<
  TCollection extends Iterable<unknown, unknown>,
>(
  iterable: TCollection,
  predicate: (
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<
  AsyncGenerator<
    TCollection extends Iterable<infer TValue, unknown> ? TValue : never
  >
>;

export async function asyncFilterToGenerator<
  TCollection extends AsyncIterable<unknown, unknown>,
>(
  asyncIterable: TCollection,
  predicate: (
    item: TCollection extends AsyncIterable<infer TValue, unknown>
      ? TValue
      : never,
    index: number,
    iterable: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<
  AsyncGenerator<
    TCollection extends AsyncIterable<infer TValue, unknown> ? TValue : never
  >
>;

export async function asyncFilterToGenerator<
  TCollection extends Record<string, unknown>,
>(
  obj: TCollection,
  predicate: (
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<AsyncGenerator<TCollection[keyof TCollection]>>;

export async function asyncFilterToGenerator(
  iterable: unknown,
  predicate: (...args: any[]) => Promise<unknown>,
): Promise<AsyncGenerator<unknown>> {
  if (iterable === true) {
    return (async function* () {
      for (let i = 0; ; i++) {
        const decision = await predicate(i, i, true);
        if (decision === Break) break;
        if (decision instanceof LastClass) {
          if (decision.value) {
            yield i;
          }
          break;
        }
        if (decision) {
          yield i;
        }
      }
    })();
  }

  if (Array.isArray(iterable)) {
    return (async function* () {
      for (let i = 0; i < iterable.length; i++) {
        const decision = await predicate(iterable[i], i, iterable);
        if (decision === Break) break;
        if (decision instanceof LastClass) {
          if (decision.value) {
            yield iterable[i];
          }
          break;
        }
        if (decision) {
          yield iterable[i];
        }
      }
    })();
  }

  if (iterable instanceof Set) {
    return (async function* () {
      let i = 0;
      for (const item of iterable) {
        const decision = await predicate(item, i++, iterable);
        if (decision === Break) break;
        if (decision instanceof LastClass) {
          if (decision.value) {
            yield item;
          }
          break;
        }
        if (decision) {
          yield item;
        }
      }
    })();
  }

  if (iterable instanceof Map) {
    return (async function* () {
      for (const [key, value] of iterable) {
        const decision = await predicate(value, key, iterable);
        if (decision === Break) break;
        if (decision instanceof LastClass) {
          if (decision.value) {
            yield value;
          }
          break;
        }
        if (decision) {
          yield value;
        }
      }
    })();
  }

  if (ArrayBuffer.isView(iterable)) {
    return (async function* () {
      let i = 0;
      for (const value of iterable as TypedArray) {
        const decision = await predicate(value, i++, iterable);
        if (decision === Break) break;
        if (decision instanceof LastClass) {
          if (decision.value) {
            yield value;
          }
          break;
        }
        if (decision) {
          yield value;
        }
      }
    })();
  }

  if (isPlainObject(iterable)) {
    return (async function* () {
      for (const key of Object.keys(iterable)) {
        const decision = await predicate(iterable[key], key, iterable);
        if (decision === Break) break;
        if (decision instanceof LastClass) {
          if (decision.value) {
            yield iterable[key];
          }
          break;
        }
        if (decision) {
          yield iterable[key];
        }
      }
    })();
  }

  return (async function* () {
    let i = 0;
    for await (const item of iterable as Iterable<unknown>) {
      const decision = await predicate(item, i++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          yield item;
        }
        break;
      }
      if (decision) {
        yield item;
      }
    }
  })();
}
