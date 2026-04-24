export type ObjectKey = string | number;
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

export const Last = <T>(value: T) => new LastClass(value);

// --- helpers ---
export const entries = <TValue, TKey extends ObjectKey>(
  object: Record<TKey, TValue>,
): ObjectEntry<TKey, TValue>[] => {
  const result: [StringifiedObjectKey<TKey>, TValue][] = [];
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
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
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
};

export const isPlainObject = (v: unknown): v is Record<string, unknown> => {
  if (!v || typeof v !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(v);
  return prototype === null || prototype === Object.prototype;
};
