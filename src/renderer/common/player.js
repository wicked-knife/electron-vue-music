function noop() {
  
}

const defaults = {
  volume: 1,
  music: [],
  onTimeupdate:noop
}

class BaseMusicPlayer {
  constructor(config){
    const {volume, music, onTimeupdate} = Object.assign(defaults, config)
    this.audio = document.createElement('audio')
    this.audio.preload = 'auto'
    this.volume = volume
    this.music = music
    this.handleTimeupdate = onTimeupdate
    this.playingState = false
    this.index = 0
    this._init()
  }
  _init(){
    this.audio.addEventListener('canplay', () => {this.playingState && this.audio.play()})
    this.audio.addEventListener('timeupdate', this.handleTimeupdate)
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
