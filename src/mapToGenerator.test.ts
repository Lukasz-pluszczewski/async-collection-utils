import { mapToGenerator } from "./mapToGenerator";
import { Break, Last } from "./shared";

const collect = <TValue>(iterable: Iterable<TValue>) => [...iterable];

describe("mapToGenerator", () => {
  describe("array", () => {
    it("should map values", () => {
      const result = collect(mapToGenerator([1, 2, 3], (value) => value * 2));
      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        mapToGenerator([1, 2, 3], (value) => {
          if (value === 2) return Break;
          return value * 2;
        }),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        mapToGenerator([1, 2, 3], (value) => {
          if (value === 2) return Last(value * 10);
          return value * 2;
        }),
      );
      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("set", () => {
    it("should map values", () => {
      const result = collect(
        mapToGenerator(new Set([1, 2, 3]), (value) => value * 2),
      );
      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        mapToGenerator(new Set([1, 2, 3]), (value) => {
          if (value === 2) return Break;
          return value * 2;
        }),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        mapToGenerator(new Set([1, 2, 3]), (value) => {
          if (value === 2) return Last(value * 10);
          return value * 2;
        }),
      );
      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("map", () => {
    it("should map values", () => {
      const result = collect(
        mapToGenerator(
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
          (value) => value * 2,
        ),
      );
      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        mapToGenerator(
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
          (value) => {
            if (value === 2) return Break;
            return value * 2;
          },
        ),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        mapToGenerator(
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
          (value) => {
            if (value === 2) return Last(value * 10);
            return value * 2;
          },
        ),
      );
      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("typedArray", () => {
    it("should map values", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const result = collect(mapToGenerator(biguint64, (value) => value * 2n));

      expect(result).toStrictEqual([84n, 0n]);
    });

    it("should break on encountering Break", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      const result = collect(
        mapToGenerator(uint8, (value) => {
          if (value === 2) return Break;
          return value * 2;
        }),
      );

      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      const result = collect(
        mapToGenerator(uint8, (value) => {
          if (value === 2) return Last(value * 10);
          return value * 2;
        }),
      );

      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("plain object", () => {
    it("should map values", () => {
      const result = collect(
        mapToGenerator(
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
          (value) => value * 2,
        ),
      );
      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        mapToGenerator(
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
          (value) => {
            if (value === 2) return Break;
            return value * 2;
          },
        ),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        mapToGenerator(
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
          (value) => {
            if (value === 2) return Last(value * 10);
            return value * 2;
          },
        ),
      );
      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("iterator", () => {
    it("should map values", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = collect(mapToGenerator(iterator, (value) => value * 2));

      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = collect(
        mapToGenerator(iterator, (value) => {
          if (value === 2) return Break;
          return value * 2;
        }),
      );

      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = collect(
        mapToGenerator(iterator, (value) => {
          if (value === 2) return Last(value * 10);
          return value * 2;
        }),
      );

      expect(result).toStrictEqual([2, 20]);
    });
  });
});
