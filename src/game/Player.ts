import { Block } from '../utils/loadImages'
import Game from './Game'
import sounds from './sounds'

export enum Direction {
  east,
  south,
  west,
  north,
}

type Vector3 = {
  x: number
  y: number
  z: number
}

type Animation = {
  running: boolean
  image: number
  began: number
  start: Vector3
  end: Vector3
}

export default class Player {
  position: Vector3
  direction: Direction
  game: Game
  imageSet: HTMLImageElement[]
  speed: number
  animation: Animation

  constructor(game: Game) {
    this.game = game
    this.position = {
      x: this.game.level.player.row,
      y: this.game.level.player.col,
      z: 0,
    }
    this.direction = Direction.east
    this.speed = 10
    this.imageSet = this.game.images.player.east
    this.animate = this.animate.bind(this)
    this.animation = {
      running: false,
      began: 0,
      image: 0,
      start: {
        x: 0,
        y: 0,
        z: 0,
      },
      end: {
        x: 0,
        y: 0,
        z: 0,
      },
    }
    document.body.onkeydown = this.handleKeys()
  }

  async draw(): Promise<void> {
    this.game.canvas.clear()
    this.game.createField()
  }

  animate(timestamp: DOMHighResTimeStamp): void {
    if (this.animation.began === undefined) this.animation.began = timestamp
    const animationDuration = 1000 / this.speed
    let elapsed = timestamp - this.animation.began
    const repeat = 2
    const nextFrame = animationDuration / (this.imageSet.length * repeat)
    const index = Math.floor(elapsed / nextFrame) % this.imageSet.length
    this.animation.image = index

    if (elapsed >= animationDuration) elapsed = animationDuration

    Object.keys(this.position).forEach((axis: keyof Vector3) => {
      const distance = this.animation.end[axis] - this.animation.start[axis]

      this.position[axis] =
        this.animation.start[axis] + distance * (elapsed / animationDuration)
    })

    if (elapsed < animationDuration) window.requestAnimationFrame(this.animate)
    else {
      this.animation.running = false
      this.setDirectionImage()
    }

    this.draw()
  }

  move(): void {
    this.walkInDirection(...this.getAxisAndValue())
  }

  getAxisAndValue(): [keyof Vector3, number] {
    let axis: keyof Vector3
    let value
    
    switch (this.direction) {
      case Direction.east:
        axis = "x"
        value = 1
        break
      case Direction.south: 
        axis = 'y'
        value = 1
        break
      case Direction.west:
        axis = 'x'
        value = -1
        break
      case Direction.north: 
        axis = 'y'
        value = -1
        break
      default:
    }
    return [axis, value]
  }

  getNextCellPosition(): { x: number, y: number } {
    const [axis,value] = this.getAxisAndValue()
    const { x, y } = this.position
    return { x: x + (axis === 'x' ? value : 0), y:y + (axis === 'y' ? value : 0)}
  }

  private getNextCell() {
    const { x, y } = this.getNextCellPosition()
    const level = this.game.level.level[0]
    const cell = level[y] && level[y][x]
    return cell
  }

  private walkInDirection(axis: keyof Vector3, value = 1) {
    const { x, y } = this.position
    const isWalkable = (block: number) => block < 0 || block === 10
    const leadsToNextLevel = (block: number) => typeof block === 'undefined'
    if (Number.isInteger(x) === false || Number.isInteger(y) === false) return

    const level = this.game.level.level[0]
    const row = level[y + (axis === 'y' ? value : 0)]
    const cell = row && row[x + (axis === 'x' ? value : 0)]
    if (leadsToNextLevel(cell)) {
      this.game.loadNextLevel(this.direction)
      this.moveOnAxis(axis, value)
    } else if (isWalkable(cell)) {
      return this.moveOnAxis(axis, value)
    } else {
      sounds.blocked.play()
    }
  }

  private moveOnAxis(axis: keyof Vector3, value = 1): void {
    sounds.walk.play()
    if (this.animation.running) return // TODO if moving
    this.prepareAnimation()
    this.animation.end[axis] += value
    window.requestAnimationFrame(this.animate)
  }

  private prepareAnimation(): void {
    this.animation.running = true
    this.animation.start = { ...this.position }
    this.animation.end = { ...this.position }
    this.animation.began = undefined
  }

  rotateRight(): void {
    if (this.direction === Direction.north) this.direction = Direction.east
    else this.direction = this.direction + 1
    if (this.animation.running) return // TODO if moving
    this.setDirectionImage()
    sounds.turn.play()
  }

  rotateLeft(): void {
    if (this.direction === Direction.east) this.direction = Direction.north
    else this.direction = this.direction - 1
    if (this.animation.running) return // TODO if moving
    this.setDirectionImage()
    sounds.turn.play()
  }

  handleKeys() {
    return (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'ArrowRight':
          return this.rotateRight()
        case 'ArrowLeft':
          return this.rotateLeft()
        case 'ArrowUp':
          return this.move()
        case ' ':
          return this.useBlock()
        case 'Enter':
          return this.useBlock()
        default:
      }
    }
  }

  private setDirectionImage(): void {
    switch (this.direction) {
      case Direction.east:
        this.imageSet = this.game.images.player.east
        break
      case Direction.south:
        this.imageSet = this.game.images.player.south
        break
      case Direction.west:
        this.imageSet = this.game.images.player.west
        break
      case Direction.north:
        this.imageSet = this.game.images.player.north
        break
      default:
    }
    this.draw()
  }

  private destroyNextCell(): void {
    const { x, y } = this.getNextCellPosition()
    this.game.level.level[0][y][x] = -1
  }

  private useBlock() {
    const cell = this.getNextCell()

    switch(cell) {
      case Block.computer:
        this.destroyNextCell()
        break
      case Block.electric:
        this.destroyNextCell()
        break
      case Block.bread:
        this.destroyNextCell()
        break
      default:
    }
    this.draw()
  }
}
