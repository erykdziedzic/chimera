const SCALE = 3
const block = {
  width: 32 * SCALE,
  height: 32 * SCALE,
}
const player = {
  width: 32 * SCALE,
  height: 32 * SCALE,
}

const level = {
  size: 7,
  width: 10.5 * block.width,
  height: (6.5 * block.height) / 2,
}

const createLevel = (row: number, col: number) => ({ row, col })
const blueRooms = [
  createLevel(3, 5),
  createLevel(2, 6),
  createLevel(0, 1),
  createLevel(2, 1),
]
const darkRoom = createLevel(5, 6)
const endRoom = createLevel(4, 0)

const hud = {
  width: level.width,
  height: level.height,
  stats: {
    width: level.width,
    height: 7 * SCALE,
  },
  digit: {
    width: 7 * SCALE,
    height: 7 * SCALE,
  },
  digits: {
    left: {
      water: 64 * SCALE,
      food: 152 * SCALE,
      score: 240 * SCALE,
    },
    height: 7 * SCALE,
  },
  inventory: {
    width: 32 * SCALE,
    height: 32 * SCALE,
    top: 153 * SCALE,
    left: 64 * SCALE,
    color: '#431300',
  },
  symbol: {
    left: 136 * SCALE,
    width: 62 * SCALE,
    height: 32 * SCALE,
  },
  life: {
    left: 240 * SCALE,
    width: 32 * SCALE,
    height: 32 * SCALE,
  },
}

const screen = {
  width: level.width,
  height: level.height + hud.height,
}

const map = {
  size: 8,
}

const PREVIEW_SCALE = 7
const preview = {
  width: screen.width / PREVIEW_SCALE,
  height: screen.height / PREVIEW_SCALE,
}

const gameplay = {
  water: 9000,
  food: 5000,
  score: 0,
  breadBonus: 1500,
  drinkBonus: 1500,
  foodSpeed: 2,
  foodSpeedCarrying: 5,
  waterSpeed: 2,
  waterSpeedRadiator: 50,
  audioVolume: 0.5,
  value: {
    drinkPickup: 15,
    drinkUse: 5,
    breadPickup: 10,
    breadUse: 5,
    spannerPickup: 75,
    pyramidPickup: 75,
    keyPickup: 75,
    computerDestroy: 5,
    toasterDestroy: 25,
    hourglassDestroy: 25,
    electricDestroy: 25,
    pandoraDestroy: 25,
    placeWarhead: 175,
    doorOpen: 30,
    torchPickup: 75,
    end: 5048,
  },
}

const config = {
  gameplay,
  level,
  map,
  preview,
  screen,
  block,
  player,
  levelEditor: false,
  hud,
  blueRooms,
  darkRoom,
  endRoom,
  debug: true,
}

export default config
