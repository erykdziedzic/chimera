import GameCanvas from './GameCanvas'
import loadImages, { GameImages } from '../utils/loadImages'
import Player from './Player'

export default class Game {
  canvas: GameCanvas
  element: HTMLDivElement
  images: GameImages
  player: Player
  creator: boolean

  constructor() {
    this.element = document.createElement('div')
    this.element.id = 'game'
    this.creator = true
  }

  async load(): Promise<void> {
    await this.loadImages()
    this.createGameCanvas()
    this.createField()
    this.createPlayer()

    document.body.appendChild(this.element)
  }

  createPlayer(): void {
    this.player = new Player(this)
    this.player.draw()
  }

  createGameCanvas(): void {
    this.canvas = new GameCanvas(this)
    this.element.innerHTML = ''
    this.element.appendChild(this.canvas.element)
  }

  createField(): void {
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        this.canvas.drawSprite(this.images.block.cube, i, j)
      }
    }
  }

  async loadImages(): Promise<void> {
    this.images = await loadImages()
  }
}
