/* eslint-disable @typescript-eslint/no-var-requires */
require('./sounds/walk.mp3')
require('./sounds/turn.mp3')
require('./sounds/blocked.mp3')
require('./sounds/ping.mp3')
require('./sounds/collect.mp3')

class Player {
  src: string
  audio: HTMLAudioElement
  constructor(src: string) {
    this.src = src
    this.audio = new Audio(this.src)
  }

  play() {
    this.audio.pause()
    this.audio.currentTime = 0
    this.audio.play()
  }
}

export default {
  walk: new Player('./walk.mp3'),
  turn: new Player('./turn.mp3'),
  blocked: new Player('./blocked.mp3'),
  ping: new Player('./ping.mp3'),
  collect: new Player('./collect.mp3'),
}
