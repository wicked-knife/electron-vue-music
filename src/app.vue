<template>
  <div>
    {{msg}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      msg:'Hello world.'
    }
  },
  mounted(){
    axios.get('http://localhost:3000/search?keywords=海阔天空').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss">

</style>
