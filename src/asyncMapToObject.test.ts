import { asyncMapToObject } from "./asyncMapToObject";
import { Break, Last } from "./shared";

describe("asyncMapToObject", () => {
  describe("array", () => {
    it("should map values", async () => {
      const result = await asyncMapToObject([1, 2, 3], async v => v * 2);
      expect(result).toStrictEqual({ "0": 2, "1": 4, "2": 6 });
    });

    it("should break on Break", async () => {
      const result = await asyncMapToObject([1, 2, 3], async v => {
        if (v === 2) return Break;
        return v * 2;
      });
      expect(result).toStrictEqual({ "0": 2 });
    });

    it("should save value and break on Last", async () => {
      const result = await asyncMapToObject([1, 2, 3], async v => {
        if (v === 2) return Last(v * 10);
        return v * 2;
      });
      expect(result).toStrictEqual({ "0": 2, "1": 20 });
    });
  });

  describe("set", () => {
    it("should map values", async () => {
      const result = await asyncMapToObject(new Set([1, 2, 3]), async v => v * 2);
      expect(result).toStrictEqual({ "0": 2, "1": 4, "2": 6 });
    });

    it("should break on Break", async () => {
      const result = await asyncMapToObject(new Set([1, 2, 3]), async v => {
        if (v === 2) return Break;
        return v * 2;
      });
      expect(result).toStrictEqual({ "0": 2 });
    });

    it("should save value and break on Last", async () => {
      const result = await asyncMapToObject(new Set([1, 2, 3]), async v => {
        if (v === 2) return Last(v * 10);
        return v * 2;
      });
      expect(result).toStrictEqual({ "0": 2, "1": 20 });
    });
  });

  describe("map", () => {
    it("should map values", async () => {
      const result = await asyncMapToObject(
        new Map([
          ["a", 1],
          ["b", 2],
          ["c", 3],
        ]),
        async v => v * 2,
      );
      expect(result).toStrictEqual({ "a": 2, "b": 4, "c": 6 });
    });

    it("should break on Break", async () => {
      const result = await asyncMapToObject(
        new Map([
          ["a", 1],
          ["b", 2],
          ["c", 3],
        ]),
        async v => {
          if (v === 2) return Break;
          return v * 2;
        },
      );
      expect(result).toStrictEqual({ "a": 2 });
    });

    it("should save value and break on Last", async () => {
      const result = await asyncMapToObject(
        new Map([
          ["a", 1],
          ["b", 2],
          ["c", 3],
        ]),
        async v => {
          if (v === 2) return Last(v * 10);
          return v * 2;
        },
      );
      expect(result).toStrictEqual({ "a": 2, "b": 20 });
    });
  });

  describe("typedArray", () => {
    it("should map values", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1; uint8[1] = 2; uint8[2] = 3;
      const result = await asyncMapToObject(uint8, async v => v * 2);
      expect(result).toStrictEqual({ "0": 2, "1": 4, "2": 6 });
    });

    it("should break on Break", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1; uint8[1] = 2;
      const result = await asyncMapToObject(uint8, async v => {
        if (v === 2) return Break;
        return v * 2;
      });
      expect(result).toStrictEqual({ "0": 2 });
    });

    it("should save value and break on Last", async () => {
      const uint8 = new Uint8Array(3);
      uint8[0] = 1; uint8[1] = 2; uint8[2] = 3;
      const result = await asyncMapToObject(uint8, async v => {
        if (v === 2) return Last(v * 10);
        return v * 2;
      });
      expect(result).toStrictEqual({ "0": 2, "1": 20 });
    });
  });

  describe("plain object", () => {
    it("should map values", async () => {
      const result = await asyncMapToObject({ a: 1, b: 2, c: 3 }, async v => v * 2);
      expect(result).toStrictEqual({ a: 2, b: 4, c: 6 });
    });

    it("should break on Break", async () => {
      const result = await asyncMapToObject({ a: 1, b: 2, c: 3 }, async v => {
        if (v === 2) return Break;
        return v * 2;
      });
      expect(result).toStrictEqual({ a: 2 });
    });

    it("should save value and break on Last", async () => {
      const result = await asyncMapToObject({ a: 1, b: 2, c: 3 }, async v => {
        if (v === 2) return Last(v * 10);
        return v * 2;
      });
      expect(result).toStrictEqual({ a: 2, b: 20 });
    });
  });

  describe("iterator", () => {
    it("should map values", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncMapToObject(iterator, async v => v * 2);
      expect(result).toStrictEqual({ "0": 2, "1": 4, "2": 6 });
    });

    it("should break on Break", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncMapToObject(iterator, async v => {
        if (v === 2) return Break;
        return v * 2;
      });
      expect(result).toStrictEqual({ "0": 2 });
    });

    it("should save value and break on Last", async () => {
      const iterator = new Set([1, 2, 3]).values();
      const result = await asyncMapToObject(iterator, async v => {
        if (v === 2) return Last(v * 10);
        return v * 2;
      });
      expect(result).toStrictEqual({ "0": 2, "1": 20 });
    });
  });

  describe("asyncIterator", () => {
    it("should map values", async () => {
      const asyncIter = (async function* () {
        yield 1; yield 2; yield 3;
      })();
      const result = await asyncMapToObject(asyncIter, async v => v * 2);
      expect(result).toStrictEqual({ "0": 2, "1": 4, "2": 6 });
    });

    it("should break on Break", async () => {
      const asyncIter = (async function* () {
        yield 1; yield 2; yield 3;
      })();
      const result = await asyncMapToObject(asyncIter, async v => {
        if (v === 2) return Break;
        return v * 2;
      });
      expect(result).toStrictEqual({ "0": 2 });
    });

    it("should save value and break on Last", async () => {
      const asyncIter = (async function* () {
        yield 1; yield 2; yield 3;
      })();
      const result = await asyncMapToObject(asyncIter, async v => {
        if (v === 2) return Last(v * 10);
        return v * 2;
      });
      expect(result).toStrictEqual({ "0": 2, "1": 20 });
    });
  });
});
