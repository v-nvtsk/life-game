import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import Game from "./game";

describe("Game", () => {
  it("should be a class", () => {
    expect(Game).toBeInstanceOf(Function);
  });

  jest.useFakeTimers();
  jest.spyOn(global, "setInterval");
  jest.spyOn(global, "clearInterval");

  let game: Game;
  let container: HTMLElement | null;
  let field: HTMLElement | null;
  let sizeInput: HTMLInputElement | null;
  let speedInput: HTMLInputElement | null;
  let button: HTMLElement | null;
  const size = 5;
  const timeOut = 400;
  beforeEach(() => {
    document.body.innerHTML = "";
    container = document.createElement("div");
    container.className = "game-container";
    document.body.append(container);
    game = new Game(container, size, timeOut);
    game.init();

    field = container.querySelector(".field");
    sizeInput = container.querySelector(".size-input");
    speedInput = container.querySelector(".speed-input");
    button = container.querySelector(".btn-game");
  });

  it("should create different instances of game", () => {
    const container2 = document.createElement("div");
    const game2 = new Game(container2);
    expect(game).toBeInstanceOf(Game);
    expect(game2).toBeInstanceOf(Game);
    expect(game).not.toBe(game2);
  });

  it("should create markup", () => {
    expect(field).not.toBeNull();
    expect(sizeInput).not.toBeNull();
    expect(speedInput).not.toBeNull();
    expect(button).not.toBeNull();
  });

  it("should start game", () => {
    jest.spyOn(global, "setInterval");
    expect(setInterval).not.toHaveBeenCalled();
    button?.click();
    expect(setInterval).toHaveBeenCalled();
  });

  it("should not start game if already started", () => {
    if (button !== null) {
      button.click();
      game.start(button);
      expect(setInterval).toHaveBeenCalledTimes(1);

      button.click();
      button.click();
      expect(setInterval).toHaveBeenCalledTimes(2);
    }
  });

  it("should not stop game if already stopped", () => {
    if (button !== null) {
      game.stop(button);
      game.stop(button);
    }
    expect(clearInterval).not.toHaveBeenCalled();
  });

  it("should handle speed change", () => {
    button?.click();
    const mock = jest.spyOn(game, "restart");
    expect(mock).not.toHaveBeenCalled();
    if (speedInput !== null) {
      speedInput.value = "1000";
      speedInput.dispatchEvent(new Event("input"));
      expect(mock).toHaveBeenCalled();
    } else {
      throw new Error("speedInput not found");
    }
  });

  it("should not call restart on speed change if not started", () => {
    const mock = jest.spyOn(game, "restart");
    expect(mock).not.toHaveBeenCalled();
    if (speedInput !== null) {
      speedInput.value = "1000";
      speedInput.dispatchEvent(new Event("input"));
      expect(mock).not.toHaveBeenCalled();
    } else {
      throw new Error("speedInput not found");
    }
  });

  it("should handle size change", () => {
    button?.click();
    if (sizeInput !== null) {
      const newSize = 10;
      sizeInput.value = newSize.toString();
      sizeInput.dispatchEvent(new Event("input"));
      jest.runAllTimers();
      const cells = Array.from(document.querySelectorAll(".cell"));
      expect(cells.length).toBe(newSize ** 2);
    }
  });

  it("should stop game on empty field", () => {
    const mock = jest.spyOn(game, "stop");
    expect(mock).not.toHaveBeenCalled();

    button?.click();
    jest.runAllTimers();
    expect(mock).toHaveBeenCalled();
  });

  it("should not change state of cell on field misclick", () => {
    field?.click();
    const cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach((el, i) => {
      const cell = el as HTMLElement;
      expect(cell.dataset.state).toBe("0");
    });
  });

  it("should change state of cell on click", () => {
    const cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach((el, i) => {
      const cell = el as HTMLElement;
      const x = Number(cell.dataset.x);
      const y = Number(cell.dataset.y);
      expect(cell.dataset.state).toBe("0");
      cell.click();
      expect(cell.dataset.state).toBe("1");
      expect(game.getCell(x, y)).toBe(1);
      cell.click();
      expect(cell.dataset.state).toBe("0");
      expect(game.getCell(x, y)).toBe(0);
    });
  });

  it("should do step on timer", () => {
    const testData = [
      {
        testField: [
          [0, 0, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 0, 0, 0],
        ],
        expectedField: [
          [0, 0, 0, 0, 0],
          [0, 0, 3, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 3, 0, 0],
          [0, 0, 0, 0, 0],
        ],
      },
      {
        testField: [
          [0, 0, 0, 0, 0],
          [0, 0, 3, 0, 0],
          [0, 0, 1, 0, 0],
          [0, 0, 3, 0, 0],
          [0, 0, 0, 0, 0],
        ],
        expectedField: [
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
          [0, 3, 1, 3, 0],
          [0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0],
        ],
      },
    ];

    const cells = Array.from(document.querySelectorAll(".cell"));
    testData[0].testField.flat().forEach((state, i) => {
      const cell = cells[i] as HTMLElement;
      if (state === 1) cell.click();
    });
    button?.click();

    jest.advanceTimersByTime(timeOut + 1);
    let cellState = cells.map((el) => Number((el as HTMLElement).dataset.state));
    expect(cellState).toEqual(testData[0].expectedField.flat());

    jest.advanceTimersByTime(timeOut + 1);
    cellState = cells.map((el) => Number((el as HTMLElement).dataset.state));
    expect(cellState).toEqual(testData[1].expectedField.flat());
  });

  it("should draw on mouseMove", () => {
    const cells = Array.from(document.querySelectorAll(".cell"));
    field?.dispatchEvent(new MouseEvent("mousedown"));
    cells.forEach((el, i) => {
      const cell = el as HTMLElement;
      const x = Number(cell.dataset.x);
      const y = Number(cell.dataset.y);
      expect(cell.dataset.state).toBe("0");
      cell.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          buttons: 1,
        }),
      );
      expect(cell.dataset.state).toBe("1");
      expect(game.getCell(x, y)).toBe(1);
    });
    field?.dispatchEvent(new MouseEvent("mouseup"));
  });

  it("should not draw on mouseMove without button pressed", () => {
    const cells = Array.from(document.querySelectorAll(".cell"));
    cells.forEach((el, i) => {
      const cell = el as HTMLElement;
      const x = Number(cell.dataset.x);
      const y = Number(cell.dataset.y);
      expect(cell.dataset.state).toBe("0");
      cell.dispatchEvent(
        new MouseEvent("mousemove", {
          bubbles: true,
          buttons: 0,
        }),
      );
      expect(cell.dataset.state).toBe("0");
      expect(game.getCell(x, y)).toBe(0);
    });
  });

  it("should not draw if moved not over cells", () => {
    field?.dispatchEvent(
      new MouseEvent("mousemove", {
        bubbles: true,
        buttons: 1,
      }),
    );
  });
});
