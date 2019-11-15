<template>
  <div class="wrapper" :style="{width}">
    <div :class="['img-wrapper mb-2', video.copywriter.length > 4 ? '__active-hover' : '']">
      <img
        :src="video.picUrl"
        class="cover"
        draggable="false"
      />
      <div class="desc" v-if="video.copywriter.length > 4">{{video.copywriter}}</div>
      <div class="play-count">
        <i class="iconfont icon-video"></i> {{_playCount}}
      </div>
    </div>
    <div class="name">{{video.name}}</div>
    <div class="author caption grey--text">{{video.artistName}}</div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '150px'
    },
    video: {
      type: Object,
      required: true
    }
  },
  computed:{
    _playCount(){
      let _count = this.video.playCount || this.video.playcount
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
    &:hover {
      .desc {
        transform: translateY(0);
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
      width: 100%;
    }
    .play-count {
      width: 50%;
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 12px;
      background-image: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.44) 100%);
      padding: 2px 4px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      opacity: 1;
      transition:  opacity ease 0.3s;
      .icon-video{
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
  .cover {
    width: 100%;
  }
  .name {
    font-size: 13px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
