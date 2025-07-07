const { asyncMap } = require("../dist");
const Benchmarkify = require("benchmarkify");

const benchmark = new Benchmarkify("asyncMap benchmark", {
  description: "Comparing asyncMap performance with plain for...of loop",
  chartImage: true,
}).printHeader();

const array = Array.from({ length: 1000 }, (_, i) => i);

benchmark
  .createSuite("Array", {})

  .add("asyncMap", async () => {
    const result = await asyncMap(array, async (value) => value + "");
    return result;
  })

  .add("for...of loop", async () => {
    const result = [];
    for (const value of array) {
      result.push(await Promise.resolve(value + ""));
    }

    return result;
  })

  .ref("for loop", async () => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(await Promise.resolve(array[i] + ""));
    }

    return result;
  });

const set = new Set(array);

benchmark
  .createSuite("Set", {})

  .add("asyncMap", async () => {
    const result = await asyncMap(set, async (value) => value + "");
    return result;
  })

  .ref("for...of loop", async () => {
    const result = new Set();
    for (const value of set) {
      result.add(await Promise.resolve(value + ""));
    }

    return new Set(result);
  });

benchmark.run();
