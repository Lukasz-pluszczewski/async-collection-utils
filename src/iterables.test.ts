import { asyncMap } from "./asyncMap";
import { asyncMapToArray } from "./asyncMapToArray";
import * as fs from "node:fs";
import path from "node:path";
import readline from "readline";
import { expect } from "vitest";

describe("iterables", () => {
  describe("readable stream", () => {
    it("asyncMap", async () => {
      const readableStream = fs.createReadStream(
        path.resolve(__dirname, "iterables.test.txt"),
        "utf8",
      );
      const linesStream = readline.createInterface({ input: readableStream });

      const resultGenerator = await asyncMap(
        linesStream,
        async (value: string) => value,
      );
      let results: string[] = [];
      for await (const value of resultGenerator) {
        results.push(value);
      }

      expect(results).toEqual([
        "foo",
        "bar",
        "baz",
        "bam",
        "baq",
        "baw",
        "bax",
        "bay",
        "bal",
      ]);
    });
    it("asyncMapToArray", async () => {
      const readableStream = fs.createReadStream(
        path.resolve(__dirname, "iterables.test.txt"),
        "utf8",
      );
      const linesStream = readline.createInterface({ input: readableStream });

      const results = await asyncMapToArray(
        linesStream,
        async (value: string) => value,
      );

      expect(results).toEqual([
        "foo",
        "bar",
        "baz",
        "bam",
        "baq",
        "baw",
        "bax",
        "bay",
        "bal",
      ]);
    });
  });
});
