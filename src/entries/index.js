import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/app.vue'
import router from '@/router/router.js'

Vue.use(VueRouter)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
