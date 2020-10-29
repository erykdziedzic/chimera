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
