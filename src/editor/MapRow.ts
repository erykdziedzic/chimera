import LevelEditor from '../LevelEditor'
import MapCell from './MapCell'

export default class MapRow {
  element: HTMLElement
  editor: LevelEditor
  row: number
  constructor(
    editor: LevelEditor,
    row: {
      img: string
      level: number[][][]
    }[],
    index: number
  ) {
    this.editor = editor
    this.element = document.createElement('div')
    this.element.className = 'row'
    row.forEach(({ img }, colIndex) => {
      const cell = new MapCell(this.editor, index, colIndex, img)
      this.element.append(cell.element)
    })
  }
}
