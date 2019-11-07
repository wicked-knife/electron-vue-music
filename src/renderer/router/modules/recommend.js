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
      }
    ]
  }
]


