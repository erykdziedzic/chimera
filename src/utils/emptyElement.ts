export default function emptyElement(el: HTMLElement): void {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild)
  }
}
