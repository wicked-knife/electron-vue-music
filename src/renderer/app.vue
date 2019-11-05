<template>
  <v-app>
    <AppSideBar />
    <AppTopBar />
    <v-content class="app-content">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import baseLayoutMixins from '@/mixins/baseLayout.js'
import AppTopBar from '@/components/app-top-bar/app-top-bar'
import AppSideBar from '@/components/app-side-bar/app-side-bar'
import {VApp, VContent} from 'vuetify/lib'
export default {
  data() {
    return {}
  },
  mixins: [baseLayoutMixins],
  components: {
    VApp,
    AppTopBar,
    VContent,
    AppSideBar
  },
  mounted() {
    // axios
    //   .get('http://localhost:3000/search?keywords=海阔天空')
    //   .then(res => {
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }
}
</script>

<style lang="scss" scoped>
.app-content{
  background-color: #16181c;
}
</style>
