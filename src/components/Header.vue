<template>
    <div>
        <div id="header">
            <div class="content">
                <div>
                    <span class="title">后台系统</span>

                    <span class="online-people">
                        <span>
                            <i class="iconfont iconpeople4geren"></i>
                        </span>
                        <span>在线人数：</span>
                        <span>xx</span> 人
                    </span>

                    <span class="charge">
                        <span>
                            <i class="iconfont iconchongzhi"></i>
                        </span>
                        <span>未审核充值</span>
                        <span class="badge">
                            <span class="badge-inner">{{'8'}}</span>
                        </span>
                    </span>

                    <span class="out-money">
                        <span>
                            <i class="iconfont iconchongzhitixian-"></i>
                        </span>
                        <span>未审核出款</span>
                        <span class="badge">
                            <span class="badge-inner">{{'8'}}</span>
                        </span>
                    </span>
                    <span class="account">
                        <span>
                            <i class="iconfont iconcaigoutonggerenbangaobaozhenzhucedenglu17"></i>
                        </span>
                        <span>name</span>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
    // components: { tabNav, langSelect },
    data() {
        return {
            // isfullScreen: true,
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
    },
    mounted() {
        
        
    },
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
    min-width: 1164px;
}
.content .title {
    font-size: 24px;
}
.content .online-people {
    margin-left: 80px;
}
.content .charge {
    margin-left: 300px;
}
.content .out-money {
    margin-left: 30px;
}
.content .account {
    margin-left: 30px;
}
.iconfont {
    margin-right: 5px;
}
.badge{
    height: 20px;
    width: 20px;
    display: inline-block;
    position: relative;
    /* top: 12px; */
    /* margin-left: 3px; */
    /* padding: 2px 2px; */
    font-size: 12px;
    background: rgb(235, 58, 58);
    border-radius: 50%;
    
}
.badge-inner{
    position: absolute;
    top: -21px;
    left: 50%;
    transform: translateX(-50%);
}
</style>