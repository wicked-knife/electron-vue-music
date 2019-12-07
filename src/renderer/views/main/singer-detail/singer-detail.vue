<template>
  <v-container fluid>
    <v-row class="d-flex pl-7 pr-7 mb-6" v-if="artist">
      <div class="singer-image-cover mr-8">
        <img :src="artist.picUrl + '?param=200y200'" class="singer-image"/>
        <v-btn class="singer-link subtitle-3" color="rgba(0,0,0,.53)" rounded height="24px"><i class="iconfont icon-user"></i> 个人主页 <i class="iconfont icon-enter"></i></v-btn>
      </div>
      <div class="singer-info">
        <div class="singer-name-wrapper d-flex mb-5">
          <span class="tag mr-2">
            歌手
          </span>
          <div class="name-wrapper">
            <div class="name d-flex justify-space-between align-center mb-2">{{artist.name}} <v-btn color="#25272b" height="26px" class="subtitle-3" depressed> <i class="iconfont icon-addfile"></i> {{artist.followed ? '已' : ''}}收藏</v-btn></div>
            <div class="alia subtitle-3">{{artist.alias[0]}}</div>
          </div>
        </div>
        <div class="song-count subtitle-3">
          <i class="iconfont icon-music grey--text mr-1"></i> 单曲数: {{artist.musicSize}}
        </div>
        <div class="album-count subtitle-3">
           <i class="iconfont icon-disc grey--text mr-1"></i>  专辑数: {{artist.albumSize}}
        </div>
        <div class="mv-count subtitle-3">
          <i class="iconfont icon-mv grey--text mr-1"></i> MV: {{artist.mvSize}}
        </div>
      </div>
    </v-row>
    <v-row class="d-flex align-center flex-nowrap pl-8 pr-8 border-b">
      <v-tabs height="40px" background-color="transparent" v-model="currentTab">
        <v-tab class="tab-item">专辑</v-tab>
        <v-tab class="tab-item">MV</v-tab>
        <v-tab class="tab-item">歌手详情</v-tab>
        <v-tab class="tab-item">相似歌手</v-tab>
      </v-tabs>
    </v-row>

    <v-container fluid v-show="currentTab === 0">
      0
    </v-container>
    <v-row fluid v-show="currentTab === 1" class="flex-wrap pt-6 ">
      <div class="responsive" v-for="MV in MVlist" :key="MV.id">   
        <base-video-cover  :video='MV'  width="160px"/>
      </div>
    </v-row>
    <v-container fluid v-show="currentTab === 2">
      <h4 class="mb-4" v-if="currentTab === 2">
        {{artist.name}}简介
      </h4>
      <p class="grey--text subtitle-2 mb-8 paragraph">
        {{briefDesc}}
      </p>
      <div v-for="(intro, index) in introduction" :key="index" class="mb-4">
        <h4 class="mb-4 mt-8">
        {{intro.ti}}
        </h4>
        <p class="grey--text subtitle-2 mb-4 paragraph" v-for='(p, index) in intro.txt' :key="index">
          {{p}}
        </p>
      </div>
    </v-container>
    <v-row fluid v-show="currentTab === 3" class="flex-wrap pt-6">
      <base-singer-cover v-for="singer in similarSinger" :key="singer.id" :singer='singer' class="ml-4 mr-4" @click.native="$router.push('/main/singer/' + singer.id)"/>
    </v-row>
  </v-container>
</template>

<script>
import { getSingerHotMusic, getSingerMusic, getSingerDesc, getSimilarSinger, getSingerMV } from '@/API/singer.js'
import BaseSingerCover from '@/base/singer-cover/base-singer-cover.vue'
import BaseVideoCover from '@/base/video-cover/base-video-cover.vue'
import bus from '@/common/bus.js'
export default {
  data() {
    return {
      id: '',
      artist:null,
      currentTab: 0,
      briefDesc: '',
      introduction: [],
      similarSinger: [],
      MVlist: [],
      MVPage: 1,
      moreMV: true
    }
  },
  components: {
    BaseSingerCover,
    BaseVideoCover
  },
  created() {
    this.initData()
    bus.on('scroll:reachBottom', this.getSingerMv)
  },
  destroyed(){
    bus.off('scroll:reachBottom', this.getSingerMv)
  },
  methods: {
    initData(){
      this.id = this.$route.params.id
      getSingerHotMusic(this.id).then(data => console.log(data))
      getSingerMusic(this.id).then(({artist}) => this.artist = artist)
      getSingerDesc(this.id).then(({briefDesc, introduction}) => {
        this.briefDesc = briefDesc
        this.introduction = introduction.map(intro => ({...intro, txt: intro.txt.trim().split(/[\r\n]/g)}))
      })
      getSimilarSinger(this.id).then(({artists}) => this.similarSinger = artists)
      this.getSingerMv()
    },
    getSingerMv(){
      console.log('到底了')
      if(!this.moreMV) return
      getSingerMV({id: this.id, page: this.MVPage}).then(({mvs, hasMore}) => {
        this.MVlist.push(...mvs)
        this.moreMV = hasMore
      })
      this.MVPage++
    },
    handleSingerChange(){
      this.currentTab = 0
      this.MVPage = 1
      this.MVlist = []
      this.moreMV = true
    }
  },
  watch: {
    '$route'(){
      this.handleSingerChange()
      this.initData()
    }
  }
}
</script>

<style lang="scss" scoped>
.singer-image-cover {
  width: 200px;
  position: relative;
  .singer-link{
    position: absolute;
    left: 50%;
    bottom: 30px;
    transform: translate3d(-50%, 0, 0)
  }
}
.singer-info{
  flex: 1;
  .singer-name-wrapper{
    display: flex;
    .name-wrapper{
      flex: 1;
    }
    .name{
      margin-top: -5px;
    }
  }
  .tag{
    color: #fff;
    background-color: $theme-color;
    font-size: 13px;
    border-radius: 4px;
    padding: 0 8px;
    height: 21px;
    line-height: 21px;
    flex-shrink: 0;
  }
  .name{
    font-size: 20px;
  }
}
.responsive{
  display: flex;
  justify-content: center;
  @media screen and (min-width: 1740px) {
    width: 12.5%;
  }
  @media screen and (min-width: 1550px) and (max-width: 1740px) {
    width: 14.28%;
  }
  @media screen and (min-width: 1360px) and (max-width: 1550px){
    width: 16.66%;
  }
  @media screen and (min-width: 1170px) and (max-width: 1360px){
    width: 20%;
  }
  @media screen and (min-width: 1020px) and (max-width: 1170px){
    width: 25%;
  }
}
.icon-addfile{
  font-size: 20px;
}
.paragraph{
  text-indent: 2em;
  line-height: 2;
}
</style>
