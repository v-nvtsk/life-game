import { MAX_INTERVAL, MAX_SIZE, MIN_INTERVAL, MIN_SIZE, SPEED_STEP } from "./constants";
import { type Controls } from "./interfaces";
import { createElementFromHTML } from "./utils/create-element-from-html";

interface CreateControlsParams {
  container: HTMLElement;
  size: number;
  timeInterval: number;
}

function createControls({ container, size, timeInterval }: CreateControlsParams): Controls {
  document.documentElement.style.cssText = `--grid-size: ${size}`;

  const controls = createElementFromHTML('<div class="controls"></div>')[0];
  const sizeInput = createElementFromHTML(`
    <input class="size-input" type="number" min="${MIN_SIZE}" max="${MAX_SIZE}" value="${size.toString()}"/>
  `)[0] as HTMLInputElement;
  const speedInput = createElementFromHTML(`
    <input class="speed-input" type="range" min="${MIN_INTERVAL}" max="${MAX_INTERVAL}"
    step="${SPEED_STEP}" value="${timeInterval.toString()}"/>
  `)[0] as HTMLInputElement;
  const speedValue = createElementFromHTML(`<span class="speed-value">${timeInterval} ms</span>`)[0];

  const buttonWrapper = createElementFromHTML(`<div class="button-wrapper"></div>`)[0] as HTMLDivElement;
  const [playButton, randomButton, clearButton] = [
    `<button class="btn btn-game">Start</button>`,
    `<button class="btn btn-random">Random</button>`,
    `<button class="btn btn-clear">Clear</button>`,
  ].map((el) => createElementFromHTML(el)[0] as HTMLButtonElement);

  const message = document.createElement("div");
  message.className = "message";
  message.textContent = "Step: 0";

  const fieldContainer = createElementFromHTML(`<div class="field-container"></div>`)[0] as HTMLButtonElement;

  sizeInput.addEventListener("input", (ev) => {
    const input = ev.target as HTMLInputElement;
    const value = Number(input.value);

    if (value > MAX_SIZE) input.value = String(MAX_SIZE);
    if (value < MIN_SIZE) input.value = String(MIN_SIZE);
  });

  speedInput.addEventListener("input", (ev) => {
    const input = ev.target as HTMLInputElement;
    speedValue.textContent = input.value + " ms";
  });

  container.append(controls);
  controls.append(sizeInput);
  controls.append(speedInput);
  controls.append(speedValue);
  controls.append(buttonWrapper);

  buttonWrapper.append(playButton);
  buttonWrapper.append(randomButton);
  buttonWrapper.append(clearButton);

  controls.append(message);
  container.append(fieldContainer);

  return { fieldContainer, sizeInput, speedInput, playButton, randomButton, clearButton, message };
}

export { createControls };
