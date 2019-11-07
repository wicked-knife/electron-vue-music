<template>
  <v-container fluid class="container-1040">
    <v-row>
      <base-swiper :list="banners" />
    </v-row>
    <base-title text='推荐歌单' to="/recommend/song-list" />
    <v-row class="d-flex">
      <base-song-list-cover v-for="i in 3" :key='i'/>
    </v-row>
    <button @click="test">alert</button>
  </v-container>
</template>

<script>
import BaseSwiper from '@/base/swiper/base-swiper.vue'
import BaseTitle from '@/base/title/base-title.vue'
import BaseSongListCover from '@/base/song-list-cover/base-song-list-cover.vue'
import { getBanner } from '@/API/recommend/banner.js'
import { getRecommendSongList } from '@/API/recommend/songList.js'
import baseLayoutMixins from '@/mixins/baseLayout.js'
export default {
  mixins: [baseLayoutMixins],
  components: {
    BaseSwiper,
    BaseTitle,
    BaseSongListCover
  },
  data() {
    return {
      banners: []
    }
  },
  created() {
    getBanner().then(data => {
      this.banners = data.data.banners.map(i => ({ ...i, src: i.imageUrl }))
    })
    getRecommendSongList(10).then(data => {
      console.log(data)
    })
  },
  methods:{
    test(){
      this.$alert({text: 'hello world'})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
