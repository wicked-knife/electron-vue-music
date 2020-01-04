<template>
  <v-container fluid class="pl-0 pr-0">
    <base-title text="评论" />
    <base-comment-input class="mb-4" @submit-comment="handleSubmitComment" ref="commentInput" 
    @submit-reply-comment="handleSubmitReplyComment"/>
    <base-title text="精彩评论" v-if="page === 1 && hotComments.length !== 0" />
    <v-row v-if="page === 1 && hotComments.length !== 0">
      <base-comment-item
        v-for="comment in hotComments"
        :key="comment.commentId"
        :comment="comment"
        :resourceType="resourceType"
        @reply-comment="handleReplyComment"
      />
    </v-row>
    <v-btn
      block
      text
      v-if="page === 1 && hotComments.length !== 0 && moreHot"
      class="mt-2 mb-4" @click="toHotComments" >
      查看更多精彩评论
      <i class="iconfont icon-enter"></i>
    </v-btn>
    <base-title text="最新评论" />
    <v-row>
      <base-comment-item
        v-for="comment in comments"
        :key="comment.commentId"
        :comment="comment"
        :resourceType="resourceType"
        @reply-comment="handleReplyComment"
      />
    </v-row>
    <v-row>
      <v-pagination v-model="page" total-visible="9" color="#b82525" v-if="total > 50" :length="Math.ceil(total / 50)" />
    </v-row>
  </v-container>
</template>

<script>
import BaseCommentInput from '@/base/comment-input/base-comment-input.vue'
import BaseTitle from '@/base/title/base-title.vue'
import BaseCommentItem from '@/base/comment-item/base-comment-item.vue'
import {submitComment, getVideoComments, getMVComments, getSongListComment, replyComment} from '@/API/comment.js'
export default {
  props: {
    resourceID: {
      // 评论的资源ID
      type: String,
      required: true
    },
    resourceType: {
      // 评论的资源类型 0: 歌曲 1: mv 2: 歌单 3：专辑 4:电台 5: 视频 6: 动态
      type: Number,
      required: true
    }
  },
  data: () => ({
    comments: [],
    hotComments: [],
    moreHot: false,
    total: 0,
    page: 1,
    resourceTypeToFunc: {
      1: getMVComments,
      2: getSongListComment,
      5: getVideoComments
    }
  }),
  components: {
    BaseCommentInput,
    BaseCommentItem,
    BaseTitle
  },
  created(){
    this.loadComments()
  },
  methods:{
    loadComments(){
      this.resourceTypeToFunc[this.resourceType]({id: this.resourceID, page: this.page}).then(({comments, hotComments, moreHot, total}) => {
        this.comments = comments
        this.hotComments = hotComments
        this.moreHot = moreHot
        this.total = total
      })
    },
    handleSubmitComment(content){
      submitComment({type: this.resourceType, id: this.resourceID, content}).then(() => {
        this.$alert('发布成功')
        this.$refs['commentInput'].clearInput()
      })
    },
    toHotComments(){
      this.$router.push({name: 'hot-comments', params: {type: this.resourceType, id: this.resourceID}})
    },
    handleReplyComment(comment){
      this.$refs['commentInput'].setReplyContent(comment)
    },
    handleSubmitReplyComment(comment){
      replyComment({type: this.resourceType, id: this.resourceID, commentId: comment.commentId, content: comment.content}).then(() => {
        this.$alert('回复成功')
      })
    }
  },
  watch: {
    page(){
      this.loadComments()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
