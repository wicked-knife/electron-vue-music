<template>
  <div :class="['program-wrapper subtitle-3 grey--text', stripe ? 'stripe' : '', active ? 'active' : '']" @click="$emit('click')">
    <span class="index mr-6">{{_index}}</span>
    <div class="img-wrapper mr-3">
      <img :src="program.coverUrl + '?param=40y40'"/>
      <i class="iconfont icon-play_fill"></i>
    </div>
    <div class="name white--text">
      {{program.mainSong.name}}
    </div>
    <div class="play-count">
      播放 : {{_listenerCount}}
    </div>
    <div class="praise-count">
      赞 : {{program.serialNum}}
    </div>
    <div class="date">
      {{_date}}
    </div>
    <div class="duration">
      {{_duration}}
    </div>
  </div>
</template>

<script>
import dayjs from '@/common/day.js'
import {formatMusicDuration} from '@/common/utils.js'
export default {
  props: {
    program: {
      type: Object,
      required: true
    },
    stripe: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    _date(){
      return dayjs(this.program.createTime).format('YYYY-MM-DD')
    },
    _duration(){
      return formatMusicDuration(this.program.duration)
    },
    _index(){
      return this.index < 10 ? '0' + this.index : this.index
    },
    _listenerCount(){
      return this.program.listenerCount < 100000 ? this.program.listenerCount : Math.floor(this.program.listenerCount / 10000) + '万'
    }
  }
}
</script>

<style lang="scss" scoped>
.program-wrapper {
  display: flex;
  align-items: center;
  padding-left: 12px;
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  &.stripe {
    background-color: #1a1c20;
  }
  &:hover{
    background-color: #232529;
  }
  &.active{
    background-color: #232529;
  }
  .img-wrapper {
    position: relative;
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
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
    }
  }
  .name{
    width: 53%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .play-count,.praise-count,.date,.duration{
    width: 12%;
    text-align: center;
  }
}
</style>
