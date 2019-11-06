<template>
  <v-snackbar :value='visiable' top :timeout="timeout" :color='color' class="__top">
    {{text}}
    <v-btn @click="visiable = false" text>
      <i class="iconfont icon-close"></i>
    </v-btn>
  </v-snackbar>
</template>

<script>
import {VSnackbar, VBtn} from 'vuetify/lib'

export default {
  components: {
    VSnackbar,
    VBtn
  }
}
</script>

<style lang="scss" scoped>
.__top{
  top: 95px;
}
</style>
