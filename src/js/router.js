import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/views/home/homePage.vue'
import Login from '@/components/Login.vue'
// 测试组件
import Test from '@/components/Test.vue'
/* 会员管理 */
  // 会员列表
import UserList from '@/components/views/user/UserList.vue'
import LoginLog from '@/components/views/user/LoginLog.vue'
import TabManage from '@/components/views/user/TabManage.vue'

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
   /*  会员管理 */
  ]
})
