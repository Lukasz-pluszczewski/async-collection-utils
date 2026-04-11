import { describe, expectTypeOf, it } from "vitest";
import { asyncMap } from "./asyncMap";
import { asyncMapToArray } from "./asyncMapToArray";
import { asyncFilter } from "./asyncFilter";
import { asyncReduce } from "./asyncReduce";
import { asyncFlatMap } from "./asyncFlatMap";

describe("iterables", () => {
  it("supports cursor-like async iterables", async () => {
    type CursorValue = { value: number; label: string };
    type Cursor<TValue> = AsyncIterable<TValue> & {
      close: () => Promise<void>;
    };

    const cursor = {} as Cursor<CursorValue>;

    const one = await asyncMap(cursor, async (value) => value.value);
    const two = await asyncFilter(one, async (value) => value > 2);
    const three = await asyncFlatMap(two, async (value) => [
      value,
      (value * 2).toFixed(3),
    ]);
    const four = await asyncReduce(
      three,
      async (acc, value) => {
        if (typeof value === "string") {
          return acc + value;
        }
        return acc + value.toFixed(3);
      },
      "",
    );

    expectTypeOf(one).toMatchTypeOf<AsyncIterable<number>>();
    expectTypeOf(two).toMatchTypeOf<AsyncIterable<number>>();
    expectTypeOf(three).toMatchTypeOf<AsyncIterable<string | number>>();
    expectTypeOf(four).toEqualTypeOf<string>();
  });

  it("supports line-stream-like async iterables with toArray APIs", async () => {
    type LineStream = AsyncIterable<string> & {
      close: () => void;
    };

    const lineStream = {} as LineStream;
    const lines = await asyncMapToArray(lineStream, async (line) => line.trim());

    expectTypeOf(lines).toEqualTypeOf<string[]>();
  });
});
