function noop() {
  
}

const defaults = {
  volume: 1,
  music: [],
  onTimeupdate:noop,
  onPause: noop
}

class BaseMusicPlayer {
  constructor(config){
    this._config = Object.assign(defaults, config)
    const {volume, music} = this._config
    this.audio = document.createElement('audio')
    this.audio.preload = 'auto'
    this.volume = volume
    this.music = music
    this.playingState = false
    this.index = 0
    this._init()
  }
  _init(){
    this.audio.addEventListener('canplay', () => {this.playingState && this.audio.play()})
    this.audio.addEventListener('timeupdate', this._config.onTimeupdate)
    this.audio.addEventListener('pause', this._config.onPause)
    this.audio.addEventListener('ended', () => {
      if(this.index === this.music.length - 1) {
        this.pause()
      } else {
        this.next()
      }
    })
    this.audio.src = this.music[this.index].url
  }
  pause(){
    this.playingState = false
    this.audio.pause()
  }
  play(){
    this.playingState = true
    this.audio.play()
  }
  add(songData){
    Array.isArray(songData) ? this.music.push(...songData) : this.music.push(songData)
  }
  next(){
    if(this.index + 1 >= this.music.length){
      this.index = 0
    } else {
      this.index++
    }
  }
}

const MusicPlayer = new Proxy(BaseMusicPlayer, {
  construct(BaseMusicPlayerCtor, args){
    return new Proxy(new BaseMusicPlayerCtor(...args), {
      set(target, prop, value){
        switch(prop) {
        case 'volume':
          target['audio'].volume = value
          break
        case 'index':
          target['audio'].src = target['music'][value].url
          break
        default:
          break
        }
        target[prop] = value
        return true
      },
      get(target, prop){
        return typeof prop === 'string' ? prop.indexOf('_') === 0 ? undefined : target[prop] : target[prop]
      }
    })
  }
})


export default MusicPlayer
