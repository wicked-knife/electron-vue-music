<template>
  <v-container class="container-760" fluid>
    私人FM
  </v-container>
</template>

<script>
import {getPersonalFM} from '@/API/personal-fm.js'
export default {
  name: 'personal-fm',
  activated(){
    getPersonalFM().then(data => {
      console.log(data)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
