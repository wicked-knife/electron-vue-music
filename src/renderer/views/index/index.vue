<template>
  <v-container class="pt-0" fluid>
    <v-row>
      <v-tabs background-color="transparent" centered height='42px' class="tabs" center-active>
        <v-tab to='/recommend'>个性推荐</v-tab>
        <v-tab to='/recommend/song-list'>歌单</v-tab>
        <v-tab to='/bar'>主播电台</v-tab>
        <v-tab to='/foofoo'>排行榜</v-tab>
        <v-tab to='/barbar'>最新歌手</v-tab>
        <v-tab to='/foobar'>最新音乐</v-tab>
      </v-tabs>
    </v-row>
    <keep-alive>
     <router-view></router-view>
    </keep-alive>
  </v-container>
</template>

<script>
import { VTabs, VTab } from 'vuetify/lib'
import baseLayoutMixin from '@/mixins/baseLayout.js'
export default {
  mixins: [baseLayoutMixin],
  components: {
    VTabs,
    VTab
  },
  data(){
    return {

    }
  },
  methods: {
    test(v){
      console.log(v)
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs{
  border-bottom: 1px solid #202226;
}
.active{
  background-color: red;
}
</style>
