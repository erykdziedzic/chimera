import config from '../config'
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
import loadImage from './loadImage'

async function loadPlayerImage(src: string) {
  return await loadImage(src, config.player.width, config.player.height)
}

async function loadBlockImage(src: string) {
  return await loadImage(src, config.block.width, config.block.height)
}

export type BlockImages = {
  barrel: HTMLImageElement
  corner: HTMLImageElement
  crate: HTMLImageElement
  cube: HTMLImageElement
  electric: HTMLImageElement
  fence: HTMLImageElement
  pandora: HTMLImageElement
  pillar: HTMLImageElement
  shelf: HTMLImageElement
  table: HTMLImageElement
  playerBlock: HTMLImageElement
  radiator: HTMLImageElement
  bread: HTMLImageElement
  door: HTMLImageElement
  drink: HTMLImageElement
  end: HTMLImageElement
  hourglass: HTMLImageElement
  key: HTMLImageElement
  pyramid: HTMLImageElement
  spanner: HTMLImageElement
  toaster: HTMLImageElement
  torch: HTMLImageElement
  warhead: HTMLImageElement
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
]

export type GameImages = {
  block: BlockImages
  player: {
    north: HTMLImageElement[]
    east: HTMLImageElement[]
    south: HTMLImageElement[]
    west: HTMLImageElement[]
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
  const playerBlock = await loadPlayerImage(playerNorth2)
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

  const block = {
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
  }

  const player = {
    north: [
      await loadPlayerImage(playerNorth1),
      await loadPlayerImage(playerNorth2),
      await loadPlayerImage(playerNorth3),
    ],
    east: [
      await loadPlayerImage(playerEast1),
      await loadPlayerImage(playerEast2),
      await loadPlayerImage(playerEast3),
    ],
    south: [
      await loadPlayerImage(playerSouth1),
      await loadPlayerImage(playerSouth2),
      await loadPlayerImage(playerSouth3),
    ],
    west: [
      await loadPlayerImage(playerWest1),
      await loadPlayerImage(playerWest2),
      await loadPlayerImage(playerWest3),
    ],
  }
  return { block, player }
}
