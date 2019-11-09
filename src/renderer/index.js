import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from '@/app.vue'
import router from '@/router/router.js'
import Vuetify from 'vuetify/lib'
import store from '@/store/index'
import '@/scss/global.scss'
import registerAlert from '@/base/alert/alert.js'
import {VContainer, VRow, VCol, VList, VListItemGroup, VListItem, VTabs, VTab, VBtn, VDivider} from 'vuetify/lib'

Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(registerAlert)

// 常用组件注册为全局组件
Vue.component('v-container', VContainer)
Vue.component('v-row', VRow)
Vue.component('v-col', VCol)
Vue.component('v-list', VList)
Vue.component('v-list-item-group', VListItemGroup)
Vue.component('v-list-item', VListItem)
Vue.component('v-tabs', VTabs)
Vue.component('v-tab', VTab)
Vue.component('v-btn', VBtn)
Vue.component('v-divider', VDivider)

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
  store: new Vuex.Store(store),
  render: h => h(App)
})
