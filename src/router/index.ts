import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () =>import(/* webpackChunkName: "index" */ '../views/index/index.vue')
  },
  {
    path: '/news',
    name: 'News',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "news" */ '@/views/news/news.vue')
  },
  // 日程表/结果
  {
    path: '/league',
    name: 'league',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "league" */ '@/views/league/league.vue')
  },
  {
    path: '/calendar',
    name: 'Calendar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "calendar" */ '@/views/league/calendar/index.vue')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "calendar" */ '@/views/league/calendar/ranking.vue')
  },
  {
    path: '/matchTeam',
    name: 'MatchTeam',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "matchTeam" */ '@/views/league/calendar/matchTeam.vue')
  },
  // 队伍模块
  {
    path: '/team',
    name: 'team',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "team" */ '@/views/team/team.vue')
  },
  {
    path: '/teamInfo',
    name: 'teamInfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "teamInfo" */ '@/views/team/teamInfo.vue')
  },
  // 我的页面
  {
    path: '/myPage',
    name: 'MyPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "myPage" */ '@/views/myPage/myPage.vue')
  },
  // 玩家
  {
    path: '/players',
    name: 'Players',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "players" */ '@/views/players/players.vue')
  },
  {
    path: '/playerInfo',
    name: 'PlayerInfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "playerInfo" */ '@/views/players/playerInfo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
