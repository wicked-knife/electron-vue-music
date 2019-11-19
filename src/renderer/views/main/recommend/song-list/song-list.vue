<template>
  <v-container fluid class="container-1040">
    <v-row class="mb-3">
      <div ref="attached-dialog-wrapper">
        <v-btn size="small" height="24px" depressed class="subtitle-2" @click="dialogVisiable = !dialogVisiable">
          {{currentSubCate}}<i class="iconfont icon-down"></i>
        </v-btn>
        <base-attached-dialog position="bottom" :value="dialogVisiable" left @click:outside='handleClickOutside'>
          <div class="cate-wrapper">
            <div class="wrapper-title subtitle-2">
              添加标签
            </div>
            <div class="scroller beautify-scrollbar">
              <div class="cate-content">
                <div :class="['cate-item mb-2', currentSubCate === '全部歌单' ? 'active' : '']" @click="handleCateItemClick('全部歌单')">全部歌单<span class="hot">HOT</span></div>
                <div class="content-group" v-for="(cate, key) in categories" :key="cate">
                  <div class="group-l">
                   <i :class="['iconfont grey--text', _setIcon(cate)]"></i> {{cate}}
                  </div>
                  <div class="group-r">
                    <div :class="['cate-item', currentSubCate === item.name ? 'active' : '']" v-for="item in sub.filter(s => s.category === Number(key))" 
                      :key="item.name"
                      @click="handleCateItemClick(item.name)">
                      {{item.name}}
                      <span class="hot" v-if="item.hot">HOT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </base-attached-dialog>
      </div>
    </v-row>
    <v-row>
      <base-tag-list :list='this.hotTags.map(c => c.name)' v-model="currentSubCate"></base-tag-list>
    </v-row>
    <v-row class="d-flex justify-space-between">
      <base-song-list-cover  v-for="list in songList" :key="list.id" :song-list='list' width="18.75%" showCreator/>
    </v-row>
    <v-row>
      <v-pagination v-if="totalPage > 1" v-model="currentPage" total-visible="9" :length="totalPage"/>
    </v-row>
  </v-container>
</template>

<script>
import { getAllCateList, getSongList, getHotCateList } from '@/API/songList.js'
import BaseAttachedDialog from '@/base/attached-dialog/base-attached-dialog.vue'
import BaseTagList from '@/base/tag-list/base-tag-list.vue'
import BaseSongListCover from '@/base/song-list-cover/base-song-list-cover.vue'
import {VPagination} from 'vuetify/lib'
export default {
  created() {
    getAllCateList().then(({categories, sub}) => {
      this.categories = categories
      this.sub = sub
    })
    this.getSongList()
    getHotCateList().then(({tags}) => this.hotTags = tags)
  },
  components: {
    BaseAttachedDialog,
    BaseTagList,
    BaseSongListCover,
    VPagination
  },
  methods:{
    _setIcon(cateName){
      switch(cateName) {
      case '语种':
        return 'icon-world'
      case '风格':
        return 'icon-piano'
      case '场景':
        return 'icon-coffee'
      case '情感':
        return 'icon-emoji'
      case '主题':
        return 'icon-subject'
      }
    },
    handleCateItemClick(cateName){
      this.currentSubCate = cateName
      this.dialogVisiable = false
    },
    handleClickOutside(ev){
      if(!this.$refs['attached-dialog-wrapper'].contains(ev.target)) {
        this.dialogVisiable = false
      }
    },
    getSongList(){
      getSongList({cat: this.currentSubCate, page: this.currentPage}).then(({playlists, total}) => {
        this.songList = playlists.map(p => ({...p, picUrl: p.coverImgUrl}))
        this.total = total
      })
    }
  },
  data() {
    return {
      dialogVisiable: false,
      categories: [],
      sub: [],
      currentSubCate: '全部歌单',
      hotTags: [],
      songList: [],
      currentPage: 1,
      total: 0
    }
  },
  computed: {
    totalPage(){
      return Math.ceil(this.total / 50)
    }
  },
  watch: {
    currentPage(){
      this.getSongList()
    },
    currentSubCate(){
      this.currentPage = 1
      this.getSongList()
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-down {
  font-size: 12px;
}
.cate-wrapper{
  width: 540px;
  .wrapper-title{
    padding: 10px 0 10px 16px;
    border-bottom: 1px solid #36383c;
  }
  .scroller{
    max-height: 365px;
    overflow-y: scroll;
    &::-webkit-scrollbar-thumb {
      background-color: #4c4d51;
      width: 8px;
      border-radius: 8px;
    } 
  }
  .cate-content{
    padding: 10px 16px 10px 16px;
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
  .content-group{
    display: flex;
    margin-bottom: 10px;
    .group-l{
      width: 16.66%;
      text-align: center;
      font-size: 14px;
      height: 36px;
      display: flex;
      align-items: center;
      .iconfont{
        font-size: 20px;
        margin-right: 10px;
      }
    }
    .group-r{
      width: 83.33%;
      display: flex;
      flex-wrap: wrap;
      .cate-item{
        width: 20%;
      }
    }
  }
}
</style>
