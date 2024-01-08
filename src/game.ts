import createMarkUp from './create-markup'
import doStep from './do-step'
import renderGrid from './render-grid'
// import renderGrid from './render-grid'
import Store from './store'

export default class Game {
  private readonly container: HTMLElement
  private readonly store: Store
  private size: number = 20
  private timeInterval: number = 300
  private timerId: NodeJS.Timeout | null = null

  constructor(container: HTMLElement, size: number = 30, timeInterval: number = 400) {
    this.container = container
    this.timeInterval = timeInterval
    this.size = size

    this.store = new Store(this.size)
    const [field, sizeInput, speedInput, button] = createMarkUp(this.container, this.size, this.timeInterval)

    const inputCallbacks = {
      onSizeChange: (ev: Event) => {
        const input = ev.target as HTMLInputElement
        this.size = Number(input.value)
        this.store.resize(this.size)
        renderGrid(this.container, this.size, this.store.getCells())
      },
      onSpeedChange: (ev: Event) => {
        const input = ev.target as HTMLInputElement
        this.timeInterval = Number(input.value)
        if (this.timerId !== null) {
          this.restart(gameCallbacks.onStop)
        }
      },
    }

    sizeInput.addEventListener('input', inputCallbacks.onSizeChange)

    speedInput.addEventListener('input', inputCallbacks.onSpeedChange)

    button.addEventListener('click', (ev) => {
      if (this.timerId === null) {
        gameCallbacks.onStart()
      } else {
        gameCallbacks.onStop()
      }
    })

    const gameCallbacks = {
      onStart: () => {
        // const input = ev.target as HTMLInputElement
        // if (input !== null) {
        button.innerHTML = 'Stop'
        this.start(gameCallbacks.onStop)
        // }
      },
      onStop: () => {
        // const input = ev.target as HTMLInputElement
        // if (input !== null) {
        button.innerHTML = 'Start'
        this.stop()
        // }
      },
    }

    const mouseCallbacks = {
      onDown: (ev: MouseEvent) => {
        ev.preventDefault()
      },
      onMove: (ev: MouseEvent) => {
        const isCell: boolean = (ev.target as HTMLElement).classList?.contains('cell')
        if (ev.buttons === 1) {
          if (isCell) {
            const cell: HTMLElement = ev.target as HTMLElement
            cell.dataset.state = '1'
            const x = Number(cell.dataset.x)
            const y = Number(cell.dataset.y)
            this.store.setCellState(x, y, 1)
          }
        }
      },
      onClick: (ev: MouseEvent) => {
        const isCell: boolean = (ev.target as HTMLElement).classList.contains('cell')
        if (ev.target !== null && isCell) {
          const cell: HTMLElement = ev.target as HTMLElement
          const state = cell.dataset.state
          cell.dataset.state = state === '1' ? '0' : '1'
          const x = Number(cell.dataset.x)
          const y = Number(cell.dataset.y)
          this.store.setCellState(x, y, Number(cell.dataset.state))
        }
      },
    }

    field.addEventListener('click', mouseCallbacks.onClick)

    // TODO: add mouse down
    field.addEventListener('mousedown', mouseCallbacks.onDown)
    field.addEventListener('mousemove', mouseCallbacks.onMove)
  }

  restart(stopCallback: () => void): void {
    this.stop()
    this.start(stopCallback)
  }

  start(stopCallback: () => void): void {
    if (this.timerId === null) {
      this.timerId = setInterval(() => {
        const fieldState = this.store.getCells()
        const newFieldState = doStep(fieldState)
        const aliveCells = renderGrid(this.container, this.size, fieldState)
        if (aliveCells === 0) {
          stopCallback()
        }
        this.store.setCells(newFieldState)
        // }
      }, this.timeInterval)
    }
  }

  stop(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  }

  public getCell(x: number, y: number): number {
    return this.store.getCell(x, y)
  }

  public getCells(): number[][] {
    return this.store.getCells()
  }
}
