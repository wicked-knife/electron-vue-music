<template>
  <div class="wrapper" :style="{width}">
    <div :class="['img-wrapper mb-2', video.copywriter && video.copywriter.length > 4 ? '__active-hover' : '']">
      <img
        :src="(video.picUrl || video.coverUrl) + '?param=250y140'"
        class="cover"
        draggable="false"
      />
      <div class="desc" v-if="video.copywriter && video.copywriter.length > 4">{{video.copywriter}}</div>
      <div class="play-count">
        <i class="iconfont icon-video"></i> {{_playCount}}
      </div>
      <div class="duration" v-if="video.durationms">
        {{_duration}}
      </div>
    </div>
    <div class="name">{{video.name || video.title}}</div>
    <div class="author caption grey--text">{{video.artistName || video.creator.nickname}}</div>
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
      let _count = this.video.playCount || this.video.playcount || this.video.playTime
      return _count < 100000 ? _count : Math.floor(_count / 10000) + '万'
    },
    _duration(){
      const minutes = Math.floor(this.video.durationms / 1000 / 60)
      const seconds = Math.floor(this.video.durationms / 1000 % 60)
      return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
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
    padding-top: 56%;
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
    .duration{
      position: absolute;
      left: 0px;
      bottom: 0px;
      font-size: 12px;
      padding: 4px 0px 4px 8px;
      width: 100%;
      background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.77) 100%);
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
    position: absolute;
    left: 0;
    top: 0;
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
