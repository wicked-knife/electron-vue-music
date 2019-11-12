export default [
  {
    path: 'personalizedContent',
    component: () => import(/* webpackChunkName: 'personalizedContent' */ '@/views/main/personalizedContent/personalizedContent.vue')
  }
]
