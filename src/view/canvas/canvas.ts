import { STYLE } from "../../constants";
import { type CellRenderData, type DiffArray, type GameController, type View } from "../../interfaces";
import { isNotVoid } from "../../utils/utility";

// TODO: разобраться в причинах того, что остаётся след от умерших клеток
// TODO: разобраться с привязкой к размеру пикселя
// TODO: разобраться с масштабированием
export class CanvasGrid implements View {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  cellSize: number = 1;
  // lineWidth: number = 1;
  mouseMoving = false;
  ctrlPressed = false;

  constructor(
    readonly container: HTMLElement,
    private size: number,
    readonly onClick: typeof GameController.prototype.onClick,
    private readonly style = STYLE,
  ) {
    this.canvas = this.createCanvasElement(container);

    const ctx = this.canvas.getContext("2d");
    if (ctx === null) throw new Error("Cannot create canvas context");
    this.ctx = ctx;

    this.initCanvas();
    this.drawBackground();
    this.initEvents();
  }

  private createCanvasElement(container: HTMLElement): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.className = "canvas";
    container.append(canvas);

    return canvas;
  }

  private initEvents(): void {
    const canvas = this.canvas;
    canvas.addEventListener("click", this.clickHandler.bind(this));
    canvas.addEventListener("touchmove", this.onTouchMove.bind(this), { passive: false });
    canvas.addEventListener("mousedown", this.onDown.bind(this));
    canvas.addEventListener("mouseup", this.onUp.bind(this));
    canvas.addEventListener("mousemove", this.onMove.bind(this));

    window.addEventListener("keydown", this.onKeyDown.bind(this));
    window.addEventListener("keyup", this.onKeyUp.bind(this));

    window.addEventListener("resize", this.initCanvas.bind(this));
  }

  initCanvas(): void {
    // получаю ширину и высоту элемента
    // считаю размер одной ячейки
    // пересчитываю размеры элемента исходя из целочисленного размера ячейки

    this.canvas.style.width = "";
    this.canvas.style.height = ``;
    const rect = this.canvas.getBoundingClientRect();

    this.cellSize = Math.floor(rect.width / this.size);
    if (this.cellSize < 1) this.cellSize = 1;

    this.canvas.width = this.cellSize * this.size;
    this.canvas.height = this.cellSize * this.size;
    this.canvas.style.width = `${this.cellSize * this.size}px`;
    this.canvas.style.height = `${this.cellSize * this.size}px`;
  }

  private drawBackground(withGrid?: boolean): void {
    const context = this.canvas.getContext("2d");
    context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    isNotVoid(withGrid) ?? this.drawGrid();
  }

  private drawGrid(): void {
    this.ctx.beginPath();
    const ctx = this.canvas.getContext("2d");
    if (ctx === null) return;
    for (let i = 0; i < this.size; i++) {
      const lineStart = i * this.cellSize;
      const lineEnd = this.canvas.width;
      drawLine(ctx, 0, lineStart, lineEnd, lineStart, this.style.gridColor);
      drawLine(ctx, lineStart, 0, lineStart, lineEnd, this.style.gridColor);
    }
    this.ctx.closePath();
  }

  public resizeHandler(newSize: number): void {
    this.size = newSize;
    requestAnimationFrame(() => {
      this.initCanvas();
      this.drawBackground();
    });
  }

  private fillCell(row: number, col: number, color = this.style.cellColor, noPathControl?: boolean): void {
    noPathControl ?? this.ctx.beginPath();
    this.ctx.fillStyle = color;

    const cellSize = this.cellSize;
    this.ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

    noPathControl ?? this.ctx.closePath();
  }

  renderAll(data: number[][]): void {
    if (data === null) return;
    requestAnimationFrame(() => {
      this.ctx.beginPath();
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          const color = data[i][j] !== 0 ? this.style.cellColor : this.style.backgroundColor;
          this.fillCell(i, j, color);
        }
      }
      this.ctx.closePath();
    });
  }

  renderCell(data: CellRenderData, noPathControl?: boolean): void {
    requestAnimationFrame(() => {
      const { row, col, state } = data;
      const color = state !== 0 ? this.style.cellColor : this.style.backgroundColor;
      noPathControl ?? this.ctx.beginPath();

      this.fillCell(row, col, color, true);

      noPathControl ?? this.ctx.closePath();
    });
  }

  renderDiff(diffData: DiffArray): void {
    this.ctx.beginPath();
    for (let i = 0; i < diffData.length; i += 1) {
      this.renderCell(diffData[i]);
    }
    this.ctx.closePath();
  }

  onDown(ev: MouseEvent): void {
    ev.preventDefault();
  }

  onUp(ev: MouseEvent): void {
    ev.preventDefault();
    setTimeout(() => (this.mouseMoving = false), 10);
  }

  onMove(ev: MouseEvent): void {
    ev.preventDefault();
    if (ev.buttons === 1) {
      this.mouseMoving = true;

      const cellSize = this.cellSize;
      const row = Math.floor(ev.offsetY / cellSize);
      const col = Math.floor(ev.offsetX / cellSize);
      if (row >= 0 && col >= 0 && row < this.size && col < this.size) {
        this.onClick(row, col, Number(!this.ctrlPressed));
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
    const cellSize = this.cellSize;
    const rect = (ev.target as HTMLCanvasElement).getBoundingClientRect();

    const row = Math.floor((ev.targetTouches[0].pageY - rect.top) / cellSize);
    const col = Math.floor((ev.targetTouches[0].pageX - rect.left) / cellSize);
    if (row < 0 || col < 0 || row >= this.size || col >= this.size) return;
    this.onClick(row, col, 1);
  }

  public clickHandler(ev: MouseEvent): void {
    if (this.mouseMoving) return;
    const cellSize = this.cellSize;
    const row = Math.floor(ev.offsetY / cellSize);
    const col = Math.floor(ev.offsetX / cellSize);
    this.onClick(row, col);
  }
}

function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color?: string): void {
  ctx.beginPath();
  ctx.strokeStyle = color ?? "#fff";
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}
