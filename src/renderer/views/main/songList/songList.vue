<template>
  <v-container fluid v-loading="loading">
    <v-row class="d-flex pl-7 pr-7" v-if="songList">
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
            <i class="iconfont icon-star" v-if="songList.creator.userType !== 200"></i>
          </div>
          <div class="nickname grey--text subtitle-2 mr-4">{{songList.creator.nickname}}</div>
          <div class="create-time grey--text text--darken-2">{{__formatedDate}}创建</div>
        </div>
        <div class="btn-group mb-4">
          <v-btn color="#b82525" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-play_fill mr-1 "></i>播放全部
          </v-btn>
          <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-addfile mr-1 grey--text"></i>{{songList.subscribed ? '已收藏' : '收藏全部'}}({{songList.subscribedCount}})
          </v-btn>
          <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-share grey--text mr-1"></i>分享({{songList.shareCount}})
          </v-btn>
          <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-download grey--text mr-1"></i>下载
          </v-btn>
        </div>
        <div class="song-list-tag subtitle-2">
          标签: <span v-for="tag in songList.tags" :key="tag" class="blue--text text--darken-3 ml-1 mr-1 subtitle-3">{{tag}}</span>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { getSongListDetail } from '@/API/songList.js'
import dayjs from '@/common/day.js'
export default {
  data() {
    return {
      songList: null,
      loading: true
    }
  },
  created() {
    getSongListDetail(this.$route.params.id).then(({ playlist }) => {
      this.songList = playlist
      this.loading = false
    })
  },
  computed: {
    __playCount() {
      return this.songList.playCount < 100000
        ? this.songList.playCount
        : Math.floor(this.songList.playCount / 100000) + '万'
    },
    __formatedDate() {
      return dayjs(this.songList.createTime).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss" scoped>
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
  .btn-group{
    .icon-play_fill{
      border: 1px solid #fff;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
    }
    .icon-addfile{
      font-size: 20px;
    }
    .icon-share{
      transform: translateY(1px);
    }
    button{
      letter-spacing: initial;
    }
  }
  .song-list-tag{
    span{
      cursor: pointer;
      &:hover{
        color: #1e88e5 !important;
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
</style>
