import Canvas from './Canvas'

type position = {
  x: number
  y: number
  z: number
}
export default class Player {
  position: position
  direction: number
  canvas: Canvas
  image: HTMLImageElement

  constructor(canvas: Canvas) {
    this.position = {
      x: 0,
      y: 0,
      z: 0,
    }
    this.direction = 0
    this.canvas = canvas
    this.image = this.canvas.game.images.player.east
    document.body.onkeydown = this.handleKeys()
  }

  async draw(image = this.canvas.game.images.player.east ): Promise<void> {
    this.canvas.clear()
    this.canvas.drawField()
    this.canvas.drawSprite(
      image,
      this.position.x,
      this.position.y,
      1
    )
  }

  move(): void {
    switch (this.direction) {
      case 0:
        this.position.x += 1
        this.draw(this.canvas.game.images.player.east)
        break
      case 1:
        this.position.y += 1
        this.draw(this.canvas.game.images.player.south)
        break
      case 2:
        this.position.x -= 1
        this.draw(this.canvas.game.images.player.west)
        break
      case 3:
        this.position.y -= 1
        this.draw(this.canvas.game.images.player.north)
        break
      default:
    }
  }

  rotateRight(): void {
    if (this.direction === 3) this.direction = 0
    else this.direction += 1
  }

  rotateLeft(): void {
    if (this.direction === 0) this.direction = 3
    else this.direction -= 1
  }

  handleKeys() {
    return (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'ArrowRight':
          this.rotateRight()
          break
        case 'ArrowLeft':
          this.rotateLeft()
          break
        case 'ArrowUp':
          this.move()
          break
        default:
      }
    }
  }
}
