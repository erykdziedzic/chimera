import config from '../config'
import Game from './Game'
import { Item } from './Player'

export default class GameCanvas {
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
    this.draw = this.draw.bind(this)
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    this.ctx.fillRect(0, 0, this.element.width, this.element.height)
  }

  draw(): void {
    this.ctx.save()
    this.clear()
    this.game.player.draw()
    this.drawHUD()
    window.requestAnimationFrame(this.draw)
  }

  drawHUD(): void {
    const { water, food, score } = this.game.player.stats
    const { hud } = config
    const hudImg = this.game.images.hud

    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(0, config.level.height, hud.width, hud.height)
    // margin
    let posY = config.level.height + 8 * 3
    // text
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(0, posY, hud.width, 9 * 3)
    posY += 9 * 3
    // margin
    posY += 8 * 3
    // titles
    this.ctx.drawImage(hudImg.stats, 0, posY, hud.stats.width, hud.stats.height)
    posY += hud.stats.height
    // margin
    posY += 2 * 3
    // digits
    this.drawNumber(water, hud.digits.left.water, posY)
    this.drawNumber(food, hud.digits.left.food, posY)
    this.drawNumber(score, hud.digits.left.score, posY)
    posY += hud.digits.height
    // margin
    posY += 8 * 3
    // inventory
    this.ctx.fillStyle = hud.inventory.color
    this.ctx.fillRect(
      hud.inventory.left,
      posY,
      hud.inventory.width,
      hud.inventory.height
    )
    switch (this.game.player.inventory) {
      case Item.bread:
        this.ctx.drawImage(
          this.game.images.block.bread,
          hud.inventory.left,
          posY,
          hud.inventory.width,
          hud.inventory.height
        )
        break
      default:
    }
    this.ctx.fillStyle = 'black'
    // symbol
    this.ctx.drawImage(
      hudImg.symbol,
      hud.symbol.left,
      posY,
      hud.symbol.width,
      hud.symbol.height
    )
    // life
    this.ctx.drawImage(
      hudImg.life,
      hud.life.left,
      posY,
      hud.life.width,
      hud.life.height
    )

    posY += hud.inventory.height
  }

  drawNumber(num: number, left: number, top: number): void {
    const { digits } = this.game.images
    const { width, height } = config.hud.digit
    const draw = (image: HTMLImageElement, deltaX: number) =>
      this.ctx.drawImage(image, left + deltaX * (width + 3), top, width, height)
    let str = num.toString()
    if (num < 10) str = `0${str}`
    if (num < 100) str = `0${str}`
    if (num < 1000) str = `0${str}`
    draw(digits[Number(str[0])], 0)
    draw(digits[Number(str[1])], 1)
    draw(digits[Number(str[2])], 2)
    draw(digits[Number(str[3])], 3)
  }

  drawSprite(img: HTMLImageElement, dx: number, dy: number, dz = 0): void {
    const PREFIX_X = config.screen.width / 2 - img.width / 2
    const PREFIX_Y = config.block.height - img.height
    const rotate = Math.floor(Math.random() * 360)
    this.ctx.filter = `sepia(100%) hue-rotate(${rotate}deg) saturate(200%) contrast(150%)`
    this.ctx.drawImage(
      img,
      PREFIX_X + ((dx - dy) / 2) * config.block.width,
      PREFIX_Y +
        ((dy + dx) / 4) * config.block.height -
        (dz * config.block.height) / 2,
      img.width,
      img.height
    )
    this.ctx.filter = 'none'
    this.drawHUD()
  }

  fillText(
    text: string,
    dx: number,
    dy: number,
    dz = 0,
    color = 'white'
  ): void {
    const PREFIX_X = config.screen.width / 2
    const PREFIX_Y = config.block.height
    this.ctx.font = '32px serif'

    this.ctx.fillStyle = color
    this.ctx.fillText(
      text,
      PREFIX_X + ((dx - dy) / 2) * config.block.width - 16,
      PREFIX_Y +
        ((dy + dx) / 4) * config.block.height -
        (dz * config.block.height) / 2 -
        16
    )
    this.ctx.fillStyle = 'black'
  }
}
