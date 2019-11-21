<template>
  <v-container fluid class="container-1040">
    <v-row class="mb-3">
      <div ref="attached-dialog-wrapper">
        <v-btn size="small" height="24px" depressed class="subtitle-2" @click="dialogVisiable = !dialogVisiable">
          {{currentSubCate}}<i class="iconfont icon-down"></i>
        </v-btn>
        <base-attached-dialog position="bottom" :value="dialogVisiable" left @click:outside='handleClickOutside' title="添加标签">
          <div class="cate-wrapper">
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
    <v-row class="d-flex justify-space-between" v-loading="loading">
      <div class="hq-songlist" style="width: 18.75%" v-if="currentPage === 1 && songList.length !== 0" @click="toHQSongList">
        <div class="img-cover mb-2">
          <img :src="songList[0].picUrl" class="cover" draggable="false">
          <div class="hq-text">
            <i class="iconfont icon-tiara"></i>
            <div class="text">
              精品歌单 <i class="iconfont icon-enter"></i>
            </div>
          </div>
        </div>
        <div class="desc">
        精品歌单倾心推荐，给最懂音乐的你  
        </div>
      </div>
      <base-song-list-cover  v-for="list in songList" :key="list.id" :song-list='list' width="18.75%" showCreator/>
      <div :style="{width: fillGap(songList, 5, 18.75)}"></div>
    </v-row>
    <v-row>
      <v-pagination v-if="totalPage > 1" v-model="currentPage" total-visible="9" :length="totalPage" color="#b82525"/>
    </v-row>
  </v-container>
</template>

<script>
import { getAllCateList, getSongList, getHotCateList } from '@/API/songList.js'
import BaseAttachedDialog from '@/base/attached-dialog/base-attached-dialog.vue'
import BaseTagList from '@/base/tag-list/base-tag-list.vue'
import BaseSongListCover from '@/base/song-list-cover/base-song-list-cover.vue'
import {VPagination} from 'vuetify/lib'
import fillGap from '@/mixins/fillGap.js'
export default {
  name:'song-list-index',
  mixins: [fillGap],
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
      this.loading = true
      getSongList({cat: this.currentSubCate, page: this.currentPage, limit: this.currentPage === 1 ? 49 : 50}).then(({playlists, total}) => {
        this.songList = playlists.map(p => ({...p, picUrl: p.coverImgUrl}))
        this.total = total
        this.loading = false
      })
    },
    toHQSongList(){
      this.$router.push('/main/recommend/song-list/HQ')
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
      total: 0,
      loading: true
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

.hq-songlist{
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .img-cover{
    position: relative;
    font-size: 0px;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    .cover{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      filter: blur(15px) brightness(0.5);
    }
    .hq-text{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      color: #e6ca87;
      .icon-tiara{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 90px;
        border: 4px solid #e6ca87;
        border-radius: 50%;
        font-size: 45px;
        font-weight: bolder;
        margin-bottom: 0.5vw;
        & ~ div{
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .desc{
    font-size: 13px;
  }
}
</style>
