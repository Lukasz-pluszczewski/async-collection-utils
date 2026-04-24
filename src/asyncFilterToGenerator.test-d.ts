import { asyncFilterToGenerator } from "./asyncFilterToGenerator";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("asyncFilterToGenerator", () => {
  describe("array", () => {
    it("asyncFilterToGenerator infers the mapped element type", () => {
      const promise = asyncFilterToGenerator([1, 2, 3], async (value) =>
        value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Break in the callback without changing output type", () => {
      const promise = asyncFilterToGenerator([1, 2, 3], async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Last in the callback without changing output type", () => {
      const promise = asyncFilterToGenerator([1, 2, 3], async (value) =>
        value > 1 ? Last(true) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("set", () => {
    it("asyncFilterToGenerator infers the mapped element type", () => {
      const promise = asyncFilterToGenerator(new Set([1, 2, 3]), async (value) =>
        value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Break in the callback without changing output type", () => {
      const promise = asyncFilterToGenerator(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Last in the callback without changing output type", () => {
      const promise = asyncFilterToGenerator(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("map", () => {
    it("asyncFilterToGenerator infers the mapped element type", () => {
      const promise = asyncFilterToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Break in the callback without changing output type", () => {
      const promise = asyncFilterToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Break : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Last in the callback without changing output type", () => {
      const promise = asyncFilterToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Last(value % 2 === 0) : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("typedArray", () => {
    it("asyncFilterToGenerator infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = asyncFilterToGenerator(biguint64, async (value) => value === 2n);
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<bigint>>>();
    });

    it("asyncFilterToGenerator allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFilterToGenerator(uint8, async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFilterToGenerator(uint8, async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("plain object", () => {
    it("asyncFilterToGenerator infers the mapped element type", () => {
      const promise = asyncFilterToGenerator(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Break in the callback without changing output type", () => {
      const promise = asyncFilterToGenerator(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => (value > 1 ? Break : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Last in the callback without changing output type", () => {
      const promise = asyncFilterToGenerator(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => (value > 1 ? Last(value % 2 === 0) : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("iterator", () => {
    it("asyncFilterToGenerator infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFilterToGenerator(iterator, async (value) =>
        value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFilterToGenerator(iterator, async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFilterToGenerator(iterator, async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("asyncIterator", () => {
    const asyncIterator = (async function* (): AsyncGenerator<number> {
      yield 1;
      yield 2;
      yield 3;
    })();

    it("asyncFilterToGenerator infers the mapped element type", () => {
      const promise = asyncFilterToGenerator(asyncIterator, async (value) =>
        value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Break in the callback without changing output type", () => {
      const promise = asyncFilterToGenerator(asyncIterator, async (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFilterToGenerator allows Last in the callback without changing output type", () => {
      const promise = asyncFilterToGenerator(asyncIterator, async (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });
});
