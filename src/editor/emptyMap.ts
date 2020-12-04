import config from '../config'
import { Level } from '../LevelEditor'

function emptyField() {
  return Array(config.level.size)
    .fill(-1)
    .map(() => Array(config.level.size).fill(-1))
}

export type LevelPreview = { level: Level; img: string }

export function emptyLevel(): LevelPreview {
  return {
    img: '',
    level: [emptyField(), emptyField()],
  }
}

export type MapTable = {
  img: string
  level: Level
}[][]

export default function emptyMap(): MapTable {
  const map = []
  for (let i = 0; i < config.map.size; i += 1) {
    const row = []
    for (let j = 0; j < config.map.size; j += 1) {
      row.push(emptyLevel())
    }
    map.push(row)
  }
  return map
}
