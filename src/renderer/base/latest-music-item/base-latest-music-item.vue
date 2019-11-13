<template>
  <div class="wrapper">
    <span class="index caption grey--text text--darken-1 mr-5">{{_index}}</span>
    <div class="cover-wrapper mr-3">
      <img :src="music.album.picUrl" class="cover" />
      <i class="iconfont icon-play_fill"></i>
    </div>
    <div class="name-wrapper">
      <span class="subtitle-2">{{music.name}}</span>
      <div class="caption grey--text text--darken-1">
        {{music.artists[0].name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'normal',
      validator: v => ['normal', 'large'].indexOf(v) !== -1
    },
    music: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    _index() {
      return this.index < 10 ? '0' + this.index : this.index
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  padding: 10px 26px 10px 12px;
}
.cover-wrapper {
  position: relative;
  cursor: pointer;
  height: 42px;
  .cover {
    width: 42px;
    height: 42px;
  }
  .icon-play_fill {
    position: absolute;
    font-size: 15px;
    left: 50%;
    top: 50%;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.9);
    border: 0.5px solid rgba(255, 255, 255, 0.7);
    transform: translate3d(-50%, -50%, 0);
    transition: background-color ease 0.3s;
    &:hover{
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
}
.name-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
