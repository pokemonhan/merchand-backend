import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/components/views/home/HomePage.vue'
import Login from '@/components/Login.vue'
// 测试组件
// import Test from '@/components/Test.vue'

/* 会员管理 */
// import UserList from '@/components/views/user/UserList.vue'
const UserList = () => import('@/components/views/user/UserList.vue')                       //会员列表
const LoginLog = () => import('@/components/views/user/LoginLog.vue')                       //登录记录

const TabManage = () => import('@/components/views/user/TabManage.vue')                     // 标签管理
const BlackListManage = () => import('@/components/views/user/BlackListManage.vue')         // 黑名单管理
const LevelSetting = () => import('@/components/views/user/LevelSetting.vue')               // 等级设置
const WashSetting = () => import('@/components/views/user/WashSetting.vue')                 // 洗码设置
/* 会员管理 */

/* 财务管理 */
const IncomeReview = () => import('@/components/views/funds/IncomeReview.vue')              // 入款审核
const ManualAccess = () => import('@/components/views/funds/ManualAccess.vue')              // 人工存取
const PaymentReview = () => import('@/components/views/funds/PaymentReview.vue')            // 出款审核
const PaymentList = () => import('@/components/views/funds/PaymentList.vue')                // 出款列表
const FundChange = () => import('@/components/views/funds/FundChange.vue')                  // 资金账变
/* 财务管理 */

/* 公告管理 */
const Marquee = () => import('@/components/views/announce/Marquee.vue')                     // 出款列表
const SystemAnnounce = () => import('@/components/views/announce/SystemAnnounce.vue')       // 出款列表
/* 公告管理 */
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: HomePage
        },
    
        {
            path: '/login',
            component: Login
        },

        {
            path: '/home',
            component: HomePage
        },

        /* ============================= 会员管理 ==================================*/

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
        /* ----------------------------------  会员管理 ----------------------*/




        /* ==================================== 财务管理 =========================*/
        // -- 入款审核
        {
            path: '/funds/incomereview',
            component: IncomeReview
        },
        //  -- 人工存取
        {
            path: '/funds/manualaccess',
            component: ManualAccess
        },
        // --出款审核
        {
            path: '/funds/paymentreview',
            component: PaymentReview
        },
        // --出款列表
        {
            path: '/funds/paymentlist',
            component: PaymentList
        },
        // --资金账变
        {
            path: '/funds/fundchange',
            component: FundChange
        },


        /* -----------------------------------  财务管理 ------------------------------------*/
        // 跑马灯消息
        {
            path: '/announce/marquee',
            component: Marquee
        },
        // 系统公告消息
        {
            path: '/announce/systemannounce',
            component: SystemAnnounce
        },
    ]
})


// const routes = new Router({
//     routes: [
//         {
//             path: '/',
//             component: HomePage
//         },
//         {
//             path: '/home',
//             component: HomePage
//         },
//         // {
//         //     path: '/login',
//         //     component: Login
//         // },
//     ]
// })

// let route_add = []

// let r = require.context('../components/views', true, /.vue$/, 'lazy')           //获取 /views所有文件路径 lazy加载
// r.keys().forEach(file_name => {
//     let path = file_name.slice(1).replace('.vue', '').toLowerCase()
//     let length = file_name.split('/').length
//     let name = file_name.split('/')[length-1].replace('.vue','')
//     console.log(name)
//     // console.log('文件path ', path)
//     route_add.push({
//         path: path,
//         // name: name,
//         // 懒加载
//         component: () => r(file_name)
//     })
    
// })
// // console.log('"所有"路由',route_add)
// routes.addRoutes(route_add)
// export default routes