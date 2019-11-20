<template>
  <v-container fluid class="container-1040">
    <base-title text="官方榜" />
    <v-row class="d-flex justify-lg-space-between">
      <base-rank-cover v-for="rank in rankList" :key="rank.id" :rank="rank" width="15.38%"/>
      <div :style="{width: fillGap}"></div>
    </v-row>
  </v-container>
</template>

<script>
import BaseTitle from '@/base/title/base-title.vue'
import BaseRankCover from '@/base/rank-cover/base-rank-cover.vue'
import {getRankList} from '@/API/rank.js'
export default {
  data(){
    return {
      rankList: []
    }
  },
  components:{
    BaseTitle,
    BaseRankCover
  },
  computed: {
    fillGap(){
      const rest = 6 - this.rankList.length % 6
      return rest === 0 ? 0 : (100 - 15.38 * 6) / 5 * (rest - 1) + (15.38 * rest) + '%'
    }
  },
  created(){
    getRankList().then(({list}) => {
      this.rankList = list
    })
  }
}
</script>
