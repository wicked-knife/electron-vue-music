import VueRouter from 'vue-router'
import Index from '@/views/index/index.vue'
import Bar from '@/views/bar.vue'
import RecommendIndex from '@/views/index/recommend/index.vue'
import RecommendSongList from '@/views/index/recommend/song-list.vue'
const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/recommend',
    children: [
      {
        path: 'recommend',
        component: RecommendIndex
      },
      {
        path: 'recommend/song-list',
        component: RecommendSongList
      }
    ]
  },
  { path: '/bar', component: Bar }
]

export default new VueRouter({
  routes
})
