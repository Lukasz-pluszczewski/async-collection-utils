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
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";

describe("true iterable overloads", () => {
  it("mapToGenerator infers callback arguments and generator output", () => {
    const result = mapToGenerator(true, (value, index, iterable) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(index).toEqualTypeOf<number>();
      expectTypeOf(iterable).toEqualTypeOf<true>();
      return value.toString();
    });
    expectTypeOf(result).toEqualTypeOf<Generator<string>>();
  });

  it("asyncMapToGenerator infers callback arguments and async generator output", async () => {
    const result = await asyncMapToGenerator(
      true,
      async (value, index, iterable) => {
        expectTypeOf(value).toEqualTypeOf<number>();
        expectTypeOf(index).toEqualTypeOf<number>();
        expectTypeOf(iterable).toEqualTypeOf<true>();
        return value.toString();
      },
    );
    expectTypeOf(result).toEqualTypeOf<AsyncGenerator<string>>();
  });

  it("mapToArray infers array output", () => {
    const result = mapToArray(true, (value, index, iterable) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(index).toEqualTypeOf<number>();
      expectTypeOf(iterable).toEqualTypeOf<true>();
      if (value > 2) return Break;
      return value.toString();
    });
    expectTypeOf(result).toEqualTypeOf<string[]>();
  });

  it("asyncMapToArray infers array output", async () => {
    const result = await asyncMapToArray(true, async (value, index, iterable) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(index).toEqualTypeOf<number>();
      expectTypeOf(iterable).toEqualTypeOf<true>();
      if (value > 2) return Break;
      return value.toString();
    });
    expectTypeOf(result).toEqualTypeOf<string[]>();
  });

  it("flatMapToGenerator infers generator output", () => {
    const result = flatMapToGenerator(true, (value, index, iterable) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(index).toEqualTypeOf<number>();
      expectTypeOf(iterable).toEqualTypeOf<true>();
      return [value.toString()];
    });
    expectTypeOf(result).toEqualTypeOf<Generator<string>>();
  });

  it("asyncFlatMapToGenerator infers async generator output", async () => {
    const result = await asyncFlatMapToGenerator(
      true,
      async (value, index, iterable) => {
        expectTypeOf(value).toEqualTypeOf<number>();
        expectTypeOf(index).toEqualTypeOf<number>();
        expectTypeOf(iterable).toEqualTypeOf<true>();
        return [value.toString()];
      },
    );
    expectTypeOf(result).toEqualTypeOf<AsyncGenerator<string>>();
  });

  it("flatMapToArray infers array output", () => {
    const result = flatMapToArray(true, (value, index, iterable) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(index).toEqualTypeOf<number>();
      expectTypeOf(iterable).toEqualTypeOf<true>();
      if (value > 2) return Break;
      return [value.toString()];
    });
    expectTypeOf(result).toEqualTypeOf<string[]>();
  });

  it("asyncFlatMapToArray infers array output", async () => {
    const result = await asyncFlatMapToArray(
      true,
      async (value, index, iterable) => {
        expectTypeOf(value).toEqualTypeOf<number>();
        expectTypeOf(index).toEqualTypeOf<number>();
        expectTypeOf(iterable).toEqualTypeOf<true>();
        if (value > 2) return Break;
        return [value.toString()];
      },
    );
    expectTypeOf(result).toEqualTypeOf<string[]>();
  });

  it("filterToGenerator infers numeric generator output", () => {
    const result = filterToGenerator(true, (value, index, iterable) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(index).toEqualTypeOf<number>();
      expectTypeOf(iterable).toEqualTypeOf<true>();
      return value % 2 === 0;
    });
    expectTypeOf(result).toEqualTypeOf<Generator<number>>();
  });

  it("asyncFilterToGenerator infers numeric async generator output", async () => {
    const result = await asyncFilterToGenerator(
      true,
      async (value, index, iterable) => {
        expectTypeOf(value).toEqualTypeOf<number>();
        expectTypeOf(index).toEqualTypeOf<number>();
        expectTypeOf(iterable).toEqualTypeOf<true>();
        return value % 2 === 0;
      },
    );
    expectTypeOf(result).toEqualTypeOf<AsyncGenerator<number>>();
  });

  it("filterToArray infers numeric array output", () => {
    const result = filterToArray(true, (value, index, iterable) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(index).toEqualTypeOf<number>();
      expectTypeOf(iterable).toEqualTypeOf<true>();
      if (value > 2) return Break;
      return value % 2 === 0;
    });
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  it("asyncFilterToArray infers numeric array output", async () => {
    const result = await asyncFilterToArray(true, async (value, index, iterable) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(index).toEqualTypeOf<number>();
      expectTypeOf(iterable).toEqualTypeOf<true>();
      if (value > 2) return Break;
      return value % 2 === 0;
    });
    expectTypeOf(result).toEqualTypeOf<number[]>();
  });

  it("reduce infers the accumulator type", () => {
    const result = reduce(
      true,
      (acc, value, index, iterable) => {
        expectTypeOf(acc).toEqualTypeOf<string>();
        expectTypeOf(value).toEqualTypeOf<number>();
        expectTypeOf(index).toEqualTypeOf<number>();
        expectTypeOf(iterable).toEqualTypeOf<true>();
        if (value > 2) return Break;
        return acc + value.toString();
      },
      "",
    );
    expectTypeOf(result).toEqualTypeOf<string>();
  });

  it("asyncReduce infers the accumulator type", async () => {
    const result = await asyncReduce(
      true,
      async (acc, value, index, iterable) => {
        expectTypeOf(acc).toEqualTypeOf<string>();
        expectTypeOf(value).toEqualTypeOf<number>();
        expectTypeOf(index).toEqualTypeOf<number>();
        expectTypeOf(iterable).toEqualTypeOf<true>();
        if (value > 2) return Break;
        return acc + value.toString();
      },
      "",
    );
    expectTypeOf(result).toEqualTypeOf<string>();
  });

  it("forEach infers callback arguments", () => {
    forEach(true, (value, index, iterable) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(index).toEqualTypeOf<number>();
      expectTypeOf(iterable).toEqualTypeOf<true>();
      return value > 5 ? Break : undefined;
    });
  });

  it("asyncForEach infers callback arguments", async () => {
    await asyncForEach(true, async (value, index, iterable) => {
      expectTypeOf(value).toEqualTypeOf<number>();
      expectTypeOf(index).toEqualTypeOf<number>();
      expectTypeOf(iterable).toEqualTypeOf<true>();
      return value > 5 ? Break : undefined;
    });
  });

  it("preserves Break and Last support in true-mode callbacks", () => {
    const mapped = mapToGenerator(true, (value) =>
      value > 1 ? Break : value * 2,
    );
    const filtered = filterToGenerator(true, (value) =>
      value > 1 ? Last(true) : true,
    );

    expectTypeOf(mapped).toEqualTypeOf<Generator<number>>();
    expectTypeOf(filtered).toEqualTypeOf<Generator<number>>();
  });
});
