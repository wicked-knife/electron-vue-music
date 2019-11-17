<script>
import BaseSwiper from '@/base/swiper/base-swiper.vue'
import BaseTitle from '@/base/title/base-title.vue'
import BaseSongListCover from '@/base/song-list-cover/base-song-list-cover.vue'
import BasePersonalizedContentCover from '@/base/personalized-content-cover/base-personalized-content-cover.vue'
import BaseLatestMusicItem from '@/base/latest-music-item/base-latest-music-item.vue'
import BaseVideoCover from '@/base/video-cover/base-video-cover.vue'
import BaseRadioCover from '@/base/radio-cover/base-radio-cover.vue'
import BaseDialog from '@/base/dialog/base-dialog.vue'
import dayjs from '@/common/day.js'

import {
  getBanner,
  getRecommendSongListWithLogin,
  getRecommendSongListWithoutLogin,
  getPersonalizedContent,
  getLatestMusic,
  getRecommendMV,
  getRecommendRadio
} from '@/API/recommend.js'
import { mapGetters } from 'vuex'
export default {
  // 声明一个name，为了让keep-alive有条件地进行缓存
  name: 'recommend-index',
  components: {
    BaseSwiper,
    BaseTitle,
    BaseSongListCover,
    BasePersonalizedContentCover,
    BaseLatestMusicItem,
    BaseVideoCover,
    BaseRadioCover,
    BaseDialog
  },
  computed: {
    ...mapGetters('user', {
      loginState: 'loginState'
    })
  },
  data() {
    return {
      layout: ['推荐歌单','独家放送','最新音乐', '推荐MV', '主播电台'],
      day: dayjs().format('dddd'),
      date: dayjs().format('D'),
      banners: [],
      recommendSongList: [], //推荐歌单
      personalizedContent: [], // 独家放送
      latestMusic: [], // 最新音乐
      recommendMV: [], // 推荐MV
      recommendRadio: [], // 推荐电台,
      dialogVisiable: false,
    }
  },
  created() {
    getBanner().then(data => {
      this.banners = data.banners.map(i => ({ ...i, src: i.imageUrl }))
    })
    this.loginState
      ? getRecommendSongListWithLogin().then(data => {
        this.recommendSongList = data.recommend.slice(0, 9)
      })
      : getRecommendSongListWithoutLogin(10).then(data => {
        this.recommendSongList = data.result.slice(0, 9)
      })
    getPersonalizedContent().then(data => this.personalizedContent = data.result)
    getLatestMusic().then(data => {
      this.latestMusic = data.result.map(m => m.song)
    })
    getRecommendMV().then(data => this.recommendMV = data.result)
    getRecommendRadio().then(data => this.recommendRadio = data.djRadios)
  },
  methods:{
    genDynamicTemplate(tempName){
      const isTempNameValid = ['推荐歌单','独家放送','最新音乐', '推荐MV', '主播电台'].indexOf(tempName) !== -1
      if(isTempNameValid) {
        if(tempName === '推荐歌单') {
          return (
            <div>
              <base-title text="推荐歌单" to="/main/recommend/song-list" />
              <v-row class="d-flex justify-space-between">
                <div class="daily-wrapper" style={{width: '18.46%'}}>
                  <div class="inner">
                    <div class="day grey--text text--darken-2">
                      {this.day}
                    </div>
                    <div class="date">
                      {this.date}
                    </div>
                  </div>
                  <div class="name">每日歌曲推荐</div>
                </div>
                {
                  this.recommendSongList.map(songList => {
                    return (<base-song-list-cover
                      key={songList.id}
                      width="18.46%"
                      song-list={songList}
                    />)
                  })
                }
              </v-row>
            </div>
          )
        }
        if(tempName === '独家放送') {
          return (
            <div>
              <base-title text="独家放送"  to='/main/personalizedContent'/>
              <v-row class="d-flex justify-space-between mb-9">
                {
                  this.personalizedContent.map(content => {
                    return (
                      <base-personalized-content-cover key={content.videoId}
                        width="32.21%" personalized-content={content}/>
                    )
                  })
                }
              </v-row>
            </div>
          )
        }
        if(tempName === '最新音乐') {
          return (
            <div>
              <base-title text="最新音乐"  to='/main/recommend/latest-music'/>
              <v-row class="border-a  mb-9">
                <v-col class="pa-0 border-r" cols="6">
                  {
                    this.latestMusic.slice(0, 5).map((music, index) => {
                      return (
                        <BaseLatestMusicItem  key={music.id} music={music} index={index + 1} stripe={index % 2 === 1}/>
                      )
                    })
                  }
                </v-col>
                <v-col class="pa-0" cols="6">
                  {
                    this.latestMusic.slice(5, 10).map((music, index) => {
                      return (
                        <BaseLatestMusicItem  key={music.id} music={music} index={index + 6} stripe={index % 2 === 1}/>
                      )
                    })
                  }
                </v-col>
              </v-row>
            </div>
          )
        }
        if(tempName === '推荐MV') {
          return (
            <div>
              <base-title text="推荐MV" to='/main/video/index'/>
              <v-row class="d-flex justify-space-between">
                {
                  this.recommendMV.map(mv => {
                    return (
                      <base-video-cover  key={mv.id} video={mv} width="24.03%"/>
                    )
                  })
                }
      
              </v-row>
            </div>
          )
        }
        if(tempName === '主播电台') {
          return (
            <div>
              <base-title text="主播电台" to="/main/recommend/radio" />
              <v-row class="d-flex justify-space-between">
                {
                  this.recommendRadio.map(radio => {
                    return <base-radio-cover key={radio.id} radio={radio} width="15.38%"/>
                  })
                }
              </v-row>
            </div>
          )
        }
      }
    },
    showDialog(){
      this.dialogVisiable = true
    }
  },
  render(){
    return (
      <v-container fluid class="container-1040">
        <v-row>
          <base-swiper list={this.banners} />
        </v-row>
        {
          this.layout.map(tempName => this.genDynamicTemplate(tempName))
        }
        <v-row class="mb-4">
          <v-divider/>
        </v-row>
        <v-row class="subtitle-3 grey--text justify-center mb-4">
            现在可以根据个人喜好，自由调整栏目顺序啦~
        </v-row>
        <v-row class="justify-center">
          <v-btn height="30px" outlined class="subtitle-3 btn-border" vOn:click={this.showDialog}>调整栏目顺序</v-btn>
        </v-row>
        <base-dialog vModel={this.dialogVisiable}>
          asdad
        </base-dialog>
      </v-container>
    )
  }
}
</script>

<style lang="scss" scoped>
.daily-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 36px;
  .inner {
    width: 100%;
    padding-top: 100%;
    position: relative;
    cursor: pointer;
    margin-bottom: 8px;
    background-color: #fff;
    .day,
    .date {
      position: absolute;
    }
    .day {
      top: 10%;
      font-size: 16px;
      text-align: center;
      width: 100%;
    }
    .date {
      top: 10%;
      width: 100%;
      text-align: center;
      font-size: 104px;
      color: #b82525;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
      @media screen and (max-width: 1066px) {
        font-size: 96px;
      }
    }
  }
  .name {
    font-size: 13px;
  }
}
</style>
