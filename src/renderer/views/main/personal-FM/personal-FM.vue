<script>
import {getPersonalFM} from '@/API/personal-fm.js'
import AppComment from '@/components/app-comment/app-comment.vue'
export default {
  name: 'personal-fm',
  components:{
    AppComment
  },
  data:() => ({
    currentIndex: 0,
    songQueue: [],
  }),
  computed:{
    currentSong(){
      return this.songQueue[this.currentIndex]
    },
    prevSong(){
      return this.songQueue[this.currentIndex - 1]
    },
    nextSong(){
      return this.songQueue[this.currentIndex + 1]
    }
  },
  created(){
    getPersonalFM().then(({data}) => {
      this.songQueue = data
    })
  },
  mounted(){
    console.log(this.$refs['song-container'])
    console.log(document.getElementById('song-container'))
  },
  methods: {
    playNextSong(){
      if(this.currentIndex === 0) {
        this.currentIndex++
      } else {
        if(this.songQueue.length <= 3) {
          getPersonalFM().then(({data}) => {
            this.songQueue.push(...data)
            this.songQueue.shift()
          })
        } else {
          this.songQueue.shift()
        }
      }
    },
    dynamicClassName(i) {
      if(i === this.currentIndex) {
        return 'current'
      }
      if(i === this.currentIndex - 1) {
        return 'prev'
      }
      if(i === this.currentIndex + 1) {
        return 'next'
      }
    }
  },
  render(){
    const {currentSong, prevSong, nextSong} = this
    return (
      <v-container class="container-760" fluid>
        {currentSong ? <div class="main-container d-flex justify-end">
          <div class="left mr-10 mt-12">
            <div class="cover-container mb-8" ref="song-container" id="song-container">
              {
                prevSong ? <div class="prev song-cover" >
                  <img src={prevSong.album.picUrl + '?param=300y300'} />
                </div> : null
              }
              {currentSong ?  <div class="current song-cover">
                <img src={currentSong.album.picUrl + '?param=300y300'} />
              </div> : null}
              {
                nextSong ? <div class="next song-cover">
                  <img src={nextSong.album.picUrl + '?param=300y300'} />
                </div> : null
              }
            </div>
            <div class="action-group d-flex align-center justify-space-between pl-3 pr-3">
              <i class="grey--text iconfont icon-like action-item d-flex align-center justify-center"></i>
              <i class="grey--text iconfont icon-delete action-item d-flex align-center justify-center"></i>
              <i class="grey--text iconfont icon-next action-item d-flex align-center justify-center" {...{on: {click: this.playNextSong}}}></i>
              <i class="grey--text iconfont icon-more action-item d-flex align-center justify-center"></i>
            </div>
          </div>
          <div class="right">
            <div class="title mb-2">{currentSong.name}
              {currentSong.mvid ? <router-link class="tag ml-2" to={'/main/MV/play/' + currentSong.mvid} >MV</router-link> : ''}
            </div>
            <div class="subtitle-3 song-info d-flex grey--text">
              <div class="text-ellipsis mr-2">
               专辑: <router-link to="/" class="blue--text text--darken-3 link ml-1 mr-1">{currentSong.album.name}</router-link>
              </div>
              <div class="text-ellipsis">
                歌手: {
                currentSong.artists.reduce((acc, artist, index) => {
                  acc.push(<router-link to="/" class="blue--text text--darken-3 link ml-1 mr-1">{artist.name}</router-link>)
                  if(currentSong.artists.length !== 1 && index !== currentSong.artists.length - 1) {
                    acc.push('/')
                  }
                  return acc
                }, [])
              }
              </div>
            </div>
          </div>
        </div> : null}
        {currentSong && <app-comment resourceType={0} resourceID={currentSong.id} show-total></app-comment>}
      </v-container>
    )
  }
}
</script>

<style lang="scss" scoped>
.main-container{
  .left{
    width: 300px;
    .cover-container{
      position: relative;
      width: 100%;
      padding-top: 100%;
      .song-cover{
        position: absolute;
        font-size: 0px;
        width: 100%;
        height: 100%;
        transition: transform 0.6s ease;
        img{
          width: 100%;
        }
        &.current{
          left: 0;
          top: 0;
        }
        &.prev{
          left: 0;
          top: 0;
          transform: scale(0.85) translate3d(-20%, 0, 0);
        }
        &.next{
          left: 0;
          top: 0;
          transform: translate3d(100%, 0, 0)
        }
      }
    }
  }
  .right{
    width: 350px;
  }
}
.link{
  &:hover{
    color:#1e88e5 !important;
  }
}
.tag {
  color: $theme-color;
  border: 1px solid $theme-color;
  font-size: 10px;
  padding: 0 2px;
  margin-top: -4px;
  &:hover{
    filter: brightness(1.3);
  }
}
.song-info > div{
  width: 50%;
}
.action-group{
  box-sizing: border-box;
  .action-item{
    background-color: #26272b;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    font-size: 26px;
    cursor: pointer;
    &:hover{
      filter: brightness(1.2)
    }
  }
}
</style>
