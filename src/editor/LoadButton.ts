import GameMap from './GameMap'

export default class LoadButton {
  element: HTMLButtonElement
  map: GameMap

  constructor(map: GameMap) {
    this.map = map
    const input = document.createElement('input')
    input.style.display = 'none'
    input.type = 'file'
    input.accept = 'application/json'

    this.element = document.createElement('button')
    this.element.textContent = 'Load'
    this.element.onclick = () => {
      input.click()
    }

    this.element.onchange = async (e: Event) => {
      const file = await (<HTMLInputElement>e.target).files[0].text()
      const json = JSON.parse(file)
      this.map.map = json
      this.map.render()
    }
  }
}
