import { map } from '../../map'
import Game from './Game'

export default class LoadButton {
  element: HTMLButtonElement
  game: Game

  constructor(game: Game) {
    this.game = game
    const input = document.createElement('input')
    input.style.display = 'none'
    input.type = 'file'
    input.accept = 'application/json'
    if (map) this.loadMap()

    this.element = document.createElement('button')
    this.element.textContent = 'Load'
    this.element.onclick = () => {
      input.click()
    }

    input.onchange = async (e: Event) => {
      const file = await (<HTMLInputElement>e.target).files[0].text()
      const json = JSON.parse(file)
      this.game.map = json
      this.game.findPlayerLevel()
      this.game.render()
    }
  }

  loadMap(): void {
    this.game.map = map
    this.game.findPlayerLevel()
    this.game.render()
  }
}
