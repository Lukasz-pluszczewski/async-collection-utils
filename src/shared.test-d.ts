import { entries, keys } from "./shared";

describe("entries", () => {
  it("infers entries type", () => {
    enum SomeEnum {
      foo = "foo",
      bar = "bar",
    }
    const obj: Record<SomeEnum, 1 | 2 | 5> = {
      [SomeEnum.foo]: 1,
      [SomeEnum.bar]: 5,
    };
    const result = entries(obj);
    expectTypeOf(result).toEqualTypeOf<[SomeEnum, 1 | 2 | 5][]>();
  });
});

describe("keys", () => {
  it("infers keys type", () => {
    enum SomeEnum {
      foo = "foo",
      bar = "bar",
    }
    const obj: Record<SomeEnum, 1 | 2 | 5> = {
      [SomeEnum.foo]: 1,
      [SomeEnum.bar]: 5,
    };
    const result = keys(obj);
    expectTypeOf(result).toEqualTypeOf<SomeEnum[]>();
  });
});
