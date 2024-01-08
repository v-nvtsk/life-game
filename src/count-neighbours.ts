export default function countNeighbours(field: number[][], x: number, y: number): number {
  let count = 0
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (x + i >= 0 && y + j >= 0 && x + i <= field.length - 1 && y + j <= field.length - 1) {
        const add = field[x + i][y + j]
        count += add === 3 ? 1 : add
      }
    }
  }
  count -= field[x][y]
  return count
}
