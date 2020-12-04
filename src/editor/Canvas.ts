import config from '../config'
import LevelEditor from '../LevelEditor'

export default class Canvas {
  editor: LevelEditor
  element: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(editor: LevelEditor) {
    this.editor = editor
    this.element = document.createElement('canvas')
    this.element.className = 'field'
    this.element.width = config.level.width
    this.element.height = config.level.height
    this.ctx = this.element.getContext('2d')
    this.ctx.fillStyle = '#000'
    this.ctx.imageSmoothingEnabled = false
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    const { row, col } = this.editor.selectedLevel
    const toFind = JSON.stringify({ row, col })
    if (config.blueLevels.map((l) => JSON.stringify(l)).includes(toFind)) {
      this.ctx.fillStyle = '#0c048b'
    }
    this.ctx.fillRect(0, 0, this.element.width, this.element.height)
    this.ctx.fillStyle = 'black'
  }

  draw(): void {
    this.ctx.save()
    this.clear()
    const drawLevel = (level: number) => {
      this.editor.getLevel().level[level].forEach((row: number[], i: number) =>
        row.forEach((cell, j: number) => {
          if (cell >= 0)
            this.drawSprite(this.editor.blocks[cell], j - level, i - level)
        })
      )
    }
    drawLevel(0)
    drawLevel(1)
    const { row, col } = this.editor.selectedLevel
    this.ctx.fillStyle = 'white'
    this.ctx.font = '32px serif'
    this.ctx.fillText(`row: ${row} col: ${col}`, 16, 32)
    this.ctx.fillStyle = 'black'
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
