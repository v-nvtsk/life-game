import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { createGrid } from './create-grid'

describe('createField', () => {
  let field: HTMLTableElement
  beforeEach(() => {
    field = createGrid(10)
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should be a function', () => {
    expect(createGrid).toBeInstanceOf(Function)
  })

  it('should return a field as HTML Element', () => {
    expect(field).toBeInstanceOf(HTMLTableElement)
  })

  it('should return a field with size', () => {
    expect(field.children.length).toBe(10)
    expect(field.children[0].children.length).toBe(10)
  })

  it('every cell should have data attributes', () => {
    const cells: NodeListOf<HTMLElement> = field.querySelectorAll('.cell')
    cells.forEach((cell) => {
      expect(cell.dataset.x).toBeDefined()
      expect(cell.dataset.y).toBeDefined()
      expect(cell.dataset.state).toBeDefined()
      expect(cell.dataset.state).toBe('0')
    })
  })
})
