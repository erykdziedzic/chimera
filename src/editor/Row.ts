import config from '../config'
import LevelEditor from '../LevelEditor'
import Cell from './Cell'

export default class Row {
  level: number
  row: number
  col: number
  editor: LevelEditor
  element: HTMLDivElement

  constructor(editor: LevelEditor, level: number, row: number) {
    this.element = document.createElement('div')
    this.editor = editor
    this.element.className = 'row'
    for (let j = 0; j < config.level.size; j += 1) {
      const cell = new Cell(this.editor, level, row, j)
      this.element.append(cell.element)
    }
  }
}
