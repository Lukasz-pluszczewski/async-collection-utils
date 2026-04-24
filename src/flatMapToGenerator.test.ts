import { flatMapToGenerator } from "./flatMapToGenerator";
import { Break, Last } from "./shared";

const collect = <TValue>(iterable: Iterable<TValue>) => [...iterable];

describe("flatMapToGenerator", () => {
  describe("array", () => {
    it("should map values", () => {
      const result = collect(
        flatMapToGenerator([1, 2, 4], (value) =>
          value === 2 ? 4 : [value * 2, value * 3],
        ),
      );
      expect(result).toStrictEqual([2, 3, 4, 8, 12]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        flatMapToGenerator([1, 2, 3], (value) => {
          if (value === 2) return Break;
          return [value * 2, value * 3];
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        flatMapToGenerator([1, 2, 3], (value) => {
          if (value === 2) return Last([value * 10, value * 20]);
          return value * 2;
        }),
      );
      expect(result).toStrictEqual([2, 20, 40]);
    });
  });

  describe("set", () => {
    it("should map values", () => {
      const result = collect(
        flatMapToGenerator(new Set([1, 2, 3]), (value) =>
          value === 2 ? 4 : [value * 2, value * 3],
        ),
      );
      expect(result).toStrictEqual([2, 3, 4, 6, 9]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        flatMapToGenerator(new Set([1, 2, 3]), (value) => {
          if (value === 2) return Break;
          return [value * 2, value * 3];
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        flatMapToGenerator(new Set([1, 2, 3]), (value) => {
          if (value === 2) return Last(value * 30);
          return [value * 2, value * 10];
        }),
      );
      expect(result).toStrictEqual([2, 10, 60]);
    });
  });

  describe("map", () => {
    it("should map values", () => {
      const result = collect(
        flatMapToGenerator(
          new Map([
            [1, 1],
            [2, 2],
            [3, 4],
          ]),
          (value) => (value === 2 ? 4 : [value * 2, value * 3]),
        ),
      );
      expect(result).toStrictEqual([2, 3, 4, 8, 12]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        flatMapToGenerator(
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
          (value) => {
            if (value === 2) return Break;
            return [value * 2, value * 3];
          },
        ),
      );
      expect(result).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        flatMapToGenerator(
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
          (value) => {
            if (value === 2) return Last([value * 10, value - 2]);
            return value * 2;
          },
        ),
      );
      expect(result).toStrictEqual([2, 20, 0]);
    });
  });

  describe("typedArray", () => {
    it("should map values", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const result = collect(
        flatMapToGenerator(biguint64, (value) => [value * 2n, value * 3n]),
      );

      expect(result).toStrictEqual([84n, 126n, 0n, 0n]);
    });

    it("should break on encountering Break", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      const result = collect(
        flatMapToGenerator(uint8, (value) => {
          if (value === 2) return Break;
          return [value * 2, value + 5];
        }),
      );

      expect(result).toStrictEqual([2, 6]);
    });

    it("should save value and break on encountering Last", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      const result = collect(
        flatMapToGenerator(uint8, (value) => {
          if (value === 2) return Last([value * 10, value * 3]);
          return value * 2;
        }),
      );

      expect(result).toStrictEqual([2, 20, 6]);
    });
  });

  describe("plain object", () => {
    it("should map values", () => {
      const result = collect(
        flatMapToGenerator(
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
          (value) => (value === 2 ? 4 : [value * 2, value * 3]),
        ),
      );
      expect(result).toStrictEqual([2, 3, 4, 6, 9]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        flatMapToGenerator(
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
          (value) => {
            if (value === 2) return Break;
            return [value * 2, value + 15];
          },
        ),
      );
      expect(result).toStrictEqual([2, 16]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        flatMapToGenerator(
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
          (value) => {
            if (value === 2) return Last([value * 10, value - 1]);
            return [value * 2, value * 3];
          },
        ),
      );
      expect(result).toStrictEqual([2, 3, 20, 1]);
    });
  });

  describe("iterator", () => {
    it("should map values", () => {
      const iterator = new Set([1, 2, 4]).values();
      const result = collect(
        flatMapToGenerator(iterator, (value) =>
          value === 2 ? 4 : [value * 2, value * 3],
        ),
      );

      expect(result).toStrictEqual([2, 3, 4, 8, 12]);
    });

    it("should break on encountering Break", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = collect(
        flatMapToGenerator(iterator, (value) => {
          if (value === 2) return Break;
          return [value * 2, value * 3];
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = collect(
        flatMapToGenerator(iterator, (value) => {
          if (value === 2) return Last([value * 10, value * 7]);
          return value * 2;
        }),
      );
      expect(result).toStrictEqual([2, 20, 14]);
    });
  });
});
