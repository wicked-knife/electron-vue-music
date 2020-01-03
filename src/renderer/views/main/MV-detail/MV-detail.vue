<template>
<div v-loading="loading">
  <v-container fluid class="container-980 d-flex" v-if="mv">
    <div class="left mr-7 pr-4">
      <v-row class="flex align-center">
        <i class="iconfont icon-return pr-1" @click="$router.back()"></i>
        <div class="subtitle-1 text-ellipsis video-title">
          <span class="tag mr-1">MV</span>{{mv.name}}</div>
        <div class="caption ml-4">by {{mv.artistName}}</div>
      </v-row>
      <v-row class="mt-1">
        <div ref="player"></div>
      </v-row>
      <v-row class="mt-4 mb-10">
        <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
          <i class="iconfont icon-praise grey--text mr-1"></i>
          赞({{mv.subCount}})
        </v-btn>
        <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2 ml-3 mr-3">
          <i class="iconfont icon-addfile grey--text mr-1"></i>
          收藏({{mv.likeCount}})
        </v-btn>
        <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
          <i class="iconfont icon-share grey--text mr-1"></i>
          分享({{mv.shareCount}})
        </v-btn>
      </v-row>
      <app-comment :resourceID="id" :resourceType="1"/>
    </div>
    <div class="right pl-4">
      <base-title text="视频介绍" />
      <v-row class="d-flex justify-space-between mb-4">
        <span class="caption grey--text text--darken-1">发布时间 {{mv.publishTime}}</span>
        <span class="caption grey--text text--darken-1">播放次数 {{mv.playCount}}</span>
      </v-row>
    </div>
  </v-container>

</div>
</template>

<script>
import { getMVData, getMVPlayURL } from '@/API/video.js'
import BaseTitle from '@/base/title/base-title.vue'
import AppComment from '@/components/app-comment/app-comment.vue'
import Player from 'xgplayer'
export default {
  data: () => ({
    id: '',
    mv: null,
    loading: true
  }),
  components: {
    BaseTitle,
    AppComment
  },
  created() {
    this.id = this.$route.params.id
    getMVData(this.id).then(({data: mv}) => {
      this.mv = mv
      getMVPlayURL(this.id).then(({ data: sourceData }) => {
        this.loading = false
        this.$nextTick(() => {
          new Player({
            el: this.$refs['player'],
            url: sourceData.url,
            fluid: true,
            videoInit: true,
            lang: 'zh-cn'
          })
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.container-980{
  max-width: 980px;
}
.tag {
  color: $theme-color;
  border: 1px solid $theme-color;
  font-size: 13px;
  padding: 0 4px;
}
.icon-return {
  font-size: 20px;
  cursor: pointer;
}
.left {
  width: 70%;
  .title {
    max-width: 60%;
  }
}
.right {
  width: 26%;
}
.icon-praise,.icon-praise_fill{
  font-size: 20px;
}
.icon-addfile {
  font-size: 20px;
}
.icon-share {
  transform: translateY(1px);
}
.video-title{
  max-width: 60%;
}
</style>
