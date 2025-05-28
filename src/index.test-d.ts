import { describe, it, expectTypeOf } from 'vitest';

import {
  Break,
  Last,

  /* sequential ─ array */
  asyncMap,
  asyncForEach,
  asyncReduce,
  asyncFilter,

  /* sequential ─ object */
  asyncMapValues,
  asyncMapEntries,
  asyncMapKeys,
  asyncForEachValues,
  asyncForEachEntries,
  asyncForEachKeys,
  asyncReduceValues,
  asyncReduceEntries,
  asyncReduceKeys,
  asyncFilterValues,
  asyncFilterEntries,
  asyncFilterKeys,

  /* parallel ─ array */
  asyncMapParallel,
  asyncForEachParallel,
  asyncFilterParallel,

  /* parallel ─ object */
  asyncMapValuesParallel,
  asyncMapEntriesParallel,
  asyncMapKeysParallel,
  asyncForEachValuesParallel,
  asyncForEachEntriesParallel,
  asyncForEachKeysParallel,
  asyncFilterValuesParallel,
  asyncFilterEntriesParallel,
  asyncFilterKeysParallel,

  /* sync */
  mapValues,
  mapEntries,
  mapKeys,
  forEachValues,
  forEachEntries,
  forEachKeys,
  reduceValues,
  reduceEntries, reduceKeys, filterValues, filterKeys, filterEntries, map, forEach, reduce, filter,
} from './index';

describe('sequential helpers – array', () => {
  it('asyncMap infers the mapped element type', () => {
    const promise = asyncMap([1, 2, 3], async value => value.toString());
    expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
  });

  it('asyncMap allows Break in the callback without changing output type', () => {
    const promise = asyncMap([1, 2, 3], async value => (value > 1 ? Break : value * 2));
    expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
  });

  it('asyncMap allows Last in the callback without changing output type', () => {
    const promise = asyncMap([1, 2, 3], async value =>
      value > 1 ? Last(value * 2) : value * 2,
    );
    expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
  });

  it('asyncForEach returns a void promise', () => {
    const promise = asyncForEach([1, 2], async () => {});
    expectTypeOf(promise).toEqualTypeOf<Promise<void>>();
  });

  it('asyncReduce infers the accumulator type', () => {
    const promise = asyncReduce<number, number>(
      [1, 2, 3],
      async (acc, value) => acc + value,
      0,
    );
    expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
  });

  it('asyncFilter returns the same element type', () => {
    const promise = asyncFilter([1, 2, 3], async value => value > 1);
    expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
  });
});

describe('sequential helpers – object', () => {
  const obj = { a: 1, b: 2 } as const;

  it('asyncMapValues returns Record<string, U>', () => {
    const promise = asyncMapValues(obj, async value => value.toString());
    expectTypeOf(promise).toEqualTypeOf<Promise<Record<'a' | 'b', string>>>();
  });

  it('asyncMapEntries returns an array of U', () => {
    const promise = asyncMapEntries(obj, async ([k]) => k);
    expectTypeOf(promise).toEqualTypeOf<Promise<('a' | 'b')[]>>();
  });

  it('asyncMapKeys returns an array of U', () => {
    const promise = asyncMapKeys(obj, async key => key.toUpperCase());
    expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
  });

  it('asyncForEachValues returns a void promise', () => {
    const promise = asyncForEachValues(obj, async () => {});
    expectTypeOf(promise).toEqualTypeOf<Promise<void>>();
  });

  it('asyncReduceValues infers accumulator type', () => {
    const promise = asyncReduceValues<typeof obj[keyof typeof obj], number, keyof typeof obj>(
      obj,
      async (acc, value) => acc + value,
      0,
    );
    expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
  });

  it('asyncFilterValues returns Record<string, T>', () => {
    const promise = asyncFilterValues(obj, async value => value > 1);
    expectTypeOf(promise).toEqualTypeOf<Promise<Record<string, 1 | 2>>>();
  });

  it('asyncFilterKeys returns an array of keys', () => {
    const promise = asyncFilterKeys(obj, async key => key === 'a');
    expectTypeOf(promise).toEqualTypeOf<Promise<('a' | 'b')[]>>();
  });

  it('asyncFilterEntries returns an array of entries', () => {
    const promise = asyncFilterEntries(obj, async ([, value]) => value > 1);
    expectTypeOf(promise).toEqualTypeOf<Promise<['a' | 'b', 1 | 2][]>>();
  });
});

describe('parallel helpers – array', () => {
  it('asyncMapParallel infers mapped element type', () => {
    const promise = asyncMapParallel([1, 2, 3], async value => value.toString());
    expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
  });

  it('asyncForEachParallel returns void promise', () => {
    const promise = asyncForEachParallel([1, 2], async () => {});
    expectTypeOf(promise).toEqualTypeOf<Promise<void>>();
  });

  it('asyncFilterParallel returns T[]', () => {
    const promise = asyncFilterParallel([1, 2, 3], async value => value > 1);
    expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
  });
});

describe('parallel helpers – object', () => {
  const obj = { foo: 1, bar: 2 } as const;

  it('asyncMapValuesParallel returns Record<TKey, U>', () => {
    const promise = asyncMapValuesParallel(obj, async value => value.toString());
    expectTypeOf(promise).toEqualTypeOf<Promise<Record<'foo' | 'bar', string>>>();
  });

  it('asyncMapEntriesParallel returns U[]', () => {
    const promise = asyncMapEntriesParallel(obj, async ([key]) => key);
    expectTypeOf(promise).toEqualTypeOf<Promise<('foo' | 'bar')[]>>();
  });

  it('asyncMapKeysParallel returns U[]', () => {
    const promise = asyncMapKeysParallel(obj, async key => key.toUpperCase());
    expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
  });

  it('asyncForEachValuesParallel returns void promise', () => {
    const promise = asyncForEachValuesParallel(obj, async () => {});
    expectTypeOf(promise).toEqualTypeOf<Promise<void>>();
  });

  it('asyncFilterValuesParallel returns Record<TKey, T>', () => {
    const promise = asyncFilterValuesParallel(obj, async value => value > 1);
    expectTypeOf(promise).toEqualTypeOf<Promise<Record<'foo' | 'bar', 1 | 2>>>();
  });

  it('asyncFilterKeysParallel returns TKey[]', () => {
    const promise = asyncFilterKeysParallel(obj, async key => key === 'foo');
    expectTypeOf(promise).toEqualTypeOf<Promise<('foo' | 'bar')[]>>();
  });

  it('asyncFilterEntriesParallel returns entry array', () => {
    const promise = asyncFilterEntriesParallel(obj, async ([, value]) => value > 1);
    expectTypeOf(promise).toEqualTypeOf<Promise<[ 'foo' | 'bar', 1 | 2][]>>();
  });
});

describe('sync helpers – array', () => {
  it('map infers U[]', () => {
    const out = map([1, 2, 3], value => value.toString());
    expectTypeOf(out).toEqualTypeOf<string[]>();
  });

  it('map allows Break without changing U[]', () => {
    const out = map([1, 2, 3], value => (value > 1 ? Break : value * 2));
    expectTypeOf(out).toEqualTypeOf<number[]>();
  });

  it('map allows Last without changing U[]', () => {
    const out = map([1, 2, 3], value => (value === 2 ? Last(value * 10) : value * 10));
    expectTypeOf(out).toEqualTypeOf<number[]>();
  });

  it('forEach returns void', () => {
    const out = forEach(['a', 'b'], () => {});
    expectTypeOf(out).toEqualTypeOf<void>();
  });

  it('reduce infers accumulator type', () => {
    const out = reduce([1, 2, 3], (acc, value) => acc + value, 0);
    expectTypeOf(out).toEqualTypeOf<number>();
  });

  it('filter returns T[]', () => {
    const out = filter([1, 2, 3], value => value > 1);
    expectTypeOf(out).toEqualTypeOf<number[]>();
  });
});

/* -------------------------------------------------------------------------- */
/*                         Sequential helpers — object                        */
/* -------------------------------------------------------------------------- */

describe('sync helpers – object', () => {
  const obj = { a: 1, b: 2 } as const;

  /* ---------- map ---------- */
  it('mapValues returns Record<Key, U>', () => {
    const out = mapValues(obj, value => value.toString());
    expectTypeOf(out).toEqualTypeOf<Record<'a' | 'b', string>>();
  });

  it('mapEntries returns U[]', () => {
    const out = mapEntries(obj, ([key]) => key);
    expectTypeOf(out).toEqualTypeOf<('a' | 'b')[]>();
  });

  it('mapKeys returns U[]', () => {
    const out = mapKeys(obj, key => key.toUpperCase());
    expectTypeOf(out).toEqualTypeOf<string[]>();
  });

  /* ---------- forEach ---------- */
  it('forEachValues returns void', () => {
    const out = forEachValues(obj, () => {});
    expectTypeOf(out).toEqualTypeOf<void>();
  });

  it('forEachEntries returns void', () => {
    const out = forEachEntries(obj, () => {});
    expectTypeOf(out).toEqualTypeOf<void>();
  });

  it('forEachKeys returns void', () => {
    const out = forEachKeys(obj, () => {});
    expectTypeOf(out).toEqualTypeOf<void>();
  });

  /* ---------- reduce ---------- */
  it('reduceValues infers accumulator type', () => {
    const out = reduceValues(
      obj,
      (acc, value) => acc + value,
      0,
    );
    expectTypeOf(out).toEqualTypeOf<number>();
  });

  it('reduceEntries infers accumulator type', () => {
    const out = reduceEntries(
      obj,
      (acc, [, value]) => acc + value,
      0,
    );
    expectTypeOf(out).toEqualTypeOf<number>();
  });

  it('reduceKeys infers accumulator type', () => {
    const out = reduceKeys(
      obj,
      (acc, k) => acc + k,
      '',
    );
    expectTypeOf(out).toEqualTypeOf<string>();
  });

  /* ---------- filter ---------- */
  it('filterValues returns Record<string, T>', () => {
    const out = filterValues(obj, value => value > 1);
    expectTypeOf(out).toEqualTypeOf<Record<'a' | 'b', 1 | 2>>();
  });

  it('filterKeys returns StringifiedObjectKey<TKey>[]', () => {
    const out = filterKeys(obj, key => key === 'a');
    expectTypeOf(out).toEqualTypeOf<('a' | 'b')[]>();
  });

  it('filterEntries returns entry array', () => {
    const out = filterEntries(obj, ([, value]) => value > 1);
    expectTypeOf(out).toEqualTypeOf<['a' | 'b', 1 | 2][]>();
  });
});
