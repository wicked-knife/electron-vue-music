export default [{
  path: 'video',
  component: () => import(/* webpackChunkName: 'video' */ '@/views/main/video/video.vue'),
  redirect: '/main/video/index',
  children: [
    {
      path: 'index',
      component: () => import(/* webpackChunkName: 'video~index' */ '@/views/main/video/index/index.vue')
    },
    {
      path: 'MV',
      component: () => import(/* webpackChunkName: 'video~MV' */ '@/views/main/video/MV/MV.vue')
    }
  ]
}]
