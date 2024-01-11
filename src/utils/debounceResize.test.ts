import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { debounceResize } from "./debounceResize";

describe("debounceResize", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("should be a function", () => {
    expect(debounceResize).toBeInstanceOf(Function);
  });

  it("should return a function", () => {
    const mock = jest.fn();
    const debounced = debounceResize(mock, 1000);
    expect(debounced).toBeInstanceOf(Function);
  });

  it("should run callback function by timer", () => {
    const mock = jest.fn();
    const debounced = debounceResize(mock, 1000);
    expect(debounced).toBeInstanceOf(Function);
    expect(mock).not.toHaveBeenCalled();
    debounced(new Event("resize"));
    jest.advanceTimersByTime(1100);
    expect(mock).toHaveBeenCalled();
  });

  it("should not run previous if got new callback", () => {
    const mock = jest.fn();
    const debounced = debounceResize(mock, 1000);
    expect(debounced).toBeInstanceOf(Function);
    expect(mock).not.toHaveBeenCalled();
    debounced(new Event("first"));
    jest.advanceTimersByTime(500);
    const secondEvent = new Event("second");
    debounced(secondEvent);
    jest.advanceTimersByTime(1100);
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith(secondEvent);
  });
});
