export default {
    /* 用户 ****************/
    /**
     * 查 list
     * 增加 add
     * 删除 del
     * 更改 set
     * 状态更改  status_set
     *  */ 
    //登录
    login: { url: '/merchant-api/login', method: 'post' },
    // 登出
  

    // -------------------- 会员管理 ------------
    // 标签管理 - 列表
    user_tag_list: {
        url: '/merchant-api/user-tags/index',
        method: 'get'
    }
}