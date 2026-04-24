import { filterToGenerator } from "./filterToGenerator";
import { Break, Last } from "./shared";

const collect = <TValue>(iterable: Iterable<TValue>) => [...iterable];

describe("filterToGenerator", () => {
  describe("array", () => {
    it("should filter values", () => {
      const result = collect(
        filterToGenerator([1, 2, 3], (value) => value % 2 === 0),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        filterToGenerator([1, 2, 3], (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        filterToGenerator([1, 2, 3, 4], (value) => {
          if (value === 3) return Last(true);
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });
  });

  describe("set", () => {
    it("should filter values", () => {
      const result = collect(
        filterToGenerator(new Set([1, 2, 3]), (value) => value % 2 === 0),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        filterToGenerator(new Set([1, 2, 3]), (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        filterToGenerator(new Set([1, 2, 3, 4]), (value) => {
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

    it("should filter values", () => {
      const result = collect(
        filterToGenerator(inputMap, (value) => value % 2 === 0),
      );
      expect(result).toStrictEqual([2, 4]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        filterToGenerator(inputMap, (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        filterToGenerator(inputMap, (value) => {
          if (value === 3) return Last(true);
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2, 3]);
    });
  });

  describe("typedArray", () => {
    it("should filter values", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;

      const result = collect(filterToGenerator(uint8, (value) => value % 2 === 0));

      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;

      const result = collect(
        filterToGenerator(uint8, (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );

      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const uint8 = new Uint8Array(4);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      uint8[3] = 4;

      const result = collect(
        filterToGenerator(uint8, (value) => {
          if (value === 3) return Last(true);
          return value % 2 === 0;
        }),
      );

      expect(result).toStrictEqual([2, 3]);
    });
  });

  describe("plain object", () => {
    const input = { "1": 1, "2": 2, "3": 3 };

    it("should filter values", () => {
      const result = collect(
        filterToGenerator(input, (value) => value % 2 === 0),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", () => {
      const result = collect(
        filterToGenerator(input, (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const result = collect(
        filterToGenerator(input, (value) => {
          if (value === 3) return Last(false);
          return value % 2 === 0;
        }),
      );
      expect(result).toStrictEqual([2]);
    });
  });

  describe("iterator", () => {
    it("should filter values", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = collect(filterToGenerator(iterator, (value) => value % 2 === 0));

      expect(result).toStrictEqual([2]);
    });

    it("should break on encountering Break", () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = collect(
        filterToGenerator(iterator, (value) => {
          if (value === 3) return Break;
          return value % 2 === 0;
        }),
      );

      expect(result).toStrictEqual([2]);
    });

    it("should save value and break on encountering Last", () => {
      const iterator = new Set([1, 2, 3, 4]).values();
      const result = collect(
        filterToGenerator(iterator, (value) => {
          if (value === 3) return Last(true);
          return value % 2 === 0;
        }),
      );

      expect(result).toStrictEqual([2, 3]);
    });
  });
});
