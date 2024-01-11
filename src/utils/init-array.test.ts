import { describe, expect, it } from "@jest/globals";
import initArray from "./init-array";

describe("initArray", () => {
  it("should be a function", () => {
    expect(initArray).toBeInstanceOf(Function);
  });

  const testData = [
    {
      size: 3,
      arr: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    },
    {
      size: 5,
      arr: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
    },
  ];
  it("should return array", () => {
    testData.forEach(({ size, arr }) => {
      expect(initArray(size)).toEqual(arr);
    });
  });
});
