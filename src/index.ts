import Game from "./game";
import "./style.css";

const container = document.createElement("div");
container.className = "game-container";
document.body.append(container);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const game = new Game(container);
game.init();
