<template>
  <v-container fluid class="container-1040">
    <v-row>
      <base-swiper :list="banners" />
    </v-row>
    <base-title text="推荐歌单" to="/main/recommend/song-list" />
    <v-row class="d-flex justify-space-between">
      <div class="daily-wrapper" :style="{width: '18.46%'}">
        <div class="inner">
          <div class="day grey--text text--darken-2">
            {{day}}
          </div>
          <div class="date">
            {{date}}
          </div>
        </div>
        <div class="name">每日歌曲推荐</div>
      </div>
      <base-song-list-cover
        v-for="songList in recommendSongList"
        :key="songList.id"
        width="18.46%"
        :song-list="songList"
      />
    </v-row>
    <base-title text="独家放送"  to='/main/personalizedContent'/>
    <v-row class="d-flex justify-space-between" v-if="personalizedContent.length">
      <base-personalized-content-cover v-for="content in personalizedContent" :key="content.videoId"
      width="32.21%" :personalized-content="content"/>
    </v-row>
  </v-container>
</template>

<script>
import BaseSwiper from '@/base/swiper/base-swiper.vue'
import BaseTitle from '@/base/title/base-title.vue'
import BaseSongListCover from '@/base/song-list-cover/base-song-list-cover.vue'
import BasePersonalizedContentCover from '@/base/personalized-content-cover/base-personalized-content-cover.vue'
import dayjs from '@/common/day.js'

import {
  getBanner,
  getRecommendSongListWithLogin,
  getRecommendSongListWithoutLogin,
  getPersonalizedContent
} from '@/API/recommend.js'
import { mapGetters } from 'vuex'
export default {
  // 声明一个name，为了让keep-alive有条件地进行缓存
  name: 'recommend-index',
  components: {
    BaseSwiper,
    BaseTitle,
    BaseSongListCover,
    BasePersonalizedContentCover
  },
  computed: {
    ...mapGetters('user', {
      loginState: 'loginState'
    })
  },
  data() {
    return {
      banners: [],
      recommendSongList: [], //推荐歌单
      day: dayjs().format('dddd'),
      date: dayjs().format('D'),
      personalizedContent: [] // 独家放送
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
  }
}
</script>

<style lang="scss" scoped>
.daily-wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 36px;
  .inner{
    width: 100%;
    padding-top: 100%;
    position: relative;
    cursor: pointer;
    margin-bottom: 8px;
    background-color: #fff;
    .day,.date{
      position: absolute;
    }
    .day{
      top: 10%;
      font-size: 16px;
      text-align: center;
      width: 100%;
    }
    .date{
      top: 10%;
      width: 100%;
      text-align: center;
      font-size: 104px;
      color: #b82525;
      font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
      @media screen and (max-width: 1066px){
        font-size: 96px
      }
    }
  }
  .name {
    font-size: 13px;
  }
}
</style>
