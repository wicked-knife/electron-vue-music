<template>
  <v-container fluid class="container-1040">
    <v-row class="mb-6">
      <base-swiper :list="banners" @swiper-click="handleSwiperClick" height="210px"/>
    </v-row>
    <v-row>
    <v-tabs height="70px" show-arrows background-color="transparent" hide-slider>
      <v-tab
        v-for="cate in cateList" :ripple='false' class="d-flex flex-column justify-center align-center"
        :key="cate.id">
        <div class="cate-icon" :style="{backgroundImage: 'url(' + cate.picPCBlackUrl + ')'}"></div>
        {{cate.name}}
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
  name: 'recommend-radio',
  data(){
    return {
      banners: [],
      cateList: []
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
    getRadioCateList().then(data => this.cateList = data.categories)
  }
}
</script>

<style lang="scss" scoped>
.cate-icon{
  background-image: url('https://p3.music.126.net/J2c_9ke1EMQ0EvqEXojzLQ==/18996262393228949.jpg');
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
}
</style>
