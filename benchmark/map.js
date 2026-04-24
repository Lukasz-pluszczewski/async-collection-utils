const { map } = require("../dist");
const Benchmarkify = require("benchmarkify");

const benchmark = new Benchmarkify("map benchmark", {
  description: "Comparing map performance with plain for...of loop",
  chartImage: true,
}).printHeader();

const array = Array.from({ length: 100000 }, (_, i) => i);

benchmark
  .createSuite("Array", {})

  .add("map", () => {
    const result = map(array, (value) => value + "");
    return result;
  })

  .add("for...of loop", () => {
    const result = [];
    for (const value of array) {
      result.push(value + "");
    }

    return result;
  })

  .ref("for loop", () => {
    const result = [];
    for (let i = 0; i < array.length; i++) {
      result.push(array[i] + "");
    }

    return result;
  });

const set = new Set(array);

benchmark
  .createSuite("Set", {})

  .add("map", () => {
    const result = map(set, (value) => value + "");
    return result;
  })

  .ref("for...of loop", () => {
    const result = new Set();
    for (const value of set) {
      result.add(value + "");
    }

    return result;
  });

benchmark.run();
