export default [
  {
    path: 'personalized-content',
    component: () => import(/* webpackChunkName: 'personalizedContent' */ '@/views/main/personalized-content/personalized-content.vue')
  }
]
