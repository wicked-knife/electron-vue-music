<template>
  <v-app>
    <app-side-bar />
    <app-top-bar />
    <v-content class="app-content">
      <v-container fluid class='pl-0 pr-0 __fix-viewport beautify-scrollbar'>
        <keep-alive>
            <router-view />
        </keep-alive>
      </v-container>
    </v-content>
    <v-footer app height="50px">
      底部播放器容器
    </v-footer>
  </v-app>
</template>

<script>
import AppTopBar from '@/components/app-top-bar/app-top-bar'
import AppSideBar from '@/components/app-side-bar/app-side-bar'
import {VApp, VContent, VFooter} from 'vuetify/lib'
export default {
  data() {
    return {}
  },
  components: {
    VApp,
    AppTopBar,
    VContent,
    AppSideBar,
    VFooter
  },
}
</script>

<style lang="scss" scoped>
.app-content{
  background-color: #16181c;
}
.__fix-viewport{
  height: 100vh;
  max-height: calc(100vh - 102px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
