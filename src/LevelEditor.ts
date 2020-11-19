import config from './config'
import BlockSelector from './editor/BlockSelector'
import GameMap from './editor/GameMap'
import Table from './editor/Table'
import createEmptyElement from './utils/createEmptyElement'
import loadImages, { BlockImages, GameImages } from './utils/loadImages'

export default class LevelEditor {
  canvas: HTMLCanvasElement
  images: GameImages
  ctx: CanvasRenderingContext2D
  level: number[][][]
  filling: boolean
  editors: {
    table1: Table
    table2: Table
  }

  map: GameMap

  selectedBlock: number
  blocks: HTMLImageElement[]

  selectedLevel: {
    row: number
    col: number
  }

  async load(): Promise<void> {
    this.images = await loadImages()
    this.selectedLevel = { row: 0, col: 0 }
    this.blocks = this.getBlocksArray()
    this.selectedBlock = 0
    const blocksSelector = new BlockSelector(this)
    document.body.append(blocksSelector.element)
    this.map = new GameMap(this)
    document.body.append(this.map.element)
    this.createLevelEditors()
    this.createLevelEditorCanvas()
    this.createDownloadAnchor()
  }

  getBlocksArray(): HTMLImageElement[] {
    return Object.keys(this.images.block).map(
      (key: keyof BlockImages) => this.images.block[key]
    )
  }

  createLevelEditors(): void {
    this.editors = {
      table1: new Table(this, 'level_0'),
      table2: new Table(this, 'level_1', 1),
    }

    const levelEditors = createEmptyElement('div', 'levelEditors')
    document.body.append(levelEditors)
    levelEditors.append(this.editors.table1.element)
    levelEditors.append(this.editors.table2.element)
  }

  createDownloadAnchor(): void {
    const downloadAnchor = document.createElement('a')
    downloadAnchor.id = 'downloadAnchor'
    downloadAnchor.style.display = 'none'
    document.body.append(downloadAnchor)
  }

  createLevelEditorCanvas(): void {
    this.canvas = document.createElement('canvas')
    this.canvas.className = 'field'
    this.canvas.width = config.screen.width
    this.canvas.height = config.screen.height

    this.ctx = this.canvas.getContext('2d')
    this.ctx.fillStyle = '#000'
    this.ctx.imageSmoothingEnabled = false

    document.body.append(this.canvas)
  }

  clear(ctx = this.ctx): void {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw(): void {
    this.ctx.save()
    this.clear()
    const drawLevel = (level: number) => {
      this.getLevel().level[level].forEach((row: number[], i: number) =>
        row.forEach((cell, j: number) => {
          if (cell >= 0)
            this.drawSprite(this.blocks[cell], j - level, i - level)
        })
      )
    }
    drawLevel(0)
    drawLevel(1)
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

  getLevel(): { level: number[][][]; img: string } {
    return this.map.map[this.selectedLevel.row][this.selectedLevel.col]
  }

  setLevel(level: number, row: number, col: number, value: number): void {
    this.getLevel().level[level][row][col] = value
    this.draw()
    this.getLevel().img = this.canvas.toDataURL()
  }
}
