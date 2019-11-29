export default [
  {
    path: 'song-list/:id',
    component: () => import(/* webpackChunkName: 'song~list~detail' */ '@/views/main/song-list-detail/song-list-detail.vue')
  }
]
