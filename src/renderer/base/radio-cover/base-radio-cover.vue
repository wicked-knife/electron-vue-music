<template>
  <div :class="['wrapper', size]" :style="size === 'normal' ? {width} : null" @click="$emit('radio:click', radio)">
    <div :class="['img-wrapper mb-2', radio.copywriter && radio.copywriter.length > 4 ? '__active-hover' : '']">
      <img :src="radio.picUrl + '?param=160y160'" class="cover" draggable="false" />
      <div class="name subtitle-3" v-if="size === 'normal'">{{radio.name}}</div>
    </div>
    <div class="copywriter" v-if="size === 'normal'">{{radio.copywriter || radio.rcmdtext || radio.category}}</div>
    <div class="radio-info pt-3" v-if="size === 'large'">
      <div class="name subtitle-2 mb-3">
        {{radio.name}}
      </div>
      <div class="desc subtitle-3 grey--text text--darken-2 mb-2">
        {{radio.rcmdtext}}
      </div>
      <div class="count subtitle-3 grey--text text--darken-2">
        节目 : {{radio.programCount}} , 订阅 : {{radio.subCount}}
      </div>
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
    radio: {
      type: Object,
      required: true
    },
    size: {
      type: String,
      default: 'normal'
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
  &.large{
    flex-direction: row;
    width: 50%;
    .img-wrapper{
      margin-bottom: 0px;
      margin-right: 10px;
      max-width: 120px;
    }
    .name{
      cursor: pointer;
    }
  }
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
