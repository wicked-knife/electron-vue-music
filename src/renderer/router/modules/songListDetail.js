export default [
  {
    path: 'song-list-detail/:id',
    component: () => import(/* webpackChunkName: 'song-list-detail' */ '@/views/main/songListDetail/songListDetail.vue')
  }
]
