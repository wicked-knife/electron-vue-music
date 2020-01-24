<template>
  <div class="lyric-scroller beautify-scrollbar pb-5" :style="{height: _height}" ref="scroller">
      <div v-for="(item, index) in lyric"
      :class="['lyric-line subtitle-2 mt-3 mb-3 ', currentLine === index ? 'white--text' : 'grey--text text--darken-1']"  :key="item.time" ref="lyric-line">
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
    },
    currentTime: {
      type: Number,
      required: true
    },
  },
  computed:{
    _height(){
      return typeof this.height === 'string' ? this.height : (this.height + 'px')
    }
  },
  data(){
    return {
      currentLine: -1,
      offsetTop: 0
    }
  },
  mounted(){
    this.offsetTop = this.$refs.scroller.offsetTop
  },
  watch: {
    lyric(){
      this.$refs.scroller.scrollTo(0, 0)
      this.currentLine = -1
    },
    currentTime(v){
      for(let i = 0; i < this.lyric.length; i++) {
        if(i === this.lyric.length - 1 && v >= this.lyric[i].time) {
          this.currentLine = i
          return 
        }
        if(v >= this.lyric[i].time && v < this.lyric[i + 1].time) {
          this.currentLine = i
          return 
        }
      }
    },
    currentLine(v){
      if(v > -1) {
        const line = this.$refs['lyric-line'][v]
        this.$refs.scroller.scrollTo(0, line.offsetTop - this.offsetTop)
      }
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
  scroll-behavior: smooth;
}
</style>
