import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/app.vue'
import router from '@/router/router.js'
import Vuetify from 'vuetify/lib'

Vue.use(VueRouter)
Vue.use(Vuetify)

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
    }
  }),
  router,
  render: h => h(App)
})
