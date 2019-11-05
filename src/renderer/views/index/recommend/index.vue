<template>
  <div>
    <swiper :list='list' :height='270'>

    </swiper>
  </div>
</template>

<script>
import swiper from '@/base/swiper/swiper.vue'
import {getBanner} from '@/API/recommend/banner.js'
export default {
  components: {
    swiper
  },
  data(){
    return {
      list: []
    }
  },
  created(){
    getBanner().then(data => {
      this.list = data.data.banners
    })
  }
}
</script>

<style lang="scss" scoped>
  
</style>
