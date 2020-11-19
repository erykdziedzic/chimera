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
  width: 7 * block.width,
  height: (7 * block.height) / 2,
}

const level = {
  size: 7,
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
  levelEditor: true,
}

export default config
