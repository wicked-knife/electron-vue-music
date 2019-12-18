export default [
  {
    name: 'video-play',
    path: 'video/play/:id',
    component: () => import(/* webpackChunkName: 'video~detail' */ '@/views/main/video-detail/video-detail.vue')
  },
  {
    name: 'MV-play',
    path: 'MV/play/:id',
    component: () => import(/* webpackChunkName: 'MV~detail' */ '@/views/main/MV-detail/MV-detail.vue')
  }
]
