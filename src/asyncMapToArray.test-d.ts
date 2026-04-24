import { asyncMapToArray } from "./asyncMapToArray";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("asyncMapToArray", () => {
  describe("array", () => {
    it("asyncMapToArray infers the mapped element type", () => {
      const promise = asyncMapToArray([1, 2, 3], async (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncMapToArray allows Break in the callback without changing output type", () => {
      const promise = asyncMapToArray([1, 2, 3], async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncMapToArray allows Last in the callback without changing output type", () => {
      const promise = asyncMapToArray([1, 2, 3], async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });
  describe("set", () => {
    it("asyncMapToArray infers the mapped element type", () => {
      const promise = asyncMapToArray(new Set([1, 2, 3]), async (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncMapToArray allows Break in the callback without changing output type", () => {
      const promise = asyncMapToArray(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncMapToArray allows Last in the callback without changing output type", () => {
      const promise = asyncMapToArray(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("map", () => {
    it("asyncMapToArray infers the mapped element type", () => {
      const promise = asyncMapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncMapToArray allows Break in the callback without changing output type", () => {
      const promise = asyncMapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Break : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncMapToArray allows Last in the callback without changing output type", () => {
      const promise = asyncMapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Last(value * 2) : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("typedArray", () => {
    it("asyncMapToArray infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = asyncMapToArray(biguint64, async () => 2n);
      expectTypeOf(promise).toEqualTypeOf<Promise<bigint[]>>();
    });

    it("asyncMapToArray allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncMapToArray(uint8, async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncMapToArray allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncMapToArray(uint8, async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("plain object", () => {
    it("asyncMapToArray infers the mapped element type", () => {
      const promise = asyncMapToArray(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncMapToArray allows Break in the callback without changing output type", () => {
      const promise = asyncMapToArray(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => (value > 1 ? Break : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncMapToArray allows Last in the callback without changing output type", () => {
      const promise = asyncMapToArray(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => (value > 1 ? Last(value * 2) : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("iterator", () => {
    it("asyncMapToArray infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = asyncMapToArray(iterator, async (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncMapToArray allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncMapToArray(iterator, async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncMapToArray allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncMapToArray(iterator, async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
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
    it("asyncMapToArray infers the mapped element type", () => {
      const promise = asyncMapToArray(asyncIterator, async (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncMapToArray allows Break in the callback without changing output type", () => {
      const promise = asyncMapToArray(asyncIterator, async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncMapToArray allows Last in the callback without changing output type", () => {
      const promise = asyncMapToArray(asyncIterator, async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });
});
