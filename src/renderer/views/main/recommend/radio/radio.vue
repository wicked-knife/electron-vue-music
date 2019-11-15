<template>
  <v-container fluid class="container-1040">
    <v-row>
      <base-swiper :list="banners" @swiper-click="handleSwiperClick" height="210px"/>
    </v-row>
    <v-row>
      <v-tabs
      background-color="cyan"
      dark
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab
        v-for="i in 30"
        :key="i"
        :href="'#tab-' + i"
      >
        Item {{ i }}
      </v-tab>
    </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
import {getRadioBanner, getRadioCateList} from '@/API/radio.js'
import BaseSwiper from '@/base/swiper/base-swiper.vue'
import {shell} from 'electron'
export default {
  data(){
    return {
      banners: []
    }
  },
  components: {
    BaseSwiper
  },
  methods: {
    handleSwiperClick(item){
      item.targetType === 60004 && shell.openItem(item.url)
    }
  },
  created(){
    getRadioBanner().then(data => this.banners = data.data.map(i => ({...i, imageUrl: i.pic})))
    getRadioCateList().then(data => console.log(data))
  }
}
</script>
