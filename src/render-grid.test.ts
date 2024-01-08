import { beforeEach, describe, expect, it } from '@jest/globals'
import renderGrid from './render-grid'

describe('renderGrid', () => {
  it('should be a function', () => {
    expect(renderGrid).toBeInstanceOf(Function)
  })

  let container: HTMLElement
  let field: HTMLElement
  beforeEach(() => {
    document.body.innerHTML = ''
    container = document.createElement('div')
    container.className = 'game-container'
    field = document.createElement('table')
    field.className = 'field'
    container.append(field)
  })

  it("should render nothing if field doesn't exist", () => {
    container.innerHTML = ''
    renderGrid(container, 5, null)
    expect(container.innerHTML).toEqual('')
  })

  it('should render grid markup', () => {
    expect(container.querySelector('.cell')).toBeNull()
    const size = 5
    renderGrid(container, size, null)

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
})
