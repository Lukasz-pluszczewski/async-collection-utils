type ObjectKey = string | number | symbol;
type StringifiedObjectKey<TKey extends ObjectKey> = TKey extends string
  ? TKey
  : string;

type ObjectEntry<TKey extends ObjectKey, TValue> = [
  StringifiedObjectKey<TKey>,
  TValue,
];
export const Break = Symbol("BreakSymbol");
type BreakSymbol = typeof Break;

class LastClass<T> {
  constructor(public value: T) {}
}
export const Last = <T>(value: T) => new LastClass(value);

// --- helpers ---
export const entries = <TValue, TKey extends ObjectKey>(
  object: Record<TKey, TValue>,
): ObjectEntry<TKey, TValue>[] => {
  const result: [StringifiedObjectKey<TKey>, TValue][] = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      result.push([key, object[key]!]);
    }
  }
  return result;
};
export const keys = <TValue, TKey extends ObjectKey>(
  object: Record<TKey, TValue>,
): StringifiedObjectKey<TKey>[] => {
  const result: StringifiedObjectKey<TKey>[] = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      result.push(key);
    }
  }
  return result;
};

// --- async sequential - array ---
export async function asyncMap<T, U>(
  array: T[],
  callback: (
    value: T,
    index: number,
    array: T[],
  ) => Promise<U | BreakSymbol | LastClass<U>>,
): Promise<U[]> {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    const iterationResult = await callback(array[i], i, array);
    if (iterationResult === Break) {
      break;
    }
    if (iterationResult instanceof LastClass) {
      result.push(iterationResult.value);
      break;
    }
    result.push(iterationResult);
  }
  return result;
}

export async function asyncForEach<T>(
  array: T[],
  callback: (
    value: T,
    index: number,
    array: T[],
  ) => Promise<void | BreakSymbol>,
): Promise<void> {
  for (let i = 0; i < array.length; i++) {
    const iterationResult = await callback(array[i], i, array);
    if (iterationResult === Break) {
      break;
    }
  }
}

export async function asyncReduce<T, U>(
  array: T[],
  callback: (
    accumulator: U,
    value: T,
    index: number,
    array: T[],
  ) => Promise<U | LastClass<U>>,
  initialValue?: U,
): Promise<U> {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    const iterationResult = await callback(
      accumulator as U,
      array[i],
      i,
      array,
    );
    if (iterationResult instanceof LastClass) {
      accumulator = iterationResult.value;
      break;
    }
    accumulator = iterationResult;
  }
  return accumulator as U;
}

export async function asyncFilter<T>(
  array: T[],
  callback: (
    value: T,
    index: number,
    array: T[],
  ) => Promise<boolean | LastClass<boolean> | BreakSymbol>,
): Promise<T[]> {
  const result: T[] = [];
  await asyncForEach(array, async (value, index, array) => {
    const iterationResult = await callback(value, index, array);
    if (iterationResult instanceof LastClass) {
      if (iterationResult.value) {
        result.push(value);
      }
      return Break;
    }
    if (iterationResult === Break) {
      return Break;
    }
    if (iterationResult) {
      result.push(value);
    }
  });

  return result;
}

// --- async sequential - object ---
export async function asyncMapValues<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    value: T,
    key: StringifiedObjectKey<TKey>,
    object: Record<TKey, T>,
  ) => Promise<U | BreakSymbol | LastClass<U>>,
): Promise<Record<StringifiedObjectKey<TKey>, U>> {
  const result: Record<string, U> = {};
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = await callback(object[key], key, object);
      if (iterationResult === Break) {
        break;
      }
      if (iterationResult instanceof LastClass) {
        result[key] = iterationResult.value;
        break;
      }
      result[key] = iterationResult;
    }
  }
  return result;
}

export async function asyncMapEntries<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    entry: ObjectEntry<TKey, T>,
    index: number,
    entries: ObjectEntry<TKey, T>[],
  ) => Promise<U | BreakSymbol | LastClass<U>>,
): Promise<U[]> {
  return asyncMap(entries(object), callback);
}

export async function asyncMapKeys<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    key: StringifiedObjectKey<TKey>,
    index: number,
    keys: StringifiedObjectKey<TKey>[],
  ) => Promise<U | BreakSymbol | LastClass<U>>,
): Promise<U[]> {
  return asyncMap(keys(object), callback);
}

export async function asyncForEachValues<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    value: T,
    key: StringifiedObjectKey<TKey>,
    object: Record<TKey, T>,
  ) => Promise<void | BreakSymbol>,
): Promise<void> {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = await callback(object[key], key, object);
      if (iterationResult === Break) {
        break;
      }
    }
  }
}

export async function asyncForEachEntries<T, TKey extends ObjectKey>(
  object: Record<ObjectKey, T>,
  callback: (
    entry: ObjectEntry<TKey, T>,
    index: number,
    entries: ObjectEntry<TKey, T>[],
  ) => Promise<void | BreakSymbol>,
): Promise<void> {
  await asyncForEach(entries(object), callback);
}

export async function asyncForEachKeys<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    key: StringifiedObjectKey<TKey>,
    index: number,
    keys: StringifiedObjectKey<TKey>[],
  ) => Promise<void | BreakSymbol>,
): Promise<void> {
  await asyncForEach(keys(object), callback);
}

export async function asyncReduceValues<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    accumulator: U,
    value: T,
    key: StringifiedObjectKey<TKey>,
    object: Record<TKey, T>,
  ) => Promise<U | LastClass<U>>,
  initialValue?: U,
): Promise<U> {
  let accumulator = initialValue;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = await callback(
        accumulator as U,
        object[key],
        key,
        object,
      );
      if (iterationResult instanceof LastClass) {
        accumulator = iterationResult.value;
        break;
      }
      accumulator = iterationResult;
    }
  }
  return accumulator as U;
}

export async function asyncReduceEntries<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    accumulator: U,
    entry: ObjectEntry<TKey, T>,
    index: number,
    entries: ObjectEntry<TKey, T>[],
  ) => Promise<U | LastClass<U>>,
  initialValue?: U,
): Promise<U> {
  return asyncReduce(entries(object), callback, initialValue);
}

export async function asyncReduceKeys<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    accumulator: U,
    key: StringifiedObjectKey<TKey>,
    index: number,
    keys: StringifiedObjectKey<TKey>[],
  ) => Promise<U | LastClass<U>>,
  initialValue?: U,
): Promise<U> {
  return asyncReduce(keys(object), callback, initialValue);
}

export async function asyncFilterValues<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    value: T,
    key: StringifiedObjectKey<TKey>,
    object: Record<TKey, T>,
  ) => Promise<boolean | LastClass<boolean> | BreakSymbol>,
): Promise<Record<string, T>> {
  const result = {} as Record<StringifiedObjectKey<TKey>, T>;
  await asyncForEachValues(object, async (value, key, object) => {
    const iterationResult = await callback(value, key, object);
    if (iterationResult instanceof LastClass) {
      if (iterationResult.value) {
        result[key] = value;
      }
      return Break;
    }
    if (iterationResult === Break) {
      return Break;
    }
    if (iterationResult) {
      result[key] = value;
    }
  });

  return result;
}

export async function asyncFilterKeys<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    key: StringifiedObjectKey<TKey>,
    index: number,
    keys: StringifiedObjectKey<TKey>[],
  ) => Promise<boolean | LastClass<boolean> | BreakSymbol>,
): Promise<StringifiedObjectKey<TKey>[]> {
  return asyncFilter(keys(object), callback);
}

export async function asyncFilterEntries<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    entry: ObjectEntry<TKey, T>,
    index: number,
    entries: ObjectEntry<TKey, T>[],
  ) => Promise<boolean | LastClass<boolean> | BreakSymbol>,
): Promise<ObjectEntry<TKey, T>[]> {
  return asyncFilter(entries(object), callback);
}

// --- async parallel - array ---
export async function asyncMapParallel<T, U>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => Promise<U>,
): Promise<U[]> {
  return Promise.all(array.map(callback));
}

export async function asyncForEachParallel<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => Promise<void>,
): Promise<void> {
  await Promise.all(array.map(callback));
}

export async function asyncFilterParallel<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => Promise<boolean>,
): Promise<T[]> {
  const result = await Promise.all(array.map(callback));
  return array.filter((_, index) => result[index]);
}

// --- async parallel - object ---
export async function asyncMapValuesParallel<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    value: T,
    key: StringifiedObjectKey<TKey>,
    object: Record<TKey, T>,
  ) => Promise<U>,
): Promise<Record<StringifiedObjectKey<TKey>, U>> {
  const result = {} as Record<StringifiedObjectKey<TKey>, U>;
  await Promise.all(
    keys(object).map(async (key) => {
      result[key] = await callback(object[key as TKey], key, object);
    }),
  );
  return result;
}

export async function asyncMapEntriesParallel<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    entry: ObjectEntry<TKey, T>,
    index: number,
    entries: ObjectEntry<TKey, T>[],
  ) => Promise<U>,
): Promise<U[]> {
  return asyncMapParallel(entries(object), callback);
}

export async function asyncMapKeysParallel<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    key: StringifiedObjectKey<TKey>,
    index: number,
    keys: StringifiedObjectKey<TKey>[],
  ) => Promise<U>,
): Promise<U[]> {
  return asyncMapParallel(keys(object), callback);
}

export async function asyncForEachValuesParallel<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    value: T,
    key: StringifiedObjectKey<TKey>,
    object: Record<TKey, T>,
  ) => Promise<void>,
): Promise<void> {
  await Promise.all(
    keys(object).map(async (key) => {
      await callback(object[key as TKey], key, object);
    }),
  );
}

export async function asyncForEachEntriesParallel<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    entry: ObjectEntry<TKey, T>,
    index: number,
    entries: ObjectEntry<TKey, T>[],
  ) => Promise<void>,
): Promise<void> {
  await asyncForEachParallel(entries(object), callback);
}

export async function asyncForEachKeysParallel<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    key: StringifiedObjectKey<TKey>,
    index: number,
    keys: StringifiedObjectKey<TKey>[],
  ) => Promise<void>,
): Promise<void> {
  await asyncForEachParallel(keys(object), callback);
}

export async function asyncFilterValuesParallel<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    value: T,
    key: StringifiedObjectKey<TKey>,
    object: Record<TKey, T>,
  ) => Promise<boolean>,
): Promise<Record<StringifiedObjectKey<TKey>, T>> {
  const result = {} as Record<StringifiedObjectKey<TKey>, T>;
  await Promise.all(
    keys(object).map(async (key) => {
      if (await callback(object[key as TKey], key, object)) {
        result[key] = object[key as TKey];
      }
    }),
  );
  return result;
}

export async function asyncFilterKeysParallel<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    key: StringifiedObjectKey<TKey>,
    index: number,
    keys: StringifiedObjectKey<TKey>[],
  ) => Promise<boolean>,
): Promise<StringifiedObjectKey<TKey>[]> {
  const objectKeys = keys(object);
  const result = await Promise.all(
    objectKeys.map(async (key, index) => {
      if (await callback(key, index, objectKeys)) {
        return key;
      }
    }),
  );
  return result.filter(Boolean) as StringifiedObjectKey<TKey>[];
}

export async function asyncFilterEntriesParallel<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    entry: ObjectEntry<TKey, T>,
    index: number,
    entries: ObjectEntry<TKey, T>[],
  ) => Promise<boolean>,
): Promise<ObjectEntry<TKey, T>[]> {
  const objectEntries = entries(object);
  const result = await Promise.all(
    objectEntries.map(async (entry, index) => {
      if (await callback(entry, index, objectEntries)) {
        return entry;
      }
    }),
  );
  return result.filter(Boolean) as ObjectEntry<TKey, T>[];
}

// --- sync ---
export function map<T, U>(
  array: T[],
  callback: (
    value: T,
    index: number,
    array: T[],
  ) => U | BreakSymbol | LastClass<U>,
): U[] {
  const result: U[] = [];
  for (let i = 0; i < array.length; i++) {
    const iterationResult = callback(array[i]!, i, array);
    if (iterationResult === Break) {
      break;
    }
    if (iterationResult instanceof LastClass) {
      result.push(iterationResult.value);
      break;
    }
    result.push(iterationResult);
  }
  return result;
}

export function forEach<T>(
  array: T[],
  callback: (value: T, index: number, array: T[]) => void | BreakSymbol,
): void {
  for (let i = 0; i < array.length; i++) {
    const iterationResult = callback(array[i], i, array);
    if (iterationResult === Break) {
      break;
    }
  }
}

export function reduce<T, U>(
  array: T[],
  callback: (
    accumulator: U,
    value: T,
    index: number,
    array: T[],
  ) => U | LastClass<U>,
  initialValue?: U,
): U {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    const iterationResult = callback(accumulator as U, array[i], i, array);
    if (iterationResult instanceof LastClass) {
      accumulator = iterationResult.value;
      break;
    }
    accumulator = iterationResult;
  }
  return accumulator as U;
}

export function filter<T>(
  array: T[],
  callback: (
    value: T,
    index: number,
    array: T[],
  ) => boolean | LastClass<boolean> | BreakSymbol,
): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    const iterationResult = callback(array[i], i, array);
    if (iterationResult instanceof LastClass) {
      if (iterationResult.value) {
        result.push(array[i]);
      }
      return result;
    }
    if (iterationResult === Break) {
      return result;
    }
    if (iterationResult) {
      result.push(array[i]);
    }
  }
  return result;
}

export function mapValues<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    value: T,
    key: StringifiedObjectKey<TKey>,
    object: Record<TKey, T>,
  ) => U | BreakSymbol | LastClass<U>,
): Record<StringifiedObjectKey<TKey>, U> {
  const result = {} as Record<StringifiedObjectKey<TKey>, U>;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = callback(object[key], key, object);
      if (iterationResult === Break) {
        break;
      }
      if (iterationResult instanceof LastClass) {
        result[key] = iterationResult.value;
        break;
      }
      result[key] = iterationResult;
    }
  }
  return result;
}

export function mapEntries<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    entry: ObjectEntry<TKey, T>,
    index: number,
    entries: ObjectEntry<TKey, T>[],
  ) => U | BreakSymbol | LastClass<U>,
): U[] {
  return map(entries(object), callback);
}

export function mapKeys<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    key: StringifiedObjectKey<TKey>,
    index: number,
    keys: StringifiedObjectKey<TKey>[],
  ) => U | BreakSymbol | LastClass<U>,
): U[] {
  return map(keys(object), callback);
}

export function forEachValues<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    value: T,
    key: StringifiedObjectKey<TKey>,
    object: Record<TKey, T>,
  ) => void | BreakSymbol,
): void {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = callback(object[key], key, object);
      if (iterationResult === Break) {
        break;
      }
    }
  }
}

export function forEachEntries<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    entry: ObjectEntry<TKey, T>,
    index: number,
    entries: ObjectEntry<TKey, T>[],
  ) => void | BreakSymbol,
): void {
  forEach(entries(object), callback);
}

export function forEachKeys<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    key: StringifiedObjectKey<TKey>,
    index: number,
    keys: StringifiedObjectKey<TKey>[],
  ) => void | BreakSymbol,
): void {
  forEach(keys(object), callback);
}

export function reduceValues<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    accumulator: U,
    value: T,
    key: StringifiedObjectKey<TKey>,
    object: Record<TKey, T>,
  ) => U | LastClass<U>,
  initialValue?: U,
): U {
  let accumulator = initialValue;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = callback(
        accumulator as U,
        object[key],
        key,
        object,
      );
      if (iterationResult instanceof LastClass) {
        accumulator = iterationResult.value;
        break;
      }
      accumulator = iterationResult;
    }
  }
  return accumulator as U;
}

export function reduceEntries<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    accumulator: U,
    entry: ObjectEntry<TKey, T>,
    index: number,
    entries: ObjectEntry<TKey, T>[],
  ) => U | LastClass<U>,
  initialValue?: U,
): U {
  return reduce(entries(object), callback, initialValue);
}

export function reduceKeys<T, U, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    accumulator: U,
    key: StringifiedObjectKey<TKey>,
    index: number,
    keys: StringifiedObjectKey<TKey>[],
  ) => U | LastClass<U>,
  initialValue?: U,
): U {
  return reduce(keys(object), callback, initialValue);
}

export function filterValues<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    value: T,
    key: StringifiedObjectKey<TKey>,
    object: Record<TKey, T>,
  ) => boolean | LastClass<boolean> | BreakSymbol,
): Record<StringifiedObjectKey<TKey>, T> {
  const result = {} as Record<StringifiedObjectKey<TKey>, T>;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = callback(object[key], key, object);
      if (iterationResult instanceof LastClass) {
        if (iterationResult.value) {
          result[key] = object[key];
        }
        return result;
      }
      if (iterationResult === Break) {
        return result;
      }
      if (iterationResult) {
        result[key] = object[key];
      }
    }
  }
  return result;
}

export function filterKeys<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    key: StringifiedObjectKey<TKey>,
    index: number,
    keys: StringifiedObjectKey<TKey>[],
  ) => boolean | LastClass<boolean> | BreakSymbol,
): StringifiedObjectKey<TKey>[] {
  return filter(keys(object), callback);
}

export function filterEntries<T, TKey extends ObjectKey>(
  object: Record<TKey, T>,
  callback: (
    entry: ObjectEntry<TKey, T>,
    index: number,
    entries: ObjectEntry<TKey, T>[],
  ) => boolean | LastClass<boolean> | BreakSymbol,
): ObjectEntry<TKey, T>[] {
  return filter(entries(object), callback);
}
