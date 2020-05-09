import Events from 'events'
import { getSongURL } from '@/API/song'

function noop() {

}

const defaults = {
  volume: 1,
  music: [],
  onTimeupdate: noop,
  onPause: noop
}

class BaseMusicPlayer extends Events {
  constructor(config) {
    super()
    this._config = Object.assign(defaults, config)
    const { volume, music } = this._config
    this.audio = document.createElement('audio')
    this.audio.preload = 'auto'
    this.volume = volume
    this.playList = music || []
    this.playingState = false
    this.index = 0
    this.musicMap = {}
    this._init()
  }
  _init() {
    this.playList.forEach((m, i) => this.musicMap[m.id] = [m, i])
    this.audio.addEventListener('canplay', () => { this.playingState && this.audio.play() })
    this.audio.addEventListener('timeupdate', (ev) => { this.emit('timeupdate', ev) })
    this.audio.addEventListener('pause', (ev) => { this.emit('pause'), ev })
    this.audio.addEventListener('ended', () => {
      if (this.index === this.playList.length - 1) {
        this.pause()
      } else {
        this.next()
      }
    })
    if (this.playList.length) {
      this.audio.src = this.playList[this.index].url
    }
  }
  pause() {
    this.playingState = false
    this.audio.pause()
  }
  play() {
    this.playingState = true
    this.audio.play()
  }
  add(songData) {
    const songDataArr = Array.isArray(songData) ? songData : [songData]
    songDataArr.forEach(m => {
      if (!this.musicMap[m.id]) {
        this.playList.push(m)
        this.musicMap[m.id] = m
      }
    })
  }
  next() {
    if (this.index + 1 >= this.playList.length) {
      this.index = 0
    } else {
      this.index++
    }
  }
  prev() {
    if (this.index === 0) {
      this.index = this.playList.length - 1
    } else {
      this.index--
    }
  }
  has(id) {
    return !!this.musicMap[id]
  }
  remove(song) {
    const id = typeof song === 'string' ? song : song.id
    if (!this.has(id)) {
      return
    }
    const index = this.playList.findIndex(m => m.id === id)
    delete this.musicMap[song.id]
    this.playList.splice(index, 1)
    // 如果在播放的歌曲前方删除了歌曲，将索引-1
    if (index < this.index) {
      this.index--
    }
  }
  setTime(time) {
    if (typeof time !== 'number') {
      throw new Error('Parameter time must be type of number.')
    }
    this.audio.currentTime = time
  }

  setPlayList(playList) {
    this.playList = playList
    this.musicMap = {}
    this.playList.forEach(m => {
      if (!this.musicMap[m.id]) {
        this.musicMap[m.id] = m
      }
    })
  }

  // 指定歌曲索引、歌曲id或传入歌曲对象
  // 播放指定歌曲
  seekMusic(music){
    // 歌曲索引和歌曲id 均为number类型
    if(typeof music === 'number') {
      if(music < this.playList.length) {
        // 此时认为传入的是歌曲索引
        return this.index = music
      }
      // 此时认为传入的是歌曲id
      const musicIndex = this.playList.findIndex(m => m.id === music)
      return this.index = musicIndex
    }
    // 此时为传入的歌曲对象
    const musicIndex = this.playList.findIndex(m => m.id === music.id)
    this.index = musicIndex
  }

}

const MusicPlayer = new Proxy(BaseMusicPlayer, {
  construct(BaseMusicPlayerCtor, args) {
    return new Proxy(new BaseMusicPlayerCtor(...args), {
      set(target, prop, value) {
        switch (prop) {
        case 'volume':
          target['audio'].volume = value
          break
        case 'index':
          {
            let currentSong = target['playList'][value]
            if (currentSong.url) {
              target['audio'].src = currentSong.url
              target.emit('change')
            } else {
              getSongURL(currentSong.id)
                .then(({ data }) => {
                  currentSong = Object.assign(target['playList'][value], ...data)
                  target['playList'][value] = currentSong
                  target['audio'].src = currentSong.url
                  target.emit('change')
                })
            }

          }
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
