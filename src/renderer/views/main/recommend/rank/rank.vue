<template>
  <v-container fluid class="container-1040">
    <base-title text="官方榜" />
    <v-row class="d-flex justify-space-between" v-loading="loading">
      <base-rank-cover v-for="rank in rankList" :key="rank.id" :rank="rank" width="15.38%"/>
      <div :style="{width: fillGap(rankList, 6, 15.38)}"></div>
    </v-row>
  </v-container>
</template>

<script>
import BaseTitle from '@/base/title/base-title.vue'
import BaseRankCover from '@/base/rank-cover/base-rank-cover.vue'
import {getRankList} from '@/API/rank.js'
import fillGap from '@/mixins/fillGap'
export default {
  name: 'recommend-rank',
  mixins: [fillGap],
  data(){
    return {
      rankList: [],
      loading: true
    }
  },
  components:{
    BaseTitle,
    BaseRankCover
  },
  created(){
    getRankList().then(({list}) => {
      this.rankList = list
      this.loading = false
    })
  }
}
</script>
