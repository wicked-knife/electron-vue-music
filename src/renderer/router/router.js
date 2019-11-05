import VueRouter from 'vue-router'
import Index from '@/views/index/index.vue'
import RecommendIndex from '@/views/index/recommend/index.vue'
import RecommendSongList from '@/views/index/recommend/song-list.vue'
import PersonalFM from '@/views/personalFM/personalFM.vue'
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
  { path: '/personalFM', component: PersonalFM }
]

export default new VueRouter({
  routes
})
