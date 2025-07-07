import { asyncFilterToArray } from "./asyncFilterToArray";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("asyncFilterToArray", () => {
  describe("array", () => {
    it("asyncFilterToArray infers the mapped element type", () => {
      const promise = asyncFilterToArray(
        [1, 2, 3],
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Break in the callback without changing output type", () => {
      const promise = asyncFilterToArray([1, 2, 3], async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Last in the callback without changing output type", () => {
      const promise = asyncFilterToArray([1, 2, 3], async (value) =>
        value > 1 ? Last(true) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });
  describe("set", () => {
    it("asyncFilterToArray infers the mapped element type", () => {
      const promise = asyncFilterToArray(
        new Set([1, 2, 3]),
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Break in the callback without changing output type", () => {
      const promise = asyncFilterToArray(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Last in the callback without changing output type", () => {
      const promise = asyncFilterToArray(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("map", () => {
    it("asyncFilterToArray infers the mapped element type", () => {
      const promise = asyncFilterToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Break in the callback without changing output type", () => {
      const promise = asyncFilterToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Break : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Last in the callback without changing output type", () => {
      const promise = asyncFilterToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Last(value % 2 === 0) : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("typedArray", () => {
    it("asyncFilterToArray infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = asyncFilterToArray(
        biguint64,
        async (value) => value === 2n,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<bigint[]>>();
    });

    it("asyncFilterToArray allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFilterToArray(uint8, async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFilterToArray(uint8, async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("plain object", () => {
    it("asyncFilterToArray infers the mapped element type", () => {
      const promise = asyncFilterToArray(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Break in the callback without changing output type", () => {
      const promise = asyncFilterToArray(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => (value > 1 ? Break : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Last in the callback without changing output type", () => {
      const promise = asyncFilterToArray(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => (value > 1 ? Last(value % 2 === 0) : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("iterator", () => {
    it("asyncFilterToArray infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = asyncFilterToArray(
        iterator,
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFilterToArray(iterator, async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFilterToArray(iterator, async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
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
    it("asyncFilterToArray infers the mapped element type", () => {
      const promise = asyncFilterToArray(
        asyncIterator,
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Break in the callback without changing output type", () => {
      const promise = asyncFilterToArray(asyncIterator, async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFilterToArray allows Last in the callback without changing output type", () => {
      const promise = asyncFilterToArray(asyncIterator, async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });
});
