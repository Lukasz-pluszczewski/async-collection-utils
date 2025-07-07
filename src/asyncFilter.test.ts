import { asyncFilter } from "./asyncFilter";
import { Break, Last } from "./shared";

describe("asyncFilter", () => {
  describe("array", () => {
    it("should filter values", async () => {
      const result = await asyncFilter(
        [1, 2, 3],
        async (value) => value % 2 === 0,
      );
      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", async () => {
      const result = await asyncFilter([1, 2, 3], async (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncFilter([1, 2, 3, 4], async (value) => {
        if (value === 3) return Last(true);
        return value % 2 === 0;
      });
      expect(result).toStrictEqual([2, 3]);
    });
  });

  describe("set", () => {
    it("should filter values", async () => {
      const result = await asyncFilter(
        new Set([1, 2, 3]),
        async (value) => value % 2 === 0,
      );
      expect(result).toStrictEqual(new Set([2]));
    });

    it("should break on encountering Break", async () => {
      const result = await asyncFilter(new Set([1, 2, 3]), async (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });
      expect(result).toStrictEqual(new Set([2]));
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncFilter(new Set([1, 2, 3, 4]), async (value) => {
        if (value === 3) return Last(false);
        return value % 2 === 0;
      });
      expect(result).toStrictEqual(new Set([2]));
    });
  });

  describe("map", () => {
    const inputMap = new Map([
      [1, 1],
      [2, 2],
      [3, 3],
      [4, 4],
    ]);

    it("should filter values", async () => {
      const result = await asyncFilter(
        inputMap,
        async (value) => value % 2 === 0,
      );
      expect(result).toStrictEqual(
        new Map([
          [2, 2],
          [4, 4],
        ]),
      );
    });

    it("should break on encountering Break", async () => {
      const result = await asyncFilter(inputMap, async (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });
      expect(result).toStrictEqual(new Map([[2, 2]]));
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncFilter(inputMap, async (value) => {
        if (value === 3) return Last(true);
        return value % 2 === 0;
      });
      expect(result).toStrictEqual(
        new Map([
          [2, 2],
          [3, 3],
        ]),
      );
    });
  });

  describe("typedArray", () => {
    it("should filter values", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;

      const result = await asyncFilter(uint8, async (value) => value % 2 === 0);

      const expectedUint8 = new Uint8Array(1);
      expectedUint8[0] = 2;
      expect(result).toStrictEqual(expectedUint8);
    });

    it("should break on encountering Break", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;

      const result = await asyncFilter(uint8, async (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });

      const expectedUint8 = new Uint8Array(1);
      expectedUint8[0] = 2;
      expect(result).toStrictEqual(expectedUint8);
    });

    it("should save value and break on encountering Last", async () => {
      const uint8 = new Uint8Array(4);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      uint8[3] = 4;

      const result = await asyncFilter(uint8, async (value) => {
        if (value === 3) return Last(true);
        return value % 2 === 0;
      });

      const expectedUint8 = new Uint8Array(2);
      expectedUint8[0] = 2;
      expectedUint8[1] = 3;
      expect(result).toStrictEqual(expectedUint8);
    });
  });

  describe("plain object", () => {
    const input = { "1": 1, "2": 2, "3": 3 };

    it("should filter values", async () => {
      const result = await asyncFilter(input, async (value) => value % 2 === 0);
      expect(result).toStrictEqual({ "2": 2 });
    });

    it("should break on encountering Break", async () => {
      const result = await asyncFilter(input, async (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });
      expect(result).toStrictEqual({ "2": 2 });
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncFilter(input, async (value) => {
        if (value === 3) return Last(false);
        return value % 2 === 0;
      });
      expect(result).toStrictEqual({ "2": 2 });
    });
  });

  describe("iterator", () => {
    it("should filter values", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncFilter(
        iterator,
        async (value) => value % 2 === 0,
      );

      const resultArray: number[] = [];
      for await (const value of result) {
        resultArray.push(value as number);
      }
      expect(resultArray).toStrictEqual([2]);
    });

    it("should break on encountering Break", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncFilter(iterator, async (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });

      const resultArray: number[] = [];
      for await (const value of result) {
        resultArray.push(value as number);
      }
      expect(resultArray).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const iterator = new Set([1, 2, 3, 4]).values();
      const result = await asyncFilter(iterator, async (value) => {
        if (value === 3) return Last(true);
        return value % 2 === 0;
      });

      const resultArray: number[] = [];
      for await (const value of result) {
        resultArray.push(value as number);
      }
      expect(resultArray).toStrictEqual([2, 3]);
    });
  });

  describe("asyncIterator", () => {
    it("should filter values", async () => {
      const asyncIterator = (async function* (): AsyncGenerator<
        number,
        void,
        void
      > {
        yield 1;
        yield 2;
        yield 3;
      })();

      const result = await asyncFilter(
        asyncIterator,
        async (value) => value % 2 === 0,
      );

      const resultArray: number[] = [];
      for await (const value of result) {
        resultArray.push(value as number);
      }
      expect(resultArray).toStrictEqual([2]);
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

      const result = await asyncFilter(asyncIterator, async (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });

      const resultArray: number[] = [];
      for await (const value of result) {
        resultArray.push(value as number);
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
        yield 4;
      })();

      const result = await asyncFilter(asyncIterator, async (value) => {
        if (value === 4) return Last(true);
        return value % 2 === 0;
      });

      const resultArray: number[] = [];
      for await (const value of result) {
        resultArray.push(value as number);
      }
      expect(resultArray).toStrictEqual([2, 4]);
    });
  });
});
