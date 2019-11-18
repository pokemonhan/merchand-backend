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
                        { name: "洗码设置 ", path: "/user/washsetting" },
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
                    name: "运营管理",
                    // path: '/operation',
                    icon: "iconyunyingzhongxin",
                    children: [
                        { name: "等级设置", path: "/operation/rank" },
                        { name: "洗码设置", path: "/operation/washcodeSet" },
                        { name: "出入款设定 ", path: "/operation/deposits" },
                        { name: "层级管理 ", path: "/operation/level" },
                        { name: "会员稽核 ", path: "/operation/useraudit" },
                        { name: "会员分析系统 ", path: "/operation/useranalysis" },
                        { name: "洗码记录 ", path: "/operation/washcoderecording" }
                    ]
                },
                {
                    name: "注单管理",
                    // path: '/note',
                    icon: "iconaccount",
                    children: [
                        { name: "洗码记录", path: "/note/washcoderecording" },
                        { name: "平台注单", path: "/note/plantformNote" },
                        { name: "处理遗漏注单 ", path: "/note/legacyset" }
                    ]
                },
                {
                    name: "数据报表",
                    // path: '/report',
                    icon: "iconmiaojie1029data",
                    children: [
                        { name: "游戏报表", path: "/report/gamereport" },
                        { name: "公司报表", path: "/report/companyreport" }
                    ]
                },
                {
                    name: "活动管理",
                    // path: '/activity',
                    icon: "iconcalculator",
                    children: [
                        { name: "活动列表", path: "/activity/activitylist" },
                        { name: "活动规则列表", path: "/activity/activityruleList" },
                        { name: "签到管理 ", path: "/activity/checkIn" }
                    ]
                },
                {
                    name: "游戏管理",
                    // path: '/game',
                    icon: "icongame",
                    children: [
                        { name: "平台游戏", path: "/game/plantformGame" },
                        { name: "分类配置", path: "/game/sortsetting" },
                        { name: "热门游戏 ", path: "/game/hotgame" }
                    ]
                },
                {
                    name: "网站设置",
                    // path: '/net',
                    icon: "iconnet",
                    children: [
                        { name: "网站信息", path: "/net/netinform" },
                        { name: "注册设置", path: "/net/registsetting" },
                        { name: "轮播管理", path: "/net/carousel" },
                        { name: "客服设置", path: "/net/customservice" }
                    ]
                },
                {
                    name: "消息设置",
                    // path: '/message',
                    icon: "iconspeaker-5",
                    children: [
                        { name: "系统公告", path: "/message/systemmessage" },
                        { name: "站内消息", path: "/message/instationmessage" },
                        { name: "游戏公告", path: "/message/gamemessage" }
                    ]
                },
                {
                    name: "代理推广",
                    // path: '/agentpromotion',
                    icon: "iconconnections",
                    children: [
                        { name: "代理配置", path: "/agentpromotion/agentsetting" },
                        { name: "佣金记录", path: "/agentpromotion/commissionrecord" }
                    ]
                },
                {
                    name: "系统设置",
                    // path: '/systemset',
                    icon: "iconshezhi2",
                    children: [
                        { name: "管理员设置", path: "/systemset/adminsetting" },
                        { name: "系统日志", path: "/systemset/systemlog" }
                    ]
                }
            ]
export default menuList