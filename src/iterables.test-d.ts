import { reduce } from "./reduce";
import { Break, Last } from "./shared";
import { describe, expectTypeOf, it } from "vitest";
import mongoose from "mongoose";
import { asyncMap } from "./asyncMap";
import { asyncMapToArray } from "./asyncMapToArray";
import fs from "node:fs";
import { asyncFilter } from "./asyncFilter";
import { asyncReduce } from "./asyncReduce";
import { asyncFlatMap } from "./asyncFlatMap";

const mongooseSchema = new mongoose.Schema({
  name: String,
  value: Number,
});
const mongooseModel = mongoose.model("test", mongooseSchema);

describe("iterables", () => {
  it.skip("WTF?", () => {
    const cursor = mongooseModel.find().cursor();
    // @ts-expect-error TS2322, what is going on here?
    asyncMap(cursor, async (value) => value);
  });
  it("MongoDB Cursor", async () => {
    const cursor = mongooseModel.find().cursor();

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
    expectTypeOf(one).toEqualTypeOf<AsyncGenerator<number, any, any>>();
    expectTypeOf(two).toEqualTypeOf<AsyncGenerator<number, any, any>>();
    expectTypeOf(three).toEqualTypeOf<
      AsyncGenerator<string | number, any, any>
    >();
    expectTypeOf(four).toEqualTypeOf<string>();
  });
  it("");
});
