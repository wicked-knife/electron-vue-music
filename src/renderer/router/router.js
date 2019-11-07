/* eslint-disable */

import VueRouter from 'vue-router'
import MainLayout from '@/views/main/main-layout.vue'
import Recommend from '@/views/main/recommend/recommend.vue'
import RecommendIndex from '@/views/main/recommend/index/index.vue'
import PersonalFM from '@/views/main/personalFM/personalFM.vue'
import Login from '@/views/login/login.vue'
import RecommendSongList from '@/views/main/recommend/song-list/song-list.vue'
const routes = [
  {
    path: '/',
    redirect: '/main/recommend/index'
  },
  {
    path: '/main',
    component: MainLayout,
    children: [
      {
        path: 'recommend',
        component: Recommend,
        children: [
          {
            path: 'index',
            component: RecommendIndex
          },
          {
            path: 'song-list',
            component: RecommendSongList
          }
        ]
      },
      {
        path: 'personalFM',
        component: PersonalFM
      }
    ]
  },
  { path: '/login', component: Login }
]

export default new VueRouter({
  routes
})
