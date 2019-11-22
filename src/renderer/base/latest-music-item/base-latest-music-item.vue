<template>
  <div :class="['wrapper', stripe ? 'stripe' : '', size]">
    <span class="index subtitle-3 grey--text mr-5">{{_index}}</span>
    <div class="cover-wrapper mr-3">
      <img :src="music.album.picUrl + '?param=50y50'" class="cover" />
      <i class="iconfont icon-play_fill"></i>
    </div>
    <div class="name-wrapper" v-if="size === 'normal'">
      <span class="subtitle-2 name">{{music.name}}</span>
      <div class="d-flex align-center">
        <span class="caption artist grey--text">{{music.artists[0].name}}</span>
        <i class="iconfont icon-mv ml-1" v-if="music.mvid"></i>
      </div>
    </div>
    <div class="large-info" v-if="size === 'large'">
      <div class="name subtitle-2">
        {{music.name}}
        <i class="iconfont icon-mv ml-1" v-if="music.mvid"></i>
      </div>
      <div class="artist caption grey--text">{{music.artists[0].name}}</div>
      <div class="album-name caption artist grey--text">{{music.album.name}}</div>
      <div class="duration grey--text caption">
        {{_duration}}
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
    },
    stripe: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    _index() {
      return this.index < 10 ? '0' + this.index : this.index
    },
    _duration(){
      const minutes = Math.floor(this.music.duration / 1000 / 60)
      const seconds = Math.floor(this.music.duration / 1000 % 60)
      return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  padding: 10px 10px 10px 12px;
  max-height: 60px;
  &:hover {
    background-color: rgb(35, 37, 41) !important;
    .artist {
      color: #fff !important;
    }
  }
  &.stripe {
    background-color: rgb(26, 28, 32);
  }
  &.large {
    width: 100%;
    .name{
      width: 14vw;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .album-name{
      width: 16vw;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
.large-info{
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}
.cover-wrapper {
  position: relative;
  cursor: pointer;
  font-size: 0px;
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
    &:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
}
.name-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .artist{
    width: auto
  }
}
.icon-mv {
  color: $theme-color;
  cursor: pointer;
  &:hover {
    filter: brightness(1.3);
  }
}
.name {
  width: 26.2vw;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.artist {
  color: #757575;
  width: 12vw;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
}
.duration{
  width: 60px;
}
.index{
  width: 22px;
}
</style>
