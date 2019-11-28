<template>
  <v-container fluid v-loading="loading">
    <v-row class="d-flex pl-7 pr-7 mb-6" v-if="radio">
      <div class="song-list-image mr-6">
        <img :src="radio.picUrl + '?param=200y200'" />
      </div>
      <div class="song-list-info">
        <div class="song-list-title mb-2">
          <span class="title-tag mr-1">电台</span>
          <div class="song-list-name">{{radio.name}}</div>
        </div>
        <div class="song-list-creator mb-4">
          <div class="avatar mr-2">
            <v-avatar min-width="32px" height="32px" width="32px">
              <img :src="radio.dj.avatarUrl + '?param=40y40'" />
            </v-avatar>
            <!-- <i class="iconfont V" v-if="radio.creator.userId === 1">V</i>
            <i class="iconfont icon-star" v-if="radio.creator.userType === 200"></i> -->
            <!-- TODO: 加上图标 radio.dj.userType === 4  -->
            <i class="iconfont icon-local-music"></i>
          </div>
          <div class="nickname grey--text subtitle-2 mr-4">{{radio.dj.nickname}}</div>
          <div class="create-time grey--text text--darken-2">{{__formatedDate}}创建</div>
        </div>
        <div class="btn-group mb-4">
          <v-btn color="#b82525" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-play_fill mr-1"></i>播放全部
          </v-btn>
          <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-star collect mr-1 grey--text"></i>
            {{radio.subed ? '已订阅' : '订阅'}}({{__subCount}})
          </v-btn>
          <v-btn color="#25272b" height="26px" class="subtitle-3 pl-2 pr-2">
            <i class="iconfont icon-share grey--text mr-1"></i>
            分享({{radio.shareCount}})
          </v-btn>
        </div>
        <div class="desc subtitle-3" v-if="radio.desc">
          <i
            :class="['iconfont icon-down grey--text text--darken-2', expanded ? 'expanded' : '']"
            @click="expanded = !expanded"
            v-if="shouldShowExpand"></i>
          <span class="tag">{{radio.category}}</span>
          <pre :class="['desc-text ml-2', expanded ? 'expanded' : '']" ref="desc">{{radio.desc}}</pre>
        </div>
      </div>
    </v-row>
    <v-row class="d-flex align-center flex-nowrap pl-8 pr-8 border-b">
      <v-tabs height="40px" background-color="transparent" v-model="currentTab">
        <v-tab class="tab-item">节目({{radio && radio.programCount}})</v-tab>
        <v-tab class="tab-item">订阅者({{radio && __subCount}})</v-tab>
      </v-tabs>
    </v-row>
    <v-row v-show="currentTab === 0">
      <div class="pl-4 subtitle-3 grey--text d-flex align-center pt-2 pb-2 list-head pr-5 justify-space-between">
        共{{radio && radio.programCount}}期
      </div>
    </v-row>

    <v-container fluid v-show="currentTab === 1" class="pa-0">
      暂无接口
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
import { getRadioDetail, getRadioProgramList } from '@/API/radio.js'
import dayjs from '@/common/day.js'
export default {
  components:{
  },
  data() {
    return {
      songList: null,
      radio: null,
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
    }
  },
  created() {
    getRadioDetail(this.$route.params.id).then(({djRadio}) => {
      this.radio = djRadio
      this.$nextTick(() => {
        this.__checkShouldExpand()
      })
      this.loading = false
    })
    getRadioProgramList({rid: this.$route.params.id}).then(data => console.log(data))
  },
  methods: {
    __checkShouldExpand() {
      this.shouldShowExpand = this.$refs['desc'].offsetHeight !== 20
    }
  },
  watch: {
    subscribersPage(){
      this.getSongListSubscribers()
    }
  },
  computed: {
    __formatedDate() {
      return dayjs(this.radio.createTime).format('YYYY-MM-DD')
    },
    __subCount(){
      return this.radio.subCount < 100000 ? this.radio.subCount : Math.floor(this.radio.subCount / 10000) + '万'
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
    .icon-local-music{
      color: #fff;
      background-color: rgb(184,37,37);
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
    .icon-star{
      font-size: 18px
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
  font-size: 12px;
  padding: 0 4px;
  height: 20px;
  cursor: pointer;
  &:hover{
    filter: brightness(1.3);
  }
}
.title-tag{
  color: #fff;
  font-size: 13px;
  padding: 0 8px;
  height: 22px;
  background-color: #c62f2f;
  border-radius: 4px;
}
.list-head{
  background-color: #1c1e23;
  width: 100%;
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
