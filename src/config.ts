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

const config = {
  level,
  map,
  preview,
  screen,
  block,
  player,
  levelEditor: false,
  hud,
}

export default config
