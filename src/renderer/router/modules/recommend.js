export default [
  {
    path: 'recommend',
    component: () => import(/* webpackChunkName: 'recommend' */ '@/views/main/recommend/recommend.vue'),
    redirect: '/main/recommend/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: 'recommend~index' */ '@/views/main/recommend/index/index.vue')
      },
      {
        path: 'song-list',
        component: () => import(/* webpackChunkName: 'recommend~song-list' */ '@/views/main/recommend/song-list/song-list.vue')
      },
      {
        path: 'radio',
        component: () => import(/* webpackChunkName: 'recommend~radio' */ '@/views/main/recommend/radio/radio.vue')
      },
      {
        path: 'latest-music',
        component: () => import(/* webpackChunkName: 'recommend~latest-music' */ '@/views/main/recommend/latest-music/latest-music.vue')
      }
    ]
  }
]


