import { SCALE } from '../config'

export default async function loadImage(
  src: string,
  w: number,
  h: number
): Promise<HTMLImageElement> {
  return await new Promise((resolve) => {
    const img = new Image(w, h)
    img.onload = () => resolve(img)
    img.src = src
    img.draggable = false
  })
}

export async function loadScaled(src: string): Promise<HTMLImageElement> {
  return await new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      img.width = img.width * SCALE
      img.height = img.height * SCALE
      resolve(img)
    }
    img.src = src
    img.draggable = false
  })
}
