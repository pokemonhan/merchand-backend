<template>
    <div>
        <div class="header">
            <div class="content">
                <div class="left">
                    <div class="head-title">
                        <span class="title">商户后台</span>
                    </div>
                    <div class="detail">
                        <div class="up">
                            <span class="date-due">
                                <span>到期日期:</span>
                                <span>{{'2019-12-29 12:00:00'}}</span>
                            </span>
                            <span style="margin-left:15px;">{{'xx'}}天{{'xx'}}时{{'xx'}}分</span>
                        </div>
                        <ul class="down">
                            <li>
                                <span>活跃人数：</span>
                                <span>88</span> 人
                            </li>
                            <li>
                                <span>今日注册人数:</span>
                                <span>88</span> 人
                            </li>
                            <li>
                                <span>新增人数：</span>
                                <span>88</span> 人
                            </li>
                        </ul>
                    </div>
                </div>
                <ul class="right">
                    <li>
                        <span @click="goEmail()">邮件通知</span>
                        <span class="badge">
                            <span
                                class="badge-inner"
                            >{{parseInt(email_count)>99?'99+': email_count}}</span>
                        </span>
                    </li>
                    <li>
                        <span @click="goOnFounds()">线上入款</span>
                        <span class="badge">
                            <span
                                class="badge-inner"
                            >{{parseInt(online_top_up_count)>99?'99+': online_top_up_count}}</span>
                        </span>
                    </li>
                    <li>
                        <span @click="goOffFounds()">线下入款</span>
                        <span class="badge">
                            <span
                                class="badge-inner"
                            >{{parseInt(offline_top_up_count)>99?'99+': offline_top_up_count}}</span>
                        </span>
                    </li>
                    <li>
                        <span @click="goOrder()">出款订单</span>
                        <span class="badge">
                            <span
                                class="badge-inner"
                            >{{parseInt(withdrawal_order_count)>99?'99+': withdrawal_order_count}}</span>
                        </span>
                    </li>
                    <li>
                        <span @click="goReview()">出款审核</span>
                        <span class="badge">
                            <span
                                class="badge-inner"
                            >{{parseInt(withdrawal_review_count)>99?'99+': withdrawal_review_count}}</span>
                        </span>
                    </li>
                    <!-- 喇叭 -->
                    <li style="width:22px;" @click="play_music=!play_music">
                        <i v-if="play_music" class="iconfont iconspeaker"></i>
                        <i v-if="!play_music" class="iconfont iconmute"></i>
                    </li>
                    <li class="account" @mouseenter="accoutEnter" @mouseleave="accountLeave">
                        <span>
                            <i class="iconfont iconzhanghao"></i>
                        </span>
                        <span>退出</span>
                        <ul class="account-inner">
                            <li @click="dia_show=true">修改密码</li>
                            <li @click="logout">退出</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <Modal
            :show="logout_conf_show"
            title="退出"
            content="确认退出"
            @confirm="logoutConf"
            @close="logout_conf_show = false"
            @cancel="cancel"
        ></Modal>
        <Dialog :show.sync="dia_show" title="修改密码">
            <div class="dia-inner">
                <div class="center-box">
                    <ul class="form">
                        <li>
                            <span>原密码</span>
                            <Input
                                class="w250"
                                limit="en-num"
                                type="password"
                                v-model="form.old_pwd"
                            />
                            <p v-show="err_tips[0]" class="err-tips">{{err_tips[0]}}</p>
                        </li>
                        <li>
                            <span>新密码</span>
                            <Input
                                class="w250"
                                limit="en-num"
                                type="password"
                                v-model="form.new_pwd"
                            />
                            <p v-show="err_tips[1]" class="err-tips">{{err_tips[1]}}</p>
                        </li>
                        <li>
                            <span>确认密码</span>
                            <Input
                                class="w250"
                                limit="en-num"
                                type="password"
                                v-model="form.conf_pwd"
                            />
                            <p v-show="err_tips[2]" class="err-tips">{{err_tips[2]}}</p>
                        </li>
                        <li>
                            <span>验证码</span>
                            <Input style="width:148px;" limit="en-num" v-model="form.verificCode" />
                            <button class="btn-blue">获取验证码</button>
                            <p v-show="err_tips[2]" class="err-tips">{{err_tips[3]}}</p>
                        </li>
                    </ul>
                    <div class="form-btns">
                        <button class="btn-plain-large" @click="dia_show">取消</button>
                        <button class="btn-blue-large ml50" @click="passwordConf">确认</button>
                    </div>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script>
export default {
    name: "Header",
    // components: { tabNav, langSelect },
    data() {
        return {
            // isfullScreen: true,
            play_music: false,
            account_ishow: false,
            logout_conf_show: false,
            dia_show: false,
            form: {
                old_pwd: "",
                new_pwd: "",
                conf_pwd: "",
                verificCode: ""
            },
            err_tips: ["", "", "", ""],
            isSocketOpen: false,
            list: [],
            email_count: "",
            online_top_up_count: "",
            offline_top_up_count: "",
            withdrawal_order_count: "",
            withdrawal_review_count: ""
        };
    },
    methods: {
        // fullScreen() {
        //     if (this.isfullScreen) {
        //         var docElm = document.documentElement;
        //         if (docElm.requestFullscreen) {
        //             docElm.requestFullscreen();
        //         } else if (docElm.mozRequestFullScreen) {
        //             docElm.mozRequestFullScreen();
        //         } else if (docElm.webkitRequestFullScreen) {
        //             docElm.webkitRequestFullScreen();
        //         } else if (elem.msRequestFullscreen) {
        //             elem.msRequestFullscreen();
        //         }
        //         this.isfullScreen = false;
        //     } else {
        //         if (document.exitFullscreen) {
        //             document.exitFullscreen();
        //         } else if (document.mozCancelFullScreen) {
        //             document.mozCancelFullScreen();
        //         } else if (document.webkitCancelFullScreen) {
        //             document.webkitCancelFullScreen();
        //         } else if (document.msExitFullscreen) {
        //             document.msExitFullscreen();
        //         }
        //         this.isfullScreen = true;
        //     }
        // },
        // handleCommand(command) {
        //     if (command === "logout") {
        //         Cookies.remove("token");
        //         location.reload();
        //     }
        // }
        playMusic() {
            // let ele = document.querySelector('.playMusic');
            // console.log("TCL: playMusic -> ele", ele)
            // ele.play()
            //方式1
            // var audio = document.createElement("audio");
            // audio.src = require("../assets/audio/wan.wav");
            // audio.play();

            //方式2
            var audio = new Audio(require("../assets/audio/wan.wav"));
            audio.play();
        },
        accoutEnter() {
            let ele = document.querySelector(".account-inner");
            ele.style.display = "block";
            ele.style.maxHeight = "100px";
            // ele.style.overflow = 'visible'
            this.account_ishow = true;
        },
        accountLeave() {
            this.account_ishow = false;
            let ele = document.querySelector(".account-inner");
            // todo
            ele.style.maxHeight = "0";
            ele.style.overflow = "hidden";

            let self = this;
            setTimeout(() => {
                if (self.account_ishow === false) {
                    //todo
                    ele.style.display = "none";
                }
            }, 300);
        },
        logout() {
            // window.all.tool.removeSession('token')
            // this.$router.push('/login')
            this.logout_conf_show = true;
        },
        logoutConf() {
            let self = this;
            this.$http({
                method: this.$api.logout.method,
                url: this.$api.logout.url
                // data: params
            }).then(res => {
                console.log("res", res);
                if (res && res.code === "200") {
                    self.$toast("登出成功");
                    window.all.tool.setLocal("isLogin", "0");
                }
            });
            window.all.tool.removeSession("token");
            this.$router.push("/login");
            this.logout_conf_show = false;
        },
        cancel() {
            this.logout_conf_show = false;
        },
        checkPwd() {
            let { old_pwd, new_pwd, conf_pwd, verificCode } = this.form;
            let regExp = /^[0-9A-Za-z]{8,16}$/;

            // 原密码
            if (!regExp.test(old_pwd)) {
                this.$set(this.err_tips, "0", "请输入8~16位英文字母+数字密码!");
                return false;

                // 新密码 验证
            } else if (!regExp.test(new_pwd)) {
                this.$set(this.err_tips, "1", "请输入8~16位英文字母+数字密码!");
                return false;

                // 确认密码
            } else if (!regExp.test(conf_pwd)) {
                this.$set(this.err_tips, "2", "请输入8~16位英文字母+数字密码!");
                return false;

                // 确认密码是否与原密码相同
            } else if (new_pwd !== conf_pwd) {
                this.$set(this.err_tips, "2", "两次密码不同!");
                return false;

                // 验证码
            } else if (!verificCode) {
                this.$set(this.err_tips, "3", "验证码不可为空!");
                return false;
            } else {
                return true;
            }
        },
        passwordConf() {
            this.err_tips = ["", "", "", ""];
            if (this.checkPwd()) {
                // console.log('执行内容')
            }
        },
        socket() {
            let channel_pre = "jianghuhuyu_database_merchant_notice_";
            let platform_sign = window.all.tool.getLocal("platform_sign");
            if (!platform_sign || this.isSocketOpen === true) return;
            let channel_name = channel_pre + platform_sign;
            // channel_name = 'jianghuhuyu_ethan_database_merchant_notice_JHHY'
            // 事件名
            let event_name = "PlatformNoticeEvent";
            this.isSocketOpen = true;
            window.Echo.channel(channel_name).listen(event_name, res => {
                if (res) {
                    // console.log('🍉 res: ', res);
                    let isLogin = window.all.tool.getLocal("isLogin");
                    if (isLogin == 1) {
                        this.$notice({
                            title: "通知",
                            message: res.message || "message is null",
                            jump: res.message_type
                        });
                    }
                }
            });
        },
        getList() {
            // console.log(111)
            if (!window.all.tool.getLocal("Authorization")) return;

            let { method, url } = this.$api.header_notification_statistics;
            this.$http({ method, url }).then(res => {
                // console.log('头部返回数据',res)
                if (res && res.code == "200") {
                    this.list = res.data;
                    for (var i = 0; i < this.list.length; i++) {
                        if (this.list[i].message_type == "email") {
                            this.email_count = this.list[i].count;
                        }
                        if (this.list[i].message_type == "online_top_up") {
                            this.online_top_up_count = this.list[i].count;
                        }
                        if (this.list[i].message_type == "offline_top_up") {
                            this.offline_top_up_count = this.list[i].count;
                        }
                        if (this.list[i].message_type == "withdrawal_order") {
                            this.withdrawal_order_count = this.list[i].count;
                        }
                        if (this.list[i].message_type == "withdrawal_review") {
                            this.withdrawal_review_count = this.list[i].count;
                        }
                    }
                    // console.log('email',this.email_count)
                    // console.log('online_top_up',this.online_top_up_count)
                    // console.log('offline_top_up',this.offline_top_up_count)
                    // console.log('withdrawal_order',this.withdrawal_order_count)
                    // console.log('withdrawal_review',this.withdrawal_review_count)
                }
            });
        },
        goEmail() {
            this.$router.push("/email/receiveemail");
        },
        goOnFounds() {
            this.$router.push("/funds/incomeorder");
        },
        goOffFounds() {
            this.$router.push("/funds/incomeorder");
        },
        goOrder() {
            this.$router.push("/funds/paymentorder");
        },
        goReview() {
            this.$router.push("/funds/paymentreview");
        }
    },
    watch: {
        $route(to, from) {
            if (from.path === "/login") {
                console.log("222", from.path);
                console.log("3333", to);
                this.socket();
                this.getList();
                // console.log('333',from.path)
            }
        }
    },
    mounted() {
        this.socket();
        this.getList();
    }
};
</script>

<style scoped>
.header {
    display: flex;
    align-items: center;
    min-height: 70px;
    background: #4c8bfd;
    /* font-size: 13px; */
}
.content {
    height: 70px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    min-width: 1200px;
    max-width: 2220px;
    width: 100%;
    /* white-space: nowrap; */
    margin: 0 auto;
    color: #fff;
    background: #4c8bfd;
}
.left {
    display: flex;
    align-items: center;
    margin-left: 20px;
}
.left .title {
    font-size: 30px;
}
.left .detail {
    margin-left: 30px;
}
.left .up .date-due {
    font-size: 18px;
}
.content .left .down {
    display: flex;
    margin-top: 10px;
}
.down > li {
    margin-right: 28px;
}
.down > li > span:first-child {
    margin-right: 2px;
}
/* .content .left > span:not(:first-child) {
    margin-left: 20px;
} */

.content .right {
    display: flex;
    align-items: center;
    /* margin-left: 50px; */
    margin-right: 10px;
}
/* .content .mt10{
    margin-top: 10px;
} */
.content .right > li {
    margin-right: 8px;
    cursor: pointer;
    /* height: 65%; */
    /* border: 1px solid #000; */
}

.content .right > li > span:first-child:hover {
    color: #e5edfa;
}

.content .right .info-music {
    display: inline-block;
    width: 56px;
}

.iconfont {
    margin-right: 5px;
}
/* .badge */
.badge .badge-inner {
    display: inline-block;
    position: relative;
    top: -10px;
    /* height: 20px; */
    /* line-height: 1.5; */
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
    font-size: 12px;
    background: rgb(235, 58, 58);
    border-radius: 10px;

    /* transform: translateX(-50%); */
}
.right .account {
    position: relative;
    /* height: 20px; */
    padding: 15px 0;
}
.account-inner {
    display: none;
    width: 100px;
    position: absolute;
    right: -10px;
    top: 40px;
    border-radius: 3px;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.212);
    z-index: 20;
    color: #000;
    background: #fff;
    transition: max-height 0.3s ease;
}
.account-inner > li {
    width: 100%;
    height: 40px;
    line-height: 40px;
    /* padding: 6px 20px; */
    /* border-bottom: 1px solid #000; */
    text-align: center;
}
.account-inner > li:hover {
    color: #fff;
    background: #70a1fd;
}
.pointer {
    cursor: pointer;
}
.dia-inner {
    width: 600px;
    height: 280px;
    /* border: 1px solid red; */
}
.center-box {
    width: 350px;
    margin: 0 auto;
    /* border: 1px solid green; */
}
.form > li {
    display: flex;
    position: relative;
    align-items: center;
    margin-top: 20px;
}
.form > li > span:first-child {
    display: inline-block;
    min-width: 4em;
    text-align: right;
    margin-right: 10px;
}
.w250 {
    width: 250px;
}

.err-tips {
    position: absolute;
    top: 31px;
    left: 70px;
    color: red;
    font-size: 12px;
}
.form-btns {
    margin-top: 40px;
    text-align: center;
}
.ml50 {
    margin-left: 50px;
}
</style>
