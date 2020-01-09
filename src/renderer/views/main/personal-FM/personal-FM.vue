<template>
  <v-container class="container-760" fluid>
    <app-comment :resourceType="0" :resourceID="currentSong.id" v-if="currentSong" show-total></app-comment>
  </v-container>
</template>

<script>
import {getPersonalFM} from '@/API/personal-fm.js'
import AppComment from '@/components/app-comment/app-comment.vue'
export default {
  name: 'personal-fm',
  components:{
    AppComment
  },
  data:() => ({
    songQueue: []
  }),
  computed:{
    currentSong(){
      return this.songQueue[0]
    }
  },
  activated(){
    getPersonalFM().then(({data}) => {
      this.songQueue = data
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
