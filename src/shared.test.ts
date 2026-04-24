import { entries, isPlainObject, keys } from "./shared";

describe("entries", () => {
  it("returns entries", () => {
    const obj = { a: 1, b: 2 };
    const result = entries(obj);
    expect(result).toEqual([
      ["a", 1],
      ["b", 2],
    ]);
  });

  it("works with null-prototype objects", () => {
    const obj = Object.create(null) as Record<string, number>;
    obj.a = 1;
    obj.b = 2;

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

  it("works with null-prototype objects", () => {
    const obj = Object.create(null) as Record<string, number>;
    obj.a = 1;
    obj.b = 2;

    const result = keys(obj);
    expect(result).toEqual(["a", "b"]);
  });
});

describe("isPlainObject", () => {
  it("returns true for plain objects and null-prototype objects", () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it("returns false for non-plain objects", () => {
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(null)).toBe(false);
  });
});
