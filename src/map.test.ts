import { map } from "./map";
import { Break, Last } from "./shared";

describe("map", () => {
  describe("array", () => {
    it("should map values", () => {
      const result = map([1, 2, 3], (value) => value * 2);
      expect(result).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", () => {
      const result = map([1, 2, 3], (value) => {
        if (value === 2) return Break;
        return value * 2;
      });
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const result = map([1, 2, 3], (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });
      expect(result).toStrictEqual([2, 20]);
    });
  });

  describe("set", () => {
    it("should map values", () => {
      const result = map(new Set([1, 2, 3]), (value) => value * 2);
      expect(result).toStrictEqual(new Set([2, 4, 6]));
    });

    it("should break on encountering Break", () => {
      const result = map(new Set([1, 2, 3]), (value) => {
        if (value === 2) return Break;
        return value * 2;
      });
      expect(result).toStrictEqual(new Set([2]));
    });

    it("should save value and break on encountering Last", () => {
      const result = map(new Set([1, 2, 3]), (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });
      expect(result).toStrictEqual(new Set([2, 20]));
    });
  });

  describe("map", () => {
    it("should map values", () => {
      const result = map(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => value * 2,
      );
      expect(result).toStrictEqual(
        new Map([
          [1, 2],
          [2, 4],
          [3, 6],
        ]),
      );
    });

    it("should break on encountering Break", () => {
      const result = map(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => {
          if (value === 2) return Break;
          return value * 2;
        },
      );
      expect(result).toStrictEqual(new Map([[1, 2]]));
    });

    it("should save value and break on encountering Last", () => {
      const result = map(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        (value) => {
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
    it("should map values", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const result = map(biguint64, (value) => value * 2n);

      const expectedBiguint64 = new BigUint64Array(2);
      expectedBiguint64[0] = 84n;
      expect(result).toStrictEqual(expectedBiguint64);
    });

    it("should break on encountering Break", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      const result = map(uint8, (value) => {
        if (value === 2) return Break;
        return value * 2;
      });

      const expectedUint8 = new Uint8Array(1);
      expectedUint8[0] = 2;
      expect(result).toStrictEqual(expectedUint8);
    });

    it("should save value and break on encountering Last", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      const result = map(uint8, (value) => {
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
    it("should map values", () => {
      const result = map(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        (value) => value * 2,
      );
      expect(result).toStrictEqual({
        "1": 2,
        "2": 4,
        "3": 6,
      });
    });

    it("should break on encountering Break", () => {
      const result = map(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        (value) => {
          if (value === 2) return Break;
          return value * 2;
        },
      );
      expect(result).toStrictEqual({
        "1": 2,
      });
    });

    it("should save value and break on encountering Last", () => {
      const result = map(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        (value) => {
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
    it("should map values", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = map(iterator, (value) => value * 2);

      const resultArray = [];
      for (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 4, 6]);
    });

    it("should break on encountering Break", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = map(iterator, (value) => {
        if (value === 2) return Break;
        return value * 2;
      });
      const resultArray = [];
      for (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = map(iterator, (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });
      const resultArray = [];
      for (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 20]);
    });
  });
});
