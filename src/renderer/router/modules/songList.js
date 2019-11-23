export default [
  {
    path: 'song-list/:id',
    component: () => import(/* webpackChunkName: 'song-list-detail' */ '@/views/main/songList/songList.vue')
  }
]
