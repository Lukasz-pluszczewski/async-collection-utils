import { filterToArray } from "./filterToArray";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("filterToArray", () => {
  describe("array", () => {
    it("filterToArray infers the mapped element type", () => {
      const promise = filterToArray([1, 2, 3], (value) => value % 2 === 0);
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filterToArray allows Break in the callback without changing output type", () => {
      const promise = filterToArray([1, 2, 3], (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filterToArray allows Last in the callback without changing output type", () => {
      const promise = filterToArray([1, 2, 3], (value) =>
        value > 1 ? Last(true) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });
  describe("set", () => {
    it("filterToArray infers the mapped element type", () => {
      const promise = filterToArray(
        new Set([1, 2, 3]),
        (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filterToArray allows Break in the callback without changing output type", () => {
      const promise = filterToArray(new Set([1, 2, 3]), (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filterToArray allows Last in the callback without changing output type", () => {
      const promise = filterToArray(new Set([1, 2, 3]), (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("map", () => {
    it("filterToArray infers the mapped element type", () => {
      const promise = filterToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filterToArray allows Break in the callback without changing output type", () => {
      const promise = filterToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Break : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filterToArray allows Last in the callback without changing output type", () => {
      const promise = filterToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Last(value % 2 === 0) : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("typedArray", () => {
    it("filterToArray infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = filterToArray(biguint64, (value) => value === 2n);
      expectTypeOf(promise).toEqualTypeOf<bigint[]>();
    });

    it("filterToArray allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = filterToArray(uint8, (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filterToArray allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = filterToArray(uint8, (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("plain object", () => {
    it("filterToArray infers the mapped element type", () => {
      const promise = filterToArray(
        { "1": 1, "2": 2, "3": 3 },
        (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filterToArray allows Break in the callback without changing output type", () => {
      const promise = filterToArray({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filterToArray allows Last in the callback without changing output type", () => {
      const promise = filterToArray({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("iterator", () => {
    it("filterToArray infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = filterToArray(iterator, (value) => value % 2 === 0);
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filterToArray allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = filterToArray(iterator, (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filterToArray allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = filterToArray(iterator, (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });
});
