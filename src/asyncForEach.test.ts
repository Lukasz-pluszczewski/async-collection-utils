import { asyncForEach } from "./asyncForEach";
import { Break } from "./shared";

describe("asyncForEach", () => {
  describe("array", () => {
    it("should map values", async () => {
      const cb = vi.fn(async () => {});
      await asyncForEach([1, 2, 3], cb);
      expect(cb).toHaveBeenCalledTimes(3);
      expect(cb.mock.calls).toEqual([
        [1, 0, [1, 2, 3]],
        [2, 1, [1, 2, 3]],
        [3, 2, [1, 2, 3]],
      ]);
    });

    it("should break on encountering Break", async () => {
      const cb = vi.fn(async (value): Promise<typeof Break | void> => {
        if (value === 2) return Break;
        return;
      });
      await asyncForEach([1, 2, 3], cb);
      expect(cb).toHaveBeenCalledTimes(2);
      expect(cb.mock.calls).toEqual([
        [1, 0, [1, 2, 3]],
        [2, 1, [1, 2, 3]],
      ]);
    });
  });

  describe("set", () => {
    it("should map values", async () => {
      const cb = vi.fn(async () => {});
      await asyncForEach(new Set([1, 2, 3]), cb);

      expect(cb).toHaveBeenCalledTimes(3);
      expect(cb.mock.calls).toEqual([
        [1, 0, new Set([1, 2, 3])],
        [2, 1, new Set([1, 2, 3])],
        [3, 2, new Set([1, 2, 3])],
      ]);
    });

    it("should break on encountering Break", async () => {
      const cb = vi.fn(async (value): Promise<typeof Break | void> => {
        if (value === 2) return Break;
        return;
      });
      await asyncForEach(new Set([1, 2, 3]), cb);

      expect(cb).toHaveBeenCalledTimes(2);
      expect(cb.mock.calls).toEqual([
        [1, 0, new Set([1, 2, 3])],
        [2, 1, new Set([1, 2, 3])],
      ]);
    });
  });

  describe("map", () => {
    it("should map values", async () => {
      const cb = vi.fn(async () => {});
      await asyncForEach(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        cb,
      );
      expect(cb).toHaveBeenCalledTimes(3);
      expect(cb.mock.calls).toEqual([
        [
          1,
          1,
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
        ],
        [
          2,
          2,
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
        ],
        [
          3,
          3,
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
        ],
      ]);
    });

    it("should break on encountering Break", async () => {
      const cb = vi.fn(async (value): Promise<typeof Break | void> => {
        if (value === 2) return Break;
        return;
      });
      await asyncForEach(
        new Map([
          [1, 1],
          [2, 2],
          [3, 3],
        ]),
        cb,
      );

      expect(cb).toHaveBeenCalledTimes(2);
      expect(cb.mock.calls).toEqual([
        [
          1,
          1,
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
        ],
        [
          2,
          2,
          new Map([
            [1, 1],
            [2, 2],
            [3, 3],
          ]),
        ],
      ]);
    });
  });

  describe("typedArray", () => {
    it("should iterate over values", async () => {
      const cb = vi.fn(async () => {});
      const biguint64 = new BigUint64Array(2);
      biguint64[0] = 42n;
      await asyncForEach(biguint64, cb);

      expect(cb).toHaveBeenCalledTimes(2);
      expect(cb.mock.calls).toEqual([
        [42n, 0, biguint64],
        [0n, 1, biguint64],
      ]);
    });

    it("should break on encountering Break", async () => {
      const cb = vi.fn(async (value): Promise<typeof Break | void> => {
        if (value === 2) return Break;
        return;
      });
      const uint8 = new Uint8Array(3);
      uint8[0] = 1;
      uint8[1] = 2;
      uint8[2] = 3;
      await asyncForEach(uint8, cb);

      expect(cb).toHaveBeenCalledTimes(2);
      expect(cb.mock.calls).toEqual([
        [1, 0, uint8],
        [2, 1, uint8],
      ]);
    });
  });

  describe("plain object", () => {
    it("should map values", async () => {
      const cb = vi.fn(async () => {});
      await asyncForEach(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        cb,
      );

      expect(cb).toHaveBeenCalledTimes(3);
      expect(cb.mock.calls).toEqual([
        [
          1,
          "1",
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
        ],
        [
          2,
          "2",
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
        ],
        [
          3,
          "3",
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
        ],
      ]);
    });

    it("should break on encountering Break", async () => {
      const cb = vi.fn(async (value): Promise<typeof Break | void> => {
        if (value === 2) return Break;
        return;
      });
      await asyncForEach(
        {
          "1": 1,
          "2": 2,
          "3": 3,
        },
        cb,
      );

      expect(cb).toHaveBeenCalledTimes(2);
      expect(cb.mock.calls).toEqual([
        [
          1,
          "1",
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
        ],
        [
          2,
          "2",
          {
            "1": 1,
            "2": 2,
            "3": 3,
          },
        ],
      ]);
    });
  });

  describe("iterator", () => {
    it("should map values", async () => {
      const cb = vi.fn(async () => {});
      const iterator = new Set([1, 2, 3]).values();
      await asyncForEach(iterator, cb);

      expect(cb).toHaveBeenCalledTimes(3);
      expect(cb.mock.calls).toEqual([
        [1, 0, iterator],
        [2, 1, iterator],
        [3, 2, iterator],
      ]);
    });

    it("should break on encountering Break", async () => {
      const cb = vi.fn(async (value): Promise<typeof Break | void> => {
        if (value === 2) return Break;
        return;
      });
      const iterator = new Set([1, 2, 3]).values();
      await asyncForEach(iterator, cb);

      expect(cb).toHaveBeenCalledTimes(2);
      expect(cb.mock.calls[0][0]).toBe(1);
      // @ts-ignore
      expect(cb.mock.calls[0][1]).toBe(0);
      // @ts-ignore
      expect(cb.mock.calls[0][2]).toBe(iterator);
      expect(cb.mock.calls[1][0]).toBe(2);
      // @ts-ignore
      expect(cb.mock.calls[1][1]).toBe(1);
      // @ts-ignore
      expect(cb.mock.calls[1][2]).toBe(iterator);
    });
  });

  describe("asyncIterator", () => {
    it("should map values", async () => {
      const cb = vi.fn(async () => {});
      const asyncIterator = (async function* (): AsyncGenerator<
        number,
        void,
        void
      > {
        yield 1;
        yield 2;
        yield 3;
      })();
      await asyncForEach(asyncIterator, cb);

      expect(cb).toHaveBeenCalledTimes(3);
      expect(cb.mock.calls).toEqual([
        [1, 0, asyncIterator],
        [2, 1, asyncIterator],
        [3, 2, asyncIterator],
      ]);
    });

    it("should break on encountering Break", async () => {
      const cb = vi.fn(async (value): Promise<typeof Break | void> => {
        if (value === 2) return Break;
        return;
      });
      const asyncIterator = (async function* (): AsyncGenerator<
        number,
        void,
        void
      > {
        yield 1;
        yield 2;
        yield 3;
      })();
      await asyncForEach(asyncIterator, cb);

      expect(cb).toHaveBeenCalledTimes(2);
      expect(cb.mock.calls).toEqual([
        [1, 0, asyncIterator],
        [2, 1, asyncIterator],
      ]);
    });
  });
});
