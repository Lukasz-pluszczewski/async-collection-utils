import { asyncFilterToGenerator } from "./asyncFilterToGenerator";
import { Break, Last } from "./shared";

const collectAsync = async <TValue>(iterable: AsyncIterable<TValue>) => {
  const result: TValue[] = [];
  for await (const value of iterable) {
    result.push(value);
  }
  return result;
};

describe("asyncFilterToGenerator", () => {
  describe("array", () => {
    it("should filter values", async () => {
      const result = await collectAsync(
        await asyncFilterToGenerator([1, 2, 3], async (value) => value % 2 === 0),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", async () => {
      const result = await collectAsync(
        await asyncFilterToGenerator([1, 2, 3], async (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await collectAsync(
        await asyncFilterToGenerator([1, 2, 3, 4], async (value) => {
          if (value === 3) return Last(true);
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });
  });

  describe("set", () => {
    it("should filter values", async () => {
      const result = await collectAsync(
        await asyncFilterToGenerator(new Set([1, 2, 3]), async (value) => value % 2 === 0),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", async () => {
      const result = await collectAsync(
        await asyncFilterToGenerator(new Set([1, 2, 3]), async (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await collectAsync(
        await asyncFilterToGenerator(new Set([1, 2, 3, 4]), async (value) => {
          if (value === 3) return Last(false);
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
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
      const result = await collectAsync(
        await asyncFilterToGenerator(inputMap, async (value) => value % 2 === 0),
      );
      expect(result).toStrictEqual([2, 4]);
    });

    it("should break on encountering Break", async () => {
      const result = await collectAsync(
        await asyncFilterToGenerator(inputMap, async (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await collectAsync(
        await asyncFilterToGenerator(inputMap, async (value) => {
          if (value === 3) return Last(true);
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });
  });

  describe("typedArray", () => {
    it("should filter values", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;

      const result = await collectAsync(
        await asyncFilterToGenerator(uint8, async (value) => value % 2 === 0),
      );

      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;

      const result = await collectAsync(
        await asyncFilterToGenerator(uint8, async (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );

      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const uint8 = new Uint8Array(4);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      uint8[3] = 4;

      const result = await collectAsync(
        await asyncFilterToGenerator(uint8, async (value) => {
          if (value === 3) return Last(true);
          return value % 2 === 0;
        }),
      );

      expect(result).toStrictEqual([2, 3]);
    });
  });

  describe("plain object", () => {
    const input = { "1": 1, "2": 2, "3": 3 };

    it("should filter values", async () => {
      const result = await collectAsync(
        await asyncFilterToGenerator(input, async (value) => value % 2 === 0),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", async () => {
      const result = await collectAsync(
        await asyncFilterToGenerator(input, async (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await collectAsync(
        await asyncFilterToGenerator(input, async (value) => {
          if (value === 3) return Last(false);
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
    });
  });

  describe("iterator", () => {
    it("should filter values", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await collectAsync(
        await asyncFilterToGenerator(iterator, async (value) => value % 2 === 0),
      );

      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await collectAsync(
        await asyncFilterToGenerator(iterator, async (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );

      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const iterator = new Set([1, 2, 3, 4]).values();
      const result = await collectAsync(
        await asyncFilterToGenerator(iterator, async (value) => {
          if (value === 3) return Last(true);
          return value % 2 === 0;
        }),
      );

      expect(result).toStrictEqual([2, 3]);
    });
  });

  describe("asyncIterator", () => {
    it("should filter values", async () => {
      const asyncIterator = (async function* (): AsyncGenerator<number> {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
      })();
      const result = await collectAsync(
        await asyncFilterToGenerator(asyncIterator, async (value) => value % 2 === 0),
      );
      expect(result).toStrictEqual([2, 4]);
    });

    it("should break on encountering Break", async () => {
      const asyncIterator = (async function* (): AsyncGenerator<number> {
        yield 1;
        yield 2;
        yield 3;
      })();
      const result = await collectAsync(
        await asyncFilterToGenerator(asyncIterator, async (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", async () => {
      const asyncIterator = (async function* (): AsyncGenerator<number> {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
      })();
      const result = await collectAsync(
        await asyncFilterToGenerator(asyncIterator, async (value) => {
          if (value === 3) return Last(true);
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });
  });
});
