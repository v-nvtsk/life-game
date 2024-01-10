import { createCell } from "./create-cell";

export function createGrid(size: number): HTMLTableElement {
  const field = document.createElement("table");
  field.className = "field";
  for (let i = 0; i < size; i += 1) {
    const row = document.createElement("tr");
    row.className = "row";
    for (let j = 0; j < size; j += 1) {
      const cell = createCell(i, j);
      row.appendChild(cell);
    }
    field.appendChild(row);
  }

  return field;
}
