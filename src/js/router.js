import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '../components/views/home/HomePage.vue'
import Login from '../components/Login.vue'

import store from './vuex'
// 测试组件
// import Test from '../components/Test.vue'

/* 会员管理 */
// import UserList from '../components/views/user/UserList.vue'
const UserList = () => import('../components/views/user/UserList.vue')                       // 会员列表
const LoginLog = () => import('../components/views/user/LoginLog.vue')                       // 登录记录

const TabManage = () => import('../components/views/user/TabManage.vue')                     // 标签管理
const BlackListManage = () => import('../components/views/user/BlackListManage.vue')         // 黑名单管理
const LevelSetting = () => import('../components/views/user/LevelSetting.vue')               // 等级设置
const WashSetting = () => import('../components/views/user/WashSetting.vue')                 // 洗码设置
/* 会员管理 */

/* 财务管理 */
const IncomeOrder = () => import('../components/views/funds/IncomeOrder.vue')                // 入款审核
const ManualAccess = () => import('../components/views/funds/ManualAccess.vue')              // 人工存取
const PaymentReview = () => import('../components/views/funds/PaymentReview.vue')            // 出款审核
const PaymentOrder = () => import('../components/views/funds/PaymentOrder.vue')              // 出款订单
const FundChange = () => import('../components/views/funds/FundChange.vue')                  // 资金账变
/* 财务管理 */

/* 公告管理 */
const Marquee = () => import('../components/views/announce/Marquee.vue')                     // 跑马灯消息
const SystemAnnounce = () => import('../components/views/announce/SystemAnnounce.vue')       // 系统公告
const LoginPopup = () => import('../components/views/announce/LoginPopup.vue')               // 登录弹窗公告
const Carousel = () => import('../components/views/announce/Carousel.vue')                   // 轮播公告
/* 公告管理 */

/* 邮件系统 */
const SendEmail = () => import('../components/views/email/SendEmail.vue')                     // 发邮件
const ReceiveEmail = () => import('../components/views/email/ReceiveEmail.vue')               // 收邮件
const EmailSent = () => import('../components/views/email/EmailSent.vue')                     // 已发邮件
const SmsPush = () => import('../components/views/email/SmsPush.vue')                         // 短信推送
/* 邮件系统 */

/* 报表管理 */
const PersonalReport = () => import('../components/views/report/PersonalReport.vue')           // 个人报表
const GameReport = () => import('../components/views/report/GameReport.vue')                   // 游戏报表
const CompanyReport = () => import('../components/views/report/CompanyReport.vue')             // 公司报表
const MemberAudit = () => import('../components/views/report/MemberAudit.vue')                 // 会员稽核
const PlatformBet = () => import('../components/views/report/PlatformBet.vue')                 // 平台注单
const ActiveReport = () => import('../components/views/report/ActiveReport.vue')               // 活动列表
const UserWash = () => import('../components/views/report/UserWash.vue')                       // 会员洗码
/* 报表管理 */

/* 游戏管理 */
const GameH5 = () => import('../components/views/game/GameH5.vue')                                     // H5游戏管理
const GamePC = () => import('../components/views/game/GamePC.vue')                                     // PC游戏管理
const GameApp = () => import('../components/views/game/GameApp.vue')                                   // APP 游戏管理
const PlatForm = () => import('../components/views/game/PlatForm.vue')                       // 平台管理
const GameSort = () => import('../components/views/game/GameSort.vue')                                 // 分类管理
/* 游戏管理 */

/* 活动管理 */
const Static = () => import('../components/views/active/Static.vue')                           // 静态活动
const Dynamic = () => import('../components/views/active/Dynamic.vue')                         // 动态活动
/* 活动管理 */

/* 金流管理 */
const OfflinePay = () => import('../components/views/pay/OfflinePay.vue')                      // 线下支付配置
const OnlinePay = () => import('../components/views/pay/OnlinePay.vue')                        // 线上支付配置
const ExportBank = () => import('../components/views/pay/ExportBank.vue')                      // 出款银行管理
/* 金流管理 */

// /* 推广配置 */
// const PromoteConfig = () => import('../components/views/promote/PromoteConfig.vue')             // 推广配置
// const PicConfig = () => import('../components/views/promote/PicConfig.vue')                     // 推广图片配置
// /* 推广配置 */

/* 设置管理 */
const AdminSort = () => import('../components/views/set/AdminSort.vue')                        // 管理员分组
const AllAreaSet = () => import('../components/views/set/AllAreaSet.vue')                      // 全域设置
const PicConfig = () => import('../components/views/set/PicConfig.vue')                     // 推广图片配置
const ServiceSet = () => import('../components/views/set/ServiceSet.vue')                      // 客服设置
const HelpSet = () => import('../components/views/set/HelpSet.vue')                            // 帮助设置
const OperatRecord = () => import('../components/views/set/OperatRecord.vue')                  // 帮助设置
const BankCenter = () => import('../components/views/set/BankCenter.vue')                      // 银行卡反查中心
/* 设置管理 */

/* 404页面 */
const Page404 = () => import('../components/views/page404/page404.vue')
/* 404页面 */
Vue.use(Router)
// 解决 路由 NavigationDuplicated 报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/login'
        },

        {
            path: '/login',
            component: Login
        },

        {
            path: '/home/home',
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
            path: '/funds/incomeorder',
            component: IncomeOrder
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
        // --出款订单
        {
            path: '/funds/Paymentorder',
            component: PaymentOrder
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
        // 系统公告
        {
            path: '/announce/systemannounce',
            component: SystemAnnounce
        },
        // 登录弹窗公告
        {
            path: '/announce/loginpopup',
            component: LoginPopup
        },
        // 轮播公告
        {
            path: '/announce/carousel',
            component: Carousel
        },

        /* -----------------------------------  邮件系统 ------------------------------------*/
        // 发邮件
        {
            path: '/email/sendemail',
            component: SendEmail
        },
        // 收件箱
        {
            path: '/email/receiveemail',
            component: ReceiveEmail
        },
        // 已发邮件
        {
            path: '/email/emailsent',
            component: EmailSent
        },
        // 短息推送
        {
            path: '/email/smspush',
            component: SmsPush
        },
        /* -----------------------------------  邮件系统 ------------------------------------*/
        // 个人报表
        {
            path: '/report/personalreport',
            component: PersonalReport
        },
        // 游戏报表
        {
            path: '/report/gamereport',
            component: GameReport
        },
        // 公司报表
        {
            path: '/report/companyreport',
            component: CompanyReport
        },
        // 会员稽核
        {
            path: '/report/memberaudit',
            component: MemberAudit
        },
        // 平台注单
        {
            path: '/report/platformbet',
            component: PlatformBet
        },
        // 活动列表
        {
            path: '/report/activereport',
            component: ActiveReport
        },
        // 会员洗码
        {
            path: '/report/userwash',
            component: UserWash
        },

        /* -----------------------------------  游戏管理 ------------------------------------*/
        {
            path: '/game/gameh5',
            component: GameH5
        },
        {
            path: '/game/gamepc',
            component: GamePC
        },
        {
            path: '/game/gameapp',
            component: GameApp
        },
        {
            path: '/game/platform',
            component: PlatForm
        },
        {
            path: '/game/gamesort',
            component: GameSort
        },

        /* -----------------------------------  活动管理 ------------------------------------*/
        {
            path: '/active/static',
            component: Static
        },
        {
            path: '/active/dynamic',
            component: Dynamic
        },

        /* -----------------------------------  金流管理 ------------------------------------*/
        {
            path: '/pay/offlinepay',
            component: OfflinePay
        },
        {
            path: '/pay/onlinepay',
            component: OnlinePay
        },
        {
            path: '/pay/exportbank',
            component: ExportBank
        },

        /* -----------------------------------  设置管理 ------------------------------------*/
        {
            path: '/set/adminsort',
            component: AdminSort
        },
        {
            path: '/set/allareaset',
            component: AllAreaSet
        },
        {
            path: '/set/picconfig',
            component: PicConfig
        },
        {
            path: '/set/serviceset',
            component: ServiceSet
        },
        {
            path: '/set/helpset',
            component: HelpSet
        },
        {
            path: '/set/operatrecord',
            component: OperatRecord
        },
        {
            path: '/set/bankcenter',
            component: BankCenter
        },







        /* -----------------------------------  404页面 ------------------------------------*/
        {
            path: '/page404',
            component: Page404
        },
        {
            path: '*',
            redirect: '/page404'
        },
    ]
})
router.beforeEach((to, from, next) => {
    // console.log(to.path);
    // console.log(from.path);
    // console.log('store',store)

    let isLogin = window.all.tool.getLocal('isLogin')
    // console.log('islogin', isLogin)
    // if (to.path !== from.path) {
    //     next()
    // }else
    if (!isLogin && to.path !== '/login') {
        next({ path: '/login' })
    }else if(to.path !== from.path){
        next()
    }
})
export default router
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