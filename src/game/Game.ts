import GameCanvas from './GameCanvas'
import loadImages, { Block, BlockImages, GameImages } from '../utils/loadImages'
import Player, { Direction } from './Player'
import { MapTable } from '../editor/emptyMap'
import LoadButton from './LoadButton'
import sounds from './sounds'
import config from '../config'

export default class Game {
  canvas: GameCanvas
  element: HTMLDivElement
  images: GameImages
  blocks: HTMLImageElement[]
  player: Player
  map: MapTable
  darkRoomDone: boolean
  warheadsPlaced: number
  level: {
    row: number
    col: number
    level: number[][][]
    player: {
      row: number
      col: number
    }
  }

  constructor() {
    this.element = document.createElement('div')
    this.element.id = 'game'
    this.darkRoomDone = false
    this.warheadsPlaced = 0
  }

  async reload(): Promise<void> {
    document.body.innerHTML = ''
    this.element = document.createElement('div')
    this.element.id = 'game'
    this.load()
  }

  async load(): Promise<void> {
    await this.loadImages()
    this.blocks = this.getBlocksArray()
    this.createGameCanvas()
    const loadButton = new LoadButton(this)
    document.body.append(loadButton.element)

    document.body.appendChild(this.element)
    this.player.resetIntervals()

    this.canvas.draw()
    // TODO: ping
  }

  getBlocksArray(): HTMLImageElement[] {
    return Object.keys(this.images.block).map(
      (key: keyof BlockImages) => this.images.block[key]
    )
  }

  render(): void {
    if (this.level?.player) this.player = new Player(this)
    this.createField()
  }

  createGameCanvas(): void {
    this.canvas = new GameCanvas(this)
    this.element.innerHTML = ''
    this.element.appendChild(this.canvas.element)
  }

  createField(): void {
    const drawPlayer = () =>
      this.canvas.drawSprite(
        this.player.imageSet[this.player.animation.image],
        this.player.position.x,
        this.player.position.y,
        0
      )
    const drawBlock = (cell: number, i: number, j: number, level: number) => {
      if (cell >= 0 && cell !== Block.player && cell !== Block.end) {
        this.canvas.drawSprite(this.blocks[cell], j - level, i - level)
        const onTop = this.level.level[1][i][j]
        if (onTop >= 0 && level === 0) drawBlock(onTop, i, j, 1)
      }
    }

    const drawIndex = (i: number, j: number, level: number, color = 'white') =>
      this.canvas.fillText(`${i}_${j}`, j - level, i - level, 0, color)

    this.level.level[0].forEach((row: number[], i: number) =>
      row.forEach((cell, j: number) => {
        drawBlock(cell, i, j, 0)

        if (
          i - this.player.position.y > -1 &&
          i - this.player.position.y < 0 &&
          Math.abs(j - this.player.position.x) < 1
        ) {
          drawPlayer()

          drawBlock(cell, i, j, 0)
        }

        if (
          i - this.player.position.y < 1 &&
          i - this.player.position.y > 0 &&
          Math.abs(j - this.player.position.x) < 1
        ) {
          if (this.player.direction === Direction.south) drawPlayer()

          drawBlock(cell, i, j, 0)
        }

        if (
          i - this.player.position.y === 0 &&
          Math.abs(j - this.player.position.x) < 1
        ) {
          drawPlayer()
          drawBlock(cell, i, j, 0)
        }

        if (
          i - this.player.position.y > -1 &&
          i - this.player.position.y < 0 &&
          j - this.player.position.x === 1
        ) {
          drawPlayer()
          drawBlock(cell, i, j, 0)
        }
      })
    )
  }

  findPlayerLevel(): void {
    let row, col
    const player = { row: -1, col: -1 }

    this.map.forEach((mapRow, rowIdx) =>
      mapRow.forEach((mapCol, colIdx) =>
        mapCol.level.forEach((level) =>
          level.forEach((levelRow, lvlRowIdx) =>
            levelRow.forEach((block, lvlColIdx) => {
              if (block === Block.player) {
                player.row = lvlRowIdx
                player.col = lvlColIdx
                row = rowIdx
                col = colIdx
              }
            })
          )
        )
      )
    )
    let level
    if (typeof row === 'number' && typeof col === 'number') {
      level = this.map[row][col].level
    }
    this.level = { row, col, level, player }
  }

  async loadImages(): Promise<void> {
    this.images = await loadImages()
  }

  loadNextLevel(direction: Direction): void {
    const { row, col } = this.level

    switch (direction) {
      case Direction.east:
        this.level.col = col + 1
        this.level.level = this.map[row][col + 1].level
        this.player.position.x = -1
        break
      case Direction.south:
        this.level.row = row + 1
        this.level.level = this.map[row + 1][col].level
        this.player.position.y = -1
        break
      case Direction.west:
        this.level.col = col - 1
        this.level.level = this.map[row][col - 1].level
        this.player.position.x = 7
        break
      case Direction.north:
        this.level.row = row - 1
        this.level.level = this.map[row - 1][col].level
        this.player.position.y = 7
        break
      default:
    }
    this.player.resetIntervals()
    this.canvas.clear()
    this.createField()
    if (this.levelIsEnd() && this.warheadsPlaced === 4) this.end()
  }

  levelHasRadiator(): boolean {
    const level = this.level.level[0]
    const row = level.findIndex((row) => row.includes(Block.radiator))
    if (row >= 0) return true
    return false
  }

  levelIsBlue(): boolean {
    const { row, col } = this.level
    const toFind = JSON.stringify({ row, col })
    if (config.blueRooms.map((l) => JSON.stringify(l)).includes(toFind))
      return true
    return false
  }

  levelIsDark(): boolean {
    const { row, col } = this.level
    const toFind = JSON.stringify({ row, col })
    if (this.darkRoomDone) return false
    if (JSON.stringify(config.darkRoom) === toFind) return true
    return false
  }

  levelIsEnd(): boolean {
    const { row, col } = this.level
    const toFind = JSON.stringify({ row, col })
    if (JSON.stringify(config.endRoom) === toFind) return true
    return false
  }

  end(): void {
    console.log('CONGRATS MOTHAFUCKA')
  }
}
