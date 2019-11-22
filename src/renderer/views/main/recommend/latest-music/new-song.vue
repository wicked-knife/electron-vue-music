<template>
  <v-container fluid class="container-1040">
    <v-row class="border-b">
      <v-tabs background-color="transparent" height="40px">
        <v-tab class="tab">全部</v-tab>
        <v-tab class="tab">华语</v-tab>
        <v-tab class="tab">欧美</v-tab>
        <v-tab class="tab">韩国</v-tab>
        <v-tab class="tab">日本</v-tab>
      </v-tabs>
    </v-row>
    <v-row class="mt-2 d-flex justify-space-between">
      <v-btn text tile :ripple="false" height="30px">
        <i class="iconfont icon-play_fill mr-1"></i><span class="subtitle-3">播放全部</span>
      </v-btn>
      <v-btn  height="30px">
        <i class="iconfont icon-addfile"></i> <span class="subtitle-3">收藏全部</span>
      </v-btn>
    </v-row>
    <v-row>
      <base-latest-music-item v-for="(music, index) in renderList" :music='music' :index='index + 1' :key="music.album.id + index"
      size="large" :stripe='index % 2 === 0'/>
    </v-row>
  </v-container>
</template>

<script>
import { getLatestSongByLan } from '@/API/latest-song.js'
import BaseLatestMusicItem from '@/base/latest-music-item/base-latest-music-item.vue'
export default {
  created() {
    getLatestSongByLan().then(({data}) => this.renderList = data)
  },
  data(){
    return {
      renderList: []
    }
  },
  components:{
    BaseLatestMusicItem
  }
}
</script>

<style lang="scss" scoped>
.tab {
  min-width: 50px;
  padding: 0;
}
.icon-play_fill {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: $theme-color;
  border: 1px solid $theme-color;
}
.icon-addfile{
  font-size: 18px;
}
</style>
