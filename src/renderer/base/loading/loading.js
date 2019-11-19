import Vue from 'vue'
import loadingTemp from './loading.vue'

const LoadingCtor = Vue.extend(loadingTemp)

export default new LoadingCtor({
  el: document.createElement('div'),
  data(){
    return {
      loading: false
    }
  }
})
