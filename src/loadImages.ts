import config from './config'
import cubePath from './img/cube.png'
import playerNorth1 from './img/player/north_1.png'
import playerEast1 from './img/player/east_1.png'
import playerSouth1 from './img/player/south_1.png'
import playerWest1 from './img/player/west_1.png'
import loadImage from './loadImage'

async function loadPlayerImage(src: string) {
  return await loadImage(src, config.player.width, config.player.height)
}

async function loadBlockImage(src: string) {
  return await loadImage(src, config.block.width, config.block.height)
}

export type GameImages = {
  cube: HTMLImageElement
  player: {
    north: HTMLImageElement
    east: HTMLImageElement
    south: HTMLImageElement
    west: HTMLImageElement
  }
}

export default async function loadImages(): Promise<GameImages> {
  const cube = await loadBlockImage(cubePath)
  const playerObj = {
    north: await loadPlayerImage(playerNorth1),
    east: await loadPlayerImage(playerEast1),
    south: await loadPlayerImage(playerSouth1),
    west: await loadPlayerImage(playerWest1),
  }
  return { cube, player: playerObj }
}
