import countNeighbours from './count-neighbours'

export default function doStep(fieldState: number[][]): number[][] {
  const newField = Array.from({ length: fieldState.length }, () => Array.from({ length: fieldState.length }, () => 0))
  for (let i = 0; i < fieldState.length; i++) {
    for (let j = 0; j < fieldState.length; j++) {
      const state = fieldState[i][j]
      const neighbours = countNeighbours(fieldState, i, j)
      if (state === 0 && neighbours === 3) {
        newField[i][j] = 1
      } else if (state === 1 && neighbours >= 2 && neighbours <= 3) {
        newField[i][j] = fieldState[i][j]
      } else if (state === 1 && (neighbours < 2 || neighbours > 3)) {
        fieldState[i][j] = 3
        newField[i][j] = 0
      }
    }
  }
  return newField
}
