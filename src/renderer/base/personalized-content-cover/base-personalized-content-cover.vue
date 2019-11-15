<template>
  <div class="wrapper" :style="{width}">
    <div class="img-wrapper mb-2">
      <img :src="personalizedContent.sPicUrl" class="cover" draggable="false">
      <i class="iconfont icon-video"></i>
    </div>
    <div class="name">
      {{personalizedContent.name}}
    </div>
  </div>
</template>


<script>
export default {
  props: {
    width: {
      type: String,
      default: '150px'
    },
    personalizedContent: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  .img-wrapper{
    font-size: 0px;
  }
  .cover{
    width: 100%;
  }
  .icon-video{
    position: absolute;
    left: 4px;
    top: 4px;
    border-radius: 50%;
    border: 1px solid #fff;
    width: 30px;
    height: 30px;
    background-color: rgba(0,0,0,0.33);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .name{
    font-size: 13px;
  }
}
</style>
