import { createElementFromHTML } from './create-element-from-html'
import { createGrid } from './create-grid'

interface CreateMarkUpRequest {
  container: HTMLElement
  size: number
  timeInterval: number
}

interface Markup {
  field: HTMLElement
  sizeInput: HTMLInputElement
  speedInput: HTMLInputElement
  button: HTMLButtonElement
}

function createMarkUp({ container, size, timeInterval }: CreateMarkUpRequest): Markup {
  const controls = createElementFromHTML('<div class="controls"></div>')[0]
  const sizeInput = createElementFromHTML(`
    <input class="size-input" type="number" min="3" max="100" value="${size.toString()}"/>
  `)[0] as HTMLInputElement
  const speedInput = createElementFromHTML(`
    <input class="speed-input" type="range" min="10" max="1000"
    step="10" value="${timeInterval.toString()}"/>
  `)[0] as HTMLInputElement
  const speedValue = createElementFromHTML(`<span class="speed-value">${timeInterval} ms</span>`)[0]
  const button = createElementFromHTML(`<button class="btn-game">Start</button>`)[0] as HTMLButtonElement
  const field = createGrid(size)

  sizeInput.addEventListener('input', (ev) => {
    const input = ev.target as HTMLInputElement
    const value = Number(input.value)

    if (value > 100) input.value = '100'
    if (value < 3) input.value = '3'
  })

  speedInput.addEventListener('input', (ev) => {
    const input = ev.target as HTMLInputElement
    speedValue.textContent = input.value + ' ms'
  })

  container.append(controls)
  controls.append(sizeInput)
  controls.append(speedInput)
  controls.append(speedValue)
  container.append(button)

  container.append(field)

  return { field, sizeInput, speedInput, button }
}

export { createMarkUp }
