import config from './config'
import Game from './game/Game'
import LevelEditor from './LevelEditor'
import './style.scss'

render()

function render() {
  if (config.levelEditor) loadMapCreator()
  else loadGame()
}

async function loadGame() {
  const game = new Game()
  await game.load()
}

async function loadMapCreator() {
  const editor = new LevelEditor()
  await editor.load()
}
