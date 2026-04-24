import { asyncFlatMap } from "./asyncFlatMap";
import { Break, Last } from "./shared";

describe("asyncFlatMap", () => {
  describe("array", () => {
    it("should map values", async () => {
      const result = await asyncFlatMap([1, 2, 4], async (value) =>
        value === 2 ? 4 : [value * 2, value * 3],
      );
      expect(result).toStrictEqual([2, 3, 4, 8, 12]);
    });

    it("should break on encountering Break", async () => {
      const result = await asyncFlatMap([1, 2, 3], async (value) => {
        if (value === 2) return Break;
        return [value * 2, value * 3];
      });
      expect(result).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncFlatMap([1, 2, 3], async (value) => {
        if (value === 2) return Last([value * 10, value * 20]);
        return value * 2;
      });
      expect(result).toStrictEqual([2, 20, 40]);
    });
  });

  describe("set", () => {
    it("should map values", async () => {
      const result = await asyncFlatMap(new Set([1, 2, 3]), async (value) =>
        value === 2 ? 4 : [value * 2, value * 3],
      );
      expect(result).toStrictEqual(new Set([2, 3, 4, 6, 9]));
    });

    it("should break on encountering Break", async () => {
      const result = await asyncFlatMap(new Set([1, 2, 3]), async (value) => {
        if (value === 2) return Break;
        return [value * 2, value * 3];
      });
      expect(result).toStrictEqual(new Set([2, 3]));
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncFlatMap(new Set([1, 2, 3]), async (value) => {
        if (value === 2) return Last(value * 30);
        return [value * 2, value * 10];
      });
      expect(result).toStrictEqual(new Set([2, 10, 60]));
    });
  });

  describe("typedArray", () => {
    it("should map values", async () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const result = await asyncFlatMap(biguint64, async (value) => [
        value * 2n,
        value * 3n,
      ]);

      const expectedBiguint64 = new BigUint64Array(4);
      expectedBiguint64[0] = 84n;
      expectedBiguint64[1] = 126n;
      expect(result).toStrictEqual(expectedBiguint64);
    });

    it("should break on encountering Break", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      const result = await asyncFlatMap(uint8, async (value) => {
        if (value === 2) return Break;
        return [value * 2, value + 5];
      });

      const expectedUint8 = new Uint8Array(2);
      expectedUint8[0] = 2;
      expectedUint8[1] = 6;
      expect(result).toStrictEqual(expectedUint8);
    });

    it("should save value and break on encountering Last", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      const result = await asyncFlatMap(uint8, async (value) => {
        if (value === 2) return Last([value * 10, value * 3]);
        return value * 2;
      });

      const expectedUint8 = new Uint8Array(3);
      expectedUint8[0] = 2;
      expectedUint8[1] = 20;
      expectedUint8[2] = 6;
      expect(result).toStrictEqual(expectedUint8);
    });
  });

  describe("iterator", () => {
    it("should map values", async () => {
      const iterator = new Set([1, 2, 4]).values();
      const result = await asyncFlatMap(iterator, async (value) =>
        value === 2 ? 4 : [value * 2, value * 3],
      );

      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 3, 4, 8, 12]);
    });

    it("should break on encountering Break", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncFlatMap(iterator, async (value) => {
        if (value === 2) return Break;
        return [value * 2, value * 3];
      });
      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncFlatMap(iterator, async (value) => {
        if (value === 2) return Last([value * 10, value * 7]);
        return value * 2;
      });
      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 20, 14]);
    });
  });

  describe("asyncIterator", () => {
    it("should map values", async () => {
      const asyncIterator = (async function* (): AsyncGenerator<
        number,
        void,
        void
      > {
        yield 1;
        yield 2;
        yield 3;
      })();
      const result = await asyncFlatMap(asyncIterator, async (value) =>
        value === 2 ? 4 : [value * 2, value * 3],
      );

      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 3, 4, 6, 9]);
    });

    it("should break on encountering Break", async () => {
      const asyncIterator = (async function* (): AsyncGenerator<
        number,
        void,
        void
      > {
        yield 1;
        yield 2;
        yield 3;
      })();
      const result = await asyncFlatMap(asyncIterator, async (value) => {
        if (value === 2) return Break;
        return [value * 2, value + 13];
      });
      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 14]);
    });

    it("should save value and break on encountering Last", async () => {
      const asyncIterator = (async function* (): AsyncGenerator<
        number,
        void,
        void
      > {
        yield 1;
        yield 2;
        yield 3;
      })();
      const result = await asyncFlatMap(asyncIterator, async (value) => {
        if (value === 2) return Last(value * 10);
        return [value * 2, value - 1];
      });
      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 0, 20]);
    });
  });
});
