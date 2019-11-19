import Vue from 'vue'
import loadingTemp from './loading.vue'
const LoadingCtor = Vue.extend(loadingTemp)

function createLoadingInstance(){
  const loadingInstance = new LoadingCtor({
    el: document.createElement('div'),
    data(){
      return {
        loading: false
      }
    }
  })
  return {
    bind: function(el, {value}){
      if(value) {
        el.style.position = 'relative'
        el.appendChild(loadingInstance.$el)
        loadingInstance.loading = true
      }
    },
    update: function(el, {oldValue, value}){
      if(oldValue !== value) {
        loadingInstance.loading = value
      }
    }
  }
}

export default function registerVLoadingDirective(_Vue) {
  _Vue.directive('loading', createLoadingInstance())
}
