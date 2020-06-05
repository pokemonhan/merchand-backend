<template>
    <transition name="notice">
        <div v-if="show" class="vue-notice">
            <div class="inner">
                <div class="notice-header">
                    <i v-if="type==='warning'" class="notice-warning iconfont iconjinggao1-"></i>
                    <i v-else-if="type==='success'" class="notice-success iconfont iconchenggong-"></i>
                    <i v-else-if="type==='error'" class="notice-error iconfont iconcuowuguanbi-"></i>
                    <i v-else-if="type==='info'" class="notice-info iconfont iconinfor"></i>
                    <span class="title">{{title}}</span>
                    <!-- 关闭按钮 【x】 -->
                    <i :class="['close','iconfont iconicon-test']" @click="close"></i>
                </div>

                <div class="content mt10">{{message}}</div>
                <div class="opera-button">
                    <button class="btns-plain" @click="go">去处理</button>
                    <button class="btns-plain" @click="laterRemind">稍后提醒</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import router from '../../js/router'
// import 
export default {
    name: 'notice',
    props: {
        title: {
            type: String
            // default: () => 'title is null'
        },
        message: {
            type: String,
            // required:
            default: () => 'message is null'
        },
        type: {
            type: String,
            default: () => 'info'
        },
        duration: {
            type: Number,
            default: () => 3000
        },
        /** 跳转链接 */
        jump: {
            type: String,
            defalut: ''
        }
    },
    data() {
        return {
            show: false
        }
    },

    methods: {
        close() {
            this.show = false
        },
        go() {
            this.show = false
            let self = this
            if (this.jump) {
                let path_obj = {
                    notice_of_withdraw: '/funds/paymentorder',      // 出款订单
                    notice_of_recharge_on: '/funds/incomeorder',     // 线上入款通知
                    notice_of_recharge_off: '/funds/incomeorder',    // 线下入款通知
                    notice_of_email: '/email/receiveemail',          // 邮件通知
                    notice_of_withdraw_audit: '/funds/paymentreview' // 出款审核通知
                }
                let path = path_obj[this.jump] || ''
                path && router.push(path)
                
            }
        },
        laterRemind() {
            this.show = false
            // 5分钟后 提醒
            // setTimeout(() => {
            //     this.show = true
            // }, 2000)
            let self = this
            setTimeout(() => {
                self.$notice({
                    title: '通知',
                    message: this.message,
                    jump: this.jump
                })
            }, 3 * 1 * 1000)
        },
        playSound() {

            if(!window.alarm) return
            // 喇叭关闭 退出不播放
            if(!window.all.store.getters.loudSpeakerOpen) return
            window.alarm.play()
        }
    },
    mounted() {
        this.show = true
        this.playSound()

        // setTimeout( ()=>{
        //     this.show = false
        // }, this.duration-400)
    }
}
</script>

<style scoped>
.notice-enter {
    position: relative;
    opacity: 0;
    transform: translateY(-74px);
    z-index: 100;
}
.notice-leave-to {
    margin-bottom: -90px;
    opacity: 0;
}
.notice-enter-to,
.notice-leave {
    margin: 0;
    transform: translateY(0);
    opacity: 1;
}
.notice-enter-active,
.notice-leave-active {
    transition: all 0.2s linear;
}
.vue-notice {
    position: relative;
    max-height: 400px;
    width: 350px;
    box-sizing: border-box;
    padding: 8px;
    /* text-align: center; */
    /* display: flex;
    align-items: center;
    justify-content: center; */
    overflow: hidden;
}

.vue-notice .inner {
    height: 100%;
    /* padding: 12px 20px; */
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.26);
    background-color: #fff;
    /* display: flex; */
    /* flex-direction: row; */
    /* justify-content: center; */
    /* align-items: center; */
}
.notice-header {
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 10px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    background: #70a1fd;
    color: #fff;
}
.vue-notice i {
    margin-right: 8px;
    color: #fff;
}
/* .vue-notice .notice-success {
    color: #19be6b;
}
.vue-notice .notice-warning {
    color: #f90;
}
.vue-notice .notice-info {
    color: #2d8cf0;
}
.vue-notice .notice-error {
    color: #ed4014;
} */
.title {
    font-size: 14px;
    font-weight: 600;
}
.close {
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #fff;
}
.close:hover {
    /* color: rgb(245, 81, 40); */
    transform: scale(1.2);
}
.mt10 {
    margin-top: 10px;
    padding-left: 15px;
    padding-right: 15px;
}
.opera-button {
    margin-top: 20px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-around;
}
</style>