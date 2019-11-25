<template>
  <div class="comment-wrapper border-b pb-4 mb-4">
    <div class="comment-l mr-3">
      <v-avatar width="40px" height="40px">
        <img :src="comment.user.avatarUrl + '?param=40y40'" draggable="false" class="avatar">
      </v-avatar>
    </div>
    <div class="comment-r">
      <div class="user-comment subtitle-3">
        <span class="user-name blue--text text--darken-2 mr-1">{{comment.user.nickname}}:</span>{{comment.content}}
      </div>
      <div class="reply mt-2 subtitle-3 grey--text" v-if="comment.beReplied && comment.beReplied.length !== 0">
        <span class="user-name blue--text text--darken-2 mr-1" v-if="comment.beReplied[0].status === 0">@{{comment.beReplied[0].user.nickname}}:</span>{{comment.beReplied[0].content}}
        <div class="text-center" v-if="comment.beReplied[0].status !== 0">
          {{comment.beReplied[0].status === -10 ? '该评论涉及违规内容，经举报已被屏蔽' : '该评论已删除'}}
        </div>
      </div>
      <div class="comment-actions">
        <span class="grey--text subtitle-3 text--darken-2">{{date}}</span>
        <div class="action-group subtitle-3 grey--text text--darken-2">
          <span class="report border-r">
            举报
          </span>
          <span class="d-flex align-center">
            <i :class="['iconfont icon-praise', comment.liked ? 'red--text' : '']"></i>({{comment.likedCount}})
          </span>
          <span class="border-l border-r">分享</span>
          <span>回复</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from '@/common/day.js'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed:{
    date(){
      return dayjs(1573216793480).format('M月D日 HH:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-wrapper{
  display: flex;
  width: 100%;
  &:hover{
    .report{
      visibility: visible !important;
    }
  }
  
  .avatar{
    cursor: pointer;
  }
}
.comment-r{
  width: 100%;
  display: flex;
  flex-direction: column;
  .user-name{
    cursor: pointer;
    &:hover{
      color:#1e88e5 !important;
    }
  }
  .reply{
    box-sizing: border-box;
    background-color: #1c1e23;
    padding: 8px;
  }
  .comment-actions{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .action-group{
    display: flex;
    align-items: center;
    .icon-praise{
      font-size: 20px;
    }
    .report{
      visibility: hidden;
    }
    & > span{
      padding: 0 8px;
      cursor: pointer;
      &:hover{
        color: #9e9e9e !important;
      }
    }
  }
}
</style>
