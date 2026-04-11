import { flatMapToGenerator } from "./flatMapToGenerator";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("flatMapToGenerator", () => {
  describe("array", () => {
    it("flatMapToGenerator infers the mapped element type", () => {
      const promise = flatMapToGenerator([1, 2, 3], (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("flatMapToGenerator allows Break in the callback without changing output type", () => {
      const promise = flatMapToGenerator([1, 2, 3], (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("flatMapToGenerator allows Last in the callback without changing output type", () => {
      const promise = flatMapToGenerator([1, 2, 3], (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("set", () => {
    it("flatMapToGenerator infers the mapped element type", () => {
      const promise = flatMapToGenerator(new Set([1, 2, 3]), (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("flatMapToGenerator allows Break in the callback without changing output type", () => {
      const promise = flatMapToGenerator(new Set([1, 2, 3]), (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("flatMapToGenerator allows Last in the callback without changing output type", () => {
      const promise = flatMapToGenerator(new Set([1, 2, 3]), (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("map", () => {
    it("flatMapToGenerator infers the mapped element type", () => {
      const promise = flatMapToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => [value.toString()],
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("flatMapToGenerator allows Break in the callback without changing output type", () => {
      const promise = flatMapToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Break : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("flatMapToGenerator allows Last in the callback without changing output type", () => {
      const promise = flatMapToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Last(value * 2) : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("typedArray", () => {
    it("flatMapToGenerator infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = flatMapToGenerator(biguint64, () => 2n);
      expectTypeOf(promise).toEqualTypeOf<Generator<bigint>>();
    });

    it("flatMapToGenerator allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = flatMapToGenerator(uint8, (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("flatMapToGenerator allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = flatMapToGenerator(uint8, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("plain object", () => {
    it("flatMapToGenerator infers the mapped element type", () => {
      const promise = flatMapToGenerator(
        { "1": 1, "2": 2, "3": 3 },
        (value) => [value.toString()],
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("flatMapToGenerator allows Break in the callback without changing output type", () => {
      const promise = flatMapToGenerator({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("flatMapToGenerator allows Last in the callback without changing output type", () => {
      const promise = flatMapToGenerator({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("iterator", () => {
    it("flatMapToGenerator infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = flatMapToGenerator(iterator, (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("flatMapToGenerator allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = flatMapToGenerator(iterator, (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("flatMapToGenerator allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = flatMapToGenerator(iterator, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });
});
