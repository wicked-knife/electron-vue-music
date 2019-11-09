<template>
  <v-container fluid class="container-1040">
    <v-row>
      <base-swiper :list="banners" />
    </v-row>
    <base-title text='推荐歌单' to="/main/recommend/song-list" />
    <v-row class="d-flex justify-space-between">
      <base-song-list-cover v-for="songList in recommendSongList" :key="songList.id" width="18.46%"
      :song-list="songList"/>
    </v-row>
  </v-container>
</template>

<script>
import BaseSwiper from '@/base/swiper/base-swiper.vue'
import BaseTitle from '@/base/title/base-title.vue'
import BaseSongListCover from '@/base/song-list-cover/base-song-list-cover.vue'
import { getBanner, getRecommendSongList } from '@/API/recommend.js'
export default {
  // 声明一个name，为了让keep-alive有条件地进行缓存
  name: 'recommend-index',
  components: {
    BaseSwiper,
    BaseTitle,
    BaseSongListCover
  },
  data() {
    return {
      banners: [],
      recommendSongList: []
    }
  },
  created() {
    getBanner().then(data => {
      this.banners = data.banners.map(i => ({ ...i, src: i.imageUrl }))
    })
    getRecommendSongList(10).then(data => {
      this.recommendSongList = data.result
    })
    console.log('index')
  },
}
</script>

<style lang="scss" scoped>

</style>
