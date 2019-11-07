<template>
  <div class="swiper-container" @mouseleave="arrowVisiable = false" @mouseenter="arrowVisiable = true">
    <div class="swiper-wrapper">
      <div v-for="(i, index) in list"  :class="['swiper-box', _setClassName(index)]" :key="i.imageUrl">
        <img :src="i.imageUrl" class="swiper-img" draggable="false">
        <span :class="['tag', i.titleColor]">{{i.typeTitle}}</span>
      </div>
      <i class="iconfont icon-return" @click="prev" v-show="arrowVisiable"></i>
      <i class="iconfont icon-enter" @click="next" v-show="arrowVisiable"></i>
    </div>
    <div class="dots">
      <span v-for="(i, index) in list" :key="i.imageUrl" :class="['dot', currentIndex === index ? 'active' : '']" @mouseenter="currentIndex = index"></span>
    </div>
  </div>
</template>

<script>
let timer = null
export default {
  props: {
    list: {
      type: Array
    }
  },
  data(){
    return {
      currentIndex: 0,
      arrowVisiable: false
    }
  },
  methods:{
    _setClassName(index){
      if(index === this.currentIndex) {
        return 'active'
      }
      if(index === this.currentIndex - 1 || (index === this.list.length - 1 && this.currentIndex === 0)) {
        return 'prev'
      }
      if(index === this.currentIndex + 1 || (index === 0 && this.currentIndex === this.list.length - 1)) {
        return 'next'
      }
    },
    prev(){
      this.currentIndex === 0 ? (this.currentIndex = this.list.length - 1) : this.currentIndex--  
    },
    next(){
      this.currentIndex === this.list.length - 1 ? (this.currentIndex = 0) : this.currentIndex++
    }
  },
  watch: {
    arrowVisiable:{
      handler(newVal){
        if(!newVal) {
          timer = setInterval(() => {
            this.next()
          }, 6000)
        } else {
          clearInterval(timer)
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 220px;
  .swiper-wrapper {
    position: relative;
    height: 200px;
    .swiper-box {
      position: absolute;
      height: 200px;
      bottom: 0;
      left: 50%;
      transform: translate3d(-50%, 5px, 0) scale3d(0.95, 0.95, 1);
      visibility: hidden;
      transition: all 0.6s ease;
      filter: brightness(0.6);
      cursor: pointer;
      will-change: transform;
      &.prev {
        left: 0;
        transform: translate3d(-13.5px, 5px, 0) scale3d(0.95, 0.95, 1);
        visibility: visible;
      }
      &.active {
        left: 50%;
        transform: translate3d(-50%, 0px, 0) scale3d(1, 1, 1);
        visibility: visible;
        z-index: 3;
        filter: brightness(1);
      }
      &.next {
        left: calc(100% - 526.5px);
        transform: translate3d(0, 5px, 0) scale3d(0.95, 0.95, 1);
        visibility: visible;
      }
      .tag{
        position: absolute;
        bottom: 12px;
        right: -2px;
        padding-left: 8px;
        padding-right: 6px;
        color: #fff;
        font-size: 12px;
        border-radius: 18px 0 0 18px;
        &.red{
          background-color: #cc4a4a !important;
        }
        &.blue{
          background-color: #4a79cc !important;
        }
      }
    }
    .swiper-img {
      height: 100%;
    }
    .iconfont {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 30px;
      cursor: pointer;
      color: #b1b1b1;
      &:hover{
        color: #fff;
      }
    }
    .icon-return {
      left: 10px;
    }
    .icon-enter {
      right: 10px;
    }
  }
}
.dots {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  .dot {
    margin: 3px;
    width: 18px;
    height: 2px;
    background-color: #2e3033;
    cursor: pointer;
    &.active {
      background-color: #7f8082;
    }
  }
}
</style>
