import { mapToGenerator } from "./mapToGenerator";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("mapToGenerator", () => {
  describe("array", () => {
    it("mapToGenerator infers the mapped element type", () => {
      const promise = mapToGenerator([1, 2, 3], (value) => value.toString());
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("mapToGenerator allows Break in the callback without changing output type", () => {
      const promise = mapToGenerator([1, 2, 3], (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("mapToGenerator allows Last in the callback without changing output type", () => {
      const promise = mapToGenerator([1, 2, 3], (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("set", () => {
    it("mapToGenerator infers the mapped element type", () => {
      const promise = mapToGenerator(new Set([1, 2, 3]), (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("mapToGenerator allows Break in the callback without changing output type", () => {
      const promise = mapToGenerator(new Set([1, 2, 3]), (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("mapToGenerator allows Last in the callback without changing output type", () => {
      const promise = mapToGenerator(new Set([1, 2, 3]), (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("map", () => {
    it("mapToGenerator infers the mapped element type", () => {
      const promise = mapToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("mapToGenerator allows Break in the callback without changing output type", () => {
      const promise = mapToGenerator(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Break : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("mapToGenerator allows Last in the callback without changing output type", () => {
      const promise = mapToGenerator(
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
    it("mapToGenerator infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = mapToGenerator(biguint64, () => 2n);
      expectTypeOf(promise).toEqualTypeOf<Generator<bigint>>();
    });

    it("mapToGenerator allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = mapToGenerator(uint8, (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("mapToGenerator allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = mapToGenerator(uint8, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("plain object", () => {
    it("mapToGenerator infers the mapped element type", () => {
      const promise = mapToGenerator({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("mapToGenerator allows Break in the callback without changing output type", () => {
      const promise = mapToGenerator({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("mapToGenerator allows Last in the callback without changing output type", () => {
      const promise = mapToGenerator({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("iterator", () => {
    it("mapToGenerator infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = mapToGenerator(iterator, (value) => value.toString());
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("mapToGenerator allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = mapToGenerator(iterator, (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("mapToGenerator allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = mapToGenerator(iterator, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });
});
