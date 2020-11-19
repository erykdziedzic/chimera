import config from '../config'
import LevelEditor from '../LevelEditor'
import emptyElement from '../utils/emptyElement'
import Row from './Row'

export default class Table {
  level: number
  row: number
  col: number
  editor: LevelEditor
  element: HTMLElement

  constructor(editor: LevelEditor, id: string, level = 0) {
    this.element = document.createElement('div')
    this.element.id = id
    this.element.className = 'level'
    this.editor = editor
    this.level = level
    this.element.onmouseleave = () => {
      this.editor.filling = false
    }

    this.render()
  }

  render(): void {
    emptyElement(this.element)
    const label = document.createElement('h2')
    label.textContent = this.element.id
    this.element.append(label)

    for (let i = 0; i < config.level.size; i += 1) {
      const row = new Row(this.editor, this.level, i)
      this.element.append(row.element)
    }
  }
}
