import { STYLE } from "../../constants";
import { type CellRenderData, type DiffArray, type GameController, type View } from "../../interfaces";
import { renderGrid } from "../../render-grid";
import { createGrid } from "../../utils/create-grid";

export class Table implements View {
  mouseMoving = false;
  ctrlPressed = false;
  table: HTMLTableElement | null = null;

  constructor(
    readonly container: HTMLElement,
    private size: number,
    readonly onClick: typeof GameController.prototype.onClick,
    private readonly style = STYLE,
  ) {
    this.initTable();
    this.initEvents();
  }

  initTable(): void {
    this.table?.remove();
    this.table = createGrid(this.size);
    this.container.appendChild(this.table);
  }

  private initEvents(): void {
    const table = this.table;
    if (table === null) return;
    table.addEventListener("click", this.clickHandler.bind(this));
    table.addEventListener("touchmove", this.onTouchMove.bind(this), { passive: false });
    table.addEventListener("mousedown", this.onDown.bind(this));
    table.addEventListener("mouseup", this.onUp.bind(this));
    table.addEventListener("mousemove", this.onMove.bind(this));

    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));
  }

  public resizeHandler(newSize: number): void {
    this.size = newSize;
    requestAnimationFrame(() => {
      this.initTable();
    });
  }

  renderAll(data: number[][]): void {
    requestAnimationFrame(() => {
      if (this.table === null) return;
      renderGrid(this.table, this.size, data);
    });
  }

  renderCell(data: CellRenderData, noPathControl?: boolean): void {
    requestAnimationFrame(() => {
      if (this.table === null) return;
      const cell: HTMLElement | null = this.table.querySelector(`.cell[data-x="${data.row}"][data-y="${data.col}"]`);
      if (cell === null) return;
      cell.dataset.state = String(data.state);
    });
  }

  renderDiff(diffData: DiffArray): void {
    requestAnimationFrame(() => {
      for (let i = 0; i < diffData.length; i += 1) {
        this.renderCell(diffData[i], true);
      }
    });
  }

  onDown(ev: MouseEvent): void {
    ev.preventDefault();
  }

  onUp(ev: MouseEvent): void {
    ev.preventDefault();
    setTimeout(() => (this.mouseMoving = false), 10);
  }

  onMove(ev: MouseEvent): void {
    const isCell: boolean = (ev.target as HTMLElement).classList?.contains("cell");
    if (ev.buttons === 1) {
      if (isCell) {
        const cell: HTMLElement = ev.target as HTMLElement;
        const x = Number(cell.dataset.x);
        const y = Number(cell.dataset.y);
        this.onClick(x, y, Number(!this.ctrlPressed));
      }
    }
  }

  onKeyDown(ev: KeyboardEvent): void {
    if (ev.key === "Control") {
      this.ctrlPressed = true;
    }
  }

  onKeyUp(ev: KeyboardEvent): void {
    if (ev.key === "Control") {
      this.ctrlPressed = false;
    }
  }

  onTouchMove(ev: TouchEvent): void {
    if (ev.touches.length > 1) return;
    ev.preventDefault();
    const cell: HTMLElement = document.elementFromPoint(ev.touches[0].clientX, ev.touches[0].clientY) as HTMLElement;
    const isCell: boolean = cell.classList?.contains("cell");
    if (isCell) {
      cell.dataset.state = "1";
      const x = Number(cell.dataset.x);
      const y = Number(cell.dataset.y);
      this.onClick(x, y, 1);
    }
  }

  public clickHandler(ev: MouseEvent): void {
    const isCell: boolean = (ev.target as HTMLElement).classList.contains("cell");
    if (isCell) {
      const cell: HTMLElement = ev.target as HTMLElement;
      const x = Number(cell.dataset.x);
      const y = Number(cell.dataset.y);
      const newState = Number(cell.dataset.state) === 1 ? 0 : 1;
      this.onClick(x, y, newState);
    }
  }
}
