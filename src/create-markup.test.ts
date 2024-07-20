import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { createMarkUp } from "./create-markup";

describe("createGame", () => {
  it("should be a function", () => {
    expect(createMarkUp).toBeInstanceOf(Function);
  });

  let field: HTMLElement | null;
  let btnStart: HTMLElement | null;
  let sizeInput: HTMLInputElement | null;
  let speedInput: HTMLInputElement | null;
  beforeEach(() => {
    const container = document.createElement("div");
    container.className = "game-container";
    document.body.append(container);
    createMarkUp({ container, size: 10, timeInterval: 400 });
    field = container.querySelector(".field");
    btnStart = container.querySelector(".btn-game");
    sizeInput = container.querySelector(".size-input");
    if (sizeInput === null) throw new Error("sizeInput is null");
    speedInput = container.querySelector(".speed-input");
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should create markup", () => {
    expect(btnStart).not.toBeNull();
    expect(field).not.toBeNull();
    expect(field).toBeInstanceOf(HTMLTableElement);
  });

  it("sizeInput should be initalized", () => {
    expect(sizeInput).not.toBeNull();
    expect(sizeInput?.type).toBe("number");
    expect(sizeInput?.min).toBe("3");
    expect(sizeInput?.value).toBe("10");
  });

  it("sizeInput should not be out of bounds", () => {
    if (sizeInput === null) {
      throw new Error("sizeInput is null");
    }
    sizeInput.value = "101";
    sizeInput.dispatchEvent(new Event("input"));
    expect(sizeInput.value).toBe("100");
    sizeInput.value = "1";
    sizeInput.dispatchEvent(new Event("input"));
    expect(sizeInput.value).toBe("3");
  });

  it("speedInput should be initalized", () => {
    expect(speedInput).not.toBeNull();
    if (speedInput === null) {
      throw new Error("speedInput is null");
    }
    expect(speedInput.type).toBe("range");
    expect(speedInput.min).toBe("10");
    expect(speedInput.max).toBe("1000");
    expect(speedInput.step).toBe("10");
    expect(speedInput.value).toBe("400");
  });

  it("speedInput should control value", () => {
    if (speedInput === null) {
      throw new Error("speedInput is null");
    }
    speedInput.value = "10";
    speedInput.dispatchEvent(new Event("input"));
    expect(speedInput.value).toBe("10");
  });
});
