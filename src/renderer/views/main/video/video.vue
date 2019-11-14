<template>
  <v-container class="pt-0" fluid>
    <v-row>
      <v-tabs background-color="transparent" centered height='42px' class="tabs" center-active>
        <v-tab to='/main/video/index'>视频</v-tab>
        <v-tab to='/main/video/mv'>MV</v-tab>
      </v-tabs>
    </v-row>

    <v-container fluid>
      <keep-alive >
        <router-view></router-view>
      </keep-alive>
    </v-container>
  </v-container>
</template>

<script>
export default {
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
