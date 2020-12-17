import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () =>import(/* webpackChunkName: "index" */ '../views/index/index.vue')
  },
  // 新闻
  {
    path: '/newsInfo',
    name: 'newsInfo',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "newsInfo" */ '@/views/news/newsInfo.vue')
  },
  // 新闻详情
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
  },
  // 店铺
  {
    path: '/shop',
    name: 'Shop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "shop" */ '@/views/shop/shop.vue')
  },
  {
    path: '/shopAddress',
    name: 'ShopAddress',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "shopAddress" */ '@/views/shop/shopAddress.vue')
  },
  // 排名/统计资料
  {
    path: '/ranking',
    name: 'Ranking',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ranking" */ '@/views/ranking/ranking.vue')
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL), // 不带#号
  history: createWebHashHistory(), // 带#号
  routes
})

export default router
