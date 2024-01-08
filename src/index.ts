import Game from './game'
import './style.css'

const container = document.createElement('div')
container.className = 'game-container'
document.body.append(container)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const game = new Game(container)

// const container1 = document.createElement('div')
// container1.className = 'game-container'
// document.body.append(container1)
// // createGame(container, 30, 400)
// const game1 = new Game(container1)
