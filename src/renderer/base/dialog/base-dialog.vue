<template>
  <v-dialog :value="value" :max-width="maxWidth" @click:outside="handleClickOutside">
    <div class="dialog border-a">
      <div class="dialog-title subtitle-2 border-b" v-if="title">{{title}}
        <i class="iconfont icon-close" @click="handleCancelClick"></i>
      </div>
      <slot></slot>
      <div class="dialog-actions border-t">
        <v-btn class="mr-4" height="30px" color="#2e4e7e" @click="handleConfirmClick" depressed>确认</v-btn>
        <v-btn height="30px" color="#37383c" @click="handleCancelClick" depressed>取消</v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { VDialog } from 'vuetify/lib'
export default {
  model: {
    prop: 'value',
    event: 'update:dialog-visiable'
  },
  components: {
    VDialog
  },
  props: {
    value: Boolean,
    maxWidth: {
      type: [Number, String],
      default: '390px'
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClickOutside() {
      this.$emit('update:dialog-visiable', false)
    },
    handleCancelClick(){
      this.$emit('update:dialog-visiable', false)
      this.$emit('dialog:cancel')
    },
    handleConfirmClick(){
      this.$emit('dialog:confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  background-color: #2d2f33;
  .dialog-title {
    padding: 16px 12px 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-color: #3b3a3d;
    .icon-close{
      cursor: pointer;
      padding: 0 5px;
    }
  }
  .dialog-actions{
    padding: 10px 0;
    background-color: #292b2f;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: #323135;
    
  }
}
</style>
