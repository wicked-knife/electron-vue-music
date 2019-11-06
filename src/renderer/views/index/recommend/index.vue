<template>
  <v-container fluid class="mt-2 container">
    <swiper :list="banners"></swiper>
  </v-container>
</template>

<script>
import swiper from '@/base/swiper/swiper.vue';
import { getBanner } from '@/API/recommend/banner.js';
import baseLayoutMixins from '@/mixins/baseLayout.js';
export default {
  mixins: [baseLayoutMixins],
  components: {
    swiper
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
.container {
  max-width: 1040px;
}
</style>
