import LevelEditor from '../LevelEditor'

export default class Cell {
  level: number
  row: number
  col: number
  editor: LevelEditor
  element: HTMLDivElement
  currentValue: number

  constructor(editor: LevelEditor, level: number, row: number, col: number) {
    this.level = level
    this.row = row
    this.col = col
    this.editor = editor
    this.element = document.createElement('div')
    this.element.className = 'cell'
    this.currentValue = this.editor.getLevel().level[this.level][this.row][
      this.col
    ]

    this.element.onmouseover = () => {
      if (this.editor.filling) this.toggleFill()
    }

    this.element.onmousedown = () => {
      this.toggleFill()
      this.editor.filling = true
    }

    this.element.onmouseup = () => {
      this.editor.filling = false
    }

    document.body.onmouseleave = () => {
      this.editor.filling = false
    }
  }

  handleFilled(): void {
    if (this.currentValue >= 0) {
      this.element.classList.add('filled')
    } else {
      this.element.classList.remove('filled')
    }
  }

  toggleFill(): void {
    if (this.currentValue !== this.editor.selectedBlock) {
      this.setValue(this.editor.selectedBlock)
      this.element.classList.add('filled')
    } else {
      this.setValue(-1)
      this.element.classList.remove('filled')
    }
    this.editor.map.render()
  }

  setValue(value: number): void {
    this.editor.setLevel(this.level, this.row, this.col, value)
    this.currentValue = this.editor.getLevel().level[this.level][this.row][
      this.col
    ]
  }
}
