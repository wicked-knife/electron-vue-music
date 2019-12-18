<template>
  <v-container fluid class="container-1040">
    <v-row class="d-flex flex-column border-b mb-4">
      <base-tag-list title="地区" :list="areaList" v-model="currentArea"/>
      <base-tag-list title="类型" :list="typeList" v-model="currentType"/>
      <base-tag-list title="排序" :list="sortList" v-model="currentSort"/>
    </v-row>
    <v-row class="d-flex justify-space-between">
      <base-video-cover  v-for="video in videoList" width="24.03%" :video="video" :key="video.id" @click.native="$router.push('/main/MV/play/' + video.id)"/>
    </v-row>
  </v-container>
</template>

<script>
import BaseTagList from '@/base/tag-list/base-tag-list.vue'
import BaseVideoCover from '@/base/video-cover/base-video-cover.vue'
import bus from '@/common/bus.js'
import {getAllVideo} from '@/API/video.js'
export default {
  components: {
    BaseTagList,
    BaseVideoCover
  },
  data(){
    return {
      areaList: ['全部','内地','港台','欧美','韩国','日本'],
      currentArea: '全部',
      typeList: ['全部', '官方版', '原声', '现场版', '网易出品'],
      currentType: '全部',
      sortList: ['上升最快', '最热', '最新'],
      currentSort: '上升最快',
      page: 1,
      videoList: []
    }
  },
  created(){
    this.getAllVideo()
  },
  methods:{
    getAllVideo(){
      getAllVideo({area: this.currentArea, type: this.currentType, order: this.currentSort, page: this.page}).then(({data}) => {
        this.page === 1 ? (this.videoList = data) : this.videoList.push(...data)
      })
    },
    handleReachBottom(){
      this.page++
      this.getAllVideo()
    }
  },
  activated(){
    bus.on('scroll:reachBottom', this.handleReachBottom)
  },
  deactivated(){
    bus.off('scroll:reachBottom', this.handleReachBottom)
  },
  watch:{
    currentArea(){
      this.page = 1
      this.getAllVideo()
    },
    currentType(){
      this.page = 1
      this.getAllVideo()
    },
    currentSort(){
      this.page = 1
      this.getAllVideo()
    }
  }
}
</script>
