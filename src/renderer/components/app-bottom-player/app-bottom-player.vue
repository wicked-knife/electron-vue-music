<template>
  <div class="bottom-player d-flex align-center">
    <div class="player-left d-flex align-center justify-space-around mr-4">
      <i class="iconfont icon-prev d-flex align-center justify-center"></i>
      <i class="iconfont icon-play_fill d-flex align-center justify-center"></i>
      <i class="iconfont icon-next d-flex align-center justify-center"></i>
    </div>
    <div class="player-right">
      <div class="progress-container d-flex align-center justify-space-between">
        <span class="subtitle-3">00:01</span>
        <div class="progress ml-3 mr-3" @click="handleControlProgress" ref="progress">
          <div class="inner" :style="{width: offsetLeft + 'px'}">
            
          </div>
          <div class="control-ball" :style="{left: offsetLeft + 'px'}" ref="ball">
            <div class="dot"></div>
          </div>
        </div>
        <span class="subtitle-3">04:30</span>
      </div>
    </div>
  </div>
</template>

<script>
const BALL_WIDTH = 7
export default {
  data(){
    return {
      totalWidth: 0,
      offsetLeft: 0
    }
  },
  methods: {
    handleControlProgress(ev){
      if(ev.target === this.$refs.ball || this.$refs.ball.contains(ev.target)) return
      this.offsetLeft = ev.offsetX - BALL_WIDTH
    }
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
