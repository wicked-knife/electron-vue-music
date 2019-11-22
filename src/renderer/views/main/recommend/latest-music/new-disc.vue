<template>
  <v-container fluid class="container-1040">
    <v-row class="border-b mb-2">
      <v-tabs background-color="transparent" height="40px" v-model="value">
        <v-tab class="tab">全部</v-tab>
        <v-tab class="tab">华语</v-tab>
        <v-tab class="tab">欧美</v-tab>
        <v-tab class="tab">韩国</v-tab>
        <v-tab class="tab">日本</v-tab>
      </v-tabs>
    </v-row>
    <v-row class="d-flex">
      <div class="l">

      </div>
      <div class="r d-flex justify-space-between">
        <base-album-cover width='18.36%' v-for="album in albumList" :key="album.id" :album='album'/>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import {getLatestAlbum} from '@/API/latest-song.js'
import BaseAlbumCover from '@/base/album-cover/base-album-cover.vue'
export default {
  name: 'new-disc',
  components:{
    BaseAlbumCover
  },
  data() {
    return {
      value: 0,
      albumList: []
    }
  },
  created(){
    getLatestAlbum().then(({albums}) => this.albumList = albums)
  }
}
</script>

<style lang="scss" scoped>
.tab {
  min-width: 50px;
  padding: 0;
}
.content {
  height: 500px;
}
.title{
  position: sticky;
  top: 20px;
  font-size: 30px;
}
.l{
  width: 60px;
}
.r{
  width: calc(100% - 60px);
  flex-wrap: wrap;
}
</style>
