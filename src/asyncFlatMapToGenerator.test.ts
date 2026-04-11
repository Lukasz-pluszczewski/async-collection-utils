import { asyncFlatMapToGenerator } from "./asyncFlatMapToGenerator";
import { Break, Last } from "./shared";

const collectAsync = async <TValue>(iterable: AsyncIterable<TValue>) => {
  const result: TValue[] = [];
  for await (const value of iterable) {
    result.push(value);
  }
  return result;
};

describe("asyncFlatMapToGenerator", () => {
  describe("array", () => {
    it("should map values", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator([1, 2, 4], async (value) =>
          value === 2 ? 4 : [value * 2, value * 3],
        ),
      );
      expect(result).toStrictEqual([2, 3, 4, 8, 12]);
    });

    it("should break on encountering Break", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator([1, 2, 3], async (value) => {
          if (value === 2) return Break;
          return [value * 2, value * 3];
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator([1, 2, 3], async (value) => {
          if (value === 2) return Last([value * 10, value * 20]);
          return value * 2;
        }),
      );
      expect(result).toStrictEqual([2, 20, 40]);
    });
  });

  describe("set", () => {
    it("should map values", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator(new Set([1, 2, 3]), async (value) =>
          value === 2 ? 4 : [value * 2, value * 3],
        ),
      );
      expect(result).toStrictEqual([2, 3, 4, 6, 9]);
    });

    it("should break on encountering Break", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator(new Set([1, 2, 3]), async (value) => {
          if (value === 2) return Break;
          return [value * 2, value * 3];
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator(new Set([1, 2, 3]), async (value) => {
          if (value === 2) return Last(value * 30);
          return [value * 2, value * 10];
        }),
      );
      expect(result).toStrictEqual([2, 10, 60]);
    });
  });

  describe("map", () => {
    it("should map values", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator(
          new Map([
            [1, 1],
            [2, 2],
            [3, 4],
          ]),
          async (value) => (value === 2 ? 4 : [value * 2, value * 3]),
        ),
      );
      expect(result).toStrictEqual([2, 3, 4, 8, 12]);
    });

    it("should break on encountering Break", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator(
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
          async (value) => {
            if (value === 2) return Break;
            return [value * 2, value * 3];
          },
        ),
      );
      expect(result).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator(
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
          async (value) => {
            if (value === 2) return Last([value * 10, value - 2]);
            return value * 2;
          },
        ),
      );
      expect(result).toStrictEqual([2, 20, 0]);
    });
  });

  describe("typedArray", () => {
    it("should map values", async () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const result = await collectAsync(
        await asyncFlatMapToGenerator(biguint64, async (value) => [
          value * 2n,
          value * 3n,
        ]),
      );

      expect(result).toStrictEqual([84n, 126n, 0n, 0n]);
    });

    it("should break on encountering Break", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      const result = await collectAsync(
        await asyncFlatMapToGenerator(uint8, async (value) => {
          if (value === 2) return Break;
          return [value * 2, value + 5];
        }),
      );

      expect(result).toStrictEqual([2, 6]);
    });

    it("should save value and break on encountering Last", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      const result = await collectAsync(
        await asyncFlatMapToGenerator(uint8, async (value) => {
          if (value === 2) return Last([value * 10, value * 3]);
          return value * 2;
        }),
      );

      expect(result).toStrictEqual([2, 20, 6]);
    });
  });

  describe("plain object", () => {
    it("should map values", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator(
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
          async (value) => (value === 2 ? 4 : [value * 2, value * 3]),
        ),
      );
      expect(result).toStrictEqual([2, 3, 4, 6, 9]);
    });

    it("should break on encountering Break", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator(
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
          async (value) => {
            if (value === 2) return Break;
            return [value * 2, value + 15];
          },
        ),
      );
      expect(result).toStrictEqual([2, 16]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await collectAsync(
        await asyncFlatMapToGenerator(
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
          async (value) => {
            if (value === 2) return Last([value * 10, value - 1]);
            return [value * 2, value * 3];
          },
        ),
      );
      expect(result).toStrictEqual([2, 3, 20, 1]);
    });
  });

  describe("iterator", () => {
    it("should map values", async () => {
      const iterator = new Set([1, 2, 4]).values();
      const result = await collectAsync(
        await asyncFlatMapToGenerator(iterator, async (value) =>
          value === 2 ? 4 : [value * 2, value * 3],
        ),
      );

      expect(result).toStrictEqual([2, 3, 4, 8, 12]);
    });

    it("should break on encountering Break", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await collectAsync(
        await asyncFlatMapToGenerator(iterator, async (value) => {
          if (value === 2) return Break;
          return [value * 2, value * 3];
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await collectAsync(
        await asyncFlatMapToGenerator(iterator, async (value) => {
          if (value === 2) return Last([value * 10, value * 7]);
          return value * 2;
        }),
      );
      expect(result).toStrictEqual([2, 20, 14]);
    });
  });

  describe("asyncIterator", () => {
    it("should map values", async () => {
      const asyncIterator = (async function* (): AsyncGenerator<number> {
        yield 1;
        yield 2;
        yield 4;
      })();
      const result = await collectAsync(
        await asyncFlatMapToGenerator(asyncIterator, async (value) =>
          value === 2 ? 4 : [value * 2, value * 3],
        ),
      );

      expect(result).toStrictEqual([2, 3, 4, 8, 12]);
    });

    it("should break on encountering Break", async () => {
      const asyncIterator = (async function* (): AsyncGenerator<number> {
        yield 1;
        yield 2;
        yield 3;
      })();
      const result = await collectAsync(
        await asyncFlatMapToGenerator(asyncIterator, async (value) => {
          if (value === 2) return Break;
          return [value * 2, value * 3];
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", async () => {
      const asyncIterator = (async function* (): AsyncGenerator<number> {
        yield 1;
        yield 2;
        yield 3;
      })();
      const result = await collectAsync(
        await asyncFlatMapToGenerator(asyncIterator, async (value) => {
          if (value === 2) return Last([value * 10, value * 7]);
          return value * 2;
        }),
      );
      expect(result).toStrictEqual([2, 20, 14]);
    });
  });
});
