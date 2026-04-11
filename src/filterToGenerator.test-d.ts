import { filterToGenerator } from "./filterToGenerator";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("filterToGenerator", () => {
  describe("array", () => {
    it("filterToGenerator infers the mapped element type", () => {
      const promise = filterToGenerator([1, 2, 3], (value) => value % 2 === 0);
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filterToGenerator allows Break in the callback without changing output type", () => {
      const promise = filterToGenerator([1, 2, 3], (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filterToGenerator allows Last in the callback without changing output type", () => {
      const promise = filterToGenerator([1, 2, 3], (value) =>
        value > 1 ? Last(true) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("set", () => {
    it("filterToGenerator infers the mapped element type", () => {
      const promise = filterToGenerator(new Set([1, 2, 3]), (value) =>
        value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filterToGenerator allows Break in the callback without changing output type", () => {
      const promise = filterToGenerator(new Set([1, 2, 3]), (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filterToGenerator allows Last in the callback without changing output type", () => {
      const promise = filterToGenerator(new Set([1, 2, 3]), (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("map", () => {
    it("filterToGenerator infers the mapped element type", () => {
      const promise = filterToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filterToGenerator allows Break in the callback without changing output type", () => {
      const promise = filterToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Break : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filterToGenerator allows Last in the callback without changing output type", () => {
      const promise = filterToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Last(value % 2 === 0) : value % 2 === 0),
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("typedArray", () => {
    it("filterToGenerator infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = filterToGenerator(biguint64, (value) => value === 2n);
      expectTypeOf(promise).toEqualTypeOf<Generator<bigint>>();
    });

    it("filterToGenerator allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = filterToGenerator(uint8, (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filterToGenerator allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = filterToGenerator(uint8, (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("plain object", () => {
    it("filterToGenerator infers the mapped element type", () => {
      const promise = filterToGenerator(
        { "1": 1, "2": 2, "3": 3 },
        (value) => value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filterToGenerator allows Break in the callback without changing output type", () => {
      const promise = filterToGenerator({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filterToGenerator allows Last in the callback without changing output type", () => {
      const promise = filterToGenerator({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("iterator", () => {
    it("filterToGenerator infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = filterToGenerator(iterator, (value) => value % 2 === 0);
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filterToGenerator allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = filterToGenerator(iterator, (value) =>
        value > 1 ? Break : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("filterToGenerator allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = filterToGenerator(iterator, (value) =>
        value > 1 ? Last(value % 2 === 0) : value % 2 === 0,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });
});
