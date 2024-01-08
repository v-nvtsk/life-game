import { describe, expect, it } from '@jest/globals'
import doStep from './do-step'

describe('doStep', () => {
  it('should be a function', () => {
    expect(doStep).toBeInstanceOf(Function)
  })

  const testData = [
    {
      src: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      result: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    },
    {
      src: [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      result: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    },
    {
      src: [
        [1, 1, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      result: [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ],
    },
    {
      src: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0],
      ],
      result: [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
      ],
    },
  ]

  it('should return new field', () => {
    testData.forEach(({ src, result }) => {
      expect(doStep(src)).toEqual(result)
    })
  })
})
