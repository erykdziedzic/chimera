import LevelEditor from '../LevelEditor'
import emptyElement from '../utils/emptyElement'
import BlockPreview from './BlockPreview'

export default class BlockSelector {
  editor: LevelEditor
  element: HTMLElement

  constructor(editor: LevelEditor) {
    this.editor = editor
    this.element = document.createElement('div')
    this.element.id = 'blocks'
    this.render()
  }

  render(): void {
    emptyElement(this.element)
    const previews = this.editor.blocks.map(
      (img, index) => new BlockPreview(this.editor, this, img, index)
    )
    previews.forEach((preview) => this.element.append(preview.element))
  }
}
