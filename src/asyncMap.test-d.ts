import { asyncMap } from "./asyncMap";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("asyncMap", () => {
  describe("array", () => {
    it("asyncMap infers the mapped element type", () => {
      const promise = asyncMap([1, 2, 3], async (value) => value.toString());
      expectTypeOf(promise).toEqualTypeOf<Promise<string[]>>();
    });

    it("asyncMap allows Break in the callback without changing output type", () => {
      const promise = asyncMap([1, 2, 3], async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });

    it("asyncMap allows Last in the callback without changing output type", () => {
      const promise = asyncMap([1, 2, 3], async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<number[]>>();
    });
  });
  describe("set", () => {
    it("asyncMap infers the mapped element type", () => {
      const promise = asyncMap(new Set([1, 2, 3]), async (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Set<string>>>();
    });

    it("asyncMap allows Break in the callback without changing output type", () => {
      const promise = asyncMap(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Set<number>>>();
    });

    it("asyncMap allows Last in the callback without changing output type", () => {
      const promise = asyncMap(new Set([1, 2, 3]), async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Set<number>>>();
    });
  });

  describe("map", () => {
    it("asyncMap infers the mapped element type", () => {
      const promise = asyncMap(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Map<number, string>>>();
    });

    it("asyncMap allows Break in the callback without changing output type", () => {
      const promise = asyncMap(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Break : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Map<number, number>>>();
    });

    it("asyncMap allows Last in the callback without changing output type", () => {
      const promise = asyncMap(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => (value > 1 ? Last(value * 2) : value * 2),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Map<number, number>>>();
    });
  });

  describe("typedArray", () => {
    it("asyncMap infers the mapped element type", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const promise = asyncMap(biguint64, async () => 2n);
      expectTypeOf(promise).toEqualTypeOf<
        Promise<BigUint64Array<ArrayBuffer>>
      >();
    });

    it("asyncMap allows Break in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncMap(uint8, async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Uint8Array<ArrayBuffer>>>();
    });

    it("asyncMap allows Last in the callback without changing output type", () => {
      const uint8 = new Uint8Array(2);
      uint8[0] = 42;
      const promise = asyncMap(uint8, async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<Uint8Array<ArrayBuffer>>>();
    });
  });

  describe("plain object", () => {
    it("asyncMap infers the mapped element type", () => {
      const promise = asyncMap({ "1": 1, "2": 2, "3": 3 }, async (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<
        Promise<{ "1": string; "2": string; "3": string }>
      >();
    });

    it("asyncMap allows Break in the callback without changing output type", () => {
      const promise = asyncMap({ "1": 1, "2": 2, "3": 3 }, async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<
        Promise<{ "1": number; "2": number; "3": number }>
      >();
    });

    it("asyncMap allows Last in the callback without changing output type", () => {
      const promise = asyncMap({ "1": 1, "2": 2, "3": 3 }, async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<
        Promise<{ "1": number; "2": number; "3": number }>
      >();
    });
  });

  describe("iterator", () => {
    it("asyncMap infers the mapped element type", () => {
      const iterator = new Set([1, 2, 3]).values();

      const promise = asyncMap(iterator, async (value) => value.toString());
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<string>>>();
    });

    it("asyncMap allows Break in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncMap(iterator, async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncMap allows Last in the callback without changing output type", () => {
      const iterator = new Set([1, 2, 3]).values();
      const promise = asyncMap(iterator, async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });

  describe("asyncIterator", () => {
    const asyncIterator = (async function* (): AsyncGenerator<
      number,
      void,
      void
    > {
      yield 1;
      yield 2;
      yield 3;
    })();
    it("asyncMap infers the mapped element type", () => {
      const promise = asyncMap(asyncIterator, async (value) =>
        value.toString(),
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<string>>>();
    });

    it("asyncMap allows Break in the callback without changing output type", () => {
      const promise = asyncMap(asyncIterator, async (value) =>
        value > 1 ? Break : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });

    it("asyncMap allows Last in the callback without changing output type", () => {
      const promise = asyncMap(asyncIterator, async (value) =>
        value > 1 ? Last(value * 2) : value * 2,
      );
      expectTypeOf(promise).toEqualTypeOf<Promise<AsyncGenerator<number>>>();
    });
  });
});
