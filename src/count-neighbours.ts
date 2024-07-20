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
      let neighbourRow = cellRow + rowNum;
      if (neighbourRow < 0) neighbourRow = fieldSize - 1;
      if (neighbourRow > fieldSize - 1) neighbourRow = 0;

      let neighbourCol = cellCol + colNum;
      if (neighbourCol < 0) neighbourCol = fieldSize - 1;
      if (neighbourCol > fieldSize - 1) neighbourCol = 0;

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
