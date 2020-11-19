export default class DownloadAnchor {
  element: HTMLElement

  constructor() {
    this.element = document.createElement('a')
    this.element.id = 'downloadAnchor'
    this.element.style.display = 'none'
  }
}
