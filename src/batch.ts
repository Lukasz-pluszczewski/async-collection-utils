import { CustomAsyncIterable, CustomIterable } from "./shared";

export function batch<TCollection extends Array<any>>(
  array: TCollection extends Iterator<any> ? never : TCollection,
  batchSize: number,
): Array<TCollection extends Array<infer TValue> ? TValue[] : never>;

export function batch<TCollection extends Set<any>>(
  set: TCollection,
  batchSize: number,
): Set<TCollection extends Set<infer TValue> ? TValue[] : never>;

export function batch<
  TCollection extends CustomIterable<any, any>,
  TUpdateValue,
>(
  iterable: TCollection,
  batchSize: number,
): Generator<
  TCollection extends CustomIterable<infer TValue, any> ? TValue[] : never
>;

export function batch<TCollection extends CustomAsyncIterable<any, any>>(
  asyncIterable: TCollection,
  batchSize: number,
): AsyncGenerator<
  TCollection extends CustomAsyncIterable<infer TValue, any> ? TValue[] : never
>;

export function batch(iterable: any, batchSize: number): any {
  if (batchSize <= 0) {
    throw new Error("Batch size cannot be smaller than 1");
  }

  if (Array.isArray(iterable)) {
    const result = [];
    let batch = [];
    for (let i = 0; i < iterable.length; i++) {
      batch.push(iterable[i]);
      if (batch.length === batchSize) {
        result.push(batch);
        batch = [];
      }
    }
    if (batch.length) {
      result.push(batch);
    }
    return result;
  }

  if (iterable instanceof Set) {
    const result = new Set();
    let batch = [];
    for (const item of iterable) {
      batch.push(item);
      if (batch.length === batchSize) {
        result.add(batch);
        batch = [];
      }
    }
    if (batch.length) {
      result.add(batch);
    }
    return result;
  }

  if (iterable[Symbol.asyncIterator]) {
    async function* asyncGenerator() {
      let batch = [];
      for await (const item of iterable as AsyncIterable<unknown>) {
        batch.push(item);
        if (batch.length === batchSize) {
          yield batch;
          batch = [];
        }
      }
      if (batch.length) {
        yield batch;
      }
    }

    return asyncGenerator();
  }

  function* generator() {
    let batch = [];
    for (const item of iterable as Iterable<unknown>) {
      batch.push(item);
      if (batch.length === batchSize) {
        yield batch;
        batch = [];
      }
    }
    if (batch.length) {
      yield batch;
    }
  }

  return generator();
}
