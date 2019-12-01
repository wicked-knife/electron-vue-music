<template>
  <v-container fluid>
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
            <i class="iconfont icon-star" v-if="radio.dj.userType === 201"></i>
            <i class="iconfont icon-local-music" v-if="radio.dj.userType === 4"></i>
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
          <span class="tag" @click="$router.push('/main/radio-cate-list/' + radio.categoryId)">{{radio.category}}</span>
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
    <v-row v-show="currentTab === 0" >
      <div class="pl-4 subtitle-3 grey--text d-flex align-center pt-2 pb-2 list-head pr-5 justify-space-between text--darken-2"
      ref="list-wrapper">
        共{{radio && radio.programCount}}期
        <div>
          排序
          <v-btn-toggle @change="handleSortTypeChange" :value="0">
            <v-btn height="26px" min-width="30px" width="30px">
              <i class="iconfont icon-sort_down"></i>
            </v-btn>
            <v-btn height="26px" min-width="30px" width="30px">
              <i class="iconfont icon-sort_up"></i>
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <div v-loading="loading" style="width: 100%;">
        <base-radio-program v-for="(program, index) in programs" :key="program.id" :program="program" :stripe="index % 2 !== 1" 
        :index="sortType ? index + 1 + (programPage - 1) * 100 : radio.programCount - index - (programPage - 1) * 100" 
        :active='activeID === program.id' @click.native="activeID = program.id"/>
      </div>
      <v-pagination v-if="radio && radio.programCount > 100" v-model="programPage" total-visible="9" :length="Math.ceil(radio.programCount / 100)" color="#b82525"/>
    </v-row>

    <v-container fluid v-show="currentTab === 1" class="pa-0">
      暂无接口
    </v-container>

  </v-container>
</template>

<script>
import { getRadioDetail, getRadioProgramList } from '@/API/radio.js'
import BaseRadioProgram from '@/base/radio-program/base-radio-program.vue'
import dayjs from '@/common/day.js'
let listOffsetTop = 0
export default {
  components:{
    BaseRadioProgram
  },
  data() {
    return {
      programs: [],
      radio: null,
      loading: false,
      expanded: false,
      shouldShowExpand: false,
      currentTab: 0,
      activeID: '',
      sortType: false, // false: 从新到旧 true: 从旧到新
      programPage: 1
    }
  },
  created() {
    getRadioDetail(this.$route.params.id).then(({djRadio}) => {
      this.radio = djRadio
      this.$nextTick(() => {
        this.__checkShouldExpand()
      })
    })
    this.getRadioProgramList()
  },
  methods: {
    __checkShouldExpand() {
      this.shouldShowExpand = this.$refs['desc'].offsetHeight !== 20
    },
    getRadioProgramList(shouldScrollTop){
      this.loading = true
      getRadioProgramList({rid: this.$route.params.id, asc: this.sortType, page: this.programPage}).then(({programs}) => {
        this.programs = programs
        this.$nextTick(() => {
          if(this.currentTab === 0) {
            if(!listOffsetTop) {
              listOffsetTop = this.$refs['list-wrapper'].offsetTop
            }
            shouldScrollTop && document.querySelector('.__fix-viewport').scrollTo(0, listOffsetTop)
          }
        })
        this.loading = false
      })
    },
    handleSortTypeChange(v){
      this.sortType = !!v
      this.programPage = 1
      this.getRadioProgramList()
    }
  },
  watch: {
    programPage(){
      this.getRadioProgramList(true)
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
  flex-shrink: 0; 
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
