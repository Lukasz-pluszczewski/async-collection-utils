import { asyncFlatMap } from "./asyncFlatMap";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("asyncFlatMap", () => {
  describe("array", () => {
    it("asyncFlatMap infers the mapped element type", () => {
      const promise = asyncFlatMap([1, 2, 3], async (value) =>
        value === 2
          ? value.toString()
          : [value.toString(), (value * 2).toString()],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncFlatMap allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMap([1, 2, 3], async (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncFlatMap allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMap([1, 2, 3], async (value) =>
        value > 1 ? Last([value * 2]) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });
  describe("set", () => {
    it("asyncFlatMap infers the mapped element type", () => {
      const promise = asyncFlatMap(new Set([1, 2, 3]), async (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Promise<Set<string>>>();
    });

    it("asyncFlatMap allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMap(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Break : [value * 2, value * 3],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Set<number>>>();
    });

    it("asyncFlatMap allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMap(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Last(value * 2) : [value * 2, value - 10],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Set<number>>>();
    });
  });

  describe("typedArray", () => {
    it("asyncFlatMap infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = asyncFlatMap(biguint64, async () => [2n]);
      expectTypeOf(promise).toEqualTypeOf<
        Promise<BigUint64Array<ArrayBuffer>>
      >();
    });

    it("asyncFlatMap allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFlatMap(uint8, async (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Uint8Array<ArrayBuffer>>>();
    });

    it("asyncFlatMap allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncFlatMap(uint8, async (value) =>
        value > 1 ? Last(value * 2) : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Uint8Array<ArrayBuffer>>>();
    });
  });

  describe("iterator", () => {
    it("asyncFlatMap infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = asyncFlatMap(iterator, async (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<string>>>();
    });

    it("asyncFlatMap allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFlatMap(iterator, async (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFlatMap allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncFlatMap(iterator, async (value) =>
        value > 1 ? Last([value * 2]) : value * 2,
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
    it("asyncFlatMap infers the mapped element type", () => {
      const promise = asyncFlatMap(asyncIterator, async (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<string>>>();
    });

    it("asyncFlatMap allows Break in the callback without changing output type", () => {
      const promise = asyncFlatMap(asyncIterator, async (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncFlatMap allows Last in the callback without changing output type", () => {
      const promise = asyncFlatMap(asyncIterator, async (value) =>
        value > 1 ? Last([value * 2]) : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });
});
