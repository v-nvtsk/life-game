import initArray from './init-array'

export default class Store {
  private store: number[][] = [[]]
  private size: number = 0

  constructor(size: number) {
    this.size = size
    this.setCells(initArray(size))
  }

  public getSize(): number {
    return this.size
  }

  public resize(size: number): void {
    const newState: number[][] = initArray(size)
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (this.store[i] !== undefined && j < this.store[i].length) {
          newState[i][j] = this.store[i][j]
        }
      }
    }
    this.setCells(newState)
  }

  public getCells(): number[][] {
    return this.store
  }

  public getCell(x: number, y: number): number {
    return this.store[x][y]
  }

  public setCells(cells: number[][]): void {
    this.store = cells
    this.size = cells.length
  }

  public setCellState(x: number, y: number, state: number): void {
    this.store[x][y] = state
  }
}
