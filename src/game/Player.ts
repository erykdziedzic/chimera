import Game from './Game'

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
    this.speed = 2
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
    const { x, y } = this.position
    const level = this.game.level.level[0]
    const isWalkable = (block: number) => block < 0 || block === 10
    const leadsToNextLevel = (block: number) => typeof block === 'undefined'
    if (Number.isInteger(x) === false || Number.isInteger(y) === false) return

    switch (this.direction) {
      case Direction.east:
        if (isWalkable(level[y][x + 1])) return this.moveOnAxis('x')
        if (leadsToNextLevel(level[y][x + 1])) {
          this.game.loadNextLevel(Direction.east)
          this.moveOnAxis('x')
        }
        break
      case Direction.south:
        if (isWalkable(level[y + 1][x])) return this.moveOnAxis('y')
        if (leadsToNextLevel(level[y + 1][x])) {
          this.game.loadNextLevel(Direction.south)
          this.moveOnAxis('y')
        }
        break
      case Direction.west:
        if (isWalkable(level[y][x - 1])) return this.moveOnAxis('x', -1)
        if (leadsToNextLevel(level[y][x - 1])) {
          this.game.loadNextLevel(Direction.west)
          this.moveOnAxis('x', -1)
        }
        break
      case Direction.north:
        if (isWalkable(level[y - 1][x])) return this.moveOnAxis('y', -1)
        if (leadsToNextLevel(level[y - 1][x])) {
          this.game.loadNextLevel(Direction.north)
          this.moveOnAxis('y', -1)
        }
        break
      default:
    }
  }

  private moveOnAxis(axis: keyof Vector3, value = 1): void {
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
  }

  rotateLeft(): void {
    if (this.direction === Direction.east) this.direction = Direction.north
    else this.direction = this.direction - 1
    if (this.animation.running) return // TODO if moving
    this.setDirectionImage()
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
        default:
      }
    }
  }

  private setDirectionImage(): void {
    switch (this.direction) {
      case 0: // TODO use enum
        this.imageSet = this.game.images.player.east
        break
      case 1:
        this.imageSet = this.game.images.player.south
        break
      case 2:
        this.imageSet = this.game.images.player.west
        break
      case 3:
        this.imageSet = this.game.images.player.north
        break
      default:
    }
    this.draw()
  }
}
