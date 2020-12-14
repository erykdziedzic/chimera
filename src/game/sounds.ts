import config from '../config'

/* eslint-disable @typescript-eslint/no-var-requires */
require('./sounds/walk.mp3')
require('./sounds/turn.mp3')
require('./sounds/blocked.mp3')
require('./sounds/ping.mp3')
require('./sounds/collect.mp3')
require('./sounds/death.mp3')
require('./sounds/destroy.mp3')
require('./sounds/warhead.mp3')
require('./sounds/warhead_placement.mp3')

export class AudioPlayer {
  src: string
  audio: HTMLAudioElement
  started: boolean
  constructor(src: string) {
    this.src = src
    this.audio = new Audio(this.src)
    this.audio.volume = config.gameplay.audioVolume
    this.started = false
  }

  play(): void {
    this.audio.pause()
    this.audio.currentTime = 0
    this.audio.play()
  }
}

export default {
  walk: new AudioPlayer('./walk.mp3'),
  turn: new AudioPlayer('./turn.mp3'),
  blocked: new AudioPlayer('./blocked.mp3'),
  ping: new AudioPlayer('./ping.mp3'),
  collect: new AudioPlayer('./collect.mp3'),
  death: new AudioPlayer('./death.mp3'),
  destroy: new AudioPlayer('./destroy.mp3'),
  collectWarhead: new AudioPlayer('./warhead.mp3'),
  placeWarhead: new AudioPlayer('./warhead_placement.mp3'),
}
