<template>
  <div>
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {}
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

<style lang="scss">
</style>
