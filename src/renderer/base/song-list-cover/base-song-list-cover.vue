<template>
  <div class="wrapper" :style="{width}">
    <div :class="['img-wrapper mb-2', songList.copywriter && songList.copywriter.length > 4 ? '__active-hover' : '']">
      <img
        :src="songList.picUrl"
        class="cover"
        draggable="false"
      />
      <div class="desc" v-if="songList.copywriter && songList.copywriter.length > 4">{{songList.copywriter}}</div>
      <div class="play-count">
        <i class="iconfont icon-earphone"></i> {{_playCount}}
      </div>
      <div class="creator subtitle-3" v-if="showCreator">
        <i class="iconfont icon-user ml-2 mr-1"></i>
        <span class="nickname mr-1">
          {{songList.creator.nickname}}
        </span>
        <i class="iconfont icon-local-music" v-if="songList.creator.userType === 4"></i>
        <i class="iconfont icon-star yellow--text" v-if="songList.creator.userType === 200"></i>
        <i class="iconfont icon-V " v-if="songList.creator.userType === 3"></i>
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
    },
    showCreator: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    _playCount(){
      let _count = this.songList.playCount || this.songList.playcount
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
    .creator{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0, 0, 0, 0.44) 100%);
      padding: 5px 0;
      display: flex;
      align-items: center;
      .icon-user{
        font-size: 12px;
      }
      .nickname{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        display: block;
        max-width: 50%;
      }
      .icon-star, .icon-V{
        font-size: 12px;
      }
      .icon-V,.icon-local-music{
        color: $theme-color;
      }
    }
    .play-count {
      width: 70%;
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
    width: 100%;
  }
  .name {
    font-size: 13px;
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
