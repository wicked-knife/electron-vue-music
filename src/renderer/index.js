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
import registerVLoadingDirective from '@/base/loading/loading.js'
import bus from '@/common/bus.js'


Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(registerAlert)
Vue.use(registerVuetifyComponent)
Vue.use(registerVLoadingDirective)

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
