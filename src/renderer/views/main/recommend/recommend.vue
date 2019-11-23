<template>
  <v-container class="pt-0" fluid>
    <v-row>
      <v-tabs background-color="transparent" centered height='42px' class="tabs" center-active>
        <v-tab to='/main/recommend/index'>个性推荐</v-tab>
        <v-tab to='/main/recommend/song-list'>歌单</v-tab>
        <v-tab to='/main/recommend/radio'>主播电台</v-tab>
        <v-tab to='/main/recommend/rank'>排行榜</v-tab>
        <v-tab to='/main/recommend/singer'>歌手</v-tab>
        <v-tab to='/main/recommend/latest-music'>最新音乐</v-tab>
      </v-tabs>
    </v-row>

    <v-container fluid>
      <keep-alive :include="['recommend-index','recommend-radio', 'recommend-song-list', 'recommend-rank', 'recommend-singer', 'recommend-latest-music']">
        <router-view></router-view>
      </keep-alive>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'recommend',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  border-bottom: 1px solid #202226;
}
.active {
  background-color: red;
}
</style>
