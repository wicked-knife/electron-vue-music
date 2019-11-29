export default [
  {
    path: 'rank/:name',
    component: () => import(/* webpackChunkName: 'rank~detail' */ '@/views/main/rank-detail/rank-detail.vue')
  }
]
