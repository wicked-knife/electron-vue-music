export default [
  {
    name: 'daily-song',
    path: 'daily-song',
    component: () => import(/* webpackChunkName: 'daily~song' */ '@/views/main/daily-song/daily-song.vue')
  }
]
