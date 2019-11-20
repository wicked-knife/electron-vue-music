<template>
  <v-container fluid>
    <v-row class="d-flex justify-space-between align-center __title pb-1">
      <span class="subtitle-1">精品歌单</span>
      <div ref="attached-dialog-wrapper">
        <div class="cate grey--text" @click="dialogVisiable = !dialogVisiable">
          <i class="iconfont icon-filter"></i>
          <span class="subtitle-3">{{currentSubCate}}</span>
        </div>
        <base-attached-dialog position="bottom" :value="dialogVisiable" title="选择你喜欢的分类" right  @click:outside='handleClickOutside'>
          <div class="cate-content">
            <div :class="['cate-item mb-2', currentSubCate === '全部歌单' ? 'active' : '']" @click="handleCateItemClick('全部歌单')">
              全部歌单<span class="hot">HOT</span>
            </div>
            <div class="cate-list">
              <div :class="['cate-item', currentSubCate === item.name ? 'active' : '']" v-for="item in cateList" 
                :key="item.name"
                @click="handleCateItemClick(item.name)">
                {{item.name}}
                <span class="hot" v-if="item.hot">HOT</span>
              </div>
            </div>
          </div>
        </base-attached-dialog>
      </div>
    </v-row>
    <v-row class="d-flex justify-space-between" v-loading="loading">
      <base-song-list-cover v-for="list in songList" :key="list.id" :song-list='list' width="33.33%" HQ :showTag='shouldShowTag'/>
      <div style="flex: 1"></div>
    </v-row>
  </v-container>
</template>

<script>
import BaseAttachedDialog from '@/base/attached-dialog/base-attached-dialog.vue'
import BaseSongListCover from '@/base/song-list-cover/base-song-list-cover.vue'
import {getAllCateList, getHighQualitySongList} from '@/API/songList.js'
import bus from '@/common/bus.js'
const HQSongListCate = ['华语', '欧美', '韩语','日语','粤语','小语种','运动','ACG','影视原声','流行','摇滚','后摇','古风','民谣','轻音乐','电子','器乐','说唱','古典','爵士']
export default {
  components: {
    BaseAttachedDialog,
    BaseSongListCover
  },
  data(){
    return {
      cateList: [],
      dialogVisiable: false,
      currentSubCate: '全部歌单',
      songList: [],
      lasttime: 0,
      loading: true,
      shouldShowTag: true,
      more: true
    }
  },
  created(){
    getAllCateList().then(({sub}) => this.cateList = sub.filter(c => HQSongListCate.includes(c.name)))
    this.getHighQualitySongList()
  },
  mounted(){
    bus.on('scroll:reachBottom', this.handleReachBottom)
  },
  methods:{
    handleCateItemClick(cateName){
      this.currentSubCate = cateName
      this.dialogVisiable = false
    },
    handleClickOutside(ev){
      if(!this.$refs['attached-dialog-wrapper'].contains(ev.target)) {
        this.dialogVisiable = false
      }
    },
    getHighQualitySongList(){
      // 向下滚动加载更多时，不要出现loading
      !this.lasttime && (this.loading = true)
      getHighQualitySongList({cat: this.currentSubCate, before: this.lasttime}).then(({lasttime, playlists, more}) => {
        this.more = more
        if(this.lasttime) {
          this.songList.push( ...playlists.map(s => ({...s, picUrl: s.coverImgUrl})) )
        } else {
          this.songList = playlists.map(s => ({...s, picUrl: s.coverImgUrl}))
        }
        this.lasttime = lasttime
        this.loading && (this.loading = false)
      })
    },
    handleReachBottom(){
      this.more && this.getHighQualitySongList()
    }
  },
  watch:{
    currentSubCate(newVal){
      this.shouldShowTag = newVal === '全部歌单'
      this.lasttime = 0
      this.getHighQualitySongList()
    }
  },
  destroyed(){
    bus.off('scroll:reachBottom', this.handleReachBottom)
  }
}
</script>

<style lang="scss" scoped>
.__title{
  border-bottom: 1px solid #23262c;
  margin-bottom: 10px;
}
.cate{
  cursor: pointer;
}
.icon-filter{
  font-size: 12px;
}

.cate-content{
  box-sizing: border-box;
  width: 460px;
  padding: 10px 16px 10px 16px;
}

.cate-list{
  display: flex;
  flex-wrap: wrap;
  .cate-item{
    width: 20%;
  }
}

.cate-item{
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #36383c;
  font-size: 13px;
  height: 36px;
  position: relative;
  color: #757575;
  cursor: pointer;
  &:hover{
    color: #fff;
    background-color: #36383c;
  }
  &.active{
    border-color: $theme-color;
    color: #fff;
    &::before{
      font-family: 'iconfont';
      content: '\e60d';
      display: block;
      position: absolute;
      right: -1px;
      bottom: -3px;
      z-index: 1;
      font-size: 10px;
    }
    &::after{
      content: '';
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      right: -10px;
      bottom: -10px;
      border:  10px solid $theme-color;
      border-color: transparent transparent transparent $theme-color;
      transform: rotateZ(45deg);
    }
  }
  .hot{
    color: $theme-color;
    position: absolute;
    font-size: 8px;
    font-weight: bold;
    right: 2px;
    top: 1px;
  }
}
</style>
