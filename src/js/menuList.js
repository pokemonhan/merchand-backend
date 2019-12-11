let menuList = [
                {
                    name: "首页",
                    path: "/home",
                    // icon: "iconhome"
                },
                {
                    name: "会员管理",
                    // path: '/user',
                    // icon: "iconaccount",
                    children: [
                        { name: "会员列表", path: "/user/userlist" },
                        { name: "登录记录", path: "/user/loginlog" },
                        { name: "标签管理 ", path: "/user/tabmanage" },
                        { name: "黑名单管理 ", path: "/user/blacklistmanage" },
                        { name: "等级设置 ", path: "/user/levelsetting" },
                        { name: "洗码设置 ", path: "/user/washsetting" }
                    ]
                },
                {
                    name: "财务管理",
                    // path: '/funds',
                    // icon: "iconmoneybag",
                    children: [
                        { name: "入款订单", path: "/funds/incomeorder" },
                        { name: "人工存取", path: "/funds/manualaccess" },
                        { name: "出款审核", path: "/funds/paymentreview" },
                        { name: "出款订单", path: "/funds/paymentorder" },
                        { name: "资金账变", path: "/funds/fundchange" }
                    ]
                },
                {
                    name: "公告管理",
                    // path: '/announce',
                    // icon: "iconyunyingzhongxin",
                    children: [
                        { name: "跑马灯消息", path: "/announce/marquee" },
                        { name: "系统公告", path: "/announce/systemannounce" },
                        // { name: "站内消息 ", path: "/announce/station" },
                        { name: "登录弹窗公告 ", path: "/announce/loginpopup" },
                        { name: "轮播公告 ", path: "/announce/carousel" }
                    ]
                },
                {
                    name: "邮件系统",
                    // path: 'email',
                    // icon: '',
                    children: [
                        {name:"发邮件", path:"/email/sendemail"},
                        {name:"收件箱", path:"/email/receiveemail"},
                        {name:"已发邮件", path:"/email/emailsent"},
                        {name:"短信推送", path:"/email/smspush"},
                    ]
                },
                {
                    name: "报表管理",
                    // path: '/report',
                    // icon: "iconaccount",
                    children: [
                        { name: "个人报表", path: "/report/personalreport" },
                        { name: "游戏报表", path: "/report/gamereport" },
                        { name: "公司报表", path: "/report/companyreport" },
                        { name: "会员稽核", path: "/report/memberaudit" },
                        { name: "平台注单", path: "/report/platformbet" },
                        { name: "活动报表", path: "/report/activereport" },
                        { name: "会员洗码", path: "/report/userwash" }
                      
                    ]
                },
                {
                    name: "游戏管理",
                    // path: '/game',
                    // icon: "iconmiaojie1029data",
                    children: [
                        { name: "H5游戏管理", path: "aaaaaaa" },
                        { name: "PC游戏管理", path: "aaaaaaa" },
                        { name: "APP游戏管理", path: "aaaaaaa" },
                        { name: "平台管理", path: "aaaaaaa" },
                        { name: "分类管理", path: "aaaaaaa" },
                       
                    ]
                },
                {
                    name: "活动管理",
                    // path: '/activ',
                    // icon: "iconcalculator",
                    children: [
                        { name: "静态活动", path: "aaaaaaaaa" },
                        { name: "动态活动", path: "aaaaaaaaa" },
                    ]
                },
                {
                    name: "金流管理",
                    // path: '/pay',
                    // icon: "icongame",
                    children: [
                        { name: "线下支付配置", path: "aaaaaaaaaa" },
                        { name: "线上支付配置", path: "aaaaaaaaaa" },
                        { name: "出款银行管理", path: "aaaaaaaaaa" },
                        
                    ]
                },
                {
                    name: "推广配置",
                    // path: '/promot',
                    // icon: "iconnet",
                    children: [
                        { name: "推广配置", path: "aaaaaaaaaa" },
                        { name: "推广图片配置", path: "aaaaaaaaaa" },
                    ]
                },
                {
                    name: "设置管理",
                    // path: '/setting',
                    // icon: "iconspeaker-5",
                    children: [
                        { name: "管理员分组", path: "aaaaaaaaaa" },
                        { name: "全域设置", path: "aaaaaaaaaa" },
                        { name: "客服设置", path: "aaaaaaaaaa" },
                        { name: "帮助设置", path: "aaaaaaaaaa" },
                        { name: "操作记录", path: "aaaaaaaaaa" },
                        { name: "银行卡反查中心", path: "aaaaaaaaaa" },
                    ]
                },
                // {
                //     name: "代理推广",
                //     // path: '/agentpromotion',
                //     icon: "iconconnections",
                //     children: [
                //         { name: "代理配置", path: "/agentpromotion/agentsetting" },
                //         { name: "佣金记录", path: "/agentpromotion/commissionrecord" }
                //     ]
                // },
                // {
                //     name: "系统设置",
                //     // path: '/systemset',
                //     icon: "iconshezhi2",
                //     children: [
                //         { name: "管理员设置", path: "/systemset/adminsetting" },
                //         { name: "系统日志", path: "/systemset/systemlog" }
                //     ]
                // }
            ]
export default menuList