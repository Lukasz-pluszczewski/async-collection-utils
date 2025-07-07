import { filter } from "./filter";
import { Break, Last } from "./shared";

describe("filter", () => {
  describe("array", () => {
    it("should filter values", () => {
      const result = filter([1, 2, 3], (value) => value % 2 === 0);
      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", () => {
      const result = filter([1, 2, 3], (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const result = filter([1, 2, 3, 4], (value) => {
        if (value === 3) return Last(true);
        return value % 2 === 0;
      });
      expect(result).toStrictEqual([2, 3]);
    });
  });

  describe("set", () => {
    it("should filter values", () => {
      const result = filter(new Set([1, 2, 3]), (value) => value % 2 === 0);
      expect(result).toStrictEqual(new Set([2]));
    });

    it("should break on encountering Break", () => {
      const result = filter(new Set([1, 2, 3]), (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });
      expect(result).toStrictEqual(new Set([2]));
    });

    it("should save value and break on encountering Last", () => {
      const result = filter(new Set([1, 2, 3, 4]), (value) => {
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

    it("should filter values", () => {
      const result = filter(inputMap, (value) => value % 2 === 0);
      expect(result).toStrictEqual(
        new Map([
          [2, 2],
          [4, 4],
        ]),
      );
    });

    it("should break on encountering Break", () => {
      const result = filter(inputMap, (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });
      expect(result).toStrictEqual(new Map([[2, 2]]));
    });

    it("should save value and break on encountering Last", () => {
      const result = filter(inputMap, (value) => {
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
    it("should filter values", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;

      const result = filter(uint8, (value) => value % 2 === 0);

      const expectedUint8 = new Uint8Array(1);
      expectedUint8[0] = 2;
      expect(result).toStrictEqual(expectedUint8);
    });

    it("should break on encountering Break", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;

      const result = filter(uint8, (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });

      const expectedUint8 = new Uint8Array(1);
      expectedUint8[0] = 2;
      expect(result).toStrictEqual(expectedUint8);
    });

    it("should save value and break on encountering Last", () => {
      const uint8 = new Uint8Array(4);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      uint8[3] = 4;

      const result = filter(uint8, (value) => {
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

    it("should filter values", () => {
      const result = filter(input, (value) => value % 2 === 0);
      expect(result).toStrictEqual({ "2": 2 });
    });

    it("should break on encountering Break", () => {
      const result = filter(input, (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });
      expect(result).toStrictEqual({ "2": 2 });
    });

    it("should save value and break on encountering Last", () => {
      const result = filter(input, (value) => {
        if (value === 3) return Last(false);
        return value % 2 === 0;
      });
      expect(result).toStrictEqual({ "2": 2 });
    });
  });

  describe("iterator", () => {
    it("should filter values", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = filter(iterator, (value) => value % 2 === 0);

      const resultArray: number[] = [];
      for (const value of result) {
        resultArray.push(value as number);
      }
      expect(resultArray).toStrictEqual([2]);
    });

    it("should break on encountering Break", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = filter(iterator, (value) => {
        if (value === 3) return Break;
        return value % 2 === 0;
      });

      const resultArray: number[] = [];
      for (const value of result) {
        resultArray.push(value as number);
      }
      expect(resultArray).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const iterator = new Set([1, 2, 3, 4]).values();
      const result = filter(iterator, (value) => {
        if (value === 3) return Last(true);
        return value % 2 === 0;
      });

      const resultArray: number[] = [];
      for (const value of result) {
        resultArray.push(value as number);
      }
      expect(resultArray).toStrictEqual([2, 3]);
    });
  });
});
