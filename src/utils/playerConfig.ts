/* eslint-disable @typescript-eslint/ban-types */
import config from '../config'
import { Item, Direction } from '../game/Player'

export default function playerConfig(constructor: Function): void {
  constructor.prototype.inventory = Item.empty
  constructor.prototype.stats = {
    water: config.gameplay.water,
    food: config.gameplay.food,
    score: config.gameplay.score,
    waterInterval: undefined,
    foodInterval: undefined,
    lifeInterval: undefined,
  }
  constructor.prototype.speed = 2
  constructor.prototype.direction = Direction.east
  constructor.prototype.animation = {
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
  constructor.prototype.scheduled = { axis: undefined, value: undefined }
  constructor.prototype.keyIsDown = false
}
