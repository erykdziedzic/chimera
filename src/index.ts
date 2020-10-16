import Game from './Game'
import './style.scss'

render()

async function render() {
  const game = new Game()
  await game.load()
}
