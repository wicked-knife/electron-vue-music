import Vue from 'vue'
import loadingTemp from './loading.vue'
const LoadingCtor = Vue.extend(loadingTemp)

function createLoadingInstance() {
  return new LoadingCtor({
    el: document.createElement('div'),
    data() {
      return {
        loading: false
      }
    }
  })
}

export default function registerVLoadingDirective(_Vue) {
  _Vue.directive('loading', {
    bind: function(el, { value }) {
      if (value) {
        el.$loading = createLoadingInstance()
        el.style.position = 'relative'
        el.appendChild(el.$loading.$el)
        el.$loading.loading = true
      }
    },
    update: function(el, { oldValue, value }) {
      if (oldValue !== value) {
        el.$loading.loading = value
      }
    },
    unbind(el){
      el.$loading.$destroy()
      delete el.$loading
    }
  })
}
