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
import { Sortable, Plugins  } from '@shopify/draggable'
import {getPersistLayout, persistLayout} from '@/store/persist/layout.js'
const defaultLayout = ['推荐歌单','独家放送','最新音乐','推荐MV','主播电台']
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
      layout: getPersistLayout() || defaultLayout,
      day: dayjs().format('dddd'),
      date: dayjs().format('D'),
      banners: [],
      recommendSongList: [], //推荐歌单
      personalizedContent: [], // 独家放送
      latestMusic: [], // 最新音乐
      recommendMV: [], // 推荐MV
      recommendRadio: [], // 推荐电台,
      dialogVisiable: false,
      layoutSort: null,
      loading: true
    }
  },
  created() {
    Promise.all([
      getBanner(),
      this.loginState ? getRecommendSongListWithLogin() : getRecommendSongListWithoutLogin(),
      getPersonalizedContent(),
      getLatestMusic(),
      getRecommendMV(),
      getRecommendRadio(),
    ]).then(([
      {banners}, 
      songlist, 
      {result: personalizedContent}, 
      {result: latestMusic}, 
      {result: recommendMV}, 
      {djRadios: recommendRadio}]) => {
      this.banners = banners.map(i => ({ ...i, src: i.imageUrl }))
      this.recommendSongList = this.loginState ? songlist.recommend.slice(0, 9) : songlist.result.slice(0, 9)
      this.personalizedContent = personalizedContent
      this.latestMusic = latestMusic.map(m => m.song)
      this.recommendMV = recommendMV
      this.recommendRadio = recommendRadio
      this.loading = false
    }).catch(() => {
      this.$alert({text:'网络出错', color: 'red'})
      this.loading = false
    })
  },
  methods: {
    genDynamicTemplate(tempName) {
      const isTempNameValid = this.layout.indexOf(tempName) !== -1
      if (isTempNameValid) {
        if (tempName === '推荐歌单') {
          return (
            <div>
              <base-title text="推荐歌单" to="/main/recommend/song-list" />
              <v-row class="d-flex justify-space-between">
                <div class="daily-wrapper" style={{ width: '18.46%' }}>
                  <div class="inner">
                    <div class="day grey--text text--darken-2">{this.day}</div>
                    <div class="date">{this.date}</div>
                  </div>
                  <div class="name">每日歌曲推荐</div>
                </div>
                {this.recommendSongList.map(songList => {
                  return (
                    <base-song-list-cover
                      key={songList.id}
                      width="18.46%"
                      song-list={songList}
                      {...{
                        on: {
                          'songList:click': this.handleSongListClick
                        }
                      }}
                    />
                  )
                })}
              </v-row>
            </div>
          )
        }
        if (tempName === '独家放送') {
          return (
            <div>
              <base-title text="独家放送" to="/main/personalizedContent" />
              <v-row class="d-flex justify-space-between mb-9">
                {this.personalizedContent.map(content => {
                  return (
                    <base-personalized-content-cover
                      key={content.videoId}
                      width="32.21%"
                      personalized-content={content}
                    />
                  )
                })}
              </v-row>
            </div>
          )
        }
        if (tempName === '最新音乐') {
          return (
            <div>
              <base-title text="最新音乐" to="/main/recommend/latest-music" />
              <v-row class="border-a  mb-9">
                <v-col class="pa-0 border-r" cols="6">
                  {this.latestMusic.slice(0, 5).map((music, index) => {
                    return (
                      <BaseLatestMusicItem
                        key={music.id}
                        music={music}
                        index={index + 1}
                        stripe={index % 2 === 1}
                      />
                    )
                  })}
                </v-col>
                <v-col class="pa-0" cols="6">
                  {this.latestMusic.slice(5, 10).map((music, index) => {
                    return (
                      <BaseLatestMusicItem
                        key={music.id}
                        music={music}
                        index={index + 6}
                        stripe={index % 2 === 1}
                      />
                    )
                  })}
                </v-col>
              </v-row>
            </div>
          )
        }
        if (tempName === '推荐MV') {
          return (
            <div>
              <base-title text="推荐MV" to="/main/video/index" />
              <v-row class="d-flex justify-space-between">
                {this.recommendMV.map(mv => {
                  return (
                    <base-video-cover key={mv.id} video={mv} width="24.03%" />
                  )
                })}
              </v-row>
            </div>
          )
        }
        if (tempName === '主播电台') {
          return (
            <div>
              <base-title text="主播电台" to="/main/recommend/radio" />
              <v-row class="d-flex justify-space-between">
                {this.recommendRadio.map(radio => {
                  return (
                    <base-radio-cover
                      key={radio.id}
                      radio={radio}
                      width="15.38%"/>
                  )
                })}
              </v-row>
            </div>
          )
        }
      }
    },
    showDialog() {
      this.dialogVisiable = true
    },
    resetLayout(){
      this.layout = defaultLayout
      persistLayout(defaultLayout)
    },
    handleDialogConfirm(){
      const sortedLayout = Array.prototype.map.call(this.$refs['layout-list'].querySelectorAll('li'), node => node.innerText.trim())
      this.layout = sortedLayout
      this.dialogVisiable = false
      persistLayout(this.layout)
    },
    handleDialogHide(){
      Array.prototype.forEach.call(this.$refs['layout-list'].querySelectorAll('li'), (node, index) => node.innerText = this.layout[index])
      this.dialogVisiable = false
    },
    handleSongListClick(songList){
      this.$router.push('/main/song-list-detail/' + songList.id )
    }
  },
  render() {
    return (
      <v-container fluid class="container-1040" v-loading={this.loading}>
        <v-row>
          <base-swiper list={this.banners} />
        </v-row>
        {this.layout.map(tempName => this.genDynamicTemplate(tempName))}
        <v-row class="mb-4">
          <v-divider />
        </v-row>
        <v-row class="subtitle-3 grey--text justify-center mb-4">
          现在可以根据个人喜好，自由调整栏目顺序啦~
        </v-row>
        <v-row class="justify-center">
          <v-btn
            height="30px"
            outlined
            class="subtitle-3 btn-border"
            vOn:click={this.showDialog}>
            调整栏目顺序
          </v-btn>
        </v-row>
        <base-dialog vModel={this.dialogVisiable} title="调整栏目顺序" {...{
          on: {
            'dialog:confirm': this.handleDialogConfirm,
            'dialog:close': this.handleDialogHide,
            'dialog:cancel': this.handleDialogHide
          }
        }}>
          <div class="dialog-content">
            <div class="tip subtitle-3 grey--text text--darken-1">
              <i class="iconfont icon-light"></i>
              想调整首页栏目的顺序？按住右边的按钮拖动即可。
            </div>
            <ul class="layout-list pa-0" ref='layout-list'>
              {this.layout.map(l => (
                <li class="layout-item grey--text" key={l}>
                  {l} <i class="iconfont icon-menu"></i>
                </li>
              ))}
            </ul>
            <div class="default-sort subtitle-3 grey--text text-center" vOn:click={this.resetLayout}>
              恢复默认排序
            </div>
          </div>
        </base-dialog>
      </v-container>
    )
  },
  watch: {
    dialogVisiable(newValue) {
      if (newValue && !this.layoutSort) {
        this.$nextTick(() => {
          this.layoutSort = new Sortable(
            document.querySelector('.layout-list'),
            {
              draggable: 'li.layout-item',
              swapAnimation: {
                duration: 200,
                easingFunction: 'ease-in-out'
              },
              mirror: {
                xAxis: false
              },
              plugins: [Plugins.SwapAnimation]
            }
          )
        })
      }
    }
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
.dialog-content {
  .tip {
    padding: 10px 0 10px 20px;
  }
  .icon-light {
    font-size: 14px !important;
  }
  .layout-list {
    position: relative;
  }
  .layout-item {
    list-style: none;
    padding: 12px 38px;
    box-sizing: border-box;
    border-bottom: 1px solid #3b3a3d;
    display: flex;
    justify-content: space-between;
    background-color: #2d2f33;
    width: 388px;
    &:hover {
      background-color: #35363a;
    }
    .icon-menu {
      cursor: move;
    }
  }
  .default-sort{
    padding: 10px 0;
    cursor: pointer;
    &:hover{
      background-color: #35363a;
    }
  }
  .draggable-mirror {
    opacity: 0.8;
  }
}
</style>
