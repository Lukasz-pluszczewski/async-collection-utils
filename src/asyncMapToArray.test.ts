import { asyncMapToArray } from "./asyncMapToArray";
import { Break, Last } from "./shared";

describe("asyncMapToArray", () => {
  describe("array", () => {
    it("should map values", async () => {
      const result = await asyncMapToArray(
        [1, 2, 3],
        async (value) => value * 2,
      );
      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", async () => {
      const result = await asyncMapToArray([1, 2, 3], async (value) => {
        if (value === 2) return Break;
        return value * 2;
      });
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncMapToArray([1, 2, 3], async (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });
      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("set", () => {
    it("should map values", async () => {
      const result = await asyncMapToArray(
        new Set([1, 2, 3]),
        async (value) => value * 2,
      );
      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", async () => {
      const result = await asyncMapToArray(
        new Set([1, 2, 3]),
        async (value) => {
          if (value === 2) return Break;
          return value * 2;
        },
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncMapToArray(
        new Set([1, 2, 3]),
        async (value) => {
          if (value === 2) return Last(value * 10);
          return value * 2;
        },
      );
      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("map", () => {
    it("should map values", async () => {
      const result = await asyncMapToArray(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (value) => value * 2,
      );
      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", async () => {
      const result = await asyncMapToArray(
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
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncMapToArray(
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
      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("typedArray", () => {
    it("should map values", async () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const result = await asyncMapToArray(
        biguint64,
        async (value) => value * 2n,
      );

      expect(result).toStrictEqual([84n, 0n]);
    });

    it("should break on encountering Break", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      const result = await asyncMapToArray(uint8, async (value) => {
        if (value === 2) return Break;
        return value * 2;
      });

      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      const result = await asyncMapToArray(uint8, async (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });

      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("plain object", () => {
    it("should map values", async () => {
      const result = await asyncMapToArray(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        async (value) => value * 2,
      );
      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", async () => {
      const result = await asyncMapToArray(
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
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncMapToArray(
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
      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("iterator", () => {
    it("should map values", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncMapToArray(
        iterator,
        async (value) => value * 2,
      );

      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncMapToArray(iterator, async (value) => {
        if (value === 2) return Break;
        return value * 2;
      });

      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncMapToArray(iterator, async (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });

      expect(result).toStrictEqual([2, 20]);
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
      const result = await asyncMapToArray(
        asyncIterator,
        async (value) => value * 2,
      );

      expect(result).toStrictEqual([2, 4, 6]);
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
      const result = await asyncMapToArray(asyncIterator, async (value) => {
        if (value === 2) return Break;
        return value * 2;
      });

      expect(result).toStrictEqual([2]);
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
      const result = await asyncMapToArray(asyncIterator, async (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });

      expect(result).toStrictEqual([2, 20]);
    });
  });
});
