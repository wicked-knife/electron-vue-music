<template>
  <div class="wrapper" :style="{width}">
    <div class="img-wrapper mb-2">
      <img :src="album.picUrl + '?param=160y160'" class="cover" draggable="false" />
    </div>
    <div class="name">{{album.name}} <span v-if="album.transNames" class="grey--text">({{album.transNames[0]}})</span> </div>
    <div class="artist grey--text subtitle-2">
      {{album.artist.name}}
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
    album: {
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
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .name {
    font-size: 13px;
    cursor: pointer;
  }
  .artist{
    cursor: pointer;
  }
}
</style>
