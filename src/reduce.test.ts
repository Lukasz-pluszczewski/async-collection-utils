import { reduce } from "./reduce";
import { Break, Last } from "./shared";

describe("reduce", () => {
  describe("array", () => {
    it("should map values", () => {
      const result = reduce([1, 2, 3], (acc, value) => acc + value, 10);
      expect(result).toStrictEqual(16);
    });

    it("should break on encountering Break", () => {
      const result = reduce(
        [1, 2, 3],
        (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", () => {
      const result = reduce(
        [1, 2, 3],
        (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(31);
    });
  });

  describe("set", () => {
    it("should map values", () => {
      const result = reduce(
        new Set([1, 2, 3]),
        (acc, value) => acc + value,
        10,
      );
      expect(result).toStrictEqual(16);
    });

    it("should break on encountering Break", () => {
      const result = reduce(
        new Set([1, 2, 3]),
        (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", () => {
      const result = reduce(
        new Set([1, 2, 3]),
        (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(31);
    });
  });

  describe("map", () => {
    it("should map values", () => {
      const result = reduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (acc, value) => acc + value,
        10,
      );
      expect(result).toStrictEqual(16);
    });

    it("should break on encountering Break", () => {
      const result = reduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", () => {
      const result = reduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(31);
    });
  });

  describe("typedArray", () => {
    it("should map values", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const result = reduce(biguint64, (acc, value) => acc + value, 10n);

      expect(result).toStrictEqual(52n);
    });

    it("should break on encountering Break", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      const result = reduce(
        uint8,
        (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );

      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      const result = reduce(
        uint8,
        (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );

      expect(result).toStrictEqual(31);
    });
  });

  describe("plain object", () => {
    it("should map values", () => {
      const result = reduce(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        (acc, value) => acc + value,
        10,
      );
      expect(result).toStrictEqual(16);
    });

    it("should break on encountering Break", () => {
      const result = reduce(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", () => {
      const result = reduce(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(31);
    });
  });

  describe("iterator", () => {
    it("should map values", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = reduce(iterator, (acc, value) => acc + value, 10);

      expect(result).toStrictEqual(16);
    });

    it("should break on encountering Break", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = reduce(
        iterator,
        (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );

      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = reduce(
        iterator,
        (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );

      expect(result).toStrictEqual(31);
    });
  });
});
