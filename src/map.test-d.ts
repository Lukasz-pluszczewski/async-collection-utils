import { map } from "./map";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("map", () => {
  describe("array", () => {
    it("map infers the mapped element type", () => {
      const promise = map([1, 2, 3], (value) => value.toString());
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("map allows Break in the callback without changing output type", () => {
      const promise = map([1, 2, 3], (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("map allows Last in the callback without changing output type", () => {
      const promise = map([1, 2, 3], (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });
  describe("set", () => {
    it("map infers the mapped element type", () => {
      const promise = map(new Set([1, 2, 3]), (value) => value.toString());
      expectTypeOf(promise).toEqualTypeOf<Set<string>>();
    });

    it("map allows Break in the callback without changing output type", () => {
      const promise = map(new Set([1, 2, 3]), (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Set<number>>();
    });

    it("map allows Last in the callback without changing output type", () => {
      const promise = map(new Set([1, 2, 3]), (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Set<number>>();
    });
  });

  describe("map", () => {
    it("map infers the mapped element type", () => {
      const promise = map(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Map<number, string>>();
    });

    it("map allows Break in the callback without changing output type", () => {
      const promise = map(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Break : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Map<number, number>>();
    });

    it("map allows Last in the callback without changing output type", () => {
      const promise = map(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => (value > 1 ? Last(value * 2) : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Map<number, number>>();
    });
  });

  describe("typedArray", () => {
    it("map infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = map(biguint64, () => 2n);
      expectTypeOf(promise).toEqualTypeOf<BigUint64Array<ArrayBuffer>>();
    });

    it("map allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = map(uint8, (value) => (value > 1 ? Break : value * 2));
      expectTypeOf(promise).toEqualTypeOf<Uint8Array<ArrayBuffer>>();
    });

    it("map allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = map(uint8, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Uint8Array<ArrayBuffer>>();
    });
  });

  describe("plain object", () => {
    it("map infers the mapped element type", () => {
      const promise = map({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<{
        "1": string;
        "2": string;
        "3": string;
      }>();
    });

    it("map allows Break in the callback without changing output type", () => {
      const promise = map({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<{
        "1": number;
        "2": number;
        "3": number;
      }>();
    });

    it("map allows Last in the callback without changing output type", () => {
      const promise = map({ "1": 1, "2": 2, "3": 3 }, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<{
        "1": number;
        "2": number;
        "3": number;
      }>();
    });
  });

  describe("iterator", () => {
    it("map infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = map(iterator, (value) => value.toString());
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("map allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = map(iterator, (value) => (value > 1 ? Break : value * 2));
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("map allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = map(iterator, (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });
});
