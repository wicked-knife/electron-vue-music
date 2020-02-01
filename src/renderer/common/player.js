import Events from 'events'

function noop() {
  
}

const defaults = {
  volume: 1,
  music: [],
  onTimeupdate:noop,
  onPause: noop
}

class BaseMusicPlayer extends Events {
  constructor(config){
    super()
    this._config = Object.assign(defaults, config)
    const {volume, music} = this._config
    this.audio = document.createElement('audio')
    this.audio.preload = 'auto'
    this.volume = volume
    this.music = music || []
    this.playingState = false
    this.index = 0
    this.musicMap = {}
    this._init()
  }
  _init(){
    this.music.forEach(m => this.musicMap[m.md5] = m)
    this.audio.addEventListener('canplay', () => {this.playingState && this.audio.play()})
    this.audio.addEventListener('timeupdate', (ev) => {this.emit('timeupdate', ev)})
    this.audio.addEventListener('pause', (ev) => {this.emit('pause'), ev})
    this.audio.addEventListener('ended', () => {
      if(this.index === this.music.length - 1) {
        this.pause()
      } else {
        this.next()
      }
    })
    if(this.music.length) {
      this.audio.src = this.music[this.index].url
    }
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
    const songDataArr = Array.isArray(songData) ? songData : [songData]
    songDataArr.forEach(m => {
      if(!this.musicMap[m.md5]) {
        this.music.push(m)
        this.musicMap[m.md5] = m
      }
    })
  }
  next(){
    if(this.index + 1 >= this.music.length){
      this.index = 0
    } else {
      this.index++
    }
  }
  prev(){
    if(this.index === 0) {
      this.index = this.music.length - 1
    } else {
      this.index--
    }
  }
  has(md5){
    return !!this.music.find(m => m.md5 === md5)
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
      }
    })
  }
})


export default MusicPlayer
