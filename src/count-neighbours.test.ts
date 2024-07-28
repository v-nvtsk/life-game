import { describe, expect, it } from "@jest/globals";
import { countNeighbours } from "./count-neighbours";

describe("countNeighbours", () => {
  it("should be a function", () => {
    expect(countNeighbours).toBeInstanceOf(Function);
  });

  it("should return number of alive neighbours", () => {
    const testData = [
      {
        field: [
          [0, 0, 0],
          [0, 1, 0],
          [0, 0, 0],
        ],
        result: [
          [1, 1, 1],
          [1, 0, 1],
          [1, 1, 1],
        ],
      },
      {
        field: [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 0],
        ],
        result: [
          [1, 2, 2],
          [2, 1, 2],
          [2, 2, 2],
        ],
      },
      {
        field: [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ],
        result: [
          [8, 8, 8],
          [8, 8, 8],
          [8, 8, 8],
        ],
      },
    ];
    testData.forEach(({ field, result }) => {
      field.forEach((row, cellRow): void => {
        row.forEach((cell, cellCol): void => {
          expect(countNeighbours({ field, cellRow, cellCol })).toBe(result[cellRow][cellCol]);
        });
      });
    });
  });
});
