import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export function flatMapToGenerator<TUpdateValue>(
  iterable: true,
  callback: (
    item: number,
    index: number,
    iterable: true,
  ) =>
    | TUpdateValue
    | TUpdateValue[]
    | typeof Break
    | LastClass<TUpdateValue | TUpdateValue[]>,
): Generator<TUpdateValue>;

export function flatMapToGenerator<TCollection extends unknown[], TUpdateValue>(
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
): Generator<TUpdateValue>;

export function flatMapToGenerator<
  TCollection extends Set<unknown>,
  TUpdateValue,
>(
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
): Generator<TUpdateValue>;

export function flatMapToGenerator<
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
): Generator<TUpdateValue>;

export function flatMapToGenerator<TCollection extends TypedArray>(
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
): Generator<TCollection[number]>;

export function flatMapToGenerator<
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
): Generator<TUpdateValue>;

export function flatMapToGenerator<
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
): Generator<TUpdateValue>;

export function flatMapToGenerator(
  iterable: unknown,
  callback: (...args: any[]) => unknown,
): Generator<unknown> {
  if (iterable === true) {
    return (function* () {
      for (let i = 0; ; i++) {
        const mapped = callback(i, i, true);
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
    return (function* () {
      for (let i = 0; i < iterable.length; i++) {
        const mapped = callback(iterable[i], i, iterable);
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
    return (function* () {
      let i = 0;
      for (const item of iterable) {
        const mapped = callback(item, i++, iterable);
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
    return (function* () {
      for (const [key, value] of iterable) {
        const mapped = callback(value, key, iterable);
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
    return (function* () {
      let i = 0;
      for (const value of iterable as TypedArray) {
        const mapped = callback(value, i++, iterable);
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
    return (function* () {
      for (const key of Object.keys(iterable)) {
        const mapped = callback(iterable[key], key, iterable);
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

  return (function* () {
    let i = 0;
    for (const item of iterable as Iterable<unknown>) {
      const mapped = callback(item, i++, iterable);
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
