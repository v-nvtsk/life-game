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
      const neighbourRow = cellRow + rowNum;
      const neighbourCol = cellCol + colNum;
      const isInsideField =
        neighbourRow >= 0 && neighbourCol >= 0 && neighbourRow <= fieldSize - 1 && neighbourCol <= fieldSize - 1;
      if (isInsideField) {
        const isCellDying = field[cellRow + rowNum][cellCol + colNum] === 3;
        if (isCellDying) {
          aliveNeighboursCount = aliveNeighboursCount + 1;
        } else {
          aliveNeighboursCount = aliveNeighboursCount + field[cellRow + rowNum][cellCol + colNum];
        }
      }
    });
  });

  aliveNeighboursCount = aliveNeighboursCount - field[cellRow][cellCol];
  return aliveNeighboursCount;
}
