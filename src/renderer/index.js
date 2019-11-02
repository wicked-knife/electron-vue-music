import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/renderer/app.vue'
import router from '@/renderer/router/router.js'
import Vuetify from 'vuetify/lib'

Vue.use(VueRouter)
Vue.use(Vuetify)

new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  router,
  render: h => h(App)
})
