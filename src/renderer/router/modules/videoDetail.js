export default [
  {
    name: 'video-play',
    path: 'video/play/:id',
    component: () => import(/* webpackChunkName: 'video~detail' */ '@/views/main/video-detail/video-detail.vue')
  }]
