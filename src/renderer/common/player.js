const defaults = {
  autoPlay: false,
  volume: 1,
  music: []
}

class BaseMusicPlayer {
  constructor(config){
    console.log(config)
    const {volume, music, autoPlay} = Object.assign(defaults, config)
    this.audio = document.createElement('audio')
    this.volume = volume
    this.music = music
    this._init(autoPlay)
  }
  _init(autoPlayFlag){
    this.audio.addEventListener('canplay', () => autoPlayFlag && this.audio.play())
    this.audio.src = this.music[0].url
  }
  pause(){
    this.audio.pause()
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
        return prop.indexOf('_') === 0 ? undefined : target[prop]
      }
    })
  }
})


export default MusicPlayer
