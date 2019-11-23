<template>
  <v-container fluid>
    {{$route.params.id}}
  </v-container>
</template>

<script>
export default {
  data(){
    return {
      id: this.$route.id
    }
  },
  created(){
    console.log(this.$route, this.$router)
  }
}
</script>
