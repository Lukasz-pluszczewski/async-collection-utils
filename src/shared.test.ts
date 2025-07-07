import { entries, keys } from "./shared";

describe("entries", () => {
  it("returns entries", () => {
    const obj = { a: 1, b: 2 };
    const result = entries(obj);
    expect(result).toEqual([
      ["a", 1],
      ["b", 2],
    ]);
  });
});

describe("keys", () => {
  it("returns keys", () => {
    const obj = { a: 1, b: 2 };
    const result = keys(obj);
    expect(result).toEqual(["a", "b"]);
  });
});
