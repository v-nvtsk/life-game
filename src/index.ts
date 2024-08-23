import Game from "./game";
import "./style.css";

const container = document.createElement("div");
container.className = "game-container";
document.body.append(container);

const game = new Game(container, 100, "canvas");
game.init();
