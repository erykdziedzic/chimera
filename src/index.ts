import config from './config'
import Game from './game/Game'
import LevelEditor from './LevelEditor'
import './style.scss'

render()

function render() {
  document.body.innerHTML = ''
  // createToggleButton()

  if (config.levelEditor) loadMapCreator()
  else loadGame()
}

async function loadGame() {
  const game = new Game()
  await game.firstLoad()
}

async function loadMapCreator() {
  const editor = new LevelEditor()
  await editor.load()
}

function createToggleButton() {
  const mode = document.createElement('button')
  mode.innerText = 'Toggle Mode'
  mode.id = 'mode-toggle'
  mode.onclick = () => {
    config.levelEditor = !config.levelEditor
    render()
  }
  document.body.appendChild(mode)
}
