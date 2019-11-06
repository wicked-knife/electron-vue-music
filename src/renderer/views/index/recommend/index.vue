<template>
  <v-container fluid class="mt-2 container-1040">
    <v-row>
      <swiper :list="banners" />
    </v-row>
    <BaseTitle text='推荐歌单' to="/recommend"></BaseTitle>
  </v-container>
</template>

<script>
import swiper from '@/base/swiper/swiper.vue'
import BaseTitle from '@/base/title/base-title.vue'
import { getBanner } from '@/API/recommend/banner.js'
import baseLayoutMixins from '@/mixins/baseLayout.js'
export default {
  mixins: [baseLayoutMixins],
  components: {
    swiper,
    BaseTitle
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
  }
}
</script>

<style lang="scss" scoped>

</style>
