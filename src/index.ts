import Game from './game'
import './style.css'

const container = document.createElement('div')
container.className = 'game-container'
document.body.append(container)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const game = new Game(container)
game.init()

// const container1 = document.createElement("div");
// container1.className = "game-container";
// document.body.append(container1);
// const game1 = new Game(container1);
// game1.init();
