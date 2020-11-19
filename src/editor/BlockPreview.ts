import config from '../config'
import LevelEditor from '../LevelEditor'
import BlockSelector from './BlockSelector'

export default class BlockPreview {
  editor: LevelEditor
  blockSelector: BlockSelector
  element: HTMLImageElement

  constructor(
    editor: LevelEditor,
    blockSelector: BlockSelector,
    img: HTMLImageElement,
    index: number
  ) {
    this.editor = editor
    this.blockSelector = blockSelector
    this.element = document.createElement('img')
    this.element.src = img.src
    this.element.style.width = `${config.block.width}px`
    this.element.style.height = `${config.block.height}px`
    this.element.style.margin = '8px'
    this.element.className = 'block-preview'

    if (this.editor.selectedBlock === index)
      this.element.classList.add('selected')
    else this.element.classList.remove('selected')

    this.element.onclick = () => {
      this.editor.selectedBlock = index
      this.blockSelector.render()
    }
  }
}
