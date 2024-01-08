import appendWithElement from './append-with-element'
import createGrid from './create-grid'

export default function createMarkUp(container: HTMLElement, size: number, timeInterval: number): HTMLElement[] {
  const controls = appendWithElement(container, 'div', 'controls')
  const sizeInput = appendWithElement(controls, 'input', 'size-input') as HTMLInputElement
  sizeInput.type = 'number'
  sizeInput.min = '3'
  sizeInput.value = size.toString()

  const speedInput = appendWithElement(controls, 'input', 'speed-input') as HTMLInputElement
  const speedValue: HTMLElement = appendWithElement(controls, 'span', 'speed-value', timeInterval + ' ms')
  speedInput.type = 'range'
  speedInput.min = '10'
  speedInput.max = '1000'
  speedInput.step = '10'
  speedInput.value = timeInterval.toString()

  speedInput.addEventListener('input', (ev) => {
    const input = ev.target as HTMLInputElement
    ;(speedValue as HTMLInputElement).textContent = input.value + ' ms'
  })
  const button = appendWithElement(container, 'button', 'btn-game', 'Start')

  const field: HTMLElement = createGrid(size)
  container.append(field)

  return [field, sizeInput, speedInput, button]
}
