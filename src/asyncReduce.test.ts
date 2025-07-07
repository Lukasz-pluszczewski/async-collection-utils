import { asyncReduce } from "./asyncReduce";
import { Break, Last } from "./shared";

describe("asyncReduce", () => {
  describe("array", () => {
    it("should map values", async () => {
      const result = await asyncReduce(
        [1, 2, 3],
        async (acc, value) => acc + value,
        10,
      );
      expect(result).toStrictEqual(16);
    });

    it("should break on encountering Break", async () => {
      const result = await asyncReduce(
        [1, 2, 3],
        async (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncReduce(
        [1, 2, 3],
        async (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(31);
    });
  });

  describe("set", () => {
    it("should map values", async () => {
      const result = await asyncReduce(
        new Set([1, 2, 3]),
        async (acc, value) => acc + value,
        10,
      );
      expect(result).toStrictEqual(16);
    });

    it("should break on encountering Break", async () => {
      const result = await asyncReduce(
        new Set([1, 2, 3]),
        async (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncReduce(
        new Set([1, 2, 3]),
        async (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(31);
    });
  });

  describe("map", () => {
    it("should map values", async () => {
      const result = await asyncReduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (acc, value) => acc + value,
        10,
      );
      expect(result).toStrictEqual(16);
    });

    it("should break on encountering Break", async () => {
      const result = await asyncReduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncReduce(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        async (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(31);
    });
  });

  describe("typedArray", () => {
    it("should map values", async () => {
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      const result = await asyncReduce(
        biguint64,
        async (acc, value) => acc + value,
        10n,
      );

      expect(result).toStrictEqual(52n);
    });

    it("should break on encountering Break", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      const result = await asyncReduce(
        uint8,
        async (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );

      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      const result = await asyncReduce(
        uint8,
        async (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );

      expect(result).toStrictEqual(31);
    });
  });

  describe("plain object", () => {
    it("should map values", async () => {
      const result = await asyncReduce(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        async (acc, value) => acc + value,
        10,
      );
      expect(result).toStrictEqual(16);
    });

    it("should break on encountering Break", async () => {
      const result = await asyncReduce(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        async (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", async () => {
      const result = await asyncReduce(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        async (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );
      expect(result).toStrictEqual(31);
    });
  });

  describe("iterator", () => {
    it("should map values", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncReduce(
        iterator,
        async (acc, value) => acc + value,
        10,
      );

      expect(result).toStrictEqual(16);
    });

    it("should break on encountering Break", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncReduce(
        iterator,
        async (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );

      expect(result).toStrictEqual(11);
    });

    it("should save value and break on encountering Last", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncReduce(
        iterator,
        async (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );

      expect(result).toStrictEqual(31);
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
      const result = await asyncReduce(
        asyncIterator,
        async (acc, value) => acc + value,
        10,
      );

      expect(result).toStrictEqual(16);
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
      const result = await asyncReduce(
        asyncIterator,
        async (acc, value) => {
          if (value === 2) return Break;
          return acc + value;
        },
        10,
      );

      expect(result).toStrictEqual(11);
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
      const result = await asyncReduce(
        asyncIterator,
        async (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        10,
      );

      expect(result).toStrictEqual(31);
    });
  });
});
