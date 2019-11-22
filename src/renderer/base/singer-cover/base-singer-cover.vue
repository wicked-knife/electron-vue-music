<template>
  <div class="wrapper" :style="{width}">
    <div class="img-wrapper mb-2">
      <img
        :src="singer.img1v1Url + '?param=160y160'"
        class="cover"
        draggable="false"
      />
    </div>
    <div class="name d-flex justify-space-between align-center">{{singer.name}}<i class="iconfont icon-user" v-show="singer.accountId"></i> </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '150px'
    },
    singer: {
      type: Object,
      required: true
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
    padding-top: 100%;
  }
  .cover {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .name {
    font-size: 13px;
    cursor: pointer;
    .icon-user{
      font-size: 12px;
      color: $theme-color;
      transform: translateY(2px);
    }
  }
}
</style>
