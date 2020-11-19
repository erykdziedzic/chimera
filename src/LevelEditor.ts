import BlockSelector from './editor/BlockSelector'
import Canvas from './editor/Canvas'
import DownloadAnchor from './editor/DownloadAnchor'
import GameMap from './editor/GameMap'
import LevelTables from './editor/LevelTables'
import Table from './editor/Table'
import loadImages, { BlockImages, GameImages } from './utils/loadImages'

export default class LevelEditor {
  canvas: Canvas
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

    const levelEditors = new LevelTables(this)
    document.body.append(levelEditors.element)

    this.canvas = new Canvas(this)
    document.body.append(this.canvas.element)

    const downloadAnchor = new DownloadAnchor()
    document.body.append(downloadAnchor.element)
  }

  getBlocksArray(): HTMLImageElement[] {
    return Object.keys(this.images.block).map(
      (key: keyof BlockImages) => this.images.block[key]
    )
  }

  getLevel(): { level: number[][][]; img: string } {
    return this.map.map[this.selectedLevel.row][this.selectedLevel.col]
  }

  setLevel(level: number, row: number, col: number, value: number): void {
    this.getLevel().level[level][row][col] = value
    this.canvas.draw()
    this.getLevel().img = this.canvas.element.toDataURL()
  }
}
