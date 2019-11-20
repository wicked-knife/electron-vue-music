<template>
  <v-container fluid class="container-1040" v-loading="loading">
    <v-row class="mb-6">
      <base-swiper :list="banners" @swiper-click="handleSwiperClick" height="210px" />
    </v-row>
    <v-row class="mb-12">
      <v-tabs height="70px" show-arrows background-color="transparent" hide-slider>
        <v-tab
          v-for="cate in cateList"
          :ripple="false"
          class="d-flex flex-column justify-center align-center"
          :key="cate.id"
        >
          <div class="cate-icon" :style="{backgroundImage: 'url(' + cate.picPCBlackUrl + ')'}"></div>
          {{cate.name}}
        </v-tab>
      </v-tabs>
    </v-row>
      <base-title text="创作|翻唱" />
      <v-row class="d-flex justify-space-between mb-10">
        <BaseRadioCover v-for="radio in createList" :radio="radio" :key="radio.id" width="15.38%" />
      </v-row>
      <base-title text="3D|电子" />
      <v-row class="d-flex justify-space-between mb-10">
        <BaseRadioCover v-for="radio in elecList" :radio="radio" :key="radio.id" width="15.38%" />
      </v-row>
      <base-title text="音乐故事" />
      <v-row class="d-flex justify-space-between mb-10">
        <BaseRadioCover v-for="radio in storyList" :radio="radio" :key="radio.id" width="15.38%" />
      </v-row>
      <base-title text="情感调频" />
      <v-row class="d-flex justify-space-between mb-10">
        <BaseRadioCover v-for="radio in emoList" :radio="radio" :key="radio.id" width="15.38%" />
      </v-row>
      <base-title text="二次元" />
      <v-row class="d-flex justify-space-between mb-6">
        <BaseRadioCover v-for="radio in ACGNList" :radio="radio" :key="radio.id" width="15.38%" />
      </v-row>
  </v-container>
</template>

<script>
import {
  getRadioBanner,
  getRadioCateList,
  getRadioListByCate
} from '@/API/radio.js'
import BaseSwiper from '@/base/swiper/base-swiper.vue'
import BaseTitle from '@/base/title/base-title.vue'
import BaseRadioCover from '@/base/radio-cover/base-radio-cover.vue'
import { shell } from 'electron'
export default {
  name: 'recommend-radio',
  data() {
    return {
      banners: [],
      cateList: [],
      createList: [],
      elecList: [],
      storyList: [],
      emoList: [],
      ACGNList: [],
      loading: true
    }
  },
  components: {
    BaseSwiper,
    BaseTitle,
    BaseRadioCover
  },
  methods: {
    handleSwiperClick(item) {
      item.targetType === 60004 && shell.openItem(item.url)
    }
  },
  created() {
    getRadioBanner().then(
      ({ data }) => (this.banners = data.map(i => ({ ...i, imageUrl: i.pic })))
    )
    getRadioCateList().then(({ categories }) => (this.cateList = categories))
    Promise.all([
      getRadioListByCate(2001),
      getRadioListByCate(10002),
      getRadioListByCate(2),
      getRadioListByCate(3),
      getRadioListByCate(3001)
    ]).then(
      ([
        { djRadios: createList },
        { djRadios: elecList },
        { djRadios: storyList },
        { djRadios: emoList },
        { djRadios: ACGNList }
      ]) => {
        this.createList = createList.slice(0, 6)
        this.elecList = elecList.slice(0, 6)
        this.storyList = storyList.slice(0, 6)
        this.emoList = emoList.slice(0, 6)
        this.ACGNList = ACGNList.slice(0, 6)
        this.loading = false
      }
    )
  }
}
</script>

<style lang="scss" scoped>
.cate-icon {
  background-image: url("https://p3.music.126.net/J2c_9ke1EMQ0EvqEXojzLQ==/18996262393228949.jpg");
  width: 30px;
  height: 30px;
  margin-bottom: 10px;
}
</style>
