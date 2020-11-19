import emptyElement from './emptyElement'

export default function createEmptyElement(
  type: string,
  id: string
): HTMLElement {
  let el = document.getElementById(id)
  if (el) {
    emptyElement(el)
  } else {
    el = document.createElement(type)
    el.id = id
  }
  return el
}
