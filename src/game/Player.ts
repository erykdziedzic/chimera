import config from '../config'
import { Block } from '../utils/loadImages'
import Game from './Game'
import sounds, { AudioPlayer } from './sounds'

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

export enum Item {
  empty,
  bread,
  drink,
  spanner,
  warhead,
  pyramid,
  key,
  torch,
}

export default class Player {
  position: Vector3
  direction: Direction
  game: Game
  imageSet: HTMLImageElement[]
  speed: number
  animation: Animation
  inventory: Item
  scheduled: {
    axis: keyof Vector3
    value: number
  }

  keyIsDown: boolean

  stats: {
    water: number
    food: number
    score: number
    waterInterval: ReturnType<typeof setInterval>
    foodInterval: ReturnType<typeof setInterval>
    lifeInterval: ReturnType<typeof setInterval>
  }

  constructor(game: Game) {
    this.inventory = Item.warhead // TODO: remove
    const { water, food, score } = config.gameplay
    this.stats = {
      water,
      food,
      score,
      waterInterval: undefined,
      foodInterval: undefined,
      lifeInterval: undefined,
    }
    this.game = game
    this.position = {
      x: this.game.level.player.row,
      y: this.game.level.player.col,
      z: 0,
    }
    this.keyIsDown = false
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
    this.scheduled = { axis: undefined, value: undefined }
    document.body.onkeydown = this.handleKeys()
    document.body.onkeyup = this.handleOnKeyUp()
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
    else if (this.keyIsDown) {
      this.animation.running = false
      this.setDirectionImage()
      this.move()
    } else {
      this.animation.running = false
      this.setDirectionImage()
    }
  }

  move(): void {
    this.walkInDirection(...this.getAxisAndValue())
  }

  getAxisAndValue(): [keyof Vector3, number] {
    let axis: keyof Vector3
    let value

    switch (this.direction) {
      case Direction.east:
        axis = 'x'
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

  getNextCellPosition(): { x: number; y: number } {
    const [axis, value] = this.getAxisAndValue()
    const { x, y } = this.position
    return {
      x: x + (axis === 'x' ? value : 0),
      y: y + (axis === 'y' ? value : 0),
    }
  }

  private getNextCell() {
    const { x, y } = this.getNextCellPosition()
    const level = this.game.level.level[0]
    const cell = level[y] && level[y][x]
    return cell
  }

  private walkInDirection(axis: keyof Vector3, value = 1) {
    const { x, y } = this.position
    const isWalkable = (block: number) =>
      block < 0 || block === Block.player || block === Block.end
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
    const animationDuration = 1 / this.speed
    const audioDuration = sounds.walk.audio.duration
    sounds.walk.audio.playbackRate = audioDuration / animationDuration
    sounds.walk.play()
    if (this.animation.running) {
      this.scheduled = { axis, value }
    } // TODO if moving
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

  handleOnKeyUp() {
    return (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'ArrowUp':
          this.keyIsDown = false
      }
    }
  }

  handleKeys() {
    return (e: KeyboardEvent): void => {
      switch (e.key) {
        case 'ArrowRight':
          return this.rotateRight()
        case 'ArrowLeft':
          return this.rotateLeft()
        case 'ArrowUp':
          this.keyIsDown = true
          return this.move()
        case ' ':
          return this.use()
        case 'Enter':
          return this.use()
        case 'f':
          if (config.debug) return this.nextItem()
          break
        case 'Escape':
          if (this.game.paused) this.game.resume()
          else this.game.pause()
          break
        default:
      }
    }
  }

  private nextItem(): void {
    if (this.inventory === 7) this.inventory = Item.empty
    else this.inventory = this.inventory + 1
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
  }

  private removeNextCell(sound: AudioPlayer): void {
    const { x, y } = this.getNextCellPosition()
    this.game.level.level[0][y][x] = -1
    sound.play()
  }

  private use(): void {
    if (this.inventory !== Item.empty) this.useInventory()
    else this.useBlock()
  }

  private useInventory(): void {
    switch (this.inventory) {
      case Item.bread:
        if (this.getNextCell() === Block.toaster) this.useBlock()
        return this.useBread()
      case Item.drink:
        return this.useWater()
      case Item.spanner:
        return this.useBlock()
      case Item.warhead:
        return this.useWarhead()
      case Item.key:
        return this.useBlock()
      case Item.pyramid:
        return this.useBlock()
      case Item.torch:
        return this.useTorch()
      default:
        sounds.collect.play()
    }
  }

  private useTorch() {
    if (this.game.levelIsDark()) {
      this.game.darkRoomDone = true
      this.inventory = Item.empty
    }
    this.useBlock()
  }

  private useBlock() {
    const cell = this.getNextCell()
    const { destroy, collect, collectWarhead } = sounds

    switch (cell) {
      case Block.computer:
        this.removeNextCell(collect)
        this.stats.score += config.gameplay.value.computerDestroy
        break
      case Block.electric:
        if (this.inventory === Item.spanner) this.removeNextCell(collect)
        else this.die()
        this.stats.score += config.gameplay.value.electricDestroy
        break
      case Block.drink:
        this.removeNextCell(collect)
        if (this.inventory !== Item.empty) this.useWater()
        else this.inventory = Item.drink
        this.stats.score += config.gameplay.value.drinkPickup
        break
      case Block.bread:
        this.removeNextCell(collect)
        if (this.inventory !== Item.empty) this.useBread()
        else this.inventory = Item.bread

        this.stats.score += config.gameplay.value.breadPickup
        break
      case Block.toaster:
        if (this.inventory === Item.bread) {
          this.removeNextCell(destroy)
          this.setNextCell(Block.drink)
        } else this.die()

        this.stats.score += config.gameplay.value.toasterDestroy
        break
      case Block.radiator:
        this.die()
        break
      case Block.hourglass:
        if (this.inventory === Item.pyramid) this.removeNextCell(destroy)
        else this.die()
        console.log(config.gameplay.value.hourglassDestroy)

        this.stats.score += config.gameplay.value.hourglassDestroy
        break
      case Block.doorWest:
        console.log(this.inventory)
        if (this.inventory === Item.key) this.removeNextCell(destroy)
        else collect.play()

        this.stats.score += config.gameplay.value.doorOpen
        break
      case Block.door:
        if (this.inventory === Item.key) this.removeNextCell(destroy)
        else collect.play()

        this.stats.score += config.gameplay.value.doorOpen
        break
      case Block.key:
        this.removeNextCell(collect)
        this.inventory = Item.key
        this.stats.score += config.gameplay.value.keyPickup
        break
      case Block.warhead:
        if (this.game.levelIsBlue()) this.die()
        this.removeNextCell(collectWarhead)
        this.inventory = Item.warhead

        this.stats.score += config.gameplay.value.hourglassDestroy
        break
      case Block.spanner:
        this.removeNextCell(collect)
        this.inventory = Item.spanner
        this.stats.score += config.gameplay.value.spannerPickup
        break
      case Block.pyramid:
        this.removeNextCell(collect)
        this.inventory = Item.pyramid
        this.stats.score += config.gameplay.value.pyramidPickup
        break
      case Block.pandora:
        if (this.inventory === Item.key) this.removeNextCell(destroy)
        else this.die()
        this.stats.score += config.gameplay.value.pandoraDestroy
        break
      default:
        sounds.collect.play()
    }
    this.resetIntervals()
  }

  private useWater(): void {
    this.stats.water += config.gameplay.drinkBonus
    if (this.inventory === Item.drink) {
      this.inventory = Item.empty
      this.stats.score += config.gameplay.value.drinkUse
    }
    sounds.collect.play()
    this.game.canvas.draw()
    this.resetIntervals()
  }

  private useBread(): void {
    this.stats.food += config.gameplay.breadBonus
    if (this.inventory === Item.bread) {
      this.inventory = Item.empty
      this.stats.score += config.gameplay.value.breadUse
    }
    sounds.collect.play()
    this.game.canvas.draw()
    this.resetIntervals()
  }

  starve(): void {
    this.stats.food -= 1
    if (this.stats.food === 0) this.die()
  }

  water(): void {
    this.stats.water -= 1
    if (this.stats.water === 0) this.die()
  }

  resetIntervals(): void {
    this.resetWaterInterval()
    this.resetFoodInterval()
    this.resetLifeInterval()
  }

  private resetFoodInterval(): void {
    clearInterval(this.stats.foodInterval)
    let speed: number
    if (this.inventory !== Item.empty) speed = config.gameplay.foodSpeedCarrying
    else speed = config.gameplay.foodSpeed
    const interval = 1000 / speed
    this.stats.foodInterval = setInterval(() => this.starve(), interval)
  }

  private resetWaterInterval(): void {
    clearInterval(this.stats.waterInterval)
    let speed: number
    if (this.game.levelHasRadiator()) speed = config.gameplay.waterSpeedRadiator
    else speed = config.gameplay.waterSpeed
    const interval = 1000 / speed
    this.stats.waterInterval = setInterval(() => this.water(), interval)
  }

  private resetLifeInterval(): void {
    clearInterval(this.stats.lifeInterval)
    let speed: number
    if (this.inventory !== Item.empty) speed = 2
    else speed = 1
    const interval = 1000 / speed
    this.stats.lifeInterval = setInterval(() => sounds.ping.play(), interval)
  }

  die(): void {
    clearInterval(this.stats.lifeInterval)
    clearInterval(this.stats.foodInterval)
    clearInterval(this.stats.waterInterval)
    sounds.death.play()
    this.game.reload()
  }

  private useWarhead(): void {
    const { y: row, x: col } = this.getNextCellPosition()
    const nextCell = this.getNextCell()
    const nextCellNotEmpty = nextCell >= 0
    if (row === 3 && col === 2 && this.game.levelIsBlue()) this.die()
    if (this.game.levelIsBlue()) return this.placeWarhead()
    else if (nextCellNotEmpty) return this.useBlock()
    else sounds.collect.play()
  }

  private setNextCell(block: Block) {
    const { y, x } = this.getNextCellPosition()
    this.game.level.level[0][y][x] = block
  }

  private placeWarhead(): void {
    const target = this.game.level.level[0][3][2]
    if (target === Block.bread) this.useBread()
    this.game.level.level[0][3][2] = Block.warhead
    sounds.placeWarhead.play()
    if (this.inventory === Item.warhead) {
      this.inventory = Item.empty
    }
    this.stats.score += config.gameplay.value.placeWarhead
    this.game.warheadsPlaced += 1
  }
}
