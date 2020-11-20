import LevelEditor from '../LevelEditor'
import createEmptyElement from '../utils/createEmptyElement'
import emptyElement from '../utils/emptyElement'
import emptyMap, { MapTable } from './emptyMap'
import LoadButton from './LoadButton'
import MapRow from './MapRow'
import SaveButton from './SaveButton'

export default class GameMap {
  editor: LevelEditor
  element: HTMLElement
  map: MapTable

  constructor(editor: LevelEditor) {
    this.editor = editor
    this.element = createEmptyElement('div', 'map')
    this.map = emptyMap()
    this.render()
  }

  render(): void {
    emptyElement(this.element)
    const save = new SaveButton(this.map)
    this.element.append(save.element)
    const load = new LoadButton(this)
    this.element.append(load.element)
    this.map.forEach((row, rowIndex) => {
      const mapRow = new MapRow(this.editor, row, rowIndex)
      this.element.append(mapRow.element)
    })
  }
}
