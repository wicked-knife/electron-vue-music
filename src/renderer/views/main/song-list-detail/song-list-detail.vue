<template>
  <v-container fluid v-loading="loading">
    <v-row class="d-flex pl-7 pr-7 mb-6" v-if="songList">
      <div class="song-list-image mr-6">
        <img :src="songList.coverImgUrl + '?param=200y200'" />
      </div>
      <div class="song-list-info">
        <div class="song-list-title mb-2">
          <span class="tag mr-1">歌单</span>
          <div class="song-list-name">{{songList.name}}</div>
          <div class="music-count border-r grey--text text--darken-2">
            <div>歌曲数</div>
            <div>{{songList.trackIds.length}}</div>
          </div>
          <div class="play-count grey--text text--darken-2">
            <div>播放数</div>
            <div>{{__playCount}}</div>
          </div>
        </div>
        <div class="song-list-creator mb-4">
          <div class="avatar mr-2">
            <v-avatar min-width="32px" height="32px" width="32px">
              <img :src="songList.creator.avatarUrl + '?param=40y40'" />
            </v-avatar>
            <i class="iconfont V" v-if="songList.creator.userId === 1">V</i>
            <i class="iconfont icon-star" v-if="songList.creator.userType === 200"></i>
          </div>
          <div class="nickname grey--text subtitle-2 mr-4">{{songList.creator.nickname}}</div>
          <div class="create-time grey--text text--darken-2">{{__formatedDate}}创建</div>
        </div>
        <div class="btn-group mb-4">
          <v-btn color="#b82525" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-play_fill mr-1"></i>播放全部
          </v-btn>
          <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-addfile mr-1 grey--text"></i>
            {{songList.subscribed ? '已收藏' : '收藏全部'}}({{songList.subscribedCount}})
          </v-btn>
          <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-share grey--text mr-1"></i>
            分享({{songList.shareCount}})
          </v-btn>
          <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-download grey--text mr-1"></i>下载全部
          </v-btn>
        </div>
        <div class="song-list-tag subtitle-3 mb-2" v-if="songList.tags.length !== 0">
          标签:
          <span
            v-for="tag in songList.tags"
            :key="tag"
            class="blue--text text--darken-3 ml-1 mr-1"
          >{{tag}}</span>
        </div>
        <div class="desc subtitle-3" v-if="songList.description">
          <i
            :class="['iconfont icon-down grey--text text--darken-2', expanded ? 'expanded' : '']"
            @click="expanded = !expanded"
            v-if="shouldShowExpand"
          ></i>
          <span class="tit">简介:</span>
          <pre :class="['desc-text ml-2', expanded ? 'expanded' : '']" ref="desc">{{songList.description}}</pre>
        </div>
      </div>
    </v-row>
    <v-row class="d-flex align-center flex-nowrap pl-8 pr-8 border-b">
      <v-tabs height="40px" background-color="transparent" v-model="currentTab">
        <v-tab class="tab-item">歌曲列表</v-tab>
        <v-tab class="tab-item">评论({{songList ? songList.commentCount : ''}})</v-tab>
        <v-tab class="tab-item">收藏者</v-tab>
      </v-tabs>
      <base-input background-color='#202226' placeholder="搜索歌单音乐" v-show="currentTab === 0"/>
    </v-row>
    <v-row v-show="currentTab === 0">
      <base-music-table :headers='tableHeaders' :items='songList.tracks' v-if="songList"/>
    </v-row>

    <v-container v-show="currentTab === 1" class="pl-4 pr-4" ref="comment-wrapper">
      <base-comment-input class="mb-4"/>
      <base-title text="精彩评论" v-if="commentPage === 1 && hotCommentList.length !== 0"/>
      <v-row v-if="commentPage === 1 && hotCommentList.length !== 0">
        <base-comment-item v-for="comment in hotCommentList" :key="comment.commentId" :comment="comment"/>
      </v-row>
      <base-title text="最新评论"/>
      <v-row>
        <base-comment-item v-for="comment in commentList" :key="comment.commentId" :comment="comment"/>
      </v-row>
      <v-row>
        <v-pagination v-if="songList && songList.commentCount > 50" v-model="commentPage" total-visible="9" :length="Math.floor(songList.commentCount / 50)" color="#b82525"/>
      </v-row>
    </v-container>

    <v-container fluid v-show="currentTab === 2" class="pa-0">
      <v-row v-show="currentTab === 2" class="pt-4 subscribers">
        <div class="avatar-item mb-9" v-for="subscriber in subscribers" :key="subscriber.userId">
          <v-avatar width="60px" height="60px" class="mb-2">
            <img :src="subscriber.avatarUrl + '?param=60y60'" draggable="false">
          </v-avatar>
          <span class="caption grey--text avatar-nickname">
            {{subscriber.nickname}}
          </span>
        </div>
      </v-row>
        <v-row>
          <v-pagination v-if="songList && songList.subscribedCount > 66" v-model="subscribersPage" total-visible="9" :length="Math.floor(songList.subscribedCount / 66)" color="#b82525"/>
        </v-row>
    </v-container>

  </v-container>
</template>

<script>
import { getSongListDetail, getSongListSubscribers } from '@/API/songList.js'
import { getSongListComment } from '@/API/comment.js'
import BaseInput from '@/base/input/base-input.vue'
import BaseCommentInput from '@/base/comment-input/base-comment-input.vue'
import BaseCommentItem from '@/base/comment-item/base-comment-item.vue'
import BaseTitle from '@/base/title/base-title.vue'
import BaseMusicTable from '@/base/music-table/base-music-table.vue'
import dayjs from '@/common/day.js'
let commentOffsetTop = 0
export default {
  components:{
    BaseInput,
    BaseCommentInput,
    BaseTitle,
    BaseCommentItem,
    BaseMusicTable
  },
  data() {
    return {
      songList: null,
      loading: true,
      expanded: false,
      shouldShowExpand: false,
      currentTab: 0,
      tableHeaders: [
        {text: '音乐标题', sortable: true, value: 'name', width:'40%'},
        {text: '歌手', sortable: true, value: 'artists', width: '20%'},
        {text: '专辑', sortable: true, value: 'album', width: '20%'},
        {text: '时长', sortable: true, value: 'duration', width: '100px'}
      ],
      subscribers: [], // 收藏者
      subscribersPage: 1, // 收藏者当前页
      commentList: [],
      hotCommentList: [],
      commentPage: 1
    }
  },
  created() {
    getSongListDetail(this.$route.params.id).then(({ playlist }) => {
      playlist.tracks.forEach(song => {
        let minutes = Math.floor(song.dt / 1000 / 60)
        let seconds = Math.floor(song.dt / 1000 % 60)
        song.duration = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
        song.name = [song.name, ...song.alia]
        song.artists = song.ar.map(artist => artist.name)
        song.album = song.al.name
      })
      this.songList = playlist
      this.loading = false
      this.songList.description && this.$nextTick(this.__checkShouldExpand)
    })
    this.getSongListSubscribers()
    this.getCommentList()
  },
  methods: {
    __checkShouldExpand() {
      this.shouldShowExpand = this.$refs['desc'].offsetHeight !== 18
    },
    getSongListSubscribers(){
      getSongListSubscribers({id: this.$route.params.id, limit: 66, page: this.subscribersPage}).then(({subscribers}) => {
        this.subscribers = subscribers
      })
    },
    getCommentList(){
      getSongListComment({id: this.$route.params.id, limit: 50, page: this.commentPage}).then(({hotComments, comments}) => {
        !this.hotCommentList.length && (this.hotCommentList = hotComments || [])
        this.commentList = comments
        this.$nextTick(() => {
          if(this.currentTab === 1) {
            if(!commentOffsetTop) {
              commentOffsetTop = this.$refs['comment-wrapper'].offsetTop
            }
            document.querySelector('.__fix-viewport').scrollTo(0, commentOffsetTop)
          }
        })
      })
    }
  },
  watch: {
    subscribersPage(){
      this.getSongListSubscribers()
    },
    commentPage(){
      this.getCommentList()
    }
  },
  computed: {
    __playCount() {
      return this.songList.playCount < 10000
        ? this.songList.playCount
        : Math.floor(this.songList.playCount / 10000) + '万'
    },
    __formatedDate() {
      return dayjs(this.songList.createTime).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
.song-list-image {
  width: 200px;
}
.tab-item{
  min-width: 60px;
  margin: 0 16px;
}
.song-list-info {
  flex: 1;
  .song-list-title {
    display: flex;
    align-items: center;
    .song-list-name {
      font-size: 20px;
      flex: 1;
    }
    .music-count,
    .play-count {
      font-size: 12px;
      padding: 0 8px;
      & > div:nth-child(2) {
        text-align: right;
      }
    }
  }
  .song-list-creator {
    display: flex;
    align-items: center;
    .avatar {
      position: relative;
      width: 36px;
    }
    .iconfont {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 12px;
      height: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-style: unset;
      border-radius: 50%;
    }
    .V {
      font-size: 11px;
      background-color: $theme-color;
    }
    .icon-star {
      font-size: 12px;
      background-color: #ffbd20;
    }
    .nickname {
      font-size: 13px;
      cursor: pointer;
      &:hover {
        color: #fff !important;
      }
    }
    .create-time {
      font-size: 12px;
    }
  }
  .btn-group {
    .icon-play_fill {
      border: 1px solid #fff;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
    }
    .icon-addfile {
      font-size: 20px;
    }
    .icon-share {
      transform: translateY(1px);
    }
    button {
      letter-spacing: initial;
    }
  }
  .song-list-tag {
    span {
      cursor: pointer;
      &:hover {
        color: #1e88e5 !important;
      }
    }
  }
  .desc {
    display: flex;
    position: relative;
    box-sizing: border-box;
    padding-right: 30px;
    .tit {
      display: inline-block;
      width: 28px;
      flex-shrink: 0;
    }
    .desc-text {
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      display: -webkit-box;
      max-width: 100%;
      font-family: inherit;
      white-space: pre-wrap;
      &.expanded {
        -webkit-line-clamp: unset;
      }
    }
    .icon-down {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 14px;
      cursor: pointer;
      &.expanded {
        transform: rotateZ(180deg);
      }
    }
  }
}
.tag {
  color: $theme-color;
  border: 1px solid $theme-color;
  font-size: 13px;
  padding: 0 4px;
}
.subscribers{
.avatar-item{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 9.09%;
  @media screen and (max-width: 1530px){
    width:10%;
  }
  @media screen and (max-width: 1366px){
    width: 11.11%
  }
  @media screen and (max-width: 1280px){
    width: 12.5%
  }
  @media screen and (max-width: 1150px){
    width: 14.28%
  }
  .avatar-nickname{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    text-align: center;
    cursor: pointer;
    &:hover{
      color: #fff !important;
    }
  }
  img{
    cursor: pointer;
  }
}
}
</style>
