import { batch } from "./batch";
import { asyncMap } from "./asyncMap";

describe("batch", () => {
  it("batches array", () => {
    expect(batch([1, 2, 3, 4, 5], 2)).toStrictEqual([[1, 2], [3, 4], [5]]);
  });
  it("batches set", () => {
    expect(batch(new Set(["1", "2", 3, "4", "5"]), 2)).toStrictEqual(
      new Set([["1", "2"], [3, "4"], ["5"]]),
    );
  });
  it("batches iterator", () => {
    function* generator() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    }

    const batchedIterator = batch(generator(), 2);

    const results = [];
    for (const item of batchedIterator) {
      results.push(item);
    }

    expect(results).toStrictEqual([[1, 2], [3, 4], [5]]);
  });
  it("batches async iterator", async () => {
    async function* generator() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    }

    const batchedIterator = batch(generator(), 2);

    const results = [];
    for await (const item of batchedIterator) {
      results.push(item);
    }

    expect(results).toStrictEqual([[1, 2], [3, 4], [5]]);
  });

  it("works with map", async () => {
    const probe = vi.fn();
    async function* generator() {
      yield 1;
      yield 2;
      probe();
      yield 3;
      yield 4;
      yield 5;
    }

    const batchedIterator = batch(generator(), 2);
    const mappedIterator = await asyncMap(
      batchedIterator,
      async (batch: number[]): Promise<string[]> => {
        return batch.map((value) => `${value}`);
      },
    );

    const results = [];
    for await (const item of mappedIterator) {
      results.push(item);
    }

    expect(results).toStrictEqual([["1", "2"], ["3", "4"], ["5"]]);
    expect(probe).toBeCalledTimes(1);
  });
  it("throws error for incorrect batch size", () => {
    expect(() => batch([1, 2, 3], 0)).toThrowError(
      "Batch size cannot be smaller than 1",
    );
  });
});
