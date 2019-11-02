import VueRouter from 'vue-router'
import Foo from '@/renderer/views/foo.vue'
import Bar from '@/renderer/views/bar.vue'
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

export default new VueRouter({
  routes
})
