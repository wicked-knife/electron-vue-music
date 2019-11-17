<template>
    <transition name="fade">
    <div :class="['attached-dialog-wrapper', position]" v-show="value" @click.stop ref="container">
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
