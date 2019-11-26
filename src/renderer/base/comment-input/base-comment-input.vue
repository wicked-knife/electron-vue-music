<template>
  <v-row class="input-wrapper flex-column">
    <textarea rows="3" class="comment-input beautify-scrollbar" maxlength="140" v-model="value"></textarea>
    <div :class="['input-count subtitle-3', restInputCount === 0 ? 'red--text' : '']">{{restInputCount}}</div>
    <div class="d-flex justify-space-between align-center mt-2">
      <div class="d-flex justify-space-between align-center">
        <i class="iconfont icon-emoji"></i>
        <i class="iconfont icon-eit"></i>
        <i class="iconfont icon-topic"></i>
      </div>
      <v-btn height="26px" min-width="42px" width="42px" class="subtitle-3" color="#2b2c31">评论</v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  data(){
    return {
      value: ''
    }
  },
  computed:{
    restInputCount(){
      return 140 - this.value.length
    }
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  box-sizing: border-box;
  background-color: #1c1e23;
  padding: 12px 12px 8px 12px;
  .comment-input {
    width: 100%;
    background-color: #2b2c31;
    box-sizing: border-box;
    padding: 4px 8px;
    font-size: 14px;
    resize: none;
    margin-bottom: -6px;
    &:focus {
      outline: transparent auto 0px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #1c1e23;
    }
  }
  .input-count {
    background-color: #2b2c31;
    text-align: right;
    padding: 4px 8px 4px 0;
  }
  .icon-emoji,.icon-topic,.icon-eit{
    color: #757575;
    cursor: pointer;
    &:hover{
      color: #fff;
    }
  }
  .icon-emoji{
    font-size: 24px;
  }
  .icon-eit{
    font-size: 24px;
    margin: 0 6px;
  }
  .icon-topic{
    font-size: 18px;
    font-weight: bolder;
  }
}
</style>
