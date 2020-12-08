import config, { SCALE } from '../config'
import barrelSrc from '../img/blocks/barrel.png'
import breadSrc from '../img/blocks/bread.png'
import cornerSrc from '../img/blocks/corner.png'
import crateSrc from '../img/blocks/crate.png'
import cubeSrc from '../img/blocks/cube.png'
import doorSrc from '../img/blocks/door.png'
import drinkSrc from '../img/blocks/drink.png'
import electricSrc from '../img/blocks/electric.png'
import endSrc from '../img/blocks/END.png'
import fenceSrc from '../img/blocks/fence.png'
import hourglassSrc from '../img/blocks/hourglass.png'
import keySrc from '../img/blocks/key.png'
import pandoraSrc from '../img/blocks/pandora.png'
import pillarSrc from '../img/blocks/pillar.png'
import pyramidSrc from '../img/blocks/pyramid.png'
import radiatorSrc from '../img/blocks/radiator.png'
import shelfSrc from '../img/blocks/shelf.png'
import spannerSrc from '../img/blocks/spanner.png'
import tableSrc from '../img/blocks/table.png'
import toasterSrc from '../img/blocks/toaster.png'
import torchSrc from '../img/blocks/torch.png'
import warheadSrc from '../img/blocks/warhead.png'
import computerSrc from '../img/blocks/computer.png'
import doorWestSrc from '../img/blocks/door_west.png'
import playerNorth1 from '../img/player/north_1.png'
import playerNorth2 from '../img/player/north_2.png'
import playerNorth3 from '../img/player/north_3.png'
import playerEast1 from '../img/player/east_1.png'
import playerEast2 from '../img/player/east_2.png'
import playerEast3 from '../img/player/east_3.png'
import playerSouth1 from '../img/player/south_1.png'
import playerSouth2 from '../img/player/south_2.png'
import playerSouth3 from '../img/player/south_3.png'
import playerWest1 from '../img/player/west_1.png'
import playerWest2 from '../img/player/west_2.png'
import playerWest3 from '../img/player/west_3.png'
import statsSrc from '../img/stats.png'
import symbolSrc from '../img/symbol.png'
import lifeSrc from '../img/life.png'
import pauseBGSrc from '../img/pause_bg.png'
import pauseTextSrc from '../img/pause_text.png'

import loadImage, { loadScaled } from './loadImage'
import loadDigits from './loadDigits'

async function loadBlockImage(src: string) {
  return await loadImage(src, config.block.width, config.block.height)
}

export type BlockImages = {
  readonly barrel: HTMLImageElement
  readonly corner: HTMLImageElement
  readonly crate: HTMLImageElement
  readonly cube: HTMLImageElement
  readonly electric: HTMLImageElement
  readonly fence: HTMLImageElement
  readonly pandora: HTMLImageElement
  readonly pillar: HTMLImageElement
  readonly shelf: HTMLImageElement
  readonly table: HTMLImageElement
  readonly playerBlock: HTMLImageElement
  readonly radiator: HTMLImageElement
  readonly bread: HTMLImageElement
  readonly door: HTMLImageElement
  readonly drink: HTMLImageElement
  readonly end: HTMLImageElement
  readonly hourglass: HTMLImageElement
  readonly key: HTMLImageElement
  readonly pyramid: HTMLImageElement
  readonly spanner: HTMLImageElement
  readonly toaster: HTMLImageElement
  readonly torch: HTMLImageElement
  readonly warhead: HTMLImageElement
  readonly computer: HTMLImageElement
  readonly doorWest: HTMLImageElement
}

export const BlockColors = [
  'yellow',
  'orange',
  'violet',
  'grey',
  'blue',
  'green',
  'brown',
  'lightgray',
  'darkgray',
  'pink',
  'red',
  'purple',
  'bisque',
  'chocolate',
  'crimson',
  'darkorange',
  'goldenrod',
  'gold',
  'lightyellow',
  'silver',
  'salmon',
  'sandybrown',
  'teal',
  'cyan',
  'khaki',
]

export type GameImages = {
  block: BlockImages
  player: {
    north: HTMLImageElement[]
    east: HTMLImageElement[]
    south: HTMLImageElement[]
    west: HTMLImageElement[]
  }
  hud: {
    stats: HTMLImageElement
    symbol: HTMLImageElement
    life: HTMLImageElement
  }
  digits: HTMLImageElement[]
  pause: {
    background: HTMLImageElement
    text: HTMLImageElement
  }
}

export enum Block {
  barrel,
  corner,
  crate,
  cube,
  electric,
  fence,
  pandora,
  pillar,
  shelf,
  table,
  player,
  radiator,
  bread,
  door,
  drink,
  end,
  hourglass,
  key,
  pyramid,
  spanner,
  toaster,
  torch,
  warhead,
  computer,
  doorWest,
}

export default async function loadImages(): Promise<GameImages> {
  const barrel = await loadBlockImage(barrelSrc)
  const corner = await loadBlockImage(cornerSrc)
  const crate = await loadBlockImage(crateSrc)
  const cube = await loadBlockImage(cubeSrc)
  const electric = await loadBlockImage(electricSrc)
  const fence = await loadBlockImage(fenceSrc)
  const pandora = await loadBlockImage(pandoraSrc)
  const pillar = await loadBlockImage(pillarSrc)
  const shelf = await loadBlockImage(shelfSrc)
  const table = await loadBlockImage(tableSrc)
  const playerBlock = await loadBlockImage(playerNorth2)
  const radiator = await loadBlockImage(radiatorSrc)
  const bread = await loadBlockImage(breadSrc)
  const door = await loadBlockImage(doorSrc)
  const drink = await loadBlockImage(drinkSrc)
  const end = await loadBlockImage(endSrc)
  const hourglass = await loadBlockImage(hourglassSrc)
  const key = await loadBlockImage(keySrc)
  const pyramid = await loadBlockImage(pyramidSrc)
  const spanner = await loadBlockImage(spannerSrc)
  const toaster = await loadBlockImage(toasterSrc)
  const torch = await loadBlockImage(torchSrc)
  const warhead = await loadBlockImage(warheadSrc)
  const computer = await loadBlockImage(computerSrc)
  const doorWest = await loadBlockImage(doorWestSrc)

  const block: BlockImages = {
    barrel,
    corner,
    crate,
    cube,
    electric,
    fence,
    pandora,
    pillar,
    shelf,
    table,
    playerBlock,
    radiator,
    bread,
    door,
    drink,
    end,
    hourglass,
    key,
    pyramid,
    spanner,
    toaster,
    torch,
    warhead,
    computer,
    doorWest,
  }

  const player = {
    north: [
      await loadBlockImage(playerNorth1),
      await loadBlockImage(playerNorth2),
      await loadBlockImage(playerNorth3),
    ],
    east: [
      await loadBlockImage(playerEast1),
      await loadBlockImage(playerEast2),
      await loadBlockImage(playerEast3),
    ],
    south: [
      await loadBlockImage(playerSouth1),
      await loadBlockImage(playerSouth2),
      await loadBlockImage(playerSouth3),
    ],
    west: [
      await loadBlockImage(playerWest1),
      await loadBlockImage(playerWest2),
      await loadBlockImage(playerWest3),
    ],
  }
  const hud = {
    stats: await loadScaled(statsSrc),
    symbol: await loadScaled(symbolSrc),
    life: await loadScaled(lifeSrc),
  }

  const gameImages: GameImages = {
    block,
    player,
    hud,
    digits: await loadDigits(),
    pause: {
      background: await loadScaled(pauseBGSrc),
      text: await loadScaled(pauseTextSrc),
    },
  }

  return gameImages
}
