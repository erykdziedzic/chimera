const SCALE = 3
const block = {
  width: 32 * SCALE,
  height: 32 * SCALE,
}
const player = {
  width: 32 * SCALE,
  height: 48 * SCALE,
}

const screen = {
  width: 8 * block.width,
  height: (8 * block.height) / 2,
}

const config = {
  screen,
  block,
  player,
}

export default config
