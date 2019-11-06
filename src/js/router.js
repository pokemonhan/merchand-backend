import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/views/home/homePage.vue'
/* 会员管理 */
  // 会员列表
import UserList from '@/components/views/user/UserList.vue'
import UserLoginPlantform from '@/components/views/user/UserLoginPlantform.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage
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
    {
      path: '/user/UserLoginPlantform',
      component: UserLoginPlantform
    },
   /*  会员管理 */
  ]
})
