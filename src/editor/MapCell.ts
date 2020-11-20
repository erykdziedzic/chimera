import config from '../config'
import LevelEditor from '../LevelEditor'

export default class MapCell {
  element: HTMLElement
  editor: LevelEditor
  row: number
  col: number

  constructor(editor: LevelEditor, row: number, col: number, img: string) {
    this.editor = editor
    this.row = row
    this.col = col
    this.element = document.createElement('div')
    this.element.className = 'preview'

    this.element.onclick = () => {
      this.editor.selectedLevel = { row, col }
      this.toggleSelect()
      this.editor.canvas.clear()
      this.editor.editors.table1.render()
      this.editor.editors.table2.render()
      this.editor.canvas.draw()
    }

    let preview
    if (img) {
      preview = document.createElement('img')
      preview.src = img
    } else {
      preview = document.createElement('div')
    }
    preview.style.width = `${config.preview.width}px`
    preview.style.height = `${config.preview.height}px`

    this.element.append(preview)
    this.toggleSelect()
  }

  toggleSelect(): void {
    if (
      this.editor.selectedLevel.row === this.row &&
      this.editor.selectedLevel.col === this.col
    ) {
      const last = document.querySelector('.preview.selected')
      if (last) last.classList.remove('selected')
      this.element.classList.add('selected')
    }
  }
}
