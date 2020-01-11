<script>
import {getPersonalFM} from '@/API/personal-fm.js'
import AppComment from '@/components/app-comment/app-comment.vue'
export default {
  name: 'personal-fm',
  components:{
    AppComment
  },
  data:() => ({
    songQueue: []
  }),
  computed:{
    currentSong(){
      return this.songQueue[0]
    }
  },
  created(){
    getPersonalFM().then(({data}) => {
      this.songQueue = data
    })
  },
  render(){
    const {currentSong} = this
    return (
      <v-container class="container-760" fluid>
        {currentSong && <div class="main-container d-flex justify-end">
          <div class="left mr-10">
            <div class="cover-container">
              <div class="prev song-cover"></div>
              <div class="current song-cover">
                <img src={currentSong.album.picUrl + '?param=300y300'} />
              </div>
              <div class="next song-cover"></div>
            </div>
          </div>
          <div class="right">
            <div class="title mb-2">{currentSong.name}
              {currentSong.mvid ? <router-link class="tag ml-2" to={'/main/MV/play/' + currentSong.mvid} >MV</router-link> : ''}
            </div>
            <div class="subtitle-3 song-info d-flex">
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
        </div>}
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
        img{
          width: 100%;
        }
        &.current{
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
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
</style>
