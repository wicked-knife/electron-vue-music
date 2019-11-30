export default [
  {
    name: 'hot-comments',
    path: 'hot-comments',
    component: () => import(/* webpackChunkName: 'hot~comments' */ '@/views/main/hot-comments/hot-comments.vue')
  }
]
