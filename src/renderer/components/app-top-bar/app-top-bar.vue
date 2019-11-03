<template>
    <v-app-bar app clipped-left height="52px" flat class="app-top-bar">
      <v-container>
        <v-row>
          title
        </v-row>
      </v-container>
    </v-app-bar>
</template>

<script>
import baseLayoutMixin from '@/mixins/baseLayout.js'
import { VAppBar } from 'vuetify/lib'
export default {
  mixins: [baseLayoutMixin],
  components: {
    VAppBar
  }
}
</script>

<style lang="scss" scoped>
.app-top-bar{
  background-color: #222225;
  &::after{
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 2.5px;
    bottom: 0px;
    left: 0px;
    background-image: linear-gradient(to right, #670404 , $theme-color, #670404);
  }
}
</style>
