let menuList = [
    {
        label: "首页",
        path: "/home",
        icon: "iconhome",
        children: [
            {
                label: "首页内容",
                path: "/home/home",
                name: "Home"
            }
        ]
    },
    {
        label: "会员管理",
        path: '/user',
        icon: "iconaccount",
        name: "user",
        children: [
            { 
                label: "会员列表", 
                path: "/user/userlist",
                name: "UserList"
            },
            {
                label: "登录记录",
                path: "/user/loginlog",
                name: "LoginLog"
            },
            {
                label: "标签管理 ",
                path: "/user/tabmanage",
                name: "TabManage"
            },
            {
                label: "黑名单管理 ", 
                path: "/user/blacklistmanage",
                name: "BlackListManage"
            },
            {
                label: "等级设置 ",
                path: "/user/levelsetting",
                name: "LevelSetting"
            },
            {
                label: "洗码设置 ",
                path: "/user/washsetting",
                name: "WashSetting"
            }
        ]
    },
    {
        label: "财务管理",
        path: '/funds',
        icon: "iconmoneybag",
        name: "funds",
        children: [
            { 
                label: "入款订单",
                path: "/funds/incomeorder",
                name: "IncomeOrder"
            },
            { 
                label: "人工存取",
                path: "/funds/manualaccess",
                name: "ManualAccess"
            },
            {
                label: "出款审核",
                path: "/funds/paymentreview",
                name: "PaymentReview"
            },
            {
                label: "出款订单",
                path: "/funds/paymentorder",
                name: "PaymentOrder"
            },
            {
                label: "资金账变",
                path: "/funds/fundchange",
                name: "FundChange"
            }
        ]
    },
    {
        label: "公告管理",
        path: '/announce',
        icon: "iconspeaker-5",
        name: "announce",
        children: [
            {
                label: "跑马灯消息",
                path: "/announce/marquee",
                name: "Marquee"
            },
            {
                label: "系统公告",
                path: "/announce/systemannounce",
                name: "SystemAnnounce"
            },
            // { label: "站内消息 ", path: "/announce/station" },
            {
                label: "登录弹窗公告 ",
                path: "/announce/loginpopup",
                name: "LoginPopup"
            },
            {
                label: "轮播公告 ",
                path: "/announce/carousel",
                name: "Carousel"
            }
        ]
    },
    {
        label: "邮件系统",
        path: '/email',
        icon: 'icon185078emailmailstreamline',
        name: "email",
        children: [
            {
                label: "发邮件",
                path: "/email/sendemail",
                name: "Sendemail"
            },
            {
                label: "收件箱",
                path: "/email/receiveemail",
                name: "ReceiveEmail"
            },
            {
                label: "已发邮件",
                path: "/email/emailsent",
                name: "EmailSent"
            },
            {
                label: "短信推送",
                path: "/email/smspush",
                name: "SmsPush"
            },
        ]
    },
    {
        label: "报表管理",
        path: '/report',
        icon: "iconassistant_lefticon_Statisticalreportforms",
        name: "report",
        children: [
            {
                label: "个人报表",
                path: "/report/personalreport",
                name: "PersonalReport"
            },
            {
                label: "游戏报表",
                path: "/report/gamereport",
                name: "GameReport"
            },
            {
                label: "公司报表",
                path: "/report/companyreport",
                name: "CompanyReport"
            },
            {
                label: "会员稽核",
                path: "/report/memberaudit",
                name: "MemberAudit"
            },
            {
                label: "平台注单",
                path: "/report/platformbet",
                name: "PlatFormbet"
            },
            {
                label: "活动报表",
                path: "/report/activereport",
                name: "ActiveReport"
            },
            {
                label: "会员洗码",
                path: "/report/userwash",
                name: "UserWash"
            }

        ]
    },
    {
        label: "游戏管理",
        path: '/game',
        icon: "iconicon4",
        name: "game",
        children: [
            {
                label: "H5游戏管理",
                path: "/game/gameh5",
                name: "GameH5"
            },
            {
                label: "PC游戏管理",
                path: "/game/gamepc",
                name: "GamePC"
            },
            {
                label: "APP游戏管理",
                path: "/game/gameapp",
                name: "GameApp"
            },
            {
                label: "平台管理",
                path: "/game/platform",
                name: "PlatForm"
            },
            {
                label: "分类管理",
                path: "/game/gamesort",
                name: "GameSort"
            },

        ]
    },
    {
        label: "活动管理",
        path: '/active',
        icon: "iconhuodong",
        name: "active",
        children: [
            {
                label: "静态活动",
                path: "/active/static",
                name: "Static"
            },
            {
                label: "动态活动",
                path: "/active/dynamic",
                name: "Dynamic"
            },
        ]
    },
    {
        label: "金流管理",
        path: '/pay',
        icon: "icondingdangdaizijinliushui",
        name: "pay",
        children: [
            {
                label: "线下金流配置",
                path: "/pay/offlinepay",
                name: "OfflinePay"
            },
            {
                label: "线上金流配置",
                path: "/pay/onlinepay",
                name: "OnlinePay"
            },
            {
                label: "出款银行管理",
                path: "/pay/exportbank",
                name: "ExportBank"
            },

        ]
    },
    {
        label: "设置管理",
        path: '/set',
        icon: "iconshezhi2",
        name: "set",
        children: [
            {
                label: "管理员分组",
                path: "/set/adminsort",
                name: "AdminSort"
            },
            {
                label: "全域设置",
                path: "/set/allareaset",
                name: "AllAreaSet"
            },
            {
                label: "推广图片配置",
                path: "/set/picconfig",
                name: "PicConfig"
            },
            {
                label: "客服设置",
                path: "/set/serviceset",
                name: "ServiceSet"
            },
            {
                label: "帮助设置",
                path: "/set/helpset",
                name: "HelpSet"
            },
            {
                label: "操作记录",
                path: "/set/operatrecord",
                name: "OperatRecord"
            },
            {
                label: "银行卡反查中心",
                path: "/set/bankcenter",
                name:"BankCenter"
            },
        ]
    },
]
export default menuList
