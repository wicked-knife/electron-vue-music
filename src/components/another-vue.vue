<template>
  <div>
    {{counter}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      counter: 0
    }
  },
  created(){
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}
</script>
