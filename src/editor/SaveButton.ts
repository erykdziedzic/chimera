import { MapTable } from './emptyMap'

export default class SaveButton {
  element: HTMLButtonElement
  map: MapTable

  constructor(map: MapTable) {
    this.map = map
    this.element = document.createElement('button')
    this.element.textContent = 'Save'
    this.element.onclick = () => {
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(this.map))

      const dlAnchorElem = document.getElementById('downloadAnchor')
      dlAnchorElem.setAttribute('href', dataStr)
      dlAnchorElem.setAttribute('download', 'map.json')
      dlAnchorElem.click()
    }
  }
}
