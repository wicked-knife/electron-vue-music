<template>
  <div class="input-wrapper" :style="{width: _width, backgroundColor}">
    <input type="text" :placeholder="placeholder" class="mr-1">
    <i class="iconfont icon-search mr-2 grey--text"></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 220
    },
    backgroundColor: {
      type: String
    }
  },
  computed: {
    _width(){
      return typeof this.width === 'number' ? (this.width + 'px') : this.width
    }
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper{
  height: 24px;
  background-color: $bg-dark;
  padding-left: 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  input{
    width: calc(100% - 36px);
    outline: none;
    font-size: 13px;
    &::placeholder{
      color: #6b6b6b;
    }
  }
  i{
    cursor: pointer;
    &:hover{
      color: #fff !important;
    }
  }
}
</style>
