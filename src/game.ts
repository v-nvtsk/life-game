import { createControls } from "./createControls";
import { doStep } from "./do-step";
import { type Controls, type GameController, type View } from "./interfaces";
import { Store } from "./store";
import { debounceResize } from "./utils/debounceResize";
import { CanvasGrid } from "./view";
import { Table } from "./view/table";

export default class Game implements GameController {
  controls: Controls;
  stepCounter = 0;
  // worker: Worker | null = null;

  readonly store: Store;
  private timeInterval: number = 400;
  private timerId: NodeJS.Timeout | null = null;
  private readonly view: View;

  constructor(
    private readonly container: HTMLElement,
    private size: number = 30,
    private readonly viewtype?: string,
  ) {
    this.store = new Store(this.size);
    const { fieldContainer, sizeInput, speedInput, playButton, randomButton, clearButton, message } = createControls({
      container,
      size,
      timeInterval: this.timeInterval,
    });
    this.controls = {
      fieldContainer,
      sizeInput,
      speedInput,
      playButton,
      randomButton,
      clearButton,
      message,
    };
    this.view =
      viewtype === "table"
        ? new Table(fieldContainer, this.size, this.onClick.bind(this))
        : new CanvasGrid(fieldContainer, this.size, this.onClick.bind(this));

    this.store.on<"changeAll">("changeAll", this.view.renderAll.bind(this.view));
    this.store.on("changeDiff", this.view.renderDiff.bind(this.view));

    this.initControlsHandlers();
    // this.store.initRandom();
  }

  init(): void {
    // this.view?.resizeHandler(this.size);
  }

  initControlsHandlers(): void {
    const controls = this.controls;
    const callbacks = {
      onSizeChange: debounceResize((ev: Event): void => {
        const input = ev.target as HTMLInputElement;
        this.size = Number(input.value);
        this.view?.resizeHandler(this.size);
        this.view?.renderAll(this.store.getCells());
        this.store.resize(this.size);
      }, 300),
      onSpeedChange: (ev: Event): void => {
        const input = ev.target as HTMLInputElement;
        this.timeInterval = Number(input.value);
        if (this.timerId !== null) {
          this.restart();
        }
      },
    };
    controls.sizeInput.addEventListener("input", callbacks.onSizeChange);
    controls.speedInput.addEventListener("input", callbacks.onSpeedChange);
    controls.playButton.addEventListener("click", (ev) => {
      if (this.timerId === null) {
        this.start();
      } else {
        this.stop();
      }
    });

    controls.randomButton.addEventListener("click", () => {
      this.reinitCounter();
      this.store.initRandom();
    });

    controls.clearButton.addEventListener("click", () => {
      this.store.clear();
      this.reinitCounter();
    });
  }

  reinitCounter(): void {
    this.stepCounter = 0;
    this.controls.message.textContent = `Step: ${this.stepCounter}`;
  }

  onClick(x: number, y: number, value?: number): void {
    if (this.timerId !== null) return;

    const newValue = value ?? (this.store.getCell(x, y) === 1 ? 0 : 1);
    this.store.setCellState(x, y, newValue);
  }

  restart(): void {
    this.stop();
    this.reinitCounter();
    this.start();
  }

  start(): void {
    if (this.timerId === null) {
      this.controls.playButton.innerHTML = "Stop";
      this.controls.clearButton.disabled = true;
      this.controls.randomButton.disabled = true;
      this.timerId = setInterval(this.runner.bind(this), this.timeInterval);
    }
  }

  runner(): void {
    this.stepCounter += 1;
    this.controls.message.textContent = `Step: ${this.stepCounter}`;
    const fieldState = this.store.getCells();
    const newFieldState = doStep(fieldState);
    this.store.setCells(newFieldState);
  }

  stop(): void {
    if (this.timerId !== null) {
      this.controls.clearButton.disabled = false;
      this.controls.randomButton.disabled = false;
      this.controls.playButton.innerHTML = "Start";
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
