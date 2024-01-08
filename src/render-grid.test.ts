import { beforeEach, describe, expect, it } from '@jest/globals'
import renderGrid from './render-grid'

describe('renderGrid', () => {
  it('should be a function', () => {
    expect(renderGrid).toBeInstanceOf(Function)
  })

  let container: HTMLElement
  let grid: HTMLElement
  beforeEach(() => {
    document.body.innerHTML = ''
    container = document.createElement('div')
    container.className = 'game-container'
    grid = document.createElement('table')
    grid.className = 'field'
    container.append(grid)
  })

  it("should render nothing if field doesn't exist", () => {
    container.innerHTML = ''
    renderGrid(container, 5, null)
    expect(container.innerHTML).toEqual('')
  })

  it('should render grid markup', () => {
    expect(container.querySelector('.cell')).toBeNull()
    const size = 5
    const data = [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]
    renderGrid(container, size, data)

    const cells: HTMLElement[] = Array.from(container.querySelectorAll('.cell'))
    expect(cells.length).toEqual(25)
    const x = Math.round(Math.random() * (size - 1))
    const y = Math.round(Math.random() * (size - 1))
    const cell = cells[x * size + y]
    expect(cell).not.toBeNull()
    expect(cell.dataset.state).toEqual('0')
    expect(cell.dataset.x).toEqual(x.toString())
    expect(cell.dataset.y).toEqual(y.toString())
  })

  const testData = [
    {
      data: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      size: 3,
      result: 0,
    },
    {
      data: [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
      size: 3,
      result: 1,
    },
  ]

  it('should return live cells count', () => {
    testData.forEach(({ data, size, result }) => {
      const liveCells = renderGrid(container, size, data)
      expect(liveCells).toBe(result)
    })
  })

  it('should render grid on resize', () => {
    const testData = [
      {
        src: [
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 0],
        ],
        size: 3,
        newSize: 5,
        result: [
          [0, 1, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ],
      },
      {
        src: [
          [0, 1, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 1, 0, 0, 0],
          [0, 0, 0, 1, 0],
          [0, 0, 0, 0, 1],
        ],
        size: 5,
        newSize: 3,
        result: [
          [0, 1, 0],
          [0, 1, 0],
          [0, 1, 0],
        ],
      },
    ]

    testData.forEach(({ src, size, newSize, result }) => {
      renderGrid(container, size, src)
      let cells: HTMLElement[] = Array.from(container.querySelectorAll('.cell'))
      expect(cells.length).toEqual(size ** 2)

      renderGrid(container, newSize, result)
      cells = Array.from(container.querySelectorAll('.cell'))
      expect(cells.length).toEqual(newSize ** 2)
      expect(cells.map((el) => Number(el.dataset.state))).toEqual(result.flat())
    })
  })
})
