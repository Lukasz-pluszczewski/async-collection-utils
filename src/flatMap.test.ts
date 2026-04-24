import { flatMap } from "./flatMap";
import { Break, Last } from "./shared";

describe("flatMap", () => {
  describe("array", () => {
    it("should map values", () => {
      const result = flatMap([1, 2, 4], (value) =>
        value === 2 ? 4 : [value * 2, value * 3],
      );
      expect(result).toStrictEqual([2, 3, 4, 8, 12]);
    });

    it("should break on encountering Break", () => {
      const result = flatMap([1, 2, 3], (value) => {
        if (value === 2) return Break;
        return [value * 2, value * 3];
      });
      expect(result).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", () => {
      const result = flatMap([1, 2, 3], (value) => {
        if (value === 2) return Last([value * 10, value * 20]);
        return value * 2;
      });
      expect(result).toStrictEqual([2, 20, 40]);
    });
  });

  describe("set", () => {
    it("should map values", () => {
      const result = flatMap(new Set([1, 2, 3]), (value) =>
        value === 2 ? 4 : [value * 2, value * 3],
      );
      expect(result).toStrictEqual(new Set([2, 3, 4, 6, 9]));
    });

    it("should break on encountering Break", () => {
      const result = flatMap(new Set([1, 2, 3]), (value) => {
        if (value === 2) return Break;
        return [value * 2, value * 3];
      });
      expect(result).toStrictEqual(new Set([2, 3]));
    });

    it("should save value and break on encountering Last", () => {
      const result = flatMap(new Set([1, 2, 3]), (value) => {
        if (value === 2) return Last(value * 30);
        return [value * 2, value * 10];
      });
      expect(result).toStrictEqual(new Set([2, 10, 60]));
    });
  });

  describe("typedArray", () => {
    it("should map values", () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const result = flatMap(biguint64, (value) => [value * 2n, value * 3n]);

      const expectedBiguint64 = new BigUint64Array(4);
      expectedBiguint64[0] = 84n;
      expectedBiguint64[1] = 126n;
      expect(result).toStrictEqual(expectedBiguint64);
    });

    it("should break on encountering Break", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      const result = flatMap(uint8, (value) => {
        if (value === 2) return Break;
        return [value * 2, value + 5];
      });

      const expectedUint8 = new Uint8Array(2);
      expectedUint8[0] = 2;
      expectedUint8[1] = 6;
      expect(result).toStrictEqual(expectedUint8);
    });

    it("should save value and break on encountering Last", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      const result = flatMap(uint8, (value) => {
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
    it("should map values", () => {
      const iterator = new Set([1, 2, 4]).values();
      const result = flatMap(iterator, (value) =>
        value === 2 ? 4 : [value * 2, value * 3],
      );

      const resultArray = [];
      for (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 3, 4, 8, 12]);
    });

    it("should break on encountering Break", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = flatMap(iterator, (value) => {
        if (value === 2) return Break;
        return [value * 2, value * 3];
      });
      const resultArray = [];
      for (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 3]);
    });

    it("should save value and break on encountering Last", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = flatMap(iterator, (value) => {
        if (value === 2) return Last([value * 10, value * 7]);
        return value * 2;
      });
      const resultArray = [];
      for (const value of result) {
        resultArray.push(value);
      }
      expect(resultArray).toStrictEqual([2, 20, 14]);
    });
  });
});
