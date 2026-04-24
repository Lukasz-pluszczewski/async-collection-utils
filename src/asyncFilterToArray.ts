import { Break, isPlainObject, LastClass, TypedArray } from "./shared";

export async function asyncFilterToArray(
  iterable: true,
  predicate: (
    item: number,
    index: number,
    iterable: true,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<number[]>;

export async function asyncFilterToArray<TCollection extends unknown[]>(
  array: TCollection,
  predicate: (
    item: TCollection extends Array<infer TValue> ? TValue : never,
    index: number,
    arr: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<TCollection[number][]>;

export async function asyncFilterToArray<TCollection extends Set<unknown>>(
  set: TCollection,
  predicate: (
    item: TCollection extends Set<infer TValue> ? TValue : never,
    index: number,
    set: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<TCollection extends Set<infer TValue> ? TValue[] : never>;

export async function asyncFilterToArray<
  TCollection extends Map<unknown, unknown>,
>(
  map: TCollection,
  predicate: (
    value: TCollection extends Map<unknown, infer TValue> ? TValue : never,
    key: TCollection extends Map<infer TKey, unknown> ? TKey : never,
    map: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<TCollection extends Map<unknown, infer TValue> ? TValue[] : never>;

export async function asyncFilterToArray<TCollection extends TypedArray>(
  typedArray: TCollection,
  predicate: (
    item: TCollection[number],
    index: number,
    arr: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<TCollection[number][]>;

export async function asyncFilterToArray<
  TCollection extends Iterable<unknown, unknown>,
>(
  iterable: TCollection,
  predicate: (
    item: TCollection extends Iterable<infer TValue, unknown> ? TValue : never,
    index: number,
    iterable: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<
  TCollection extends Iterable<infer TValue, unknown> ? TValue[] : never
>;

export async function asyncFilterToArray<
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
  TCollection extends AsyncIterable<infer TValue, unknown> ? TValue[] : never
>;

export async function asyncFilterToArray<
  TCollection extends Record<string, unknown>,
>(
  obj: TCollection,
  predicate: (
    value: TCollection[keyof TCollection],
    key: Extract<keyof TCollection, string>,
    object: TCollection,
  ) => Promise<boolean | typeof Break | LastClass<boolean>>,
): Promise<TCollection[keyof TCollection][]>;

export async function asyncFilterToArray(
  iterable: unknown,
  predicate: (...args: any[]) => Promise<unknown>,
): Promise<unknown> {
  if (iterable === true) {
    const result: number[] = [];
    for (let i = 0; ; i++) {
      const decision = await predicate(i, i, true);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.push(i);
        }
        break;
      }
      if (decision) {
        result.push(i);
      }
    }
    return result;
  }

  if (Array.isArray(iterable)) {
    const result: unknown[] = [];
    for (let i = 0; i < iterable.length; i++) {
      const decision = await predicate(iterable[i], i, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.push(iterable[i]);
        }
        break;
      }
      if (decision) result.push(iterable[i]);
    }
    return result;
  }

  if (iterable instanceof Set) {
    const result: unknown[] = [];
    let i = 0;
    for (const item of iterable) {
      const decision = await predicate(item, i++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.push(item);
        }
        break;
      }
      if (decision) result.push(item);
    }
    return result;
  }

  if (iterable instanceof Map) {
    const result: unknown[] = [];
    for (const [key, value] of iterable) {
      const decision = await predicate(value, key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.push(value);
        }
        break;
      }
      if (decision) result.push(value);
    }
    return result;
  }

  if (ArrayBuffer.isView(iterable)) {
    const result: unknown[] = [];
    let i = 0;
    for (const value of iterable as TypedArray) {
      const decision = await predicate(value, i++, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.push(value);
        }
        break;
      }
      if (decision) result.push(value);
    }
    return result;
  }

  if (isPlainObject(iterable)) {
    const result: unknown[] = [];
    for (const key of Object.keys(iterable)) {
      const decision = await predicate(iterable[key], key, iterable);
      if (decision === Break) break;
      if (decision instanceof LastClass) {
        if (decision.value) {
          result.push(iterable[key]);
        }
        break;
      }
      if (decision) result.push(iterable[key]);
    }
    return result;
  }

  const result: unknown[] = [];
  let i = 0;
  for await (const item of iterable as Iterable<unknown>) {
    const decision = await predicate(item, i++, iterable);
    if (decision === Break) break;
    if (decision instanceof LastClass) {
      if (decision.value) {
        result.push(item);
      }
      break;
    }
    if (decision) result.push(item);
  }

  return result;
}
