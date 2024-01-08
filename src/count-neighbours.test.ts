import { describe, expect, it } from '@jest/globals'
import countNeighbours from './count-neighbours'

describe('countNeighbours', () => {
  it('should be a function', () => {
    expect(countNeighbours).toBeInstanceOf(Function)
  })

  it('should return number of alive neighbours', () => {
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
          [1, 2, 1],
          [2, 1, 1],
          [1, 1, 1],
        ],
      },
      {
        field: [
          [1, 1, 1],
          [1, 1, 1],
          [1, 1, 1],
        ],
        result: [
          [3, 5, 3],
          [5, 8, 5],
          [3, 5, 3],
        ],
      },
    ]
    testData.forEach(({ field, result }) => {
      field.forEach((row, i): void => {
        row.forEach((cell, j): void => {
          expect(countNeighbours(field, i, j)).toBe(result[i][j])
        })
      })
    })
  })
})
