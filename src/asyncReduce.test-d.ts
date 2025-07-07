import { asyncReduce } from "./asyncReduce";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("asyncReduce", () => {
  describe("array", () => {
    it("asyncReduce infers the mapped element type", () => {
      const promise = asyncReduce([1, 2, 3], async (acc) => acc, 0);
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });

    it("asyncReduce allows Break in the callback without changing output type", () => {
      const promise = asyncReduce(
        [1, 2, 3],
        async (acc, value) => (value > 1 ? Break : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });

    it("asyncReduce allows Last in the callback without changing output type", () => {
      const promise = asyncReduce(
        [1, 2, 3],
        async (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });
  });
  describe("set", () => {
    it("asyncReduce infers the mapped element type", () => {
      const promise = asyncReduce(
        new Set([1, 2, 3]),
        async (acc, value) => acc + value.toString(),
        "",
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string>>();
    });

    it("asyncReduce allows Break in the callback without changing output type", () => {
      const promise = asyncReduce(
        new Set([1, 2, 3]),
        async (acc, value) => (value > 1 ? Break : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });

    it("asyncReduce allows Last in the callback without changing output type", () => {
      const promise = asyncReduce(
        new Set([1, 2, 3]),
        async (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });
  });

  describe("map", () => {
    it("asyncReduce infers the mapped element type", () => {
      const promise = asyncReduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (acc, value) => acc + value.toString(),
        "",
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string>>();
    });

    it("asyncReduce allows Break in the callback without changing output type", () => {
      const promise = asyncReduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (acc, value) => (value > 1 ? Break : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });

    it("asyncReduce allows Last in the callback without changing output type", () => {
      const promise = asyncReduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });
  });

  describe("typedArray", () => {
    it("asyncReduce infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = asyncReduce(
        biguint64,
        async (acc, value) => acc + value,
        0n,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<bigint>>();
    });

    it("asyncReduce allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncReduce(uint8, async (acc, value) =>
        value > 1 ? Break : acc,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });

    it("asyncReduce allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncReduce(
        uint8,
        async (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });
  });

  describe("plain object", () => {
    it("asyncReduce infers the mapped element type", () => {
      const promise = asyncReduce(
        { "1": 1, "2": 2, "3": 3 },
        async (acc, value) => acc + value.toString(),
        "",
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string>>();
    });

    it("asyncReduce allows Break in the callback without changing output type", () => {
      const promise = asyncReduce(
        { "1": 1, "2": 2, "3": 3 },
        async (acc, value) => (value > 1 ? Break : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });

    it("asyncReduce allows Last in the callback without changing output type", () => {
      const promise = asyncReduce(
        { "1": 1, "2": 2, "3": 3 },
        async (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });
  });

  describe("iterator", () => {
    it("asyncReduce infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = asyncReduce(
        iterator,
        async (acc, value) => acc + value.toString(),
        "",
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string>>();
    });

    it("asyncReduce allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncReduce(
        iterator,
        async (acc, value) => (value > 1 ? Break : acc + value),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });

    it("asyncReduce allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncReduce(
        iterator,
        async (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
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
    it("asyncReduce infers the mapped element type", () => {
      const promise = asyncReduce(
        asyncIterator,
        async (acc, value) => acc + value.toString(),
        "",
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string>>();
    });

    it("asyncReduce allows Break in the callback without changing output type", () => {
      const promise = asyncReduce(asyncIterator, async (acc, value) =>
        value > 1 ? Break : acc,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });

    it("asyncReduce allows Last in the callback without changing output type", () => {
      const promise = asyncReduce(asyncIterator, async (acc, value) =>
        value > 1 ? Last(acc) : acc,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    });
  });
});
