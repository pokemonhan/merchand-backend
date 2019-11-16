<template>
    <div>
       
        <div id="header">
            <div class="content">
                <div class="inner">
                    <span class="title">后台系统</span>

                    <span class="online-people">
                        <span>活跃人数：</span>
                        <span>88</span> 人
                    </span>
                    <span class="today-people">
                        <span>今日注册人数:</span>
                        <span>88</span> 人
                    </span>
                    <span class="new-people">
                        <span>新增人数：</span>
                        <span>88</span> 人
                    </span>

                    <span class="charge pointer">
                       
                        <span>平台入款</span>
                        <span class="badge">
                            <span class="badge-inner">{{'8'}}</span>
                        </span>
                    </span>

                    <span class="third-money pointer">
                      
                        <span>第三方入款</span>
                        <span class="badge">
                            <span class="badge-inner">{{'8'}}</span>
                        </span>
                    </span>
                    <span class="out-money pointer">
                      
                        <span>出款审核</span>
                        <span class="badge">
                            <span class="badge-inner">{{'8'}}</span>
                        </span>
                    </span>
                    <span class="info-music pointer" @click="play_music=!play_music">
                        <i v-if="play_music" class="iconfont iconspeaker" ></i>
                        <i v-if="!play_music" class="iconfont iconmute"></i>
                        <span>音效</span>
                       
                    </span>
                    <span :class="['account','pointer']" @mouseenter="accoutEnter" @mouseleave="accountLeave">
                        <span>
                            <i class="iconfont iconexit"></i>
                        </span>
                        <span>退出</span>
                        <ul class="account-inner ">
                            <li>1</li>
                            <li>2</li>
                            <li @click="logout">登出</li>
                        </ul>
                    </span>
                </div>
            </div>
        </div>
        <Modal :show="logout_conf_show" title="标题啊" content="内容.." 
            @confirm="confirm" @cancel="cancel" >
        </Modal>
    </div>
</template>

<script>
export default {
    name: "Header",
    // components: { tabNav, langSelect },
    data() {
        return {
            // isfullScreen: true,
            play_music:false,
            account_ishow: false,
            logout_conf_show: false
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
        playMusic(){
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
            ele.style.overflow = "visible";

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
            }, 500);
        },
        logout() {
            // window.all.tool.removeSession('token')
            // this.$router.push('/login')
            this.logout_conf_show = true;
        },
        confirm() {
            let self = this;
            this.$http({
                method: this.$api.logout.method,
                url: this.$api.logout.url
                // data: params
            }).then(res => {
                if(res.code==='200'){
                    self.$toast("登出成功");
                }
                
            })
            window.all.tool.removeSession("token");
            this.$router.push("/login");
            this.logout_conf_show = false;
        },
        cancel() {
            this.logout_conf_show = false;
        }
    },
    mounted() {}
};
</script>

<style scoped>
#header {
    max-height: 200px;
    line-height: 63px;
    /* width: 100%; */
    /* // box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); */
    background: linear-gradient(to right, #5a5efd, #67b5fd);
    display: flex;
    justify-content: center;
    font-size: 14px;
}
.content {
    justify-content: center;
    color: #fff;
    width: 1200px;
    white-space: nowrap;
}
.content .inner > span{
    /* display: inline-block; */
    margin-right: 8px;
    /* border: 1px solid #000; */
}
.content .title {
    font-size: 34px;
}
.content .online-people {
    margin-left: 80px;
}
.content .charge {
    margin-left: 100px;
}
.content .out-money {
    margin-left: 30px;
}

.iconfont {
    margin-right: 5px;
}
.badge {
    height: 20px;
    width: 20px;
    display: inline-block;
    position: relative;
    top: -5px;
    /* margin-left: 3px; */
    /* padding: 2px 2px; */
    font-size: 12px;
    background: rgb(235, 58, 58);
    border-radius: 50%;
}
.badge-inner {
    position: absolute;
    top: -21px;
    left: 50%;
    transform: translateX(-50%);
}
.content .account {
    margin-left: 30px;
    position: relative;
}
.account-inner::after {
    content: "";
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #ffffff;
    position: absolute;
    left: 50%;
    margin-left: -6px;
    top: -6px;
}

.account-inner {
    display: none;
    width: 80px;
    position: absolute;
    right: -10px;
    top: 30px;
    /* padding: 3px 0; */
    border-radius: 5px;
    box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.212);
    z-index: 2;
    color: #000;
    background: #fff;
    transition: all 0.5s ease;
    overflow: hidden;
}
.account-inner > li {
    /* height: 20px; */
    width: 100%;
    line-height: 20px;
    padding: 6px 20px;
    /* border-bottom: 1px solid #000; */
    text-align: center;
}
.account-inner > li:hover {
    color: #fff;
    background: rgb(43, 169, 241);
}
.pointer{
    cursor: pointer;
}
</style>