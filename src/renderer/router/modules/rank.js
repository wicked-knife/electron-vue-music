export default [
  {
    path: 'rank/:id',
    component: () => import(/* webpackChunkName: 'rank~detail' */ '@/views/main/rank-detail/rank-detail.vue')
  }
]
