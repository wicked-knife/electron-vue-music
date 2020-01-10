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
  activated(){
    getPersonalFM().then(({data}) => {
      data[0].artists.push({name: 'xxxx'}, {name: 'tyyy'})
      this.songQueue = data
    })
  },
  render(){
    const {currentSong} = this
    return (
      <v-container class="container-760" fluid>
        {currentSong && <div class="main-container d-flex justify-end">
          <div class="left mr-10"></div>
          <div class="right">
            <div class="title">{currentSong.name}</div>
            <div class="subtitle-3">
              专辑: <router-link to="/" class="blue--text text--darken-3 link ml-1 mr-1">{currentSong.album.name}</router-link>
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
</style>
