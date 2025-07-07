import { mapToArray } from "./mapToArray";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("mapToArray", () => {
  describe("array", () => {
    it("mapToArray infers the mapped element type", () => {
      const promise = mapToArray([1, 2, 3], (value) => value.toString());
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("mapToArray allows Break in the callback without changing output type", () => {
      const promise = mapToArray([1, 2, 3], (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("mapToArray allows Last in the callback without changing output type", () => {
      const promise = mapToArray([1, 2, 3], (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });
  describe("set", () => {
    it("mapToArray infers the mapped element type", () => {
      const promise = mapToArray(new Set([1, 2, 3]), (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("mapToArray allows Break in the callback without changing output type", () => {
      const promise = mapToArray(new Set([1, 2, 3]), (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("mapToArray allows Last in the callback without changing output type", () => {
      const promise = mapToArray(new Set([1, 2, 3]), (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("map", () => {
    it("mapToArray infers the mapped element type", () => {
      const promise = mapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("mapToArray allows Break in the callback without changing output type", () => {
      const promise = mapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Break : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("mapToArray allows Last in the callback without changing output type", () => {
      const promise = mapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Last(value * 2) : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("typedArray", () => {
    it("mapToArray infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = mapToArray(biguint64, () => 2n);
      expectTypeOf(promise).toEqualTypeOf<bigint[]>();
    });

    it("mapToArray allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = mapToArray(uint8, (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("mapToArray allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = mapToArray(uint8, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("plain object", () => {
    it("mapToArray infers the mapped element type", () => {
      const promise = mapToArray({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("mapToArray allows Break in the callback without changing output type", () => {
      const promise = mapToArray({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("mapToArray allows Last in the callback without changing output type", () => {
      const promise = mapToArray({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });

  describe("iterator", () => {
    it("mapToArray infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = mapToArray(iterator, (value) => value.toString());
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("mapToArray allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = mapToArray(iterator, (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("mapToArray allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = mapToArray(iterator, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });
});
