<template>
    <div id="app" @mousedown="initSound">
        <!-- 顶部 -->
        <Header class="app-header"></Header>
        <div class="app-content" >
            <!-- 侧边栏 -->
            <Aside class="app-aside"></Aside>
            <div class="app-main">
                <TabNav class="tab-nav"></TabNav>
                <!-- <Breadcrumb /> -->
                <!-- <router-view class="router-view"/> -->
                <transition name="fade-transform" mode="out-in">
                    <keep-alive :include="keepAliveInclude" :exclude="keepAliveExclude">
                        <router-view v-if="isRouterAlive" class="router-view" />
                    </keep-alive>
                </transition>
            </div>
        </div>
        <div id="toast-box"></div>
        <div class="g-modal-mask" v-if="showMask"></div>
        <div id="message-box"></div>
        <div id="notice-box"></div>
        <loading id="g-loading" show />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import TabNav from './components/TabNav.vue'
import Breadcrumb from './components/commonComponents/Breadcrumb'

export default {
    name: 'App',
    components: {
        Header,
        Aside,
        TabNav,
        Breadcrumb
    },
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            play: true,
            isRouterAlive: true,
            first_play: true,
            audio: undefined
        }
    },
    computed: {
        ...mapGetters([
            'showMask',
            'loadingShow',
            'keepAliveInclude',
            'keepAliveExclude'
        ]),
        loading() {
            return window.$loading
        }
    },
    methods: {
        initSound() {
            window.alarm = new Audio(require('./assets/audio/alarm2.mp3'))
        },
        playSound() {
            if (!window.alarm) return
            window.alarm.play()
        },
        reload() {
            this.isRouterAlive = false
            this.$nextTick(function() {
                this.isRouterAlive = true
            })
        }
    },
    created() {
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('store')) {
            this.$store.replaceState(
                Object.assign(
                    {},
                    this.$store.state,
                    JSON.parse(sessionStorage.getItem('store'))
                )
            )
        }
        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state))
        })
    },
    mounted() {
        // setInterval(() => {
        //     this.playSound()
        // }, 4000)
        // setTimeout(() => {
        //     this.$notice({
        //     title: '标题',
        //     message: '这是邮箱的内容',
        //     jump: 'notice_of_withdraw'
        // })
        // }, 5000);
    }
}
</script>

<style scoped>
.app-header {
    width: 100%;
}
.app-content {
    /* max-width: 1200px; */
    display: flex;
    min-width: 1200px;
    max-width: 2220px;
    margin: 20px auto 0 auto;
    /* float: left; */
}
.app-aside {
    width: 150px;
    /* overflow: hidden; */
}
.app-main {
    margin-left: 10px;
    margin-right: 10px;
    width: 100%;
    /* width: 1040px; */
    overflow: hidden;
}
/* .router-view{
    width: 1040px;
} */
.tab-nav {
    width: 100%;
}
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.4s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
#toast-box {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10002;
}
#notice-box {
    position: fixed;
    z-index: 30;
    right: 7px;
    bottom: 10px;
    max-height: 90vh;
    overflow-y: auto;
}
#g-loading {
    display: none;
}
</style>

<style>
/* ----------------------    公共样式    全局-------------------------------------------------- */
@media screen and (max-width: 1200px) {
    /* .app-content {
        font-size: 12px;
    } */
    html {
        /* color: rgb(110, 38, 243); */

        font-size: 12px;
    }

    .app-aside {
        width: 150px;
    }
}

@media screen and (min-width: 1201px) and (max-width: 1400px) {
    /*  .app-content {
        max-width: 1200px;
    } */
    html {
        /* color: rgb(243, 120, 38); */
        font-size: 12px;
    }
    .app-aside {
        width: 165px;
    }
}
@media screen and (min-width: 1401px) and (max-width: 1600px) {
    /*  .app-content {
        max-width: 1400px;
    } */
    .app-aside {
        width: 180px;
    }
    html {
        /* width: 1240px; */
        font-size: 13px;
        /* color: rgb(192, 192, 5); */
    }
}
@media screen and (min-width: 1601px) and (max-width: 1900px) {
    /*  .app-content {
        max-width: 1600px;
    } */
    html {
        /* width: 1440px; */
        font-size: 14px;

        /* color: green; */
    }
    .app-aside {
        width: 195px;
    }
}
@media screen and (min-width: 1901px) and (max-width: 2300px) {
    /*  .app-content {
        max-width: 1900px;
    } */
    html {
        /* width: 1740px; */
        /* color: turquoise; */
        font-size: 15px;
    }
    .app-aside {
        width: 210px;
    }
}

@media screen and (min-width: 2301px) {
    /*   .app-content {
        max-width: 2300px;
    } */
    html {
        /* width: 2140px; */
        /* color: purple !important; */
        font-size: 15px;
    }
    .app-aside {
        width: 225px;
    }
}
.textarea {
    padding: 10px;
    /* min-height: 130px; */
    border-radius: 4px;
    border: 1px solid #ddd;
    /* font-size: 16px; */
}
.container {
    max-width: 2220px;
    min-height: calc(100vh - 130px);
    padding: 20px 8px 20px 8px;
    border: 1px solid #4c8bfd;
    background: #fff;
    overflow: auto;
}
/* 背景遮罩层 */
.g-modal-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);
}
.g-v-modal {
    /* min-width: 160px;
    min-height: 90px; */
    position: absolute;
    z-index: 2;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 5px;
}
.g-modal-mask .mod-head {
    position: relative;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: #4c8bfd;
    color: #fff;
}
/* modal 关闭按钮 */
.g-modal-mask .iconcuowuguanbi- {
    position: absolute;
    right: 12px;
    font-size: 26px;
    color: #ffffff;
    cursor: pointer;
}
.g-modal-mask .iconcuowuguanbi-:hover {
    /* color: #1660ebb0; */
    transform: scale(1.1);
}
.g-modal-mask .mod-body {
    padding: 20px 25px;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
/* 按钮 */
button {
    outline: none;
    border: none;
    padding: 4px 8px;
    border-radius: 3px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    margin: 0 2px;
}
button:hover {
    box-shadow: none;
}
.btn {
    padding: 5px 15px;
    box-sizing: border-box;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    color: #4c8bfd;
    border: 1px solid #4c8bfd;
    background-color: #fff;
}

.btn:hover {
    box-shadow: none;
}

.btn-blue {
    padding: 5px 16px;
    box-shadow: 1px 1px 2px #2e549b3d;
    color: #fff;
    background: #4c8bfd;
}

.btn-blue:hover {
    background: #6397f7;
    transition: box-shadow 0.2s;
}
.btn-blue:active {
    box-shadow: none;
    background: #4c8bfd;
}
.btn-orange {
    padding: 5px 16px;
    box-shadow: 1px 1px 2px rgba(250, 170, 11, 0.2);
    color: #fff;
    background: #faaa0b;
}

.btn-orange:hover {
    background: rgb(248, 180, 44);
    transition: box-shadow 0.2s;
}
.btn-orange:active {
    box-shadow: none;
    background: #faaa0b;
}
/* 绿色 按钮 */
.btn-green {
    padding: 5px 16px;
    box-shadow: 1px 1px 2px rgba(250, 170, 11, 0.2);
    color: #fff;
    background: #07d184;
}

.btn-green:hover {
    background: #00cc33;
    transition: box-shadow 0.2s;
}
.btn-green:active {
    box-shadow: none;
    background: #07d184;
}
/* 红色 按钮 */
.btn-red {
    padding: 5px 16px;
    color: #fff;
    background: #ff6a6a;
    box-shadow: 1px 1px 2px rgba(138, 37, 37, 0.205);
}

.btn-red:hover {
    background: rgb(250, 123, 123);
}
.btn-red:active {
    background: #ff6a6a;
}

.btn-blue-large {
    height: 30px;
    width: 100px;
    /* padding: 9px 22px; */
    /* outline: none; */
    border: none;
    /* box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); */
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 3px;
    color: #fff;
    background: #4c8bfd;
}

.btn-blue-large:hover {
    box-shadow: none;
    background: #6397f7;
}
.btn-blue-large:active {
    box-shadow: none;
    background: #3f7beb;
}
.btn-blue-large:hover {
    box-shadow: none;
    background: #6397f7;
}

.btn-plain {
    /* height: 26px; */

    padding: 4px 15px;
    box-sizing: border-box;
    /* box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); */
    color: #4c8bfd;
    border: 1px solid #4c8bfd;
    background-color: #fff;
}

.btn-plain:hover {
    box-shadow: none;
    color: #246aeb;
}

.btn-plain-large {
    /* height: 26px; */
    height: 30px;
    width: 100px;
    /* padding: 8px 22px; */
    box-sizing: border-box;
    /* box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); */
    color: #4c8bfd;
    border: 1px solid #4c8bfd;
    background-color: #fff;
}

.btn-plain-large:hover {
    color: #246aeb;
}
.btn-plain-large:active {
    box-shadow: none;
    color: #3f7beb;
}
/* 小按钮 */
.btns-red {
    color: #fff;
    background: #ff6a6a;
    box-shadow: 1px 1px 3px rgba(255, 106, 106, 0.226);
}
.btns-red:hover {
    background: rgba(245, 87, 87, 0.8);
}
.btns-red:active {
    background: #ff6a6a;
}
.btns-green {
    color: #fff;
    background: #4cc013;
    box-shadow: 1px 1px 3px rgba(67, 204, 17, 0.2);
}
.btns-green:hover {
    background: #42a80f;
}
.btns-gree:active {
    background: #4cc013;
}
.btns-blue {
    color: #fff;
    background: #48f;
    box-shadow: 1px 1px 3px rgba(68, 137, 255, 0.2);
}
.btns-blue:hover {
    background: rgba(68, 137, 255, 0.801);
}
.btns-blue:active {
    color: #fff;
    background: #48f;
}
.btns-yellow {
    color: #fff;
    background: #fa0;
    box-shadow: 1px 1px 3px rgba(255, 170, 0, 0.2);
}
.btns-yellow:hover {
    background: rgba(255, 170, 0, 0.815);
}
.btns-yellow {
    color: #fff;
    background: #fa0;
}
.btns-plain-blue {
    border: 1px solid #4c8bfd;
    background: #e5eaf5;
    color: #4c8bfd;
}
.btns-plain {
    border: 1px solid #4c8bfd;
    background: #f6f9fb;
    color: #4c8bfd;
}
/* *星符号 */
.require::before {
    content: '*';
    color: red;
    /* line-height: 1em; */
}

.flex {
    display: flex;
}

.filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* white-space: nowrap; */
    font-size: 13px;
    background: #f2f2f2;
}

.filter .left,
.filter .right {
    display: flex;
    flex-wrap: wrap;
}

.filter .left > li {
    display: flex;
    align-items: center;
    margin-right: 10px;
}
.filter .v-input,
.filter .v-date-picker,
.filter .v-select {
    /* width: 8.3rem; */
    width: 100px;
}
.filter .left > li > span:first-child {
    margin-right: 4px;
}

.table-page {
    margin-top: 25px;
    display: flex;
    justify-content: center;
}

.a {
    /* font-weight: 400; */
    text-decoration: underline;
    cursor: pointer;
    color: #4c8bfd;
    margin-left: 8px;
}

.a:active {
    color: red;
}

/* 字体颜色 */
.orange {
    color: #ff9900;
}
.blue {
    color: #4c8bfd;
}
.green {
    color: #00cc33;
}

.red {
    color: #f44;
}
.purple {
    color: #9900ff;
}
/* 背景色 */
.bg-orange {
    background: #ff9900;
}
.bg-blue {
    background: #4c8bfd;
}
.bg-green {
    background: #4cc013;
}
.bg-red {
    background: #f44;
}
.bg-gray {
    background: #f2f2f2;
}
.w100 {
    width: 100px;
}
.w200 {
    width: 200px;
}
.w250 {
    width: 250px;
}
.mt10 {
    margin-top: 10px;
}
.mt20 {
    margin-top: 20px;
}
.ph5 {
    padding-left: 5px;
    padding-right: 5px;
}
.mr10 {
    margin-right: 10px;
}
.mr20 {
    margin-right: 20px;
}
.mr50 {
    margin-right: 50px;
}
.ml5 {
    margin-left: 5px;
}
.ml10 {
    margin-left: 10px;
}
.ml20 {
    margin-left: 20px;
}
.ml50 {
    margin-left: 50px;
}
.mv5 {
    margin-left: 5px;
    margin-right: 5px;
}
.p10 {
    padding: 10px;
}
.total-table ul {
    display: flex;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-weight: bold;
    color: #4c8bfd;
    background: rgba(229, 247, 255, 1);
}
.total-table ul > li {
    margin-right: 100px;
}
.g-form > li {
    display: flex;
    align-items: center;
}
.g-form > li > span:first-child {
    border: 1px solid #000;
}
.bold {
    font-weight: bold;
}
/* 重写element ui loading 样式 */
.el-loading-parent--relative .el-loading-mask {
    position: fixed;
    background-color: rgba(255, 255, 255, 0.6);
    margin: 0;
    top: 50%;
    left: 50%;
    height: 300px;
    width: 300px;
    margin-left: -150px;
    margin-top: -150px;
    -webkit-transition: opacity 0.3s;
    transition: opacity 0.3s;
    z-index: 10003;
}
/* 文字超出省略 */
.text-ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
</style>
