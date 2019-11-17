<template>
  <v-dialog :value="value" :max-width="maxWidth" @click:outside='handleClickOutside' hide-overlay>
    <slot>
    </slot>
  </v-dialog>
</template>

<script>
import {VDialog} from 'vuetify/lib'
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
      default: '300px'
    }
  },
  methods: {
    handleClickOutside(){
      this.$emit('update:dialog-visiable', false)
    }
  }
}
</script>
