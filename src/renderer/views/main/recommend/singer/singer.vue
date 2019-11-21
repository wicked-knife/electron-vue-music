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
    <v-row class="d-flex justify-space-between" v-loading='loading'>
      <base-singer-cover v-for="singer in singerList" :key="singer.id" :singer="singer" width="15.38%"/>
      <div :style="{width: fillGap(singerList, 6, 15.38)}"></div>
    </v-row>
  </v-container>
</template>

<script>
import {getSingerList} from '@/API/singer.js'
import BaseSingerCover from '@/base/singer-cover/base-singer-cover.vue'
import BaseTagList from '@/base/tag-list/base-tag-list.vue'
import bus from '@/common/bus.js'
import fillGapMixin from '@/mixins/fillGap.js'
const languageToCode = {
  '华语': '100',
  '欧美': '200',
  '日本': '600',
  '韩国': '700',
  '其他': '400'
}

const typeToCode = {
  '男歌手': '1',
  '女歌手': '2',
  '乐队组合': '3'
}

export default {
  name: 'recommend-singer',
  mixins: [fillGapMixin],
  data(){
    return {
      singerLanguage: '华语',
      singerType: '男歌手',
      singerFilter: '#',
      singerFilterList: [],
      singerList: [],
      currentPage: 1,
      loading: true,
      more: true
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
    },
    getSingerList(){
      if(!this.more) return
      this.currentPage === 1 && (this.loading = true)
      getSingerList({
        cat: languageToCode[this.singerLanguage] + typeToCode[this.singerType],
        page: this.currentPage,
        initial: this.singerFilter === '#' ? -1 : this.singerFilter
      }).then(({artists, more}) => {
        this.more = more
        this.currentPage === 1 ? (this.singerList = artists) : this.singerList.push(...artists)
        this.loading = false
      })
    },
    handleReachBottom(){
      this.currentPage++
      this.getSingerList()
    }
  },
  created(){
    this.singerFilterList = this.genSingerFilterList()
    this.getSingerList()
  },
  watch: {
    singerLanguage(){
      this.currentPage = 1
      this.more = true
      this.getSingerList()
    },
    singerType(){
      this.currentPage = 1
      this.more = true
      this.getSingerList()
    },
    singerFilter(){
      this.currentPage = 1
      this.more = true
      this.getSingerList()
    }
  },
  
  activated(){
    bus.on('scroll:reachBottom', this.handleReachBottom)
  },
  deactivated(){
    bus.off('scroll:reachBottom', this.handleReachBottom)
  }
}
</script>
