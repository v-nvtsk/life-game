import { type DiffArray, type EventHandler, type EventKeys, type Subscribers } from "./interfaces";
import initArray from "./utils/init-array";

export class Store {
  private store: number[][] = [[]];
  private readonly subscribers: Subscribers = {
    changeAll: [],
    changeDiff: [],
  };

  private readonly lastDiff: DiffArray = [];

  constructor(private size: number = 0) {
    this.size = size;
    this.setCells(initArray(size));
  }

  initRandom(): void {
    const newState: number[][] = initArray(this.size);
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        newState[i][j] = Math.random() > 0.5 ? 1 : 0;
      }
    }
    this.setCells(newState);
  }

  clear(): void {
    this.store = initArray(this.size);
    this.emit("changeAll", this.store);
  }

  public getSize(): number {
    return this.size;
  }

  public resize(size: number): void {
    const newState: number[][] = initArray(size);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.store[i] !== undefined && j < this.store[i].length) {
          newState[i][j] = this.store[i][j];
        }
      }
    }
    this.setCells(newState);
  }

  public getCells(): number[][] {
    return this.store;
  }

  public getCell(x: number, y: number): number {
    return this.store[x][y];
  }

  public setCells(cells: number[][]): void {
    const diffData = cells.length === this.store.length ? findDiff(this.store, cells) : null;
    this.store = cells;
    this.size = cells.length;
    diffData === null ? this.emit("changeAll", cells) : this.emit("changeDiff", diffData);
  }

  public setCellState(row: number, col: number, state: number): void {
    this.store[row][col] = state;
    this.emit("changeDiff", [{ row, col, state }]);
  }

  public on<K extends EventKeys>(eventName: K, callback: Subscribers[K]): void {
    if (this.subscribers[eventName] === undefined) this.subscribers[eventName] = [];

    this.subscribers[eventName].push(callback);
  }

  public off<K extends EventKeys>(eventName: K, callback: EventHandler<Subscribers[EventKeys]>): void {
    this.subscribers[eventName] = this.subscribers[eventName].filter((cb: any) => cb !== callback);
  }

  public emit(eventName: string, data: number[][] | DiffArray): void {
    this.subscribers[eventName].forEach((callback: any) => {
      callback(data);
    });
  }
}

function findDiff(oldData: number[][], newData: number[][]): DiffArray {
  const diffData: DiffArray = [];
  for (let i = 0; i < newData.length; i++) {
    for (let j = 0; j < newData[i].length; j++) {
      if (oldData[i][j] !== newData[i][j]) {
        diffData.push({ row: i, col: j, state: newData[i][j] });
      }
    }
  }
  return diffData;
}
