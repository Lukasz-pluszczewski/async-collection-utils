import { flatMapToArray } from "./flatMapToArray";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("flatMapToArray", () => {
  describe("array", () => {
    it("flatMapToArray infers the mapped element type", () => {
      const promise = flatMapToArray([1, 2, 3], (value) =>
        value === 2
          ? value.toString()
          : [value.toString(), (value * 2).toString()],
      );
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("flatMapToArray allows Break in the callback without changing output type", () => {
      const promise = flatMapToArray([1, 2, 3], (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("flatMapToArray allows Last in the callback without changing output type", () => {
      const promise = flatMapToArray([1, 2, 3], (value) =>
        value > 1 ? Last([value * 2]) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });
  describe("set", () => {
    it("flatMapToArray infers the mapped element type", () => {
      const promise = flatMapToArray(new Set([1, 2, 3]), (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("flatMapToArray allows Break in the callback without changing output type", () => {
      const promise = flatMapToArray(new Set([1, 2, 3]), (value) =>
        value > 1 ? Break : [value * 2, value * 3],
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("flatMapToArray allows Last in the callback without changing output type", () => {
      const promise = flatMapToArray(new Set([1, 2, 3]), (value) =>
        value > 1 ? Last(value * 2) : [value * 2, value - 10],
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("map", () => {
    it("flatMapToArray infers the mapped element type", () => {
      const promise = flatMapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => [value.toString()],
      );
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("flatMapToArray allows Break in the callback without changing output type", () => {
      const promise = flatMapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Break : [value - 2, value + 2]),
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("flatMapToArray allows Last in the callback without changing output type", () => {
      const promise = flatMapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Last([value * 2]) : [value * 5]),
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("typedArray", () => {
    it("flatMapToArray infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = flatMapToArray(biguint64, () => [2n]);
      expectTypeOf(promise).toEqualTypeOf<bigint[]>();
    });

    it("flatMapToArray allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = flatMapToArray(uint8, (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("flatMapToArray allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = flatMapToArray(uint8, (value) =>
        value > 1 ? Last(value * 2) : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("plain object", () => {
    it("flatMapToArray infers the mapped element type", () => {
      const promise = flatMapToArray({ "1": 1, "2": 2, "3": 3 }, (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("flatMapToArray allows Break in the callback without changing output type", () => {
      const promise = flatMapToArray({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("flatMapToArray allows Last in the callback without changing output type", () => {
      const promise = flatMapToArray({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Last([value * 2]) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("iterator", () => {
    it("flatMapToArray infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = flatMapToArray(iterator, (value) => [value.toString()]);
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("flatMapToArray allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = flatMapToArray(iterator, (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("flatMapToArray allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = flatMapToArray(iterator, (value) =>
        value > 1 ? Last([value * 2]) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });
});
