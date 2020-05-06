<template>
  <div class="bottom-player d-flex align-center">
    <div :class="['player-left d-flex align-center justify-space-around', isFM ? 'fm' : '']">
      <i class="iconfont icon-prev d-flex align-center justify-center" v-if="!isFM"></i>
      <i :class="['iconfont d-flex align-center justify-center ', player.playingState ? 'icon-pause' : 'icon-play_fill']" @click="togglePlayingState"></i>
      <i class="iconfont icon-next d-flex align-center justify-center" @click="playNext"></i>
    </div>
    <div class="player-right">
      <div class="progress-container d-flex align-center justify-space-between">
        <span class="subtitle-3">{{currentTime}}</span>
        <div class="progress ml-3 mr-3" @click="handleControlProgress" ref="progress">
          <div class="inner" :style="{width: activeWidth + 'px'}">
            
          </div>
          <div class="control-ball" :style="{left: offsetLeft + 'px'}" ref="ball">
            <div class="dot"></div>
          </div>
        </div>
        <span class="subtitle-3">{{duration}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {throttle} from '@/common/utils'
import bus from '@/common/bus'
const BALL_WIDTH = 7
export default {
  data(){
    return {
      totalWidth: 0,
      offsetLeft: -BALL_WIDTH,
      currentTime: '00:00',
      duration: '00:00'
    }
  },
  computed:{
    ...mapGetters({
      player: 'player',
      playType: 'playType'
    }),
    isFM(){
      return this.$route.path === '/main/personal-FM'
    },
    activeWidth(){
      return this.offsetLeft + BALL_WIDTH
    }
  },
  methods: {
    handleControlProgress(ev){
      if(ev.target === this.$refs.ball || this.$refs.ball.contains(ev.target)) return
      const left = ev.offsetX
      const {duration} = this.player.audio
      const currentTime = left / this.totalWidth * duration
      this.player.setTime(currentTime)
    },
    togglePlayingState(){
      this.player.playingState ? this.player.pause() : this.player.play()
    },
    handleMusicTimeUpdate(ev){
      const {currentTime, duration} = ev.target
      this.offsetLeft = currentTime / duration * this.totalWidth - BALL_WIDTH
      this.currentTime = this._formatTime(currentTime)
      this.duration = isNaN(duration) ? '00:00' : this._formatTime(duration)
    },
    playNext(){
      if(this.playType === 'fm') {
        bus.emit('fm:play-next')
      }
    },
    _formatTime(time){
      const s = Math.floor(time % 60)
      const m = Math.floor(time / 60)
      const h = Math.floor(time / 3600)
      return `${h ? h < 10 ? '0' + h + ':' : h + ':' : ''}${m < 10 ? '0' + m  : m}:${s < 10 ? '0' + s : s}`
    },
  },
  created(){
    this.player.on('timeupdate', this.handleMusicTimeUpdate)
    // 页面尺寸改变时，重新获取一下进度条总长
    window.addEventListener('resize', throttle(() => {
      this.totalWidth = this.$refs.progress.offsetWidth
    }, 50))
  },
  mounted(){
    this.totalWidth = this.$refs.progress.offsetWidth
  }
}
</script>

<style lang="scss" scoped>
.bottom-player{
  width: 100%;
  height: 100%;
}
.player-left{
  width: 170px;
  margin-right: 16px;
  flex-shrink: 0;
  &.fm{
    width: 120px;
    margin-right: 20px;
  }
}
.player-right{
  width: 100%;
}
.icon-prev, .icon-pause, .icon-next, .icon-play_fill{
  font-size: 20px;
  border-radius: 50%;
  border: 1px solid #666;
  width: 30px;
  height: 30px;
  cursor: pointer;
  &:hover{
    border: 1px solid #fff;
  }
}
.icon-pause, .icon-play_fill{
  width: 36px;
  height: 36px;
  font-size: 24px;
  cursor: pointer;
}
.progress-container{
  min-width: 480px;
  max-width: 50%;
  .progress{
    position: relative;
    width: 100%;
    height: 5px;
    border-radius: 10px;
    background-color: #45454f;
    cursor: pointer;
  }
  .inner{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 50px;
    height: 5px;
    border-radius: 10px;
    background-color: $theme-color;
  }
  .control-ball{
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    &:hover{
      box-shadow: 0 0 4px #fff;
    }
    .dot{
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: $theme-color;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0)
    }
  }
}
</style>
