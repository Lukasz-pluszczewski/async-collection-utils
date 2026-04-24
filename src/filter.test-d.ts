import { filter } from "./filter";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("filter", () => {
  describe("array", () => {
    it("filter infers the mapped element type", () => {
      const promise = filter([1, 2, 3], (value) => value % 2 === 0);
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filter allows Break in the callback without changing output type", () => {
      const promise = filter([1, 2, 3], (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("filter allows Last in the callback without changing output type", () => {
      const promise = filter([1, 2, 3], (value) =>
        value > 1 ? Last(true) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });
  describe("set", () => {
    it("filter infers the mapped element type", () => {
      const promise = filter(new Set([1, 2, 3]), (value) => value % 2 === 0);
      expectTypeOf(promise).toEqualTypeOf<Set<number>>();
    });

    it("filter allows Break in the callback without changing output type", () => {
      const promise = filter(new Set([1, 2, 3]), (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Set<number>>();
    });

    it("filter allows Last in the callback without changing output type", () => {
      const promise = filter(new Set([1, 2, 3]), (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Set<number>>();
    });
  });

  describe("map", () => {
    it("filter infers the mapped element type", () => {
      const promise = filter(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Map<number, number>>();
    });

    it("filter allows Break in the callback without changing output type", () => {
      const promise = filter(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Break : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Map<number, number>>();
    });

    it("filter allows Last in the callback without changing output type", () => {
      const promise = filter(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Last(value % 2 === 0) : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Map<number, number>>();
    });
  });

  describe("typedArray", () => {
    it("filter infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = filter(biguint64, (value) => value === 2n);
      expectTypeOf(promise).toEqualTypeOf<BigUint64Array<ArrayBuffer>>();
    });

    it("filter allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = filter(uint8, (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Uint8Array<ArrayBuffer>>();
    });

    it("filter allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = filter(uint8, (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Uint8Array<ArrayBuffer>>();
    });
  });

  describe("plain object", () => {
    it("filter infers the mapped element type", () => {
      const promise = filter(
        { "1": 1, "2": 2, "3": 3 },
        (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<{
        "1": number;
        "2": number;
        "3": number;
      }>();
    });

    it("filter allows Break in the callback without changing output type", () => {
      const promise = filter({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<{
        "1": number;
        "2": number;
        "3": number;
      }>();
    });

    it("filter allows Last in the callback without changing output type", () => {
      const promise = filter({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<{
        "1": number;
        "2": number;
        "3": number;
      }>();
    });
  });

  describe("iterator", () => {
    it("filter infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = filter(iterator, (value) => value % 2 === 0);
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filter allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = filter(iterator, (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filter allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = filter(iterator, (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });
});
