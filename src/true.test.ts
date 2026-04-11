import { asyncFilterToArray } from "./asyncFilterToArray";
import { asyncFilterToGenerator } from "./asyncFilterToGenerator";
import { asyncFlatMapToArray } from "./asyncFlatMapToArray";
import { asyncFlatMapToGenerator } from "./asyncFlatMapToGenerator";
import { asyncForEach } from "./asyncForEach";
import { asyncMapToArray } from "./asyncMapToArray";
import { asyncMapToGenerator } from "./asyncMapToGenerator";
import { asyncReduce } from "./asyncReduce";
import { filterToArray } from "./filterToArray";
import { filterToGenerator } from "./filterToGenerator";
import { flatMapToArray } from "./flatMapToArray";
import { flatMapToGenerator } from "./flatMapToGenerator";
import { forEach } from "./forEach";
import { mapToArray } from "./mapToArray";
import { mapToGenerator } from "./mapToGenerator";
import { reduce } from "./reduce";
import { Break, Last, LastClass } from "./shared";

const collect = <TValue>(iterable: Iterable<TValue>) => [...iterable];

const collectAsync = async <TValue>(iterable: AsyncIterable<TValue>) => {
  const result: TValue[] = [];
  for await (const value of iterable) {
    result.push(value);
  }
  return result;
};

describe("true iterable", () => {
  const syncMapCases = [
    {
      name: "mapToGenerator",
      run: (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) => number | typeof Break | LastClass<number>,
      ) => collect(mapToGenerator(true, callback)),
    },
    {
      name: "mapToArray",
      run: (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) => number | typeof Break | LastClass<number>,
      ) => mapToArray(true, callback),
    },
  ];

  const asyncMapCases = [
    {
      name: "asyncMapToGenerator",
      run: async (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) => Promise<number | typeof Break | LastClass<number>>,
      ) => collectAsync(await asyncMapToGenerator(true, callback)),
    },
    {
      name: "asyncMapToArray",
      run: (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) => Promise<number | typeof Break | LastClass<number>>,
      ) => asyncMapToArray(true, callback),
    },
  ];

  for (const { name, run } of syncMapCases) {
    describe(name, () => {
      it("maps indices", () => {
        const result = run((value) => (value === 4 ? Break : value * 3));
        expect(result).toStrictEqual([0, 3, 6, 9]);
      });

      it("stops on Break", () => {
        const callback = vi.fn((value): number | typeof Break =>
          value === 2 ? Break : value + 1,
        );
        const result = run(callback);

        expect(result).toStrictEqual([1, 2]);
        expect(callback).toHaveBeenCalledTimes(3);
      });

      it("includes the last wrapped value", () => {
        const result = run((value) =>
          value === 2 ? Last(value * 10) : value * 10,
        );
        expect(result).toStrictEqual([0, 10, 20]);
      });
    });
  }

  for (const { name, run } of asyncMapCases) {
    describe(name, () => {
      it("maps indices", async () => {
        const result = await run(async (value) =>
          value === 4 ? Break : value * 3,
        );
        expect(result).toStrictEqual([0, 3, 6, 9]);
      });

      it("stops on Break", async () => {
        const callback = vi.fn(
          async (value): Promise<number | typeof Break> =>
            value === 2 ? Break : value + 1,
        );
        const result = await run(callback);

        expect(result).toStrictEqual([1, 2]);
        expect(callback).toHaveBeenCalledTimes(3);
      });

      it("includes the last wrapped value", async () => {
        const result = await run(async (value) =>
          value === 2 ? Last(value * 10) : value * 10,
        );
        expect(result).toStrictEqual([0, 10, 20]);
      });
    });
  }

  const syncFlatMapCases = [
    {
      name: "flatMapToGenerator",
      run: (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) =>
          | number
          | number[]
          | typeof Break
          | LastClass<number | number[]>,
      ) => collect(flatMapToGenerator(true, callback)),
    },
    {
      name: "flatMapToArray",
      run: (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) =>
          | number
          | number[]
          | typeof Break
          | LastClass<number | number[]>,
      ) => flatMapToArray(true, callback),
    },
  ];

  const asyncFlatMapCases = [
    {
      name: "asyncFlatMapToGenerator",
      run: async (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) => Promise<
          | number
          | number[]
          | typeof Break
          | LastClass<number | number[]>
        >,
      ) => collectAsync(await asyncFlatMapToGenerator(true, callback)),
    },
    {
      name: "asyncFlatMapToArray",
      run: (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) => Promise<
          | number
          | number[]
          | typeof Break
          | LastClass<number | number[]>
        >,
      ) => asyncFlatMapToArray(true, callback),
    },
  ];

  for (const { name, run } of syncFlatMapCases) {
    describe(name, () => {
      it("maps indices", () => {
        const result = run((value) => (value === 3 ? Break : [value, value + 100]));
        expect(result).toStrictEqual([0, 100, 1, 101, 2, 102]);
      });

      it("stops on Break", () => {
        const callback = vi.fn(
          (
            value,
          ): number | number[] | typeof Break | LastClass<number | number[]> =>
            value === 2 ? Break : [value, value + 10],
        );
        const result = run(callback);

        expect(result).toStrictEqual([0, 10, 1, 11]);
        expect(callback).toHaveBeenCalledTimes(3);
      });

      it("includes the last wrapped values", () => {
        const result = run((value) =>
          value === 2 ? Last([20, 21]) : [value],
        );
        expect(result).toStrictEqual([0, 1, 20, 21]);
      });
    });
  }

  for (const { name, run } of asyncFlatMapCases) {
    describe(name, () => {
      it("maps indices", async () => {
        const result = await run(async (value) =>
          value === 3 ? Break : [value, value + 100],
        );
        expect(result).toStrictEqual([0, 100, 1, 101, 2, 102]);
      });

      it("stops on Break", async () => {
        const callback = vi.fn(
          async (
            value,
          ): Promise<
            number | number[] | typeof Break | LastClass<number | number[]>
          > => (value === 2 ? Break : [value, value + 10]),
        );
        const result = await run(callback);

        expect(result).toStrictEqual([0, 10, 1, 11]);
        expect(callback).toHaveBeenCalledTimes(3);
      });

      it("includes the last wrapped values", async () => {
        const result = await run(async (value) =>
          value === 2 ? Last([20, 21]) : [value],
        );
        expect(result).toStrictEqual([0, 1, 20, 21]);
      });
    });
  }

  const syncFilterCases = [
    {
      name: "filterToGenerator",
      run: (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) => boolean | typeof Break | LastClass<boolean>,
      ) => collect(filterToGenerator(true, callback)),
    },
    {
      name: "filterToArray",
      run: (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) => boolean | typeof Break | LastClass<boolean>,
      ) => filterToArray(true, callback),
    },
  ];

  const asyncFilterCases = [
    {
      name: "asyncFilterToGenerator",
      run: async (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) => Promise<boolean | typeof Break | LastClass<boolean>>,
      ) => collectAsync(await asyncFilterToGenerator(true, callback)),
    },
    {
      name: "asyncFilterToArray",
      run: (
        callback: (
          value: number,
          index: number,
          iterable: true,
        ) => Promise<boolean | typeof Break | LastClass<boolean>>,
      ) => asyncFilterToArray(true, callback),
    },
  ];

  for (const { name, run } of syncFilterCases) {
    describe(name, () => {
      it("filters indices", () => {
        const result = run((value) => (value === 6 ? Break : value % 2 === 0));
        expect(result).toStrictEqual([0, 2, 4]);
      });

      it("stops on Break", () => {
        const callback = vi.fn((value): boolean | typeof Break =>
          value === 3 ? Break : value % 2 === 0,
        );
        const result = run(callback);

        expect(result).toStrictEqual([0, 2]);
        expect(callback).toHaveBeenCalledTimes(4);
      });

      it("includes the last accepted index", () => {
        const result = run((value) =>
          value === 3 ? Last(true) : value % 2 === 0,
        );
        expect(result).toStrictEqual([0, 2, 3]);
      });
    });
  }

  for (const { name, run } of asyncFilterCases) {
    describe(name, () => {
      it("filters indices", async () => {
        const result = await run(async (value) =>
          value === 6 ? Break : value % 2 === 0,
        );
        expect(result).toStrictEqual([0, 2, 4]);
      });

      it("stops on Break", async () => {
        const callback = vi.fn(
          async (value): Promise<boolean | typeof Break> =>
            value === 3 ? Break : value % 2 === 0,
        );
        const result = await run(callback);

        expect(result).toStrictEqual([0, 2]);
        expect(callback).toHaveBeenCalledTimes(4);
      });

      it("includes the last accepted index", async () => {
        const result = await run(async (value) =>
          value === 3 ? Last(true) : value % 2 === 0,
        );
        expect(result).toStrictEqual([0, 2, 3]);
      });
    });
  }

  describe("reduce", () => {
    it("reduces indices", () => {
      const result = reduce(
        true,
        (acc, value) => (value === 4 ? Break : acc + value),
        10,
      );
      expect(result).toStrictEqual(16);
    });

    it("stops on Break", () => {
      const callback = vi.fn((acc: number, value): number | typeof Break =>
        value === 2 ? Break : acc + value,
      );
      const result = reduce(true, callback, 10);

      expect(result).toStrictEqual(11);
      expect(callback).toHaveBeenCalledTimes(3);
    });

    it("uses the last wrapped accumulator", () => {
      const result = reduce(
        true,
        (acc, value) => (value === 2 ? Last(acc + value * 10) : acc + value),
        10,
      );
      expect(result).toStrictEqual(31);
    });
  });

  describe("asyncReduce", () => {
    it("reduces indices", async () => {
      const result = await asyncReduce(
        true,
        async (acc, value) => (value === 4 ? Break : acc + value),
        10,
      );
      expect(result).toStrictEqual(16);
    });

    it("stops on Break", async () => {
      const callback = vi.fn(
        async (acc: number, value): Promise<number | typeof Break> =>
          value === 2 ? Break : acc + value,
      );
      const result = await asyncReduce(true, callback, 10);

      expect(result).toStrictEqual(11);
      expect(callback).toHaveBeenCalledTimes(3);
    });

    it("uses the last wrapped accumulator", async () => {
      const result = await asyncReduce(
        true,
        async (acc, value) =>
          value === 2 ? Last(acc + value * 10) : acc + value,
        10,
      );
      expect(result).toStrictEqual(31);
    });
  });

  describe("forEach", () => {
    it("passes index-based arguments", () => {
      const callback = vi.fn((value, index, iterable): void | typeof Break => {
        if (value === 3) return Break;
        expect(iterable).toBe(true);
        expect(value).toBe(index);
        return;
      });

      forEach(true, callback);

      expect(callback.mock.calls).toEqual([
        [0, 0, true],
        [1, 1, true],
        [2, 2, true],
        [3, 3, true],
      ]);
    });

    it("stops on Break", () => {
      const callback = vi.fn((value): void | typeof Break => {
        if (value === 2) return Break;
        return;
      });

      forEach(true, callback);
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });

  describe("asyncForEach", () => {
    it("passes index-based arguments", async () => {
      const callback = vi.fn(
        async (value, index, iterable): Promise<void | typeof Break> => {
          if (value === 3) return Break;
          expect(iterable).toBe(true);
          expect(value).toBe(index);
          return;
        },
      );

      await asyncForEach(true, callback);

      expect(callback.mock.calls).toEqual([
        [0, 0, true],
        [1, 1, true],
        [2, 2, true],
        [3, 3, true],
      ]);
    });

    it("stops on Break", async () => {
      const callback = vi.fn(async (value): Promise<void | typeof Break> => {
        if (value === 2) return Break;
        return;
      });

      await asyncForEach(true, callback);
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });
});
