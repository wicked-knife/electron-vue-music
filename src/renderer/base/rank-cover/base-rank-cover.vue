<template>
  <div class="wrapper" :style="{width}">
    <div class="img-wrapper mb-2">
      <img
        :src="rank.coverImgUrl + '?param=160y160'"
        class="cover"
        draggable="false"/>
      <div class="play-count">
        <i class="iconfont icon-earphone"></i> {{_playCount}}
      </div>
      <i class="iconfont icon-play_fill"></i>
    </div>
    <div class="name">{{rank.name}}</div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '150px'
    },
    rank: {
      type: Object,
      required: true
    }
  },
  computed:{
    _playCount(){
      let _count = this.rank.playCount || this.rank.playcount
      return _count < 100000 ? _count : Math.floor(_count / 10000) + '万'
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
    font-size: 0px;
    padding-top: 100%;
    &:hover {
      .icon-play_fill {
        opacity: 1;
      }
    }
    .play-count {
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 12px;
      background-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.44) 100%);
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
      right: 5px;
      bottom: 5px;
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
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  .name {
    font-size: 13px;
  }
}
</style>
