import config from './config'
import loadImages, { GameImages } from './utils/loadImages'

const MAP_SIZE = 7

export default class LevelEditor {
  element: HTMLCanvasElement
  images: GameImages
  ctx: CanvasRenderingContext2D
  level: boolean[][][]
  filling: boolean

  saved: {
    img: string
    level: boolean[][][]
  }[]

  map: {
    img: string
    level: boolean[][][]
  }[][]

  async load(): Promise<void> {
    const emptyMap = () =>
      Array(MAP_SIZE)
        .fill(false)
        .map(() => Array(MAP_SIZE).fill(false))

    this.level = [emptyMap(), emptyMap()]
    this.saved = []

    this.images = await loadImages()
    const table1 = this.createTable('level_0')
    const table2 = this.createTable('level_1', 1)
    const levelEditors = document.createElement('div')
    levelEditors.id = 'levelEditors'

    levelEditors.append(table1)
    levelEditors.append(table2)
    document.body.append(levelEditors)

    const levelActions = document.createElement('div')
    levelActions.id = 'levelActions'

    const saveButton = document.createElement('button')
    saveButton.textContent = 'Save'

    const saved = document.createElement('div')
    saved.id = 'saved'

    saveButton.onclick = () => {
      this.saved.push({
        img: this.element.toDataURL(),
        level: this.level,
      })
      this.renderSaved(saved)
    }
    levelActions.append(saveButton)

    const clear = document.createElement('button')
    clear.textContent = 'Clear'
    clear.onclick = () => {
      this.clear()
      this.level = [emptyMap(), emptyMap()]
      this.createTable('level_0')
      this.createTable('level_1', 1)
    }

    levelActions.append(clear)
    document.body.append(levelActions)

    this.element = document.createElement('canvas')
    this.element.className = 'field'
    this.element.width = config.screen.width
    this.element.height = config.screen.height
    this.ctx = this.element.getContext('2d')
    this.ctx.fillStyle = '#000'
    this.ctx.imageSmoothingEnabled = false

    const getEmptyMapLevel = () => ({
      img: '',
      level: [emptyMap(), emptyMap()],
    })

    const map = Array(8)
      .fill(0)
      .map(() => Array(8).fill(getEmptyMapLevel()))

    const mapEl = document.createElement('div')
    mapEl.id = 'map'

    function renderMap(mapEl: HTMLDivElement): HTMLElement {
      map.forEach((row) => {
        const rowEl = document.createElement('div')
        rowEl.className = 'row'
        row.forEach(({ img }) => {
          const cellEl = document.createElement('div')
          cellEl.className = 'preview'
          cellEl.onclick = () => toggleSelect(cellEl)
          let preview
          if (img) {
            preview = document.createElement('img')
            preview.src = img
          } else {
            preview = document.createElement('div')
          }
          preview.style.width = `${config.preview.width}px`
          preview.style.height = `${config.preview.height}px`

          cellEl.append(preview)
          rowEl.append(cellEl)
        })

        mapEl.append(rowEl)
      })
      return mapEl
    }

    function toggleSelect(prev: HTMLElement) {
      let wasSelected = false
      if (prev.classList.contains('selected')) wasSelected = true
      const last = document.querySelectorAll('.preview.selected')
      last.forEach((preview) => preview.classList.remove('selected'))
      if (wasSelected) prev.classList.remove('selected')
      else prev.classList.add('selected')
    }

    document.body.append(this.element)
    document.body.append(saved)

    document.body.append(renderMap(mapEl))
  }

  private renderSaved(saved: HTMLDivElement) {
    while (saved.hasChildNodes()) {
      saved.removeChild(saved.lastChild)
    }
    this.saved.forEach(({ img }, index) => {
      const lvl = document.createElement('div')
      const del = document.createElement('button')
      del.textContent = 'X'
      del.onclick = () => {
        this.saved.splice(index, 1)
        this.renderSaved(saved)
      }
      lvl.append(del)

      const load = document.createElement('button')
      load.textContent = 'load'
      load.onclick = () => {} // TODO Load level
      lvl.append(load)

      const preview = document.createElement('img')
      preview.src = img
      preview.style.width = '100px'
      lvl.append(preview)
      saved.append(lvl)
    })
  }

  clear(ctx = this.ctx): void {
    ctx.clearRect(0, 0, this.element.width, this.element.height)
    ctx.fillRect(0, 0, this.element.width, this.element.height)
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

  createTable(id: string, level = 0): HTMLElement {
    const tableLabel = document.createElement('h2')
    tableLabel.textContent = id

    let table = document.getElementById(id)
    if (!table) {
      table = document.createElement('div')
      table.id = id
      table.className = 'level'
    } else {
      while (table.hasChildNodes()) {
        table.removeChild(table.lastChild)
      }
    }

    table.append(tableLabel)
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