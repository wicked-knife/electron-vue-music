import Vue from 'vue'
import TestVue from '../components/another-vue'

new Vue({
  el: '#app',
  render:h => h(TestVue)
})
