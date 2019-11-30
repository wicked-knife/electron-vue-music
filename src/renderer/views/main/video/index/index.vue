<template>
  <v-container fluid class="container-1040">
    <v-row class="mb-3">
      <div ref="attached-dialog-wrapper">
        <v-btn size="small" height="24px" depressed class="subtitle-2" @click="dialogVisiable = !dialogVisiable">
          {{currentCate}}<i class="iconfont icon-down"></i>
        </v-btn>
        <base-attached-dialog position="bottom" :value="dialogVisiable" left @click:outside='handleClickOutside' title="添加标签">
          <div class="cate-wrapper">
            <div class="scroller beautify-scrollbar">
              <div class="cate-content">
                <div class="cate-list">
                  <div  v-for="item in tagList"
                    :class="['cate-item', currentCate === item.name ? 'active' : '']" 
                    :key="item.name"
                    @click="handleCateItemClick(item.name)">
                    {{item.name}}
                    <span class="hot" v-if="item.hot">HOT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </base-attached-dialog>
      </div>
    </v-row>
    <v-row>
      <base-tag-list :list='hotTag' v-model="currentCate"/>
    </v-row>
    <v-row class="d-flex justify-space-between">
      <base-video-cover v-for="video in videoList" :key="video.id" :video="video" width='24.03%'/>
      <div :style="{width: fillGap(videoList, 4, 24.03)}"></div>
    </v-row>
  </v-container>
</template>

<script>
import {getVideoTagList, getVideoByTag} from '@/API/video.js'
import BaseTagList from '@/base/tag-list/base-tag-list.vue'
import BaseAttachedDialog from '@/base/attached-dialog/base-attached-dialog.vue'
import BaseVideoCover from '@/base/video-cover/base-video-cover.vue'
import fillGapMixin from '@/mixins/fillGap.js'
import bus from '@/common/bus.js'
export default {
  mixins:[fillGapMixin],
  components: {
    BaseTagList,
    BaseAttachedDialog,
    BaseVideoCover
  },
  data(){
    return {
      tagList: [],
      hotTag: ['演唱会','现场','翻唱','听BGM','舞蹈','ACG音乐','游戏'],
      currentCate: '演唱会',
      dialogVisiable: false,
      videoList: []
    }
  },
  methods:{
    handleClickOutside(ev){
      if(!this.$refs['attached-dialog-wrapper'].contains(ev.target)) {
        this.dialogVisiable = false
      }
    },
    handleCateItemClick(cateName){
      this.currentCate = cateName
      this.dialogVisiable = false
    },
    getVideoByTag(requestTwice){
      getVideoByTag(this.tagList.find(t => t.name === this.currentCate).id).then(({datas}) => {
        this.videoList.push(...datas.filter(d => d.type === 1).map(d => d.data))
        // 这个接口没有分页，每次请求都是新的数据，第一次加载时请求两次
        if(requestTwice) {
          getVideoByTag(this.tagList.find(t => t.name === this.currentCate).id).then(({datas}) => this.videoList.push(...datas.filter(d => d.type === 1).map(d => d.data)))
        }
      })
    }
  },
  activated(){
    bus.on('scroll:reachBottom', this.getVideoByTag)
  },
  deactivated(){
    bus.off('scroll:reachBottom', this.getVideoByTag)
  },
  created(){
    getVideoTagList().then(({data}) => {
      this.tagList = data.filter(t => t.name !== 'MV')
      this.getVideoByTag(1)
    })
  },
  watch:{
    currentCate(){
      this.videoList = []
      this.getVideoByTag(1)
    }
  }
}
</script>

<style lang="scss" scoped>
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
  .cate-list{
    display: flex;
    flex-wrap: wrap;
    .cate-item{
      width: 16.66%;
    }
  }
}

</style>
