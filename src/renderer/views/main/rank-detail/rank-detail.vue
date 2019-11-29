<template>
  <v-container fluid v-loading="loading">
    <v-row class="d-flex pl-7 pr-7 mb-6" v-if="rank">
      <div class="rank-image mr-6">
        <img :src="rank.coverImgUrl + '?param=200y200'" />
      </div>
      <div class="rank-info">
        <div class="rank-title mb-2">
          <span class="tag mr-1">歌单</span>
          <div class="rank-name">{{rank.name}}</div>
          <div class="music-count border-r grey--text text--darken-2">
            <div>歌曲数</div>
            <div>{{rank.trackCount}}</div>
          </div>
          <div class="play-count grey--text text--darken-2">
            <div>播放数</div>
            <div>{{__playCount}}</div>
          </div>
        </div>
        <div class="rank-creator mb-4">
          <div class="avatar mr-2">
            <v-avatar min-width="32px" height="32px" width="32px">
              <img :src="rank.creator.avatarUrl + '?param=40y40'" />
            </v-avatar>
            <i class="iconfont V" v-if="rank.creator.userId === 1">V</i>
            <i class="iconfont icon-star" v-if="rank.creator.userType === 200"></i>
          </div>
          <div class="nickname grey--text subtitle-2 mr-4">{{rank.creator.nickname}}</div>
          <div class="create-time grey--text text--darken-2">最近更新 : {{__updateDate}}</div>
        </div>
        <div class="btn-group mb-4">
          <v-btn color="#b82525" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-play_fill mr-1"></i>播放全部
          </v-btn>
          <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-addfile mr-1 grey--text"></i>
            {{rank.subscribed ? '已收藏' : '收藏全部'}}({{rank.subscribedCount}})
          </v-btn>
          <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-share grey--text mr-1"></i>
            分享({{rank.shareCount}})
          </v-btn>
          <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-download grey--text mr-1"></i>下载全部
          </v-btn>
        </div>
        <div class="rank-tag subtitle-3 mb-2" v-if="rank.tags.length !== 0">
          标签:
          <span
            v-for="tag in rank.tags"
            :key="tag"
            class="blue--text text--darken-3 ml-1 mr-1"
          >{{tag}}</span>
        </div>
        <div class="desc subtitle-3" v-if="rank.description">
          <span class="tit">简介:</span>
          <pre class="desc-text ml-2" ref="desc">{{rank.description}}</pre>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import rankListData from './rankListData.js'
import {getMusicList} from '@/API/rank.js'
import dayjs from '@/common/day.js'
export default {
  data(){
    return {
      id: rankListData.indexOf(this.$route.params.name),
      rank: null,
      loading: true
    }
  },
  created(){
    getMusicList(this.id).then(({playlist}) => {
      this.rank = playlist
      this.loading = false
    })
  },
  computed:{
    __playCount(){
      return this.rank.playCount < 10000
        ? this.rank.playCount
        : Math.floor(this.rank.playCount / 10000) + '万'
    },
    __updateDate(){
      return dayjs(this.rank.trackUpdateTime).format('MM月DD日')
    }
  }
}
</script>


<style lang="scss" scoped>
.rank-image {
  width: 200px;
}
.tab-item{
  min-width: 60px;
  margin: 0 16px;
}
.rank-info {
  flex: 1;
  .rank-title {
    display: flex;
    align-items: center;
    .rank-name {
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
  .rank-creator {
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
  .rank-tag {
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
