interface Request {
  field: number[][];
  cellRow: number;
  cellCol: number;
}

export function countNeighbours({ field, cellRow, cellCol }: Request): number {
  let aliveNeighboursCount = 0;
  const fieldSize = field.length;

  [-1, 0, 1].forEach((rowNum) => {
    [-1, 0, 1].forEach((colNum) => {
      const [neighbourRow, neighbourCol] = cycleField(fieldSize, fieldSize, cellRow + rowNum, cellCol + colNum);

      const isCellDying = field[neighbourRow][neighbourCol] === 3;
      if (isCellDying) {
        aliveNeighboursCount = aliveNeighboursCount + 1;
      } else {
        aliveNeighboursCount = aliveNeighboursCount + field[neighbourRow][neighbourCol];
      }
    });
  });

  aliveNeighboursCount = aliveNeighboursCount - field[cellRow][cellCol];
  return aliveNeighboursCount;
}

export function cycleField(maxRows: number, maxCols: number, currRow: number, currCol: number): [number, number] {
  let row = currRow;
  let col = currCol;
  if (row < 0) row = maxRows - 1;
  if (row > maxRows - 1) row = 0;

  if (col < 0) col = maxCols - 1;
  if (col > maxCols - 1) col = 0;

  return [row, col];
}
