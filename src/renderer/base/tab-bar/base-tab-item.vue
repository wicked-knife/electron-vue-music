<template>
  <div :class="['tab-item subtitle-3', active ? 'active' : '']" @click="handleTabItemClick">
    {{text}}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    value: {
      default: null
    }
  },
  data(){
    return {
      active: false
    }
  },
  methods: {
    handleTabItemClick(){
      this.$emit('tab-item:clicked', this.value ? this.value : this.text)
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-item{
  color: rgba(255, 255, 255, 0.6);
  padding: 4px 30px;
  cursor: pointer;
  &:hover{
    background-color: #202226;
  }
  &.active{
    color: #b1b1b1;
    background-color: rgb(58,58,63);
  }
}
</style>
