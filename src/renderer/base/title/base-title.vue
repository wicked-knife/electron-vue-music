<template>
  <v-row class="d-flex justify-space-between align-center __title pb-1">
    <span class="subtitle-1">{{text}}</span>
      <router-link :to='to' tag='span' class="caption grey--text d-flex align-center" v-if="to">
        更多<i class="iconfont icon-enter"></i>
      </router-link>
  </v-row>
</template>


<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    to: {
      type: String,
      default: '',
    }
  }
}
</script>

<style lang="scss">
.__title{
  border-bottom: 1px solid #23262c;
  margin-bottom: 10px;
}
.caption{
  cursor: pointer;
  &:hover{
    color: #fff !important;
  }
}
</style>
