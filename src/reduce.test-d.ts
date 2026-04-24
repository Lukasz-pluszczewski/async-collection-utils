import { reduce } from "./reduce";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("reduce", () => {
  describe("array", () => {
    it("reduce infers the mapped element type", () => {
      const promise = reduce([1, 2, 3], (acc) => acc, 0);
      expectTypeOf(promise).toEqualTypeOf<number>();
    });

    it("reduce allows Break in the callback without changing output type", () => {
      const promise = reduce(
        [1, 2, 3],
        (acc, value) => (value > 1 ? Break : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<number>();
    });

    it("reduce allows Last in the callback without changing output type", () => {
      const promise = reduce(
        [1, 2, 3],
        (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<number>();
    });
  });
  describe("set", () => {
    it("reduce infers the mapped element type", () => {
      const promise = reduce(
        new Set([1, 2, 3]),
        (acc, value) => acc + value.toString(),
        "",
      );
      expectTypeOf(promise).toEqualTypeOf<string>();
    });

    it("reduce allows Break in the callback without changing output type", () => {
      const promise = reduce(
        new Set([1, 2, 3]),
        (acc, value) => (value > 1 ? Break : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<number>();
    });

    it("reduce allows Last in the callback without changing output type", () => {
      const promise = reduce(
        new Set([1, 2, 3]),
        (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<number>();
    });
  });

  describe("map", () => {
    it("reduce infers the mapped element type", () => {
      const promise = reduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (acc, value) => acc + value.toString(),
        "",
      );
      expectTypeOf(promise).toEqualTypeOf<string>();
    });

    it("reduce allows Break in the callback without changing output type", () => {
      const promise = reduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (acc, value) => (value > 1 ? Break : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<number>();
    });

    it("reduce allows Last in the callback without changing output type", () => {
      const promise = reduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<number>();
    });
  });

  describe("typedArray", () => {
    it("reduce infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = reduce(biguint64, (acc, value) => acc + value, 0n);
      expectTypeOf(promise).toEqualTypeOf<bigint>();
    });

    it("reduce allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = reduce(uint8, (acc, value) => (value > 1 ? Break : acc));
      expectTypeOf(promise).toEqualTypeOf<number>();
    });

    it("reduce allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = reduce(
        uint8,
        (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<number>();
    });
  });

  describe("plain object", () => {
    it("reduce infers the mapped element type", () => {
      const promise = reduce(
        { "1": 1, "2": 2, "3": 3 },
        (acc, value) => acc + value.toString(),
        "",
      );
      expectTypeOf(promise).toEqualTypeOf<string>();
    });

    it("reduce allows Break in the callback without changing output type", () => {
      const promise = reduce(
        { "1": 1, "2": 2, "3": 3 },
        (acc, value) => (value > 1 ? Break : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<number>();
    });

    it("reduce allows Last in the callback without changing output type", () => {
      const promise = reduce(
        { "1": 1, "2": 2, "3": 3 },
        (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<number>();
    });
  });

  describe("iterator", () => {
    it("reduce infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = reduce(
        iterator,
        (acc, value) => acc + value.toString(),
        "",
      );
      expectTypeOf(promise).toEqualTypeOf<string>();
    });

    it("reduce allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = reduce(
        iterator,
        (acc, value) => (value > 1 ? Break : acc + value),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<number>();
    });

    it("reduce allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = reduce(
        iterator,
        (acc, value) => (value > 1 ? Last(acc) : acc),
        0,
      );
      expectTypeOf(promise).toEqualTypeOf<number>();
    });
  });
});
