<template>
  <div class="wrapper" :style="{width}">
    <div :class="['img-wrapper mb-2', radio.copywriter && radio.copywriter.length > 4 ? '__active-hover' : '']">
      <img :src="radio.picUrl + '?param=160y160'" class="cover" draggable="false" />
      <div class="name subtitle-3">{{radio.name}}</div>
    </div>
    <div class="copywriter">{{radio.copywriter || radio.rcmdtext || radio.category}}</div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '150px'
    },
    radio: {
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
    .name {
      position: absolute;
      bottom: 0px;
      left: 0;
      width: 100%;
      text-indent: 4px;
      padding: 4px 0;
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.7) 100%
      );
    }
  }
  .cover {
    width: 100%;
  }
  .copywriter {
    font-size: 13px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
}
.__active-hover {
  &:hover {
    .play-count {
      opacity: 0;
    }
  }
}
</style>
