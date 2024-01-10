import { describe, expect, it } from "@jest/globals";
import { Store } from "./store";

describe("Store", () => {
  it("should be a class", () => {
    expect(Store).toBeInstanceOf(Function);
  });

  it("should create different instances of store", () => {
    const store1 = new Store(10);
    const store2 = new Store(10);
    expect(store1).toBeInstanceOf(Store);
    expect(store2).toBeInstanceOf(Store);
    expect(store1).not.toBe(store2);
  });

  it("should resize store", () => {
    const store = new Store(10);
    expect(store.getCells().length).toBe(10);
    expect(store.getSize()).toBe(10);

    store.resize(20);
    expect(store.getCells().length).toBe(20);
    expect(store.getSize()).toBe(20);
  });

  it("should upsize store with data", () => {
    const store = new Store(3);
    store.setCells([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]);

    store.resize(5);
    expect(store.getCells()).toEqual([
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });

  it("should downsize store with data", () => {
    const store = new Store(5);
    store.setCells([
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
    ]);

    store.resize(3);
    expect(store.getCells()).toEqual([
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ]);
  });

  it("should set cell state", () => {
    const testStore = new Store(5);
    testStore.setCellState(0, 0, 1);
    expect(testStore.getCells()).toEqual([
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
  });
});
