import { asyncFlatMapToGenerator } from "./asyncFlatMapToGenerator";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("asyncFlatMapToGenerator", () => {
  describe("array", () => {
    it("asyncFlatMapToGenerator infers the mapped element type", () => {
      const promise = asyncFlatMapToGenerator([1, 2, 3], async (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<string>>>();
    });

    it("asyncFlatMapToGenerator allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMapToGenerator([1, 2, 3], async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFlatMapToGenerator allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMapToGenerator([1, 2, 3], async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("set", () => {
    it("asyncFlatMapToGenerator infers the mapped element type", () => {
      const promise = asyncFlatMapToGenerator(new Set([1, 2, 3]), async (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<string>>>();
    });

    it("asyncFlatMapToGenerator allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMapToGenerator(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFlatMapToGenerator allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMapToGenerator(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("map", () => {
    it("asyncFlatMapToGenerator infers the mapped element type", () => {
      const promise = asyncFlatMapToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => [value.toString()],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<string>>>();
    });

    it("asyncFlatMapToGenerator allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMapToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Break : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFlatMapToGenerator allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMapToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Last(value * 2) : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("typedArray", () => {
    it("asyncFlatMapToGenerator infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = asyncFlatMapToGenerator(biguint64, async () => 2n);
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<bigint>>>();
    });

    it("asyncFlatMapToGenerator allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFlatMapToGenerator(uint8, async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFlatMapToGenerator allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFlatMapToGenerator(uint8, async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("plain object", () => {
    it("asyncFlatMapToGenerator infers the mapped element type", () => {
      const promise = asyncFlatMapToGenerator(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => [value.toString()],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<string>>>();
    });

    it("asyncFlatMapToGenerator allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMapToGenerator(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => (value > 1 ? Break : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFlatMapToGenerator allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMapToGenerator(
        { "1": 1, "2": 2, "3": 3 },
        async (value) => (value > 1 ? Last(value * 2) : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("iterator", () => {
    it("asyncFlatMapToGenerator infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFlatMapToGenerator(iterator, async (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<string>>>();
    });

    it("asyncFlatMapToGenerator allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFlatMapToGenerator(iterator, async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFlatMapToGenerator allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFlatMapToGenerator(iterator, async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
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

    it("asyncFlatMapToGenerator infers the mapped element type", () => {
      const promise = asyncFlatMapToGenerator(asyncIterator, async (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<string>>>();
    });

    it("asyncFlatMapToGenerator allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMapToGenerator(asyncIterator, async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFlatMapToGenerator allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMapToGenerator(asyncIterator, async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });
});
