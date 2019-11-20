<template>
    <transition name="fade">
    <div :class="['attached-dialog-wrapper', position, left ? '__left' : '', right ? '__right' : '']" v-show="value" @click.stop ref="container">
      <div class="dialog-title subtitle-2" v-if="title">
        {{title}}
      </div>
      <slot>
      </slot>
    </div>
  </transition>
</template>

<script>
import bus from '@/common/bus'
export default {
  props: {
    position: {
      type: String,
      required: true,
      validator: v => ['left', 'top', 'right', 'bottom'].indexOf(v) !== -1
    },
    value: {
      type: Boolean,
      required: true
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods:{
    handleClickOutside(ev){
      if(!this.$refs.container.contains(ev.target)) {
        this.$emit('click:outside', ev)
      }
    }
  },
  mounted() {
    this.$el.parentElement.style.position = 'relative'
    bus.on('document:clicked', this.handleClickOutside)
  },
  destroyed(){
    bus.off('document:clicked', this.handleClickOutside)
  }
}
</script>

<style lang="scss">
$bg-color: #2d2f33;
.attached-dialog-wrapper {
  position: absolute;
  z-index: 9;
  background-color: $bg-color;
  border: 1px solid #090a0c;
  border-radius: 5px;
  &.top {
    top: -10px;
    left: 50%;
    transform: translateX(-50%) translateY(-100%);
    &::after {
      z-index: 1;
      content: "";
      position: absolute;
      bottom: -19px;
      left: calc(50% - 5px);
      height: 0;
      width: 0;
      border: 10px solid $bg-color;
      border-color: $bg-color transparent transparent transparent;
    }
  }
  &.bottom {
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%) translateY(100%);
    &.__left{
      left: 0;
      transform: translateX(0%) translateY(100%);
      &::before{
        left: 20px;
      }
    }
    &.__right{
      right: 0;
      left: auto;
      transform: translateX(0%) translateY(100%);
      &::before{
        left: auto;
        right: 20px;
      }
    }
    &::before {
      z-index: 1;
      content: "";
      position: absolute;
      top: -19px;
      left: calc(50% - 5px);
      height: 0;
      width: 0;
      border: 10px solid $bg-color;
      border-color: transparent transparent $bg-color transparent;
    }
  }
  &.left {
    left: -10px;
    top: 50%;
    transform: translateX(-100%) translateY(-50%);
    &::after {
      z-index: 1;
      content: "";
      position: absolute;
      top: calc(50% - 5px);
      right: -19px;
      height: 0;
      width: 0;
      border: 10px solid $bg-color;
      border-color: transparent transparent transparent $bg-color;
    }
  }
  &.right {
    right: -10px;
    top: 50%;
    transform: translateX(100%) translateY(-50%);
    &::after {
      z-index: 1;
      content: "";
      position: absolute;
      top: calc(50% - 5px);
      left: -19px;
      height: 0;
      width: 0;
      border: 10px solid $bg-color;
      border-color: transparent $bg-color transparent transparent;
    }
  }
}

.dialog-title{
  padding: 10px 0 10px 16px;
  border-bottom: 1px solid #36383c;
}
</style>
