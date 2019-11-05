import VueRouter from 'vue-router'
import Index from '@/views/index/index.vue'
import Bar from '@/views/bar.vue'
const routes = [
  { path: '/', component: Index },
  { path: '/bar', component: Bar }
]

export default new VueRouter({
  routes
})
