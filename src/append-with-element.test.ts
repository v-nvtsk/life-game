import { describe, it, expect, beforeEach } from '@jest/globals'
import appendWithElement from './append-with-element'

describe('appendWithElement', () => {
  let parent: HTMLElement
  beforeEach(() => {
    parent = document.createElement('div')
    document.body.append(parent)
  })

  it('should be a function', () => {
    expect(appendWithElement).toBeInstanceOf(Function)
  })
  it('should append parent with element', () => {
    appendWithElement(parent, 'div')
    expect(parent.children.length).toBe(1)
  })
})
