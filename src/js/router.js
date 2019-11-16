import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/views/home/homePage.vue'
import Login from '@/components/Login.vue'
// 测试组件
import Test from '@/components/Test.vue'
/* 会员管理 */
  // 会员列表
// import UserList from '@/components/views/user/UserList.vue'
const UserList = ()=>import('@/components/views/user/UserList.vue')
const LoginLog = ()=>import('@/components/views/user/LoginLog.vue')

const TabManage = ()=>import('@/components/views/user/TabManage.vue')
const BlackListManage = ()=>import('@/components/views/user/BlackListManage.vue')
const LevelSetting = ()=>import('@/components/views/user/LevelSetting.vue')
const WashSetting = ()=>import('@/components/views/user/WashSetting.vue')


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/login',
      component: Login
    },

    {
      path: '/home',
      component: HomePage
    },

   /*  会员管理 */

    // 会员列表
    {
      path: '/user/userlist',
      component: UserList
    },
    // 登录记录
    {
      path: '/user/loginlog',
      component: LoginLog
    },
    // 标签管理
    {
      path: '/user/tabmanage',
      component: TabManage
    },
    // 黑名单管理
    {
      path: '/user/blacklistmanage',
      component: BlackListManage
    },
    // 等级设置
    {
      path: '/user/levelsetting',
      component: LevelSetting
    },
    // 洗码设置
    {
      path: '/user/washsetting',
      component: WashSetting
    },
   /*  会员管理 */
  ]
})
