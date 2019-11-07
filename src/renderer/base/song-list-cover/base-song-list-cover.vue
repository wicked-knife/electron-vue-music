<template>
  <div class="wrapper" :style="{width}">
    <div :class="['img-wrapper', songList.alg === 'featured' ? '__active-hover' : '']">
      <img
        :src="songList.picUrl"
        class="cover"
      />
      <div class="desc" v-if="songList.alg === 'featured'">{{songList.copywriter}}</div>
      <div class="play-count">
        <i class="iconfont icon-earphone"></i> {{_playCount}}
      </div>
      <i class="iconfont icon-play_fill"></i>
    </div>
    <div class="name">{{songList.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '150px'
    },
    songList: {
      type: Object,
      required: true
    }
  },
  computed:{
    _playCount(){
      return this.songList.playCount < 100000 ? this.songList.playCount : Math.floor(this.songList.playCount / 10000) + '万'
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 36px;
  .img-wrapper {
    position: relative;
    cursor: pointer;
    margin-block: 8px;
    &:hover {
      .desc {
        transform: translateY(0);
      }
      .icon-play_fill {
        opacity: 1;
      }
    }
    .desc {
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      font-size: 12px;
      background-color: rgba(0, 0, 0, 0.44);
      padding: 4px 8px;
      transform: translateY(-100%);
      transition: transform 0.3s ease;
    }
    .play-count {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      color: #fff;
      font-size: 12px;
      background-image: linear-gradient(to right, rgba(0,0,0,0) 30%, rgba(0, 0, 0, 0.44) 70%);
      padding: 2px 8px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      opacity: 1;
      transition:  opacity ease 0.3s;
      .icon-earphone{
        font-size: 11px;
        margin-right: 4px;
      }
    }
    .icon-play_fill {
      position: absolute;
      font-size: 16px;
      right: 8px;
      bottom: 14px;
      width: 27px;
      height: 27px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.9);
      border: 1px solid rgba(255, 255, 255, 0.7);
      opacity: 0;
      transition: opacity ease 0.3s;
    }
  }
  .cover {
    width: 100%;
  }
  .name {
    font-size: 12px;
  }
}
.__active-hover{
  &:hover{
    .play-count{
      opacity: 0;
    }
  }
}
</style>
