<template>
  <div class="lyric-scroller beautify-scrollbar pt-5 pb-5" :style="{height: _height}">
      <div class="lyric-line subtitle-2 mt-3 mb-3 grey--text text--darken-1" v-for="item in lyric" :key="item.time">
        <div class="lyric-raw">{{item.lyric}}</div>
        <div class="lyrci-tranlated" v-if="item.tLyric">{{item.tLyric}}</div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: [Number, String],
      default: '400px'
    },
    lyric:{
      type: Array,
      required: true
    }
  },
  computed:{
    _height(){
      return typeof this.height === 'string' ? this.height : (this.height + 'px')
    }
  }
}
</script>

<style lang="scss" scoped>
.lyric-scroller{
  width: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  border-right: 1px solid #2c2e32;
}
</style>
