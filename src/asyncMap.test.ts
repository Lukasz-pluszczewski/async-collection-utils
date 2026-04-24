import { asyncMap } from "./asyncMap";
import { Break, Last } from "./shared";

describe("asyncMap", () => {
  describe("array", () => {
    it("should map values", async () => {
      const result = await asyncMap([1, 2, 3], async (value) => value * 2);
      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", async () => {
      const result = await asyncMap([1, 2, 3], async (value) => {
        if (value === 2) return Break;
        return value * 2;
      });
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncMap([1, 2, 3], async (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });
      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("set", () => {
    it("should map values", async () => {
      const result = await asyncMap(
        new Set([1, 2, 3]),
        async (value) => value * 2,
      );
      expect(result).toStrictEqual(new Set([2, 4, 6]));
    });

    it("should break on encountering Break", async () => {
      const result = await asyncMap(new Set([1, 2, 3]), async (value) => {
        if (value === 2) return Break;
        return value * 2;
      });
      expect(result).toStrictEqual(new Set([2]));
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncMap(new Set([1, 2, 3]), async (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });
      expect(result).toStrictEqual(new Set([2, 20]));
    });
  });

  describe("map", () => {
    it("should map values", async () => {
      const result = await asyncMap(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => value * 2,
      );
      expect(result).toStrictEqual(
        new Map([
          [1, 2],
          [2, 4],
          [3, 6],
        ]),
      );
    });

    it("should break on encountering Break", async () => {
      const result = await asyncMap(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => {
          if (value === 2) return Break;
          return value * 2;
        },
      );
      expect(result).toStrictEqual(new Map([[1, 2]]));
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncMap(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => {
          if (value === 2) return Last(value * 10);
          return value * 2;
        },
      );
      expect(result).toStrictEqual(
        new Map([
          [1, 2],
          [2, 20],
        ]),
      );
    });
  });

  describe("typedArray", () => {
    it("should map values", async () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const result = await asyncMap(biguint64, async (value) => value * 2n);

      const expectedBiguint64 = new BigUint64Array(2);
      expectedBiguint64[0] = 84n;
      expect(result).toStrictEqual(expectedBiguint64);
    });

    it("should break on encountering Break", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      const result = await asyncMap(uint8, async (value) => {
        if (value === 2) return Break;
        return value * 2;
      });

      const expectedUint8 = new Uint8Array(1);
      expectedUint8[0] = 2;
      expect(result).toStrictEqual(expectedUint8);
    });

    it("should save value and break on encountering Last", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      const result = await asyncMap(uint8, async (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });

      const expectedUint8 = new Uint8Array(2);
      expectedUint8[0] = 2;
      expectedUint8[1] = 20;
      expect(result).toStrictEqual(expectedUint8);
    });
  });

  describe("plain object", () => {
    it("should map values", async () => {
      const result = await asyncMap(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        async (value) => value * 2,
      );
      expect(result).toStrictEqual({
        "1": 2,
        "2": 4,
        "3": 6,
      });
    });

    it("should break on encountering Break", async () => {
      const result = await asyncMap(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        async (value) => {
          if (value === 2) return Break;
          return value * 2;
        },
      );
      expect(result).toStrictEqual({
        "1": 2,
      });
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncMap(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        async (value) => {
          if (value === 2) return Last(value * 10);
          return value * 2;
        },
      );
      expect(result).toStrictEqual({
        "1": 2,
        "2": 20,
      });
    });
  });

  describe("iterator", () => {
    it("should map values", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncMap(iterator, async (value) => value * 2);

      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncMap(iterator, async (value) => {
        if (value === 2) return Break;
        return value * 2;
      });
      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncMap(iterator, async (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });
      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 20]);
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
      const result = await asyncMap(asyncIterator, async (value) => value * 2);

      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 4, 6]);
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
      const result = await asyncMap(asyncIterator, async (value) => {
        if (value === 2) return Break;
        return value * 2;
      });
      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2]);
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
      const result = await asyncMap(asyncIterator, async (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });
      const resultArray = [];
      for await (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 20]);
    });
  });
});
