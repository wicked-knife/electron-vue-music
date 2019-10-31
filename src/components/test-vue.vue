<template>
  <div>
    {{counter}}
    <pre>
      {{text}}
    </pre>
  </div>
</template>

<script>
import commonModule from '../modules/commonModule'
export default {
  data(){
    return {
      counter: 0,
      text: commonModule
    }
  },
  created(){
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}
</script>
