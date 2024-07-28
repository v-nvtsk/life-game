import { type Store } from "./store";

export type ChangeAllPayload = number[][];
export type ChangeDiffPayload = CellRenderData[];

export interface Events {
  changeAll: ChangeAllPayload;
  changeDiff: ChangeDiffPayload;
}
export type EventKeys = keyof Events;

export type EventHandler<K extends EventKeys> = (payload: Events[K]) => void;

export type Subscribers = Record<string, any>;

export interface Controls {
  fieldContainer: HTMLElement;
  sizeInput: HTMLInputElement;
  speedInput: HTMLInputElement;
  playButton: HTMLButtonElement;
  randomButton: HTMLButtonElement;
  clearButton: HTMLButtonElement;
  message: HTMLElement;
}

export interface CellRenderData {
  row: number;
  col: number;
  state: number;
}

export type DiffData = Record<number, Record<number, number>>;

export type DiffArray = CellRenderData[];

export abstract class GameController {
  abstract readonly controls: Controls;

  abstract readonly store: Store;

  abstract init(): void;

  abstract initControlsHandlers(): void;

  abstract onClick(x: number, y: number, value?: number | undefined): void;
}

export abstract class View {
  constructor(
    readonly container: HTMLElement,
    size: number,
    onClick: typeof GameController.prototype.onClick,
  ) {}
  abstract resizeHandler(newSize: number): void;
  abstract renderAll(data: number[][]): void;
  abstract renderCell(data: CellRenderData): void;
  abstract renderDiff(diffData: DiffArray): void;
  abstract onMove(ev: MouseEvent): void;
  abstract onTouchMove(ev: TouchEvent): void;
}
