type ObjectKey = string | number | symbol;
type StringifiedObjectKey<TKey extends ObjectKey> = TKey extends string ? TKey : string;

type ObjectEntry<TKey extends ObjectKey, TValue> = [StringifiedObjectKey<TKey>, TValue];
export const Break = Symbol('BreakSymbol');
type BreakSymbol = typeof Break;

class LastClass<T> {
  constructor(public value: T) {}
}
export const Last = <T>(value: T) => new LastClass(value);


// --- async sequential - array ---
export async function asyncMap<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<U | BreakSymbol | LastClass<U>>): Promise<U[]> {
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

export async function asyncForEach<T>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<void | BreakSymbol>): Promise<void> {
  for (let i = 0; i < array.length; i++) {
    const iterationResult = await callback(array[i], i, array);
    if (iterationResult === Break) {
      break;
    }
  }
}

export async function asyncReduce<T, U>(array: T[], callback: (accumulator: U, value: T, index: number, array: T[]) => Promise<U | LastClass<U>>, initialValue?: U): Promise<U> {
  let accumulator = initialValue;
  for (let i = 0; i < array.length; i++) {
    const iterationResult = await callback(accumulator as U, array[i], i, array);
    if (iterationResult instanceof LastClass) {
      accumulator = iterationResult.value;
      break;
    }
    accumulator = iterationResult;
  }
  return accumulator as U;
}

export async function asyncFilter<T>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<boolean | LastClass<boolean> | BreakSymbol>): Promise<T[]> {
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
export async function asyncMapValues<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<U | BreakSymbol | LastClass<U>>): Promise<Record<StringifiedObjectKey<TKey>, U>> {
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

export async function asyncMapEntries<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<U | BreakSymbol | LastClass<U>>): Promise<U[]> {
  return asyncMap(Object.entries(object) as ObjectEntry<TKey, T>[], callback);
}

export async function asyncMapKeys<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<U | BreakSymbol | LastClass<U>>): Promise<U[]> {
  return asyncMap(Object.keys(object) as StringifiedObjectKey<TKey>[], callback);
}

export async function asyncForEachValues<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<void | BreakSymbol>): Promise<void> {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = await callback(object[key], key, object);
      if (iterationResult === Break) {
        break;
      }
    }
  }
}

export async function asyncForEachEntries<T, TKey extends ObjectKey>(object: Record<ObjectKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<void | BreakSymbol>): Promise<void> {
  await asyncForEach(Object.entries(object) as ObjectEntry<TKey, T>[], callback);
}

export async function asyncForEachKeys<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<void | BreakSymbol>): Promise<void> {
  await asyncForEach(Object.keys(object) as StringifiedObjectKey<TKey>[], callback);
}

export async function asyncReduceValues<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (accumulator: U, value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<U | LastClass<U>>, initialValue?: U): Promise<U> {
  let accumulator = initialValue;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const iterationResult = await callback(accumulator as U, object[key], key, object);
      if (iterationResult instanceof LastClass) {
        accumulator = iterationResult.value;
        break;
      }
      accumulator = iterationResult;
    }
  }
  return accumulator as U;
}

export async function asyncReduceEntries<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (accumulator: U, entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<U | LastClass<U>>, initialValue?: U): Promise<U> {
  return asyncReduce(Object.entries(object) as ObjectEntry<TKey, T>[], callback, initialValue);
}

export async function asyncReduceKeys<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (accumulator: U, key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<U | LastClass<U>>, initialValue?: U): Promise<U> {
  return asyncReduce(Object.keys(object) as StringifiedObjectKey<TKey>[], callback, initialValue);
}

export async function asyncFilterValues<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<boolean | LastClass<boolean> | BreakSymbol>): Promise<Record<string, T>> {
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

export async function asyncFilterKeys<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<boolean | LastClass<boolean> | BreakSymbol>): Promise<StringifiedObjectKey<TKey>[]> {
  return asyncFilter(Object.keys(object) as StringifiedObjectKey<TKey>[], callback);
}

export async function asyncFilterEntries<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<boolean | LastClass<boolean> | BreakSymbol>): Promise<ObjectEntry<TKey, T>[]> {
  return asyncFilter(Object.entries(object) as ObjectEntry<TKey, T>[], callback);
}


// --- async parallel - array ---
export async function asyncMapParallel<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]> {
  return Promise.all(array.map(callback));
}

export async function asyncForEachParallel<T>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<void>): Promise<void> {
  await Promise.all(array.map(callback));
}

export async function asyncFilterParallel<T>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<boolean>): Promise<T[]> {
  const result = await Promise.all(array.map(callback));
  return array.filter((_, index) => result[index]);
}

// --- async parallel - object ---
export async function asyncMapValuesParallel<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<U>): Promise<Record<StringifiedObjectKey<TKey>, U>> {
  const result = {} as Record<StringifiedObjectKey<TKey>, U>;
  await Promise.all((Object.keys(object) as StringifiedObjectKey<TKey>[]).map(async (key) => {
    result[key] = await callback(object[key as TKey], key, object);
  }));
  return result;
}

export async function asyncMapEntriesParallel<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<U>): Promise<U[]> {
  return asyncMapParallel(Object.entries(object) as ObjectEntry<TKey, T>[], callback);
}

export async function asyncMapKeysParallel<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<U>): Promise<U[]> {
  return asyncMapParallel(Object.keys(object) as StringifiedObjectKey<TKey>[], callback);
}

export async function asyncForEachValuesParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<void>): Promise<void> {
  await Promise.all((Object.keys(object) as StringifiedObjectKey<TKey>[]).map(async (key) => {
    await callback(object[key as TKey], key, object);
  }));
}

export async function asyncForEachEntriesParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<void>): Promise<void> {
  await asyncForEachParallel(Object.entries(object) as ObjectEntry<TKey, T>[], callback);
}

export async function asyncForEachKeysParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<void>): Promise<void> {
  await asyncForEachParallel(Object.keys(object) as StringifiedObjectKey<TKey>[], callback);
}

export async function asyncFilterValuesParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<boolean>): Promise<Record<StringifiedObjectKey<TKey>, T>> {
  const result = {} as Record<StringifiedObjectKey<TKey>, T>;
  await Promise.all((Object.keys(object) as StringifiedObjectKey<TKey>[]).map(async (key) => {
    if (await callback(object[key as TKey], key, object)) {
      result[key] = object[key as TKey];
    }
  }));
  return result;
}

export async function asyncFilterKeysParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<boolean>): Promise<StringifiedObjectKey<TKey>[]> {
  const keys = Object.keys(object) as StringifiedObjectKey<TKey>[];
  const result = await Promise.all(keys.map(async (key, index) => {
    if (await callback(key, index, keys)) {
      return key;
    }
  }));
  return result.filter(Boolean) as StringifiedObjectKey<TKey>[];
}

export async function asyncFilterEntriesParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<boolean>): Promise<ObjectEntry<TKey, T>[]> {
  const entries = Object.entries(object) as ObjectEntry<TKey, T>[];
  const result = await Promise.all(entries.map(async (entry, index) => {
    if (await callback(entry, index, entries)) {
      return entry;
    }
  }));
  return result.filter(Boolean) as ObjectEntry<TKey, T>[];
}
