<template>
  <div class="tag-wrapper">
    <div class="tag-title grey--text">
      {{title}}：
    </div>
    <div class="tag-list">
      <div :class="['tag-item subtitle-3 border-r', value === text ? 'active' : '']" v-for="text in list" :key="text" >
        <span class="tag-text" @click="handleClick(text)">
          {{text}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'update:select'
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '标签'
    }
  },
  methods:{
    handleClick(text){
      this.$emit('update:select', text)
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-wrapper{
  display: flex;
  .tag-title{
    font-size: 13px;
    flex-shrink: 0;
  }
  .tag-list{
    display: flex;
    flex-wrap: wrap;
  }
  .tag-item{
    padding:  0 14px;
    margin-bottom: 16px;
    &.active{
      .tag-text{
        background-color: #54575f;
        color: #000 !important;
      }
    }
    .tag-text{
      color: #9e9e9e;
      cursor: pointer;
      padding: 0 4px;
      border-radius: 2px;
      &:hover{
        color: #fff;
      }
    }
  }
}
</style>
