export type ObjectKey = string | number | symbol;
export type StringifiedObjectKey<TKey extends ObjectKey> = TKey extends string
  ? TKey
  : string;
export type ObjectEntry<TKey extends ObjectKey, TValue> = [
  StringifiedObjectKey<TKey>,
  TValue,
];
export const Break = Symbol("BreakSymbol");
export type BreakSymbol = typeof Break;

export class LastClass<T> {
  constructor(public value: T) {}
}

export type TypedArray =
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

export type CustomAsyncIterable<TValue, TReturn> = {
  next: () => Promise<IteratorResult<TValue, TReturn>>;
};
export type CustomIterable<TValue, TReturn> = {
  next: () => IteratorResult<TValue, TReturn>;
};

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

export const isPlainObject = (v) =>
  !!v &&
  typeof v === "object" &&
  (v.__proto__ === null || v.__proto__ === Object.prototype);
