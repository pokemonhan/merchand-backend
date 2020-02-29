export default {
    /**
     *
     * 增  add
     * 删  del
     * 改  set
     * 查  list
     *
     */
    /*=========================== 公共分类 ===========================--*/
    // 公共分类 - 上传图片-保存至书库，获取图片存储路径
    update_picture_database: {
        url: '/merchant-api/upload',
        method:'post'
    },

    /*=========================== 登录登出 ===========================--*/

    // 登录
    login: {
        url: '/merchant-api/login',
        method: 'post'
    },
    // 2.登出
    logout: {
        url: '/merchant-api/logout',
        method: 'get',
    },

    /*===========================   菜单   ===========================--*/
    // 获取商户个人菜单 ,也是所有菜单
    current_admin_menu: {
        url: '/merchant-api/menu/current-admin-menu',
        method: 'get'
    },
    /*===========================   首页   ===========================--*/



    /*=========================== 会员管理 ===========================--*/

    // ----  会员列表
    // 会员列表 - 列表查询 ---------
    user_list: {
        url: '/merchant-api/frontend-user/index',
        method: 'post'
    },
    // 会员列表 - 登记记录
    user_login_log_list: {
        url: '/merchant-api/frontend-user/login-log',
        method: 'post'
    },

    // 标签管理 - 列表 -------
    tag_list: {
        url: '/merchant-api/user-tags/index',
        method: 'get'
    },
    // 标签管理 - 添加
    tag_add: {
        url: '/merchant-api/user-tags/do-add',
        method: 'post'
    },
    // 标签管理 - 编辑
    tag_edit: {
        url: '/merchant-api/user-tags/edit',
        method: 'post'
    },
    // 标签管理 - 删除
    tag_del: {
        url: '/merchant-api/user-tags/delete',
        method: 'post'
    },

    // ------ 黑名单 ---------

    // 黑名单 - 黑名单列表
    black_list_list: {
        url: '/merchant-api/frontend-user-black-list/index',
        method: 'post'
    },
    // 黑名单 - 详情
    black_list_detail_list: {
        url: '/merchant-api/frontend-user-black-list/detail',
        method: 'post'
    },
    //黑名单 - 移除
    black_list_detail_remove: {
        url: '/merchant-api/frontend-user-black-list/remove',
        method: 'post'
    },

    // ---- 等级管理 - 晋级规则 --------
    grade_config_list: {
        url: '/merchant-api/user-grade/config',
        method: 'post',
    },
    // ---- 等级管理 - 列表
    grade_list: {
        url: '/merchant-api/user-grade/index',
        method: 'get',
    },
    // ---- 等级管理 - 添加
    grade_add: {
        url: '/merchant-api/user-grade/do-add',
        method: 'post',
    },
    // ---- 等级管理 - 编辑
    grade_set: {
        url: '/merchant-api/user-grade/edit',
        method: 'post',
    },
    // ---- 等级管理 - 删除
    grade_del: {
        url: '/merchant-api/user-grade/delete',
        method: 'post',
    },

    // ---- 洗码设置 - 列表 -------
    wash_code_list: {
        url: '/merchant-api/commission/index',
        method: 'post',
    },
    // ---- 洗码设置 - 添加
    wash_code_add: {
        url: '/merchant-api/commission/do-add',
        method: 'post',
    },
    // ---- 洗码设置 - 编辑
    wash_code_set: {
        url: '/merchant-api/commission/edit',
        method: 'post',
    },
    // ---- 洗码设置 - 删除
    wash_code_del: {
        url: '/merchant-api/commission/delete',
        method: 'post',
    },


    /*=========================== 财务管理 ===========================--*/
    // ----入款订单 - 列表
    founds_incomeorder_list:{
        url:'/merchant-api/recharge-order/index',
        method:'get'
    },

    // ----入款订单 - 获取支付方式
    founds_incomeorder_pay_method:{
        url:'/merchant-api/recharge-order/get-finance-types',
        method:'get'
    },

    // ---- 入款订单 - 手动入款
    founds_incomeorder_Manual_deposit:{
        url:'/merchant-api/recharge-order/handle-success',
        method:'post'
    },
    
    // ---- 入款订单 - 审核通过
    founds_incomeorder_examination_passed:{
        url:'/merchant-api/recharge-order/check-pass',
        method:'post'
    },

    // ----入款订单 - 审核拒绝
    founds_incomeorder_examination_rejected:{
        url:'/merchant-api/recharge-order/check-refuse',
        method:'post'
    },

    // ----人工存取 - 人工充值
    founds_manualaccess_artificial_recharge:{
        url:'/merchant-api/handle-save-buckle/handle-save',
        method:'post'
    },

    // ---- 人工存取 - 人工存款记录
    founds_manualaccess_artificial_recharge_recording:{
        url:'/merchant-api/handle-save-buckle/save-index',
        method:'get'
    },

    // ---- 人工存取 - 人工扣款
    founds_manualaccess_artificial_charge:{
        url:'/merchant-api/handle-save-buckle/handle-buckle',
        method:'post'
    },

    // ---- 人工存取 - 人工扣款记录
    founds_manualaccess_artificial_charge_recording:{
        url:'/merchant-api/handle-save-buckle/buckle-index',
        method:'get'
    },

    // ---- 出款审核 - 列表
    founds_interface_list:{
        url:'/merchant-api/withdraw-order/check-index',
        method:'get'
    },

    // ---- 出款审核 - 审核通过
    founds_interface_examination_passed:{
        url:'/merchant-api/withdraw-order/check-pass',
        method:'post'
    },

    // ---- 出款审核 - 审核拒绝
    founds_interface_examination_rejected:{
        url:'/merchant-api/withdraw-order/check-refuse',
        method:'post'
    },

    // ---- 出款订单 - 列表
    founds_paymentorder_list:{
        url:'/merchant-api/withdraw-order/out-index',
        method:'get'
    },

    // ---- 出款订单 - 出款通过
    founds_paymentorder_examination_passed:{
        url:'/merchant-api/withdraw-order/out-success',
        method:'post'
    },

    // ---- 出款订单 - 出款拒绝
    founds_paymentorder_examination_rejected:{
        url:'/merchant-api/withdraw-order/out-refuse',
        method:'post'
    },
    // 资金账变

    /*=========================== 公告管理 ===========================--*/
    // 跑马灯消息
    // 系统公告
    // 登录弹窗公告
    // 轮播公告

    // /*=========================== 邮件系统 ===========================--*/
    // 发邮件
    email_send: {
        url: '/merchant-api/email/send',
        method: 'post'
    },
    // 收件箱
    email_received: {
        url: '/merchant-api/email/received-index',
        method: 'get'
    },


    // 已发邮件
    email_sent: {
        url: '/merchant-api/email/send-index',
        method: 'get'
    },
    // 短信推送

    /*=========================== 报表管理 ===========================--*/

    /*=========================== 游戏管理 ===========================--*/

    // 游戏列表 - 公用接口 - 获取查询条件
    game_search_condition_list: {
        url: '/merchant-api/game/get-search-condition-data',
        method: 'get',
    },
    // 游戏列表 - 公用接口 - 改变游戏状态
    game_status: {
        url: '/merchant-api/game/status',
        method: 'post',
    },
    // 游戏列表 - 共用接口 - 设置游戏是否热门
    game_hot_set: {
        url: '/merchant-api/game/do-hot',
        method: 'post',
    },
    // 游戏列表 - 公用接口 - 设置游戏是否维护
    game_maintain_list: {
        url: '/merchant-api/game/maintain',
        method: 'post',
    },
    // 游戏列表 - 公用接口 - 设置游戏是否推荐
    game_recommend: {
        url: '/merchant-api/game/recommend',
        method: 'post',
    },
    //游戏列表-公用接口-排序
    game_order:{
        url:'/merchant-api/game/sort',
        method:'post'
    },
    // 游戏列表 - 公用接口 - 图片上传
    picture_update: {
        url:'/merchant-api/game/upload',
        method: 'post',
    },

    // H5游戏管理 - 列表
    game_h5_list: {
        url: '/merchant-api/game/h5-index',
        method: 'get'
    },

    // PC游戏管理 - 列表
    game_pc_list: {
        url: '/merchant-api/game/pc-index',
        method: 'get'
    },
    // APP游戏管理 - 列表
    game_app_list: {
        url: '/merchant-api/game/app-index',
        method: 'get'
    },


    // 平台管理 - 列表
    game_vendor: {
        url: '/merchant-api/game-vendor/index',
        method: 'get'
    },
    // 平台管理 - 更改状态与维护
    game_vendor_status_set: {
        url: '/merchant-api/game-vendor/status',
        method: 'post'
    },

    // 平台管理 - 排序
    game_vendor_sort_set: {
        url: '/merchant-api/game-vendor/sort',
        method: 'post'
    },

    //平台管理 - 图片上传
    game_plant_picture_update: {
        url: '/merchant-api/game-vendor/upload',
        method: 'post'
    },

    // 分类管理 - 列表
    game_type_list: {
        url: '/merchant-api/game-type/index',
        method: 'get'
    },
    // 分类管理 - 更改状态
    game_type_status_set: {
        url: '/merchant-api/game-type/status',
        method: 'post'
    },

    /*=========================== 活动管理 ===========================--*/
   
    //静态活动 - 添加
    static_active_add:{
        url:'/merchant-api/activity-static/add-do',
        method:'post'
    },
    //静态活动 - 列表
    static_active_list:{
        url:'/merchant-api/activity-static/index',
        method:'get'
    },
    //静态活动 - 编辑
    static_active_edit:{
        url:'/merchant-api/activity-static/edit',
        method:'post'
    },
    //静态活动 - 改变状态
    static_active_change_status:{
        url:'/merchant-api/activity-static/status',
        method:'post'
    },
    //静态活动 - 删除
    static_active_delte:{
        url:'/merchant-api/activity-static/del-do',
        method:'post'
    },
    //动态活动 - 列表
    dynamic_active_list:{
        url:'/merchant-api/activity-dyn/index',
        method:'get'
    },
    //动态活动 - 改变状态
    dynamic_active_change_status:{
        url:'/merchant-api/activity-dyn/status',
        method:'post'
    },
    //动态活动 - 上传图片
    dynamic_active_upload_pic:{
        url:'/merchant-api/activity-dyn/save-pic',
        method:'post'
    },

    /*=========================== 金流管理 ===========================--*/

    // 线下支付配置 - 添加
    offline_finance_add: {
        url: '/merchant-api/offline-finance/add-do',
        method: 'post',
    },
    // 线下支付配置 - 获取线下分类列表
    offline_finance_types_list: {
        url: '/merchant-api/offline-finance/types',
        method: 'get',
    },
    // 线下支付配置 - 获取银行列表
    offline_finance_bank_list: {
        url: '/merchant-api/bank/get-system-banks',
        method: 'get',
    },
    // 线下支付配置 - 列表
    offline_finance_list: {
        url: '/merchant-api/offline-finance/index',
        method: 'get',
    },

    // 线下支付配置 - 删除
    offline_finance_del: {
        url: '/merchant-api/offline-finance/del-do',
        method: 'post',
    },
    // 线下支付配置 - 改变状态
    offline_finance_status_set: {
        url: '/merchant-api/offline-finance/status',
        method: 'post',
    },
    // 线下支付配置 - 编辑
    offline_finance_set: {
        url: '/merchant-api/offline-finance/edit',
        method: 'post',
    },
    // 线下支付配置 - 编辑线下金流获取前置数据 (标签选择的内容)
    offline_finance_select_list: {
        url: '/merchant-api/offline-finance/edit',
        method: 'get',
    },

    // ---------------- 线上金流配置 ------------
    // 线上金流配置 - 获取金流通道
    online_finance_channel_list: {
        url: '/merchant-api/online-finance/get-channels',
        method: 'get',
    },
    // 线上金流配置 - 添加
    online_finance_add: {
        url: '/merchant-api/online-finance/add-do',
        method: 'post',
    },
    // 线上金流配置 - 列表
    online_finance_list: {
        url: '/merchant-api/online-finance/index',
        method: 'get',
    },
    // 线上金流配置 - 获取编辑线上金流前置数据 (需要的标签选择内容)
    online_finance_label_list: {
        url: '/merchant-api/online-finance/edit',
        method: 'get',
    },
    // 线上金流配置 - 编辑
    online_finance_edit: {
        url: '/merchant-api/online-finance/edit',
        method: 'post',
    },
    // 线上金流配置 - 删除
    online_finance_del: {
        url: '/merchant-api/online-finance/del-do',
        method: 'post',
    },
    // 线上金流配置 - 更改状态
    online_finance_status_set: {
        url: '/merchant-api/online-finance/status',
        method: 'post',
    },


    /*=========================== 推广配置 ===========================--*/


    /*=========================== 设置管理 ===========================--*/
    // ---------- 管理员分组
    // 管理员分组 -分组列表
    admin_group_list: {
        url: '/merchant-api/merchant-admin-group/detail',
        method: 'get'
    },
    // 管理员分组-分组添加
    admin_group_add: {
        url: '/merchant-api/merchant-admin-group/create',
        method: 'post'
    },
    // 管理员分组-分组编辑
    admin_group_set: {
        url: '/merchant-api/merchant-admin-group/edit',
        method: 'post'
    },
    // 管理员分组-分组删除
    admin_group_del: {
        url: '/merchant-api/merchant-admin-group/delete',
        method: 'post'
    },
    // 管理员分组-指定分组里的管理员列表
    admin_group_users_list: {
        url: '/merchant-api/merchant-admin-group/specific-group-users',
        method: 'post'
    },
    // 管理员-管理员添加
    admin_group_users_add: {
        url: '/merchant-api/merchant-admin-user/create',
        method: 'post'
    },
    // 管理员-管理员更换组
    admin_group_users_group_set: {
        url: '/merchant-api/merchant-admin-user/update-admin-group',
        method: 'post'
    },
    // 管理员-管理员删除
    admin_group_users_del: {
        url: '/merchant-api/merchant-admin-user/delete-admin',
        method: 'post'
    },
    // 管理员-管理员查找
    admin_group_users_search_list: {
        url: '/merchant-api/merchant-admin-user/search-admin',
        method: 'post'
    },

    // 全域设置

    // ------- 客服设置 ----------------
    // 客服设置-列表
    customer_service_list: {
        url: '/merchant-api/costomer-service/index',
        method: 'post'
    },
    // 客服设置 - 添加
    customer_service_add: {
        url: '/merchant-api/costomer-service/do-add',
        method: 'post'
    },
    // 客服设置 - 编辑
    customer_service_set: {
        url: '/merchant-api/costomer-service/edit',
        method: 'post'
    },
    // 客服设置 - 删除
    customer_service_del: {
        url: '/merchant-api/costomer-service/delete',
        method: 'post'
    },

    // ------------ 帮助设置 ---------
    //  帮助设置 - 列表
    help_center_list: {
        url: '/merchant-api/help-center/index',
        method: 'post'
    },
    // 帮助设置 - 添加
    help_center_add: {
        url: '/merchant-api/help-center/do-add',
        method: 'post',
    },
    // 帮助设置 - 编辑
    help_center_set: {
        url: '/merchant-api/help-center/edit',
        method: 'post',
    },
    // 帮助设置 - 删除
    help_center_del: {
        url: '/merchant-api/help-center/delete',
        method: 'post',
    },

    // 操作纪录
    // 银行卡反查中心
    bank_cards_del: {
        url: '/merchant-api/bank-cards/delete',
        method: 'post',
    }

};
