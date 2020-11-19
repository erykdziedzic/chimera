import LevelEditor from '../LevelEditor'
import createEmptyElement from '../utils/createEmptyElement'
import Table from './Table'

export default class LevelTables {
  editor: LevelEditor
  table1: Table
  table2: Table
  element: HTMLElement

  constructor(editor: LevelEditor) {
    this.editor = editor
    this.table1 = new Table(this.editor, 'level_0')
    this.table2 = new Table(this.editor, 'level_1', 1)
    this.element = createEmptyElement('div', 'levelEditors')
    this.element.append(this.table1.element)
    this.element.append(this.table2.element)
  }
}
