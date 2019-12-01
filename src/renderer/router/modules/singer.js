export default [
  {
    path: 'singer/:id',
    component: () => import(/* webpackChunkName: 'singer~detail' */ '@/views/main/singer-detail/singer-detail.vue')
  }
]
