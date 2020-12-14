import config, { SCALE } from '../config'
import { Letters } from '../utils/loadLetters'
import Game from './Game'
import { Item } from './Player'

export default class GameCanvas {
  element: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  game: Game
  timestamp: DOMHighResTimeStamp
  slideTextQueue: string[]
  slideTextBeginning: number

  constructor(game: Game) {
    this.game = game
    this.element = document.createElement('canvas')
    this.element.width = config.screen.width
    this.element.height = config.screen.height
    this.ctx = this.element.getContext('2d')
    this.resetFillStyle()
    this.ctx.imageSmoothingEnabled = false
    this.clear()
    this.draw = this.draw.bind(this)
    this.slideTextQueue = []
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    this.resetFillStyle()
    this.ctx.fillRect(0, 0, this.element.width, this.element.height)
  }

  draw(timestamp?: DOMHighResTimeStamp): void {
    this.timestamp = timestamp
    this.ctx.save()
    this.clear()
    // const rotate = Math.floor(Math.random() * 360)
    const rotate = 90
    if (this.game.level) this.game.createField()
    this.ctx.filter = 'none'
    if (this.game.levelIsDark()) this.clear()
    if (this.game.level) this.drawHUD()
    if (this.game.paused) this.drawPauseMenu()
    if (this.game.menu) this.drawMenu()
    if (this.game.menu) this.drawTextSlide('chimera', true, 32)
    const description = `chimera, the ultimate test of logic and quick thinking.\
     this game will stretch your thinking power to the limit, it will question\
     your superiority over computer games. this game will not be solved quicky,\
     it can be completed, but at the end of the day, it will be your sanity thiat\
     emerges the loser. these are not wild claims, this game will do things that\
     no other game has yet done. if you complete it within a month, you are either\
     einstein... or a hacker. i would like to wish you luck,\
     but luck will not help you in chimera.....`
    if (this.game.menu) this.drawTextSlide(description, false, 112)
    if (this.game.booting) this.drawHUDImage(this.game.images.boot, 0, 0)
    this.ctx.filter = `sepia(100%) hue-rotate(${rotate}deg) saturate(200%) contrast(150%)`

    window.requestAnimationFrame(this.draw)
  }

  resetFillStyle(): void {
    if (this.game.level) {
      if (this.game.levelIsBlue()) this.ctx.fillStyle = '#0c048b'
      else this.ctx.fillStyle = 'black'
    } else {
      this.ctx.fillStyle = 'black'
    }
  }

  drawHUDImage(img: HTMLImageElement, x: number, y: number): void {
    this.ctx.drawImage(img, x, y, img.width, img.height)
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
    if (this.slideTextQueue.length > 0) {
      const text = this.slideTextQueue[0]
      if (!this.slideTextBeginning) {
        this.slideTextBeginning = Number(this.timestamp)
      }
      this.drawSingleTextSlide(text, false, posY / SCALE, 1, 2)
    } else {
      this.drawTextCenter('chimera', posY, 1, 2)
    }
    // this.ctx.fillRect(0, posY, hud.width, 9 * 3)
    posY += 9 * 3
    // margin
    posY += 8 * 3
    // titles
    this.drawHUDImage(hudImg.stats, 0, posY)
    posY += hudImg.stats.height
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
    switch (this.game.player.inventory) {
      case Item.bread:
        this.drawInventory(this.game.images.block.bread)
        break
      case Item.drink:
        this.drawInventory(this.game.images.block.drink)
        break
      case Item.spanner:
        this.drawInventory(this.game.images.block.spanner)
        break
      case Item.pyramid:
        this.drawInventory(this.game.images.block.pyramid)
        break
      case Item.key:
        this.drawInventory(this.game.images.block.key)
        break
      case Item.warhead:
        this.drawInventory(this.game.images.block.warhead)
        break
      case Item.torch:
        this.drawInventory(this.game.images.block.torch)
        break
      default:
        this.ctx.fillStyle = hud.inventory.color
        this.ctx.fillRect(
          hud.inventory.left,
          posY,
          hud.inventory.width,
          hud.inventory.height
        )
    }
    this.resetFillStyle()

    this.drawHUDImage(hudImg.symbol, hud.symbol.left, posY)
    this.drawHUDImage(hudImg.life, hud.life.left, posY)
  }

  drawInventory(image: HTMLImageElement): void {
    const { inventory } = config.hud
    this.ctx.drawImage(
      image,
      inventory.left,
      inventory.top,
      image.width,
      image.height
    )
  }

  drawNumber(num: number, left: number, top: number): void {
    const { digits } = this.game.images
    const { width, height } = config.hud.digit
    const draw = (image: HTMLImageElement, deltaX: number) =>
      this.ctx.drawImage(image, left + deltaX * (width + 3), top, width, height)
    let str = num.toString()
    let pos = 0
    if (num < 10) str = `0${str}`
    if (num < 100) str = `0${str}`
    if (num < 1000) str = `0${str}`
    if (num >= 10000) pos = -1
    draw(digits[Number(str[0])], pos)
    draw(digits[Number(str[1])], pos + 1)
    draw(digits[Number(str[2])], pos + 2)
    draw(digits[Number(str[3])], pos + 3)
    if (num >= 10000) draw(digits[Number(str[4])], pos + 4)
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
    this.resetFillStyle()
  }

  drawPauseMenu(): void {
    this.clear()
    const { background, text, colors } = this.game.images.pause
    this.ctx.drawImage(background, 0, 0, background.width, background.height)
    const speed = 2000
    const drawColorColumn = (left: number) => {
      const top = ((this.timestamp % speed) / speed) * background.height
      this.ctx.drawImage(colors, left, top, colors.width, colors.height)
      const top2 =
        ((this.timestamp % speed) / speed) * background.height -
        background.height
      this.ctx.drawImage(colors, left, top2, colors.width, colors.height)
    }
    drawColorColumn(32 * SCALE)
    drawColorColumn(128 * SCALE)
    drawColorColumn(224 * SCALE)

    this.ctx.drawImage(text, 24 * SCALE, 112 * SCALE, text.width, text.height)
  }

  drawMenu(): void {
    this.clear()
    const { background, colors } = this.game.images.pause
    const { bottom, author } = this.game.images.menu
    const speed = 5000
    const drawColorLine = (topCanvas: number) => {
      const top = (((this.timestamp % speed) / speed) * colors.height) / SCALE
      this.ctx.drawImage(
        colors,
        0,
        top,
        colors.width,
        32,
        0,
        topCanvas * SCALE,
        background.width * SCALE,
        32 * SCALE
      )
      const top2 =
        (((this.timestamp % speed) / speed) * colors.height) / SCALE - 32
      this.ctx.drawImage(
        colors,
        0,
        top2,
        colors.width,
        32,
        0,
        topCanvas * SCALE,
        background.width * SCALE,
        32 * SCALE
      )
    }
    drawColorLine(69)
    drawColorLine(131)

    this.ctx.drawImage(bottom, 0, 162 * SCALE, bottom.width, bottom.height)
    this.ctx.drawImage(author, 0, 46 * SCALE, author.width, author.height)
  }

  drawTextCenter(text: string, top: number, scaleY = 2, scaleX = 2): void {
    this.drawTextLine('chimera', screen.width / 2 / SCALE, top, scaleY, scaleX)
  }

  drawSingleTextSlide(
    text: string,
    reverse: boolean,
    top: number,
    scaleY = 2,
    scaleX = 2
  ): void {
    const time = this.timestamp - this.slideTextBeginning
    const { width } = config.screen
    const speed = 5000 + text.length * 200
    const letterSize = 7 * scaleX * SCALE
    const add = text.length * letterSize
    const delta = (time % speed) / speed
    if (time / speed > 1) {
      this.slideTextQueue.shift()
      this.slideTextBeginning = undefined
    }
    const right = delta * (width + add)
    const x = reverse ? right - add : width - right
    this.drawTextLine(text, x, top * SCALE, scaleY, scaleX)
    this.ctx.fillRect(0, top * SCALE, 40 * SCALE, letterSize)
    this.ctx.fillRect(width - 40 * SCALE, top * SCALE, 40 * SCALE, letterSize)
  }

  drawTextSlide(
    text: string,
    reverse: boolean,
    top: number,
    scaleY = 2,
    scaleX = 2
  ): void {
    let time
    if (this.game.start) time = this.timestamp - this.game.start
    else time = this.timestamp
    const { width } = config.screen
    const speed = 5000 + text.length * 200
    const letterSize = 7 * scaleX * SCALE
    const add = text.length * letterSize
    const right = ((time % speed) / speed) * (width + add)
    const x = reverse ? right - add : width - right
    this.drawTextLine(text, x, top * SCALE, scaleY, scaleX)
    this.ctx.fillRect(0, top * SCALE, 40 * SCALE, letterSize)
    this.ctx.fillRect(width - 40 * SCALE, top * SCALE, 40 * SCALE, letterSize)
  }

  drawTextLine(
    text: string,
    left: number,
    top: number,
    scaleY: number,
    scaleX: number
  ): void {
    const letters = text.toLowerCase().split('')
    letters.forEach((letter, index) =>
      this.drawLetter(letter, left, top, index, scaleY, scaleX)
    )
  }

  drawLetter(
    letter: string,
    left: number,
    top: number,
    index: number,
    scaleY: number,
    scaleX: number
  ): void {
    const { letters } = this.game.images
    const width = 7
    let char
    switch (letter) {
      case ',':
        char = 'comma'
        break
      case '.':
        char = 'dot'
        break
      default:
        char = letter
    }
    const img = letters[<keyof Letters>char]
    if (img)
      this.ctx.drawImage(
        img,
        left + index * (width + 1) * SCALE * scaleX,
        top,
        img.width * scaleX,
        img.height * scaleY
      )
  }
}
