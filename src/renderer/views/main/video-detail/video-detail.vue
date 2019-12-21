<template>
  <v-container fluid class="container-1040 d-flex" v-if="video">
    <div class="left mr-4 ">
      <v-row class="flex align-center">
        <i class="iconfont icon-return pl-1 pr-1" @click="$router.back()"></i>
        <div class="subtitle-1 text-ellipsis">{{video.title}}</div>
        <div class="caption ml-4">by {{video.creator.nickname}}</div>
      </v-row>
      <div class="mt-1">
        <div ref="player"></div>
      </div>
    </div>
    <div class="right ml-4">
      <base-title text="视频介绍" />
      <v-row class="d-flex justify-space-between mb-4">
        <span class="caption grey--text text--darken-1">发布时间 {{video.publishTime}}</span>
        <span class="caption grey--text text--darken-1">播放次数 {{video.playTime}}</span>
      </v-row>
      <v-row>
        <div class="caption grey--text text--darken-1">
          标签: {{video.videoGroup.map(i => i.name).join(' / ')}}
        </div>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {getVideoData, getVideoPlayURL} from '@/API/video.js'
import BaseTitle from '@/base/title/base-title.vue'
import dayjs from '@/common/day.js'
import Player from 'xgplayer'
export default {
  data: () => ({
    id: '',
    video: null
  }),
  components: {
    BaseTitle
  },
  created(){
    this.id = this.$route.params.id
    getVideoPlayURL(this.id).then(({urls}) => {
      const [source] = urls
      getVideoData(this.id).then(({data: video}) => {
        this.video = {...video, ...{publishTime: dayjs(video.publishTime).format('YYYY-MM-DD')}}
        this.$nextTick(() => {
          new Player({
            el: this.$refs['player'],
            url: source.url,
            fluid: true,
            videoInit: true,
            lang: 'zh-cn'
          })
        })
      })
    })
  },
  methods: {
    initVideo(){

    }
  }
}
</script>

<style lang="scss" scoped>
.icon-return{
  font-size: 20px;
  cursor: pointer;
}
.left{
  width: 700px;
  .title{
    max-width: 60%;
  }
}
.right{
  width: calc(100% - 720px);
}
</style>
