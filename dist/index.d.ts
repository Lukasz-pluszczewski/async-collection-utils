type ObjectKey = string | number | symbol;
type StringifiedObjectKey<TKey extends ObjectKey> = TKey extends string ? TKey : string;
type ObjectEntry<TKey extends ObjectKey, TValue> = [
    StringifiedObjectKey<TKey>,
    TValue
];
declare const Break: unique symbol;
type BreakSymbol = typeof Break;
declare class LastClass<T> {
    value: T;
    constructor(value: T);
}
declare const Last: <T>(value: T) => LastClass<T>;
declare const entries: <TValue, TKey extends ObjectKey>(object: Record<TKey, TValue>) => ObjectEntry<TKey, TValue>[];
declare const keys: <TValue, TKey extends ObjectKey>(object: Record<TKey, TValue>) => StringifiedObjectKey<TKey>[];
declare function asyncMap<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<U | BreakSymbol | LastClass<U>>): Promise<U[]>;
declare function asyncForEach<T>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<void | BreakSymbol>): Promise<void>;
declare function asyncReduce<T, U>(array: T[], callback: (accumulator: U, value: T, index: number, array: T[]) => Promise<U | LastClass<U>>, initialValue?: U): Promise<U>;
declare function asyncFilter<T>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<boolean | LastClass<boolean> | BreakSymbol>): Promise<T[]>;
declare function asyncMapValues<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<U | BreakSymbol | LastClass<U>>): Promise<Record<StringifiedObjectKey<TKey>, U>>;
declare function asyncMapEntries<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<U | BreakSymbol | LastClass<U>>): Promise<U[]>;
declare function asyncMapKeys<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<U | BreakSymbol | LastClass<U>>): Promise<U[]>;
declare function asyncForEachValues<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<void | BreakSymbol>): Promise<void>;
declare function asyncForEachEntries<T, TKey extends ObjectKey>(object: Record<ObjectKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<void | BreakSymbol>): Promise<void>;
declare function asyncForEachKeys<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<void | BreakSymbol>): Promise<void>;
declare function asyncReduceValues<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (accumulator: U, value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<U | LastClass<U>>, initialValue?: U): Promise<U>;
declare function asyncReduceEntries<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (accumulator: U, entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<U | LastClass<U>>, initialValue?: U): Promise<U>;
declare function asyncReduceKeys<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (accumulator: U, key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<U | LastClass<U>>, initialValue?: U): Promise<U>;
declare function asyncFilterValues<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<boolean | LastClass<boolean> | BreakSymbol>): Promise<Record<string, T>>;
declare function asyncFilterKeys<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<boolean | LastClass<boolean> | BreakSymbol>): Promise<StringifiedObjectKey<TKey>[]>;
declare function asyncFilterEntries<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<boolean | LastClass<boolean> | BreakSymbol>): Promise<ObjectEntry<TKey, T>[]>;
declare function asyncMapParallel<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]>;
declare function asyncForEachParallel<T>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<void>): Promise<void>;
declare function asyncFilterParallel<T>(array: T[], callback: (value: T, index: number, array: T[]) => Promise<boolean>): Promise<T[]>;
declare function asyncMapValuesParallel<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<U>): Promise<Record<StringifiedObjectKey<TKey>, U>>;
declare function asyncMapEntriesParallel<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<U>): Promise<U[]>;
declare function asyncMapKeysParallel<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<U>): Promise<U[]>;
declare function asyncForEachValuesParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<void>): Promise<void>;
declare function asyncForEachEntriesParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<void>): Promise<void>;
declare function asyncForEachKeysParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<void>): Promise<void>;
declare function asyncFilterValuesParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => Promise<boolean>): Promise<Record<StringifiedObjectKey<TKey>, T>>;
declare function asyncFilterKeysParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => Promise<boolean>): Promise<StringifiedObjectKey<TKey>[]>;
declare function asyncFilterEntriesParallel<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => Promise<boolean>): Promise<ObjectEntry<TKey, T>[]>;
declare function map<T, U>(array: T[], callback: (value: T, index: number, array: T[]) => U | BreakSymbol | LastClass<U>): U[];
declare function forEach<T>(array: T[], callback: (value: T, index: number, array: T[]) => void | BreakSymbol): void;
declare function reduce<T, U>(array: T[], callback: (accumulator: U, value: T, index: number, array: T[]) => U | LastClass<U>, initialValue?: U): U;
declare function filter<T>(array: T[], callback: (value: T, index: number, array: T[]) => boolean | LastClass<boolean> | BreakSymbol): T[];
declare function mapValues<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => U | BreakSymbol | LastClass<U>): Record<StringifiedObjectKey<TKey>, U>;
declare function mapEntries<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => U | BreakSymbol | LastClass<U>): U[];
declare function mapKeys<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => U | BreakSymbol | LastClass<U>): U[];
declare function forEachValues<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => void | BreakSymbol): void;
declare function forEachEntries<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => void | BreakSymbol): void;
declare function forEachKeys<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => void | BreakSymbol): void;
declare function reduceValues<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (accumulator: U, value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => U | LastClass<U>, initialValue?: U): U;
declare function reduceEntries<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (accumulator: U, entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => U | LastClass<U>, initialValue?: U): U;
declare function reduceKeys<T, U, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (accumulator: U, key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => U | LastClass<U>, initialValue?: U): U;
declare function filterValues<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (value: T, key: StringifiedObjectKey<TKey>, object: Record<TKey, T>) => boolean | LastClass<boolean> | BreakSymbol): Record<StringifiedObjectKey<TKey>, T>;
declare function filterKeys<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (key: StringifiedObjectKey<TKey>, index: number, keys: StringifiedObjectKey<TKey>[]) => boolean | LastClass<boolean> | BreakSymbol): StringifiedObjectKey<TKey>[];
declare function filterEntries<T, TKey extends ObjectKey>(object: Record<TKey, T>, callback: (entry: ObjectEntry<TKey, T>, index: number, entries: ObjectEntry<TKey, T>[]) => boolean | LastClass<boolean> | BreakSymbol): ObjectEntry<TKey, T>[];

export { Break, Last, asyncFilter, asyncFilterEntries, asyncFilterEntriesParallel, asyncFilterKeys, asyncFilterKeysParallel, asyncFilterParallel, asyncFilterValues, asyncFilterValuesParallel, asyncForEach, asyncForEachEntries, asyncForEachEntriesParallel, asyncForEachKeys, asyncForEachKeysParallel, asyncForEachParallel, asyncForEachValues, asyncForEachValuesParallel, asyncMap, asyncMapEntries, asyncMapEntriesParallel, asyncMapKeys, asyncMapKeysParallel, asyncMapParallel, asyncMapValues, asyncMapValuesParallel, asyncReduce, asyncReduceEntries, asyncReduceKeys, asyncReduceValues, entries, filter, filterEntries, filterKeys, filterValues, forEach, forEachEntries, forEachKeys, forEachValues, keys, map, mapEntries, mapKeys, mapValues, reduce, reduceEntries, reduceKeys, reduceValues };
