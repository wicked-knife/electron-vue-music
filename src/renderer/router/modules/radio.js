export default [
  {
    path: 'radio-cate-list/:id',
    component: () => import(/* webpackChunkName: 'radio~cate~list' */ '@/views/main/radio-cate-list/radio-cate-list.vue')
  },
  {
    path: 'radio/:id',
    component: () => import(/* webpackChunkName: 'radio~detail' */ '@/views/main/radio-detail/radio-detail.vue')
  }
]
