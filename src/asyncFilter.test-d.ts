import { asyncFilter } from "./asyncFilter";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("asyncFilter", () => {
  describe("array", () => {
    it("asyncFilter infers the mapped element type", () => {
      const promise = asyncFilter([1, 2, 3], async (value) => value % 2 === 0);
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilter allows Break in the callback without changing output type", () => {
      const promise = asyncFilter([1, 2, 3], async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilter allows Last in the callback without changing output type", () => {
      const promise = asyncFilter([1, 2, 3], async (value) =>
        value > 1 ? Last(true) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });
  describe("set", () => {
    it("asyncFilter infers the mapped element type", () => {
      const promise = asyncFilter(
        new Set([1, 2, 3]),
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Set<number>>>();
    });

    it("asyncFilter allows Break in the callback without changing output type", () => {
      const promise = asyncFilter(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Set<number>>>();
    });

    it("asyncFilter allows Last in the callback without changing output type", () => {
      const promise = asyncFilter(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Set<number>>>();
    });
  });

  describe("map", () => {
    it("asyncFilter infers the mapped element type", () => {
      const promise = asyncFilter(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Map<number, number>>>();
    });

    it("asyncFilter allows Break in the callback without changing output type", () => {
      const promise = asyncFilter(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Break : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Map<number, number>>>();
    });

    it("asyncFilter allows Last in the callback without changing output type", () => {
      const promise = asyncFilter(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Last(value % 2 === 0) : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Map<number, number>>>();
    });
  });

  describe("typedArray", () => {
    it("asyncFilter infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = asyncFilter(biguint64, async (value) => value === 2n);
      expectTypeOf(promise).toEqualTypeOf<
        Promise<BigUint64Array<ArrayBuffer>>
      >();
    });

    it("asyncFilter allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFilter(uint8, async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Uint8Array<ArrayBuffer>>>();
    });

    it("asyncFilter allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFilter(uint8, async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Uint8Array<ArrayBuffer>>>();
    });
  });

  describe("plain object", () => {
    it("asyncFilter infers the mapped element type", () => {
      const promise = asyncFilter(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<
        Promise<{ "1": number; "2": number; "3": number }>
      >();
    });

    it("asyncFilter allows Break in the callback without changing output type", () => {
      const promise = asyncFilter({ "1": 1, "2": 2, "3": 3 }, async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<
        Promise<{ "1": number; "2": number; "3": number }>
      >();
    });

    it("asyncFilter allows Last in the callback without changing output type", () => {
      const promise = asyncFilter({ "1": 1, "2": 2, "3": 3 }, async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<
        Promise<{ "1": number; "2": number; "3": number }>
      >();
    });
  });

  describe("iterator", () => {
    it("asyncFilter infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = asyncFilter(iterator, async (value) => value % 2 === 0);
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilter allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFilter(iterator, async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilter allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFilter(iterator, async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("asyncIterator", () => {
    const asyncIterator = (async function* (): AsyncGenerator<
      number,
      void,
      void
    > {
      yield 1;
      yield 2;
      yield 3;
    })();
    it("asyncFilter infers the mapped element type", () => {
      const promise = asyncFilter(
        asyncIterator,
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilter allows Break in the callback without changing output type", () => {
      const promise = asyncFilter(asyncIterator, async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilter allows Last in the callback without changing output type", () => {
      const promise = asyncFilter(asyncIterator, async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });
});
