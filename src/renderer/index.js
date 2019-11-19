import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from '@/app.vue'
import router from '@/router/router.js'
import Vuetify from 'vuetify/lib'
import store from '@/store/index'
import '@/scss/global.scss'
import registerAlert from '@/base/alert/alert.js'
import registerVuetifyComponent from '@/base/registerVuetifyComponent.js'
import bus from '@/common/bus.js'
import loading from '@/base/loading/loading.js'


Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(registerAlert)
Vue.use(registerVuetifyComponent)

Vue.directive('loading', {
  bind: function(el, {value}){
    if(value) {
      el.appendChild(loading.$el)
      loading.loading = true
    }
  },
  update: function(el, {oldValue, value}){
    if(oldValue !== value) {
      if(!value) {
        loading.loading = false
      }
    }
  }
})

new Vue({
  el: '#app',
  vuetify: new Vuetify({
    theme: {
      dark: true,
      themes: {
        dark:{
          primary: '#b1b1b1'
        }
      }
    },
    icons: {
      iconfont: 'mdiSvg'
    },
  }),
  router,
  store: new Vuex.Store(store),
  render: h => h(App)
})

document.addEventListener('click', ev => bus.emit('document:clicked', ev))
