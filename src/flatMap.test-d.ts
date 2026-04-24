import { flatMap } from "./flatMap";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("flatMap", () => {
  describe("array", () => {
    it("flatMap infers the mapped element type", () => {
      const promise = flatMap([1, 2, 3], (value) =>
        value === 2
          ? value.toString()
          : [value.toString(), (value * 2).toString()],
      );
      expectTypeOf(promise).toEqualTypeOf<string[]>();
    });

    it("flatMap allows Break in the callback without changing output type", () => {
      const promise = flatMap([1, 2, 3], (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });

    it("flatMap allows Last in the callback without changing output type", () => {
      const promise = flatMap([1, 2, 3], (value) =>
        value > 1 ? Last([value * 2]) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<number[]>();
    });
  });
  describe("set", () => {
    it("flatMap infers the mapped element type", () => {
      const promise = flatMap(new Set([1, 2, 3]), (value) => [
        value.toString(),
      ]);
      expectTypeOf(promise).toEqualTypeOf<Set<string>>();
    });

    it("flatMap allows Break in the callback without changing output type", () => {
      const promise = flatMap(new Set([1, 2, 3]), (value) =>
        value > 1 ? Break : [value * 2, value * 3],
      );
      expectTypeOf(promise).toEqualTypeOf<Set<number>>();
    });

    it("flatMap allows Last in the callback without changing output type", () => {
      const promise = flatMap(new Set([1, 2, 3]), (value) =>
        value > 1 ? Last(value * 2) : [value * 2, value - 10],
      );
      expectTypeOf(promise).toEqualTypeOf<Set<number>>();
    });
  });

  describe("typedArray", () => {
    it("flatMap infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = flatMap(biguint64, () => [2n]);
      expectTypeOf(promise).toEqualTypeOf<BigUint64Array<ArrayBuffer>>();
    });

    it("flatMap allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = flatMap(uint8, (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Uint8Array<ArrayBuffer>>();
    });

    it("flatMap allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = flatMap(uint8, (value) =>
        value > 1 ? Last(value * 2) : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Uint8Array<ArrayBuffer>>();
    });
  });

  describe("iterator", () => {
    it("flatMap infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = flatMap(iterator, (value) => [value.toString()]);
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("flatMap allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = flatMap(iterator, (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("flatMap allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = flatMap(iterator, (value) =>
        value > 1 ? Last([value * 2]) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });

  describe("asyncIterator", () => {
    const asyncIterator = (function* (): Generator<number, void, void> {
      yield 1;
      yield 2;
      yield 3;
    })();
    it("flatMap infers the mapped element type", () => {
      const promise = flatMap(asyncIterator, (value) => [value.toString()]);
      expectTypeOf(promise).toEqualTypeOf<Generator<string>>();
    });

    it("flatMap allows Break in the callback without changing output type", () => {
      const promise = flatMap(asyncIterator, (value) =>
        value > 1 ? Break : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });

    it("flatMap allows Last in the callback without changing output type", () => {
      const promise = flatMap(asyncIterator, (value) =>
        value > 1 ? Last([value * 2]) : [value * 2],
      );
      expectTypeOf(promise).toEqualTypeOf<Generator<number>>();
    });
  });
});
