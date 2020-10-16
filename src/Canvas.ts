import config from './config'
import Game from './Game'

export default class Canvas {
  element: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  game: Game

  constructor(game: Game) {
    this.game = game
    this.element = document.createElement('canvas')
    this.element.width = config.screen.width
    this.element.height = config.screen.height
    this.ctx = this.element.getContext('2d')
    this.ctx.fillStyle = '#000'
    this.ctx.imageSmoothingEnabled = false
    this.clear()
    this.drawField()
  }

  clear(): void {
    this.ctx.fillRect(0, 0, this.element.width, this.element.height)
  }

  drawField(): void {
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        this.drawSprite(this.game.images.cube, i, j)
      }
    }
  }

  drawSprite(img: HTMLImageElement, dx: number, dy: number, dz = 0): void {
    const PREFIX_X = config.screen.width / 2 - img.width / 2
    const PREFIX_Y = config.block.height - img.height

    this.ctx.drawImage(
      img,
      PREFIX_X + ((dx - dy) / 2) * config.block.width,
      PREFIX_Y +
        ((dy + dx) / 4) * config.block.height -
        (dz * config.block.height) / 2,
      img.width,
      img.height
    )
  }
}
