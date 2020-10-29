import config from '../config'
import cubePath from '../img/cube.png'
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

export type GameImages = {
  cube: HTMLImageElement
  player: {
    north: HTMLImageElement[]
    east: HTMLImageElement[]
    south: HTMLImageElement[]
    west: HTMLImageElement[]
  }
}

export default async function loadImages(): Promise<GameImages> {
  const cube = await loadBlockImage(cubePath)
  const playerObj = {
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
  return { cube, player: playerObj }
}
