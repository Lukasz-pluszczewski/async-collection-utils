import {
  Break,
  CustomAsyncIterable,
  CustomIterable,
  LastClass,
  TypedArray,
} from "./shared";

export async function asyncFlatMap<TCollection extends unknown[], TUpdateValue>(
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
): Promise<Array<TUpdateValue>>;

export async function asyncFlatMap<
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
): Promise<Set<TUpdateValue>>;

export async function asyncFlatMap<TCollection extends TypedArray>(
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
): Promise<TCollection>;

export async function asyncFlatMap<
  TCollection extends CustomIterable<unknown, unknown>,
  TUpdateValue,
>(
  iterable: TCollection,
  callback: (
    item: TCollection extends CustomIterable<infer TValue, unknown>
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

export async function asyncFlatMap<
  TCollection extends CustomAsyncIterable<unknown, unknown>,
  TUpdateValue,
>(
  asyncIterable: TCollection,
  callback: (
    item: TCollection extends CustomAsyncIterable<infer TValue, unknown>
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

export async function asyncFlatMap(
  iterable: unknown,
  callback: (...args: any[]) => Promise<unknown>,
): Promise<unknown> {
  if (Array.isArray(iterable)) {
    const result = [];
    for (let i = 0; i < iterable.length; i++) {
      const mapped = await callback(iterable[i], i, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          result.push(...mapped.value);
          break;
        }
        result.push(mapped.value);
        break;
      }

      if (Array.isArray(mapped)) {
        result.push(...mapped);
        continue;
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
        if (Array.isArray(mapped.value)) {
          for (let i = 0; i < mapped.value.length; i++) {
            result.add(mapped.value[i]);
          }
          break;
        }
        result.add(mapped.value);
        break;
      }

      if (Array.isArray(mapped)) {
        for (let i = 0; i < mapped.length; i++) {
          result.add(mapped[i]);
        }
        continue;
      }

      result.add(mapped);
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
        if (Array.isArray(mapped.value)) {
          arr.push(...mapped.value);
          break;
        }
        arr.push(mapped.value);
        break;
      }

      if (Array.isArray(mapped)) {
        arr.push(...mapped);
        continue;
      }
      arr.push(mapped);
    }
    return new Ctor(arr);
  }

  async function* generator() {
    let i = 0;
    for await (const item of iterable as Iterable<unknown>) {
      const mapped = await callback(item, i++, iterable);
      if (mapped === Break) break;
      if (mapped instanceof LastClass) {
        if (Array.isArray(mapped.value)) {
          for (let i = 0; i < mapped.value.length; i++) {
            yield mapped.value[i];
          }
          break;
        }
        yield mapped.value;
        break;
      }
      if (Array.isArray(mapped)) {
        for (let i = 0; i < mapped.length; i++) {
          yield mapped[i];
        }
        continue;
      }
      yield mapped;
    }
  }
  return generator();
}
