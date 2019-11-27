export default [
  {
    path: 'radio-cate-list/:id',
    component: () => import(/* webpackChunkName: 'radio~cate~list' */ '@/views/main/radioCateList/radioCateList.vue')
  },
  {
    path: 'radio/:id',
    component: () => import(/* webpackChunkName: 'radio~detail' */ '@/views/main/radioDetail/radioDetail.vue')
  }
]
