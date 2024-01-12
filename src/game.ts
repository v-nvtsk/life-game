import { createMarkUp } from "./create-markup";
import { doStep } from "./do-step";
import { renderGrid } from "./render-grid";
import { Store } from "./store";
import { debounceResize } from "./utils/debounceResize";

export default class Game {
  private readonly store: Store;
  private timerId: NodeJS.Timeout | null = null;

  constructor(
    private readonly container: HTMLElement,
    private size: number = 30,
    private timeInterval: number = 400,
  ) {
    this.store = new Store(this.size);
  }

  init(): void {
    const { field, sizeInput, speedInput, button } = createMarkUp({
      container: this.container,
      size: this.size,
      timeInterval: this.timeInterval,
    });

    this.initControlsHandlers(sizeInput, speedInput, button);
    this.initMouseHandlers(field);
  }

  initControlsHandlers(sizeInput: HTMLInputElement, speedInput: HTMLInputElement, button: HTMLElement): void {
    const callbacks = {
      onSizeChange: debounceResize((ev: Event): void => {
        const input = ev.target as HTMLInputElement;
        this.size = Number(input.value);
        document.documentElement.style.cssText = `--grid-size: ${this.size}`;
        this.store.resize(this.size);
        renderGrid(this.container, this.size, this.store.getCells());
      }, 300),
      onSpeedChange: (ev: Event): void => {
        const input = ev.target as HTMLInputElement;
        this.timeInterval = Number(input.value);
        if (this.timerId !== null) {
          this.restart(button);
        }
      },
    };

    sizeInput.addEventListener("input", callbacks.onSizeChange);
    speedInput.addEventListener("input", callbacks.onSpeedChange);
    button.addEventListener("click", (ev) => {
      if (this.timerId === null) {
        this.start(button);
      } else {
        this.stop(button);
      }
    });
  }

  initMouseHandlers(field: HTMLElement): void {
    const mouseCallbacks = {
      onDown: (ev: MouseEvent) => {
        ev.preventDefault();
      },
      onMove: (ev: MouseEvent) => {
        const isCell: boolean = (ev.target as HTMLElement).classList?.contains("cell");
        if (ev.buttons === 1) {
          if (isCell) {
            const cell: HTMLElement = ev.target as HTMLElement;
            cell.dataset.state = "1";
            const x = Number(cell.dataset.x);
            const y = Number(cell.dataset.y);
            this.store.setCellState(x, y, 1);
          }
        }
      },
      onClick: (ev: MouseEvent) => {
        const isCell: boolean = (ev.target as HTMLElement).classList.contains("cell");
        if (isCell) {
          const cell: HTMLElement = ev.target as HTMLElement;
          const state = cell.dataset.state;
          cell.dataset.state = state === "1" ? "0" : "1";
          const x = Number(cell.dataset.x);
          const y = Number(cell.dataset.y);
          this.store.setCellState(x, y, Number(cell.dataset.state));
        }
      },
    };

    field.addEventListener("click", mouseCallbacks.onClick);

    field.addEventListener("mousedown", mouseCallbacks.onDown);
    field.addEventListener("mousemove", mouseCallbacks.onMove);
  }

  restart(button: HTMLElement): void {
    this.stop(button);
    this.start(button);
  }

  start(button: HTMLElement): void {
    if (this.timerId === null) {
      button.innerHTML = "Stop";
      this.timerId = setInterval(() => {
        const fieldState = this.store.getCells();
        const newFieldState = doStep(fieldState);
        const aliveCells = renderGrid(this.container, this.size, fieldState);
        if (aliveCells === 0) {
          this.stop(button);
        }
        this.store.setCells(newFieldState);
      }, this.timeInterval);
    }
  }

  stop(button: HTMLElement): void {
    if (this.timerId !== null) {
      button.innerHTML = "Start";
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public getCell(x: number, y: number): number {
    return this.store.getCell(x, y);
  }
}
