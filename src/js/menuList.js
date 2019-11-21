let menuList = [
                {
                    name: "首页",
                    path: "/home",
                    icon: "iconhome"
                },
                {
                    name: "会员管理",
                    // path: '/user',
                    icon: "iconaccount",
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
                    icon: "iconmoneybag",
                    children: [
                        { name: "入款审核", path: "/funds/incomereview" },
                        { name: "人工存取", path: "/funds/manualaccess" },
                        { name: "出款审核", path: "/funds/paymentreview" },
                        { name: "出款列表", path: "/funds/paymentlist" },
                        { name: "资金账变", path: "/funds/fundchange" }
                    ]
                },
                {
                    name: "公告管理",
                    // path: '/announce',
                    icon: "iconyunyingzhongxin",
                    children: [
                        { name: "跑马灯消息", path: "/announce/marquee" },
                        { name: "系统公告", path: "/announce/systemannounce" },
                        { name: "站内消息 ", path: "/announce/station" },
                        { name: "登录弹窗公告 ", path: "/announce/loginpopup" },
                        { name: "轮播公告 ", path: "/announce/carousel" }
                    ]
                },
                {
                    name: "报表管理",
                    // path: '/note',
                    icon: "iconaccount",
                    children: [
                        { name: "个人报表", path: "aaaaa" },
                        { name: "游戏报表", path: "aaaaa" },
                        { name: "公司报表", path: "aaaaa" },
                        { name: "会员稽核", path: "aaaaa" },
                        { name: "平台注单", path: "aaaaa" },
                        { name: "活动报表", path: "aaaaa" },
                        { name: "会员洗码", path: "aaaaa" }
                      
                    ]
                },
                {
                    name: "游戏管理",
                    // path: '/report',
                    icon: "iconmiaojie1029data",
                    children: [
                        { name: "平台游戏", path: "aaaaaaa" },
                        { name: "游戏分类", path: "aaaaaaa" }
                       
                    ]
                },
                {
                    name: "活动管理",
                    // path: '/activity',
                    icon: "iconcalculator",
                    children: [
                        { name: "注册赠送设定", path: "aaaaaaaaa" },
                        { name: "首充赠送设定", path: "aaaaaaaaa" },
                        { name: "有奖竞猜设定", path: "aaaaaaaaa" },
                        { name: "幸运转盘设定", path: "aaaaaaaaa" },
                        { name: "每日签到设定", path: "aaaaaaaaa" },
                        { name: "抢红包设定", path: "aaaaaaaaa" },
                        { name: "活动详细列表", path: "aaaaaaaaa" },
                        { name: "活动列表", path: "aaaaaaaaa" },
                        
                    ]
                },
                {
                    name: "支付配置",
                    // path: '/game',
                    icon: "icongame",
                    children: [
                        { name: "线下支付配置", path: "aaaaaaaaaa" },
                        { name: "线上支付配置", path: "aaaaaaaaaa" },
                        { name: "出款银行配置", path: "aaaaaaaaaa" },
                        
                    ]
                },
                {
                    name: "代理配置",
                    // path: '/net',
                    icon: "iconnet",
                    children: [
                        { name: "代理配置", path: "aaaaaaaaaa" },
                    ]
                },
                {
                    name: "设置管理",
                    // path: '/message',
                    icon: "iconspeaker-5",
                    children: [
                        { name: "管理员分组", path: "aaaaaaaaaa" },
                        { name: "全域设置", path: "aaaaaaaaaa" },
                        { name: "客服设置", path: "aaaaaaaaaa" },
                        { name: "帮助设置", path: "aaaaaaaaaa" },
                        { name: "操作记录", path: "aaaaaaaaaa" },
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