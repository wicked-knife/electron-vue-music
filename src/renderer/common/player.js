function noop() {
  
}

const defaults = {
  autoPlay: false,
  volume: 1,
  music: [],
  onprogress:noop
}

class BaseMusicPlayer {
  constructor(config){
    const {volume, music, autoPlay, onprogress} = Object.assign(defaults, config)
    this.audio = document.createElement('audio')
    this.volume = volume
    this.music = music
    this.handleProgress = onprogress
    this._init(autoPlay)
  }
  _init(autoPlayFlag){
    this.audio.addEventListener('canplay', () => autoPlayFlag && this.audio.play())
    this.audio.addEventListener('progress', this.handleProgress)
    this.audio.src = this.music[0].url
  }
  pause(){
    this.audio.pause()
  }
  play(){
    this.audio.play()
  }
  add(songData){
    Array.isArray(songData) ? this.music.push(...songData) : this.music.push(songData)
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
        default:
          break
        }
        target[prop] = value
      },
      get(target, prop){
        return typeof prop === 'string' ? prop.indexOf('_') === 0 ? undefined : target[prop] : target[prop]
      }
    })
  }
})


export default MusicPlayer
