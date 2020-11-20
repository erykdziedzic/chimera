import BlockSelector from './editor/BlockSelector'
import Canvas from './editor/Canvas'
import DownloadAnchor from './editor/DownloadAnchor'
import { emptyLevel, LevelPreview } from './editor/emptyMap'
import GameMap from './editor/GameMap'
import LevelTables from './editor/LevelTables'
import loadImages, { BlockImages, GameImages } from './utils/loadImages'

export default class LevelEditor {
  canvas: Canvas
  images: GameImages
  ctx: CanvasRenderingContext2D
  level: number[][][]
  filling: boolean
  editors: LevelTables
  clipboard: LevelPreview
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
    this.handleKeys()

    const blocksSelector = new BlockSelector(this)
    document.body.append(blocksSelector.element)

    this.map = new GameMap(this)
    document.body.append(this.map.element)

    this.editors = new LevelTables(this)
    document.body.append(this.editors.element)

    this.canvas = new Canvas(this)
    document.body.append(this.canvas.element)

    const downloadAnchor = new DownloadAnchor()
    document.body.append(downloadAnchor.element)
  }

  handleKeys(): void {
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.ctrlKey)
        switch (event.keyCode) {
          case 67:
            this.copyCurrentMap()
            break // Keyboard.C
          case 86:
            this.pasteFromClipboard()
            break // Keyboard.V
          case 88:
            this.cutCurrentMap()
            break // Keyboard.X
        }
    })
  }

  cutCurrentMap(): void {
    const { row, col } = this.selectedLevel
    this.clipboard = JSON.parse(JSON.stringify(this.getLevel()))
    this.map.map[row][col] = emptyLevel()
    this.map.render()
    this.canvas.draw()
    this.editors.table1.render()
    this.editors.table2.render()
  }

  copyCurrentMap(): void {
    this.clipboard = JSON.parse(JSON.stringify(this.getLevel()))
  }

  pasteFromClipboard(): void {
    const { row, col } = this.selectedLevel
    if (this.clipboard) {
      this.map.map[row][col] = this.clipboard
      this.map.render()
      this.canvas.draw()
      this.editors.table1.render()
      this.editors.table2.render()
    }
  }

  getBlocksArray(): HTMLImageElement[] {
    return Object.keys(this.images.block).map(
      (key: keyof BlockImages) => this.images.block[key]
    )
  }

  getLevel(): { level: number[][][]; img: string } {
    const { row, col } = this.selectedLevel
    return this.map.map[row][col]
  }

  setLevel(level: number, row: number, col: number, value: number): void {
    this.getLevel().level[level][row][col] = value
    this.canvas.draw()
    this.getLevel().img = this.canvas.element.toDataURL()
  }
}
