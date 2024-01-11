type CallbackFunction = (ev: Event) => void;

const debounceResize = (func: CallbackFunction, ms: number): CallbackFunction => {
  // const self = this;
  let timerId: NodeJS.Timeout | null = null;
  return (ev: Event) => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func.bind(this, ev)();
    }, ms);
  };
};

export { debounceResize };
