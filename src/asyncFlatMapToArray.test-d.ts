import { asyncFlatMapToArray } from "./asyncFlatMapToArray";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("asyncFlatMapToArray", () => {
  describe("array", () => {
    it("asyncFlatMapToArray infers the mapped element type", () => {
      const promise = asyncFlatMapToArray([1, 2, 3], async (value) =>
        value === 2
          ? value.toString()
          : [value.toString(), (value * 2).toString()],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncFlatMapToArray allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMapToArray([1, 2, 3], async (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFlatMapToArray allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMapToArray([1, 2, 3], async (value) =>
        value > 1 ? Last([value * 2]) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });
  describe("set", () => {
    it("asyncFlatMapToArray infers the mapped element type", () => {
      const promise = asyncFlatMapToArray(new Set([1, 2, 3]), async (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncFlatMapToArray allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMapToArray(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Break : [value * 2, value * 3],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFlatMapToArray allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMapToArray(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Last(value * 2) : [value * 2, value - 10],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("map", () => {
    it("asyncFlatMapToArray infers the mapped element type", () => {
      const promise = asyncFlatMapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => [value.toString()],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncFlatMapToArray allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Break : [value - 2, value + 2]),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFlatMapToArray allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Last([value * 2]) : [value * 5]),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("typedArray", () => {
    it("asyncFlatMapToArray infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = asyncFlatMapToArray(biguint64, async () => [2n]);
      expectTypeOf(promise).toEqualTypeOf<Promise<bigint[]>>();
    });

    it("asyncFlatMapToArray allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFlatMapToArray(uint8, async (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFlatMapToArray allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFlatMapToArray(uint8, async (value) =>
        value > 1 ? Last(value * 2) : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("plain object", () => {
    it("asyncFlatMapToArray infers the mapped element type", () => {
      const promise = asyncFlatMapToArray(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => [value.toString()],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncFlatMapToArray allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMapToArray(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => (value > 1 ? Break : [value * 2]),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFlatMapToArray allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMapToArray(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => (value > 1 ? Last([value * 2]) : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });

  describe("iterator", () => {
    it("asyncFlatMapToArray infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = asyncFlatMapToArray(iterator, async (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncFlatMapToArray allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFlatMapToArray(iterator, async (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFlatMapToArray allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFlatMapToArray(iterator, async (value) =>
        value > 1 ? Last([value * 2]) : value * 2,
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
    it("asyncFlatMapToArray infers the mapped element type", () => {
      const promise = asyncFlatMapToArray(asyncIterator, async (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncFlatMapToArray allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMapToArray(asyncIterator, async (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFlatMapToArray allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMapToArray(asyncIterator, async (value) =>
        value > 1 ? Last([value * 2]) : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });
});
