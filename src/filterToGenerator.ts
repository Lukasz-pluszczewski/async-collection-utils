import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export function filterToGenerator(
  iterable: true,
  predicate: (
    item: number,
    index: number,
    iterable: true,
  ) => boolean | typeof Break | LastClass<boolean>,
): Generator<number>;

export function filterToGenerator<TCollection extends unknown[]>(
  array: TCollection,
  predicate: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): Generator<TCollection[number]>;

export function filterToGenerator<TCollection extends Set<unknown>>(
  set: TCollection,
  predicate: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): Generator<TCollection extends Set<infer TValue> ? TValue : never>;

export function filterToGenerator<TCollection extends Map<unknown, unknown>>(
  map: TCollection,
  predicate: (
    value: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): Generator<TCollection extends Map<unknown, infer TValue> ? TValue : never>;

export function filterToGenerator<TCollection extends TypedArray>(
  typedArray: TCollection,
  predicate: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): Generator<TCollection[number]>;

export function filterToGenerator<
  TCollection extends Iterable<unknown, unknown>,
>(
  iterable: TCollection,
  predicate: (
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): Generator<TCollection extends Iterable<infer TValue, unknown> ? TValue : never>;

export function filterToGenerator<
  TCollection extends Record<string, unknown>,
>(
  obj: TCollection,
  predicate: (
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) => boolean | typeof Break | LastClass<boolean>,
): Generator<TCollection[keyof TCollection]>;

export function filterToGenerator(
  iterable: unknown,
  predicate: (...args: any[]) => unknown,
): Generator<unknown> {
  if (iterable === true) {
    return (function* () {
      for (let i = 0; ; i++) {
        const decision = predicate(i, i, true);
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
    return (function* () {
      for (let i = 0; i < iterable.length; i++) {
        const decision = predicate(iterable[i], i, iterable);
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
    return (function* () {
      let i = 0;
      for (const item of iterable) {
        const decision = predicate(item, i++, iterable);
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
    return (function* () {
      for (const [key, value] of iterable) {
        const decision = predicate(value, key, iterable);
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
    return (function* () {
      let i = 0;
      for (const value of iterable as TypedArray) {
        const decision = predicate(value, i++, iterable);
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
    return (function* () {
      for (const key of Object.keys(iterable)) {
        const decision = predicate(iterable[key], key, iterable);
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

  return (function* () {
    let i = 0;
    for (const item of iterable as Iterable<unknown>) {
      const decision = predicate(item, i++, iterable);
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
