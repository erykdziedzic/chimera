import config from './config'
import loadImages, { GameImages } from './utils/loadImages'

const MAP_SIZE = 7

export default class LevelEditor {
  element: HTMLCanvasElement
  images: GameImages
  ctx: CanvasRenderingContext2D
  level: boolean[][][]
  filling: boolean

  async load(): Promise<void> {
    const level0 = Array(MAP_SIZE)
      .fill(false)
      .map(() => Array(MAP_SIZE).fill(false))
    const level1 = Array(MAP_SIZE)
      .fill(false)
      .map(() => Array(MAP_SIZE).fill(false))
    this.level = [level0, level1]

    this.images = await loadImages()
    const table1 = this.createTable('level_0')
    const table2 = this.createTable('level_1', 1)

    document.body.append(table1)
    document.body.append(table2)

    this.element = document.createElement('canvas')
    this.element.className = 'field'
    this.element.width = config.screen.width
    this.element.height = config.screen.height
    this.ctx = this.element.getContext('2d')
    this.ctx.fillStyle = '#000'
    this.ctx.imageSmoothingEnabled = false

    document.body.append(this.element)
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.element.width, this.element.height)
    this.ctx.fillRect(0, 0, this.element.width, this.element.height)
  }

  draw(): void {
    this.ctx.save()
    this.clear()
    console.clear()
    console.table(this.level[0])
    const drawLevel = (level: number) => {
      this.level[level].forEach((row: boolean[], i: number) =>
        row.forEach((cell, j: number) => {
          if (cell) this.drawSprite(this.images.cube, j - level, i - level)
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

  createTable(id: string, level = 0) {
    const table1Label = document.createElement('h2')
    table1Label.textContent = id

    const table = document.createElement('div')
    table.id = id
    table.className = 'level'

    table.append(table1Label)
    table.onmouseleave = () => {
      this.filling = false
    }
    for (let i = 0; i < MAP_SIZE; i += 1) {
      const row = document.createElement('div')
      row.className = 'row'

      for (let j = 0; j < MAP_SIZE; j += 1) {
        const cell = document.createElement('div')
        cell.id = `${i}_${j}`
        cell.className = 'cell'
        const fill = () => {
          if (this.level[level][i][j]) {
            this.level[level][i][j] = false
            cell.classList.remove('filled')
          } else {
            this.level[level][i][j] = true
            cell.classList.add('filled')
          }
          this.draw()
        }
        cell.onmouseover = () => {
          if (this.filling) fill()
        }
        cell.onmousedown = () => {
          fill()
          this.filling = true
        }

        cell.onmouseup = () => {
          this.filling = false
        }
        document.body.onmouseleave = () => {
          this.filling = false
        }

        row.append(cell)
      }

      table.append(row)
    }
    return table
  }
}
