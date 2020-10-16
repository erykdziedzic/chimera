import Canvas from './Canvas'
import loadImages, { GameImages } from './loadImages'
import Player from './Player'

export default class Game {
  canvas: Canvas
  element: HTMLDivElement
  images: GameImages
  player: Player

  constructor() {
    this.element = document.createElement('div')
    this.element.id = 'game'
  }

  async load(): Promise<void> {
    await this.loadImages()
    this.createCanvas()
    // this.createField()
    this.createPlayer()

    document.body.appendChild(this.element)
  }

  createPlayer(): void {
    this.player = new Player(this)
    this.player.draw()
  }

  createCanvas(): void {
    this.canvas = new Canvas(this)
    this.element.innerHTML = ''
    this.element.appendChild(this.canvas.element)
  }

  createField(): void {
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        this.canvas.drawSprite(this.images.cube, i, j)
      }
    }
  }

  async loadImages(): Promise<void> {
    this.images = await loadImages()
  }
}
