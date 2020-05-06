<script>
import {getPersonalFM} from '@/API/personal-fm.js'
import {getLyric} from '@/API/lyric.js'
import {getSongURL, toggleLikeSong} from '@/API/song.js'
import AppComment from '@/components/app-comment/app-comment.vue'
import LyricParser from '@/common/lyricParser.js'
import LyricScroller from '@/base/lyric-scroller/base-lyric-scroller.vue'
import bus from '@/common/bus'
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'personal-fm',
  components:{
    AppComment,
    LyricScroller
  },
  data:() => ({
    currentIndex: 0,
    songQueue: [],
    lyric: [], 
    currentTime: 0,
    starred: false
  }),
  deactivated(){
    this.player.off('timeupdate', this.handleMusicTimeupdate)
    this.player.off('pause', this.handleMusicPause)
  },
  activated(){
    this.player.on('timeupdate', this.handleMusicTimeupdate)
    this.player.on('pause', this.handleMusicPause)
  },
  computed:{
    ...mapGetters({
      player: 'player'
    }),
    currentSong(){
      return this.songQueue[this.currentIndex]
    },
    nextSong(){
      return this.songQueue[this.currentIndex + 1]
    }
  },
  created(){
    getPersonalFM().then(({data}) => {
      this.songQueue = data
      this.$nextTick(this.initSongSlide)
    })
    bus.on('fm:play-next', () => {
      this.playNextSong()
    })
  },
  watch:{
    // 当前歌曲改变时获取当前歌曲的歌词及真实播放地址
    currentSong(newVal, oldVal){
      this.starred = newVal.starred
      if(oldVal === newVal) {
        return
      }
      getLyric(this.currentSong.id).then(({lrc, tlyric}) => {
        if(lrc) {
          const lyricParser = new LyricParser(lrc.lyric, tlyric.lyric ? tlyric.lyric : '')
          this.lyric = lyricParser.getLyric()
        }
      })
      getSongURL(this.currentSong.id).then(({data: musicData}) => {
        this.player.add(musicData)
        const lastIndex = this.songQueue.findIndex(m => oldVal && oldVal.id === m.id)
        if(lastIndex === -1) {
          return this.player.next()
        }
        const newIndex = this.songQueue.findIndex(m => newVal.id === m.id)
        if(newIndex >= lastIndex) {
          this.player.next()
        } else {
          this.player.prev()
        }

        if(this.player.music.length > 3) {
          this.player.remove(this.player.music[0])
        }
      })
    }
  },
  methods: {
    ...mapMutations({
      setPlayType: 'setPlayType'
    }),
    playNextSong(){
      if(this.currentIndex === 0) {
        this.currentIndex++
        this.updateSlide()
      } else {
        if(this.songQueue.length <= 3) {
          getPersonalFM().then(({data}) => {
            this.songQueue.shift()
            this.songQueue.push(...data)
            this.updateSlide()
          })
        } else {
          this.songQueue.shift()
          this.updateSlide()
        }
      }
    },
    initSongSlide(){
      const $currentSlide = this.createSongSlide('current', this.currentSong.album.picUrl + '?param=300y300')
      const $next = this.createSongSlide('next', this.nextSong.album.picUrl + '?param=300y300')
      this.$refs['song-container'].appendChild($currentSlide)
      this.$refs['song-container'].appendChild($next)
    },
    createSongSlide(className, imageUrl){
      const $div = document.createElement('div')
      const $img = new Image()
      $img.draggable = false
      $div.classList.add('song-cover', className)
      $img.src = imageUrl
      $div.appendChild($img)
      $div.addEventListener('click', this.handleSlidePrev)
      return $div
    },
    updateSlide(){
      const $container = this.$refs['song-container']
      const $next = $container.querySelector('.next')
      const $current = $container.querySelector('.current')
      const $prev = $container.querySelector('.prev')
      $next.setAttribute('class', 'song-cover current')
      $current.setAttribute('class', 'song-cover prev')
      if($prev) {
        $prev.setAttribute('class', 'song-cover remove')
        setTimeout(() => {
          $prev.removeEventListener('click', this.handleSlidePrev)
          $prev.remove()
        }, 300)
      }
      const $$next = this.createSongSlide('next', this.nextSong.album.picUrl + '?param=300y300')
      $container.appendChild($$next)
    },
    handleSlidePrev(ev){
      const targetElement = ev.target.parentElement
      if(targetElement.classList.contains('prev')) {
        const $container = this.$refs['song-container']
        const $next = $container.querySelector('.next')
        const $current = $container.querySelector('.current')
        const $prev = $container.querySelector('.prev')
        $next.removeEventListener('click', this.handleSlidePrev)
        $next.remove()
        $current.setAttribute('class', 'song-cover next')
        $prev.setAttribute('class', 'song-cover current')
        this.currentIndex--
      }
    },
    handleMusicTimeupdate(ev){
      this.currentTime = ev.target.currentTime
    },
    handleMusicPause(){
      console.log('暂停了')
    },
    handleDislike(){
      const $container = this.$refs['song-container']
      const $current = $container.querySelector('.current')
      const $next = $container.querySelector('.next')

      const _updateSlide = () => {
        const $$next = this.createSongSlide('next', this.nextSong.album.picUrl + '?param=300y300')
        $current.setAttribute('class', 'song-cover remove')
        $next.setAttribute('class', 'song-cover current')
        $container.appendChild($$next)
      }

      if(this.currentIndex === 0) {
        this.songQueue.shift()
      }
      if(this.currentIndex === 1) {
        this.songQueue.splice(1, 1)
      }
      if(this.songQueue.length <= 3) {
        getPersonalFM().then(({data}) => {
          this.songQueue.push(...data)
          _updateSlide()
        })
      } else {
        _updateSlide()
      }
    },
    toggleLikeSong(){
      toggleLikeSong(this.currentSong.id, !this.starred).then(() => {
        this.starred = !this.starred
        this.currentSong.starred = this.starred
      })
    },
    togglePlayingState(){
      this.player.playingState ? this.player.pause() : this.player.play()
      this.setPlayType('fm')
    }
  },
  render(){
    const {currentSong, player} = this
    return (
      <v-container class="container-760" fluid>
        {currentSong ? <div class="personalFM-container d-flex justify-end mb-12">
          <div class="left mr-10 mt-12">
            <div class="cover-container mb-8" ref="song-container">
              <i class={'iconfont play-icon d-flex align-center justify-center ' + (player.playingState ? 'icon-pause pause' : 'icon-play playing')} 
                {...{on: {click: this.togglePlayingState}}}></i>
            </div>
            <div class="action-group d-flex align-center justify-space-between pl-3 pr-3">
              <i class={'grey--text iconfont action-item d-flex align-center justify-center ' + (this.starred ? 'icon-like_fill' : 'icon-like')}
                {...{on: {click: this.toggleLikeSong}}}></i>
              <i class="grey--text iconfont icon-delete action-item d-flex align-center justify-center" {...{on: {click: this.handleDislike}}}></i>
              <i class="grey--text iconfont icon-next action-item d-flex align-center justify-center" {...{on: {click: this.playNextSong}}}></i>
              <i class="grey--text iconfont icon-more action-item d-flex align-center justify-center"></i>
            </div>
          </div>
          <div class="right">
            <div class="title mb-2">{currentSong.name}
              {currentSong.mvid ? <router-link class="tag ml-2" to={'/main/MV/play/' + currentSong.mvid} >MV</router-link> : ''}
            </div>
            <div class="subtitle-3 song-info d-flex grey--text mb-5">
              <div class="text-ellipsis mr-2">
               专辑: <router-link to="/" class="blue--text text--darken-3 link ml-1 mr-1">{currentSong.album.name}</router-link>
              </div>
              <div class="text-ellipsis">
                歌手: {
                currentSong.artists.reduce((acc, artist, index) => {
                  acc.push(<router-link to={'/main/singer/' + artist.id} class="blue--text text--darken-3 link ml-1 mr-1">{artist.name}</router-link>)
                  if(currentSong.artists.length !== 1 && index !== currentSong.artists.length - 1) {
                    acc.push('/')
                  }
                  return acc
                }, [])
              }
              </div>
            </div>
            <lyric-scroller lyric={this.lyric} currentTime={this.currentTime}/>
          </div>
        </div> : null}
        {currentSong && <app-comment resourceType={0} resourceID={currentSong.id} show-total></app-comment>}
      </v-container>
    )
  }
}
</script>

<style lang="scss">
.personalFM-container{
  .left{
    width: 300px;
    .cover-container{
      position: relative;
      width: 100%;
      padding-top: 100%;
      .play-icon{
        position: absolute;
        width: 45px;
        height: 45px;
        font-size: 28px;
        border-radius: 50%;
        border: 1px solid #f5f5f5;
        background-color: rgba(0,0,0,0.5);
        left: 50%;
        top: 50%;
        transition: all 0.3s ease;
        &.playing{
          transform: translate3d(-50%, -50%, 0);
        }
        &.pause{
          left: 100%;
          top: 100%;
          transform: translate3d(-110%, -110%, 0)
        }
        cursor: pointer;
        z-index: 1;
        &:hover{
          background-color: rgba(0,0,0,0.75);
        }
      }
      .song-cover{
        position: absolute;
        font-size: 0px;
        width: 100%;
        height: 100%;
        transition: all 0.6s ease;
        img{
          width: 100%;
        }
        &.current{
          left: 0;
          top: 0;
          opacity: 1;
          transform: translate3d(0,0,0);
        }
        &.prev{
          left: 0;
          top: 0;
          transform: scale(0.85) translate3d(-20%, 0, 0);
          opacity: 1;
          cursor: pointer;
        }
        &.next{
          left: 0;
          top: 0;
          opacity: 0;
          transform: translate3d(100%, 0, 0);
          pointer-events: none;
        }
        &.remove{
          left: 0;
          top: 0;
          transform: scale(0.7) translate3d(-40%, 0, 0);
          opacity: 0;
        }
      }
    }
  }
  .right{
    width: 350px;
  }
  .link {
    &:hover {
      color: #1e88e5 !important;
    }
  }

  .tag {
    color: $theme-color;
    border: 1px solid $theme-color;
    font-size: 10px;
    padding: 0 2px;
    margin-top: -4px;

    &:hover {
      filter: brightness(1.3);
    }
  }

  .song-info>div {
    width: 50%;
  }

  .action-group {
    box-sizing: border-box;

    .action-item {
      background-color: #26272b;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      font-size: 26px;
      cursor: pointer;
      &.icon-like_fill{
        color: #b82525 !important;
      }
      &:hover {
        filter: brightness(1.2)
      }
    }
  }

}

</style>
