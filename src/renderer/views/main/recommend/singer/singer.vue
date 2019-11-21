<template>
  <v-container fluid class="container-1040">
    <v-row>
      <base-tag-list :list="['华语', '欧美', '日本', '韩国', '其他']" v-model="singerLanguage" title="语种"/>
    </v-row>
    <v-row>
      <base-tag-list :list="['男歌手', '女歌手', '乐队组合']" v-model="singerType" title="分类"/>
    </v-row>
    <v-row>
      <base-tag-list :list="singerFilterList" v-model="singerFilter" title="筛选"/>
    </v-row>
    <v-row class="mb-7">
      <v-divider />
    </v-row>
    <v-row class="d-flex justify-space-between">
      <base-singer-cover v-for="singer in singerList" :key="singer.id" :singer="singer" width="15.38%"/>
    </v-row>
  </v-container>
</template>

<script>
import {getSingerList, getHotSingerList} from '@/API/singer.js'
import BaseSingerCover from '@/base/singer-cover/base-singer-cover.vue'
import BaseTagList from '@/base/tag-list/base-tag-list.vue'
export default {
  data(){
    return {
      singerLanguage: '华语',
      singerType: '男歌手',
      singerFilter: '#',
      singerFilterList: [],
      singerList: []
    }
  },
  components: {
    BaseTagList,
    BaseSingerCover
  },
  methods:{
    genSingerFilterList(){
      const ret = ['#']
      for(let i = 65 ; i <= 90 ; i++) {
        ret.push(String.fromCharCode(i))
      }
      return ret
    }
  },
  created(){
    getSingerList({cat: 1003}).then(({artists}) => this.singerList = artists)
    getHotSingerList().then(data => console.log(data))
    this.singerFilterList = this.genSingerFilterList()
  }
}
</script>
