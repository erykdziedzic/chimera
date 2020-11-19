import config from '../config'
import barrelSrc from '../img/blocks/barrel.png'
import cornerSrc from '../img/blocks/corner.png'
import crateSrc from '../img/blocks/crate.png'
import cubeSrc from '../img/blocks/cube.png'
import electricSrc from '../img/blocks/electric.png'
import fenceSrc from '../img/blocks/fence.png'
import pandoraSrc from '../img/blocks/pandora.png'
import pillarSrc from '../img/blocks/pillar.png'
import shelfSrc from '../img/blocks/shelf.png'
import tableSrc from '../img/blocks/table.png'
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
}

export type GameImages = {
  block: BlockImages
  player: {
    north: HTMLImageElement[]
    east: HTMLImageElement[]
    south: HTMLImageElement[]
    west: HTMLImageElement[]
  }
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
