<template>
<div v-loading="loading">
  <v-container fluid class="container-980 d-flex" v-if="video">
    <div class="left mr-7 pr-4">
      <v-row class="flex align-center">
        <i class="iconfont icon-return pr-1" @click="$router.back()"></i>
        <div class="subtitle-1 text-ellipsis video-title">{{video.title}}</div>
        <div class="caption ml-4">by {{video.creator.nickname}}</div>
      </v-row>
      <v-row class="mt-1">
        <div ref="player"></div>
      </v-row>
      <v-row class="mt-3 mb-12">
        <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
          <i class="iconfont icon-praise grey--text mr-1"></i>
          赞({{video.praisedCount}})
        </v-btn>
        <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2 ml-3 mr-3">
          <i class="iconfont icon-addfile grey--text mr-1"></i>
          收藏({{video.subscribeCount}})
        </v-btn>
        <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
          <i class="iconfont icon-share grey--text mr-1"></i>
          分享({{video.shareCount}})
        </v-btn>
      </v-row>
      <base-title text="评论" />
      <v-container fluid class="pl-0 pr-0">
        <base-comment-input class="mb-4" @submit-comment="handleSubmitComment" ref="commentInput"/>
        <base-title text="精彩评论" v-if="page === 1 && hotComments.length !== 0"/>
        <v-row v-if="page === 1 && hotComments.length !== 0">
          <base-comment-item v-for="comment in hotComments" :key="comment.commentId" :comment="comment"/>
        </v-row>
        <v-btn block text v-if="page === 1 && hotComments.length !== 0 && moreHot" class="mt-2 mb-4"
        @click='$router.push({name: "hot-comments", params: {type: 5, id}})'
        >查看更多精彩评论 <i class="iconfont icon-enter" ></i></v-btn>
        <base-title text="最新评论"/>
        <v-row>
          <base-comment-item v-for="comment in comments" :key="comment.commentId" :comment="comment"/>
        </v-row>
        <v-row>
          <v-pagination v-if="video && video.commentCount > 50" v-model="page" total-visible="9" :length="Math.floor(video.commentCount / 50)" color="#b82525"/>
        </v-row>
      </v-container>
    </div>
    <div class="right pl-4">
      <base-title text="视频介绍" />
      <v-row class="d-flex justify-space-between mb-4">
        <span class="caption grey--text text--darken-1">发布时间 {{video.publishTime}}</span>
        <span class="caption grey--text text--darken-1">播放次数 {{video.playTime}}</span>
      </v-row>
      <v-row>
        <div class="caption grey--text text--darken-1">标签: {{video.videoGroup.map(i => i.name).join(' / ')}}</div>
      </v-row>
    </div>
  </v-container>
  </div>
</template>

<script>
import { getVideoData, getVideoPlayURL } from '@/API/video.js'
import {getVideoComments, submitComment} from '@/API/comment.js'
import BaseCommentInput from '@/base/comment-input/base-comment-input.vue'
import BaseTitle from '@/base/title/base-title.vue'
import BaseCommentItem from '@/base/comment-item/base-comment-item.vue'
import dayjs from '@/common/day.js'
import Player from 'xgplayer'
export default {
  data: () => ({
    id: '',
    video: null,
    page: 1,
    comments: [],
    hotComments: [],
    moreHot: false,
    loading: true
  }),
  components: {
    BaseTitle,
    BaseCommentInput,
    BaseCommentItem
  },
  created() {
    this.id = this.$route.params.id
    getVideoPlayURL(this.id).then(({ urls }) => {
      const [source] = urls
      getVideoData(this.id).then(({ data: video }) => {
        this.loading = false
        this.video = {
          ...video,
          ...{ publishTime: dayjs(video.publishTime).format('YYYY-MM-DD') }
        }
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
    this.getVideoComments()
  },
  methods: {
    getVideoComments(){
      getVideoComments({id: this.id, page: this.page}).then(({comments, hotComments, moreHot}) => {
        this.comments = comments
        this.hotComments = hotComments
        this.moreHot = moreHot
      })
    },
    handleSubmitComment(content){
      submitComment({type: 5, id: this.id, content}).then(() => {
        this.$alert('发布成功')
        this.$refs['commentInput'].clearInput()
      })
    }
  },
  watch: {
    page(){
      this.getVideoComments()
    }
  }
}
</script>

<style lang="scss" scoped>
.container-980{
  max-width: 980px;
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
