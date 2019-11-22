export default [
  {
    path: 'recommend',
    component: () => import(/* webpackChunkName: 'recommend' */ '@/views/main/recommend/recommend.vue'),
    redirect: '/main/recommend/index',
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: 'recommend~index' */ '@/views/main/recommend/index/index.vue')
      },
      {
        path: 'song-list',
        component: () => import(/* webpackChunkName: 'recommend~song-list' */ '@/views/main/recommend/song-list/index.vue'),
        redirect: '/main/recommend/song-list/index',
        children:[
          {
            path: 'index',
            component: () => import(/* webpackChunkName: 'recommend~song-list' */ '@/views/main/recommend/song-list/song-list.vue'),
          },
          {
            path: 'HQ',
            component: () => import(/* webpackChunkName: 'recommend~song-list' */ '@/views/main/recommend/song-list/HQ-song-list.vue'),
          }
        ]
      },
      {
        path: 'radio',
        component: () => import(/* webpackChunkName: 'recommend~radio' */ '@/views/main/recommend/radio/radio.vue')
      },
      {
        path: 'rank',
        component: () => import(/* webpackChunkName: 'recommend~rank' */ '@/views/main/recommend/rank/rank.vue')
      },
      {
        path: 'singer',
        component: () => import(/* webpackChunkName: 'recommend~singer' */ '@/views/main/recommend/singer/singer.vue')
      },
      {
        path: 'latest-music',
        component: () => import(/* webpackChunkName: 'recommend~latest-music' */ '@/views/main/recommend/latest-music/latest-music.vue'),
        children: [
          {
            path: 'new-song',
            component: () => import(/* webpackChunkName: 'recommend~latest-music'  */ '@/views/main/recommend/latest-music/new-song.vue')
          },
          {
            path: 'new-disc',
            component: () => import(/* webpackChunkName: 'recommend~latest-music'  */ '@/views/main/recommend/latest-music/new-disc.vue')
          }
        ]
      }
    ]
  }
]


