<template>
  <div class="wrapper">
    <div class="tab-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'update:tab-value'
  },
  props: ['value'],
  mounted(){
    let lastChild = null
    this.$children.forEach((child, index) => {
      child.$on('tab-item:clicked', value => {
        if(this.value === value) {
          return
        }
        this.$emit('update:tab-value', value)
        this.$emit('tab-click', value, index)
        child.active = true
        if(lastChild !== child) {
          lastChild.active = false
          lastChild = child
        }
      })
      if(child.text === this.value || child.value === this.value){
        child.active = true
        lastChild = child
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  display: flex;
  justify-content: center;
  .tab-wrapper{
    display: flex;
    border: 1px solid #2c2e32;
    border-radius: 3px;
    & > .tab-item{
      border-right: 1px solid #2c2e32;
    }
    & > .tab-item:last-child{
      border: none
    }
  }
}
</style>
