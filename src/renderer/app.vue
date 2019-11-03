<template>
  <v-app>
    <v-btn>Click!</v-btn>
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
    <router-view></router-view>
  </v-app>
</template>

<script>
import axios from 'axios'
import {VApp, VBtn} from 'vuetify/lib'
export default {
  data() {
    return {}
  },
  components: {
    VApp,
    VBtn
  },
  mounted() {
    axios
      .get('http://localhost:3000/search?keywords=海阔天空')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="scss" scoped>
.test{
  transform: translateX(10px)
}
</style>
