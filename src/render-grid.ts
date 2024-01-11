import { createCell } from "./utils/create-cell";

export function renderGrid(container: HTMLElement, size: number, gridData: number[][] | null): number {
  const grid: HTMLElement | null = container.querySelector(".field");
  if (gridData === null || grid === null) return 0;
  let liveCells = 0;

  const rows = Array.from(container.querySelectorAll(".row"));
  const cells = rows.reduce((rowsAcc: HTMLElement[][], row, rowNum) => {
    if (rowNum < size) {
      const rowCells = Array.from(row.children).reduce((cellsAcc: HTMLElement[], cell, cellNum) => {
        if (cellNum < size) {
          cell.setAttribute("data-state", gridData[rowNum][cellNum].toString());
          liveCells += gridData[rowNum][cellNum];
          cellsAcc.push(cell as HTMLElement);
        } else {
          cell.remove();
        }
        return cellsAcc;
      }, []);
      if (rowCells.length < size) {
        for (let i = rowCells.length; i < size; i += 1) {
          const cell = createCell(rowNum, i);
          row.append(cell);
          rowCells.push(cell);
        }
      }
      rowsAcc.push(rowCells);
    } else {
      row.remove();
    }
    return rowsAcc;
  }, []);

  if (cells.length < size) {
    for (let i = cells.length; i < size; i += 1) {
      const newRow = document.createElement("tr");
      newRow.className = "row";
      cells[i] = [];
      for (let j = 0; j < size; j += 1) {
        const cell = createCell(i, j);
        newRow.append(cell);
        cells[i].push(cell);
      }
      grid.append(newRow);
    }
  }
  return liveCells;
}
