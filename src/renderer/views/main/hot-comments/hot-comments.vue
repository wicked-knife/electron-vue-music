<template>
  <div>
    type: {{$route.params.type}}, id: {{$route.params.id}}
  </div>
</template>

<script>
// import {getHotComments} from '@/API/comment.js'
export default {
  created(){
    console.log(this.$route)
  }
}
</script>
