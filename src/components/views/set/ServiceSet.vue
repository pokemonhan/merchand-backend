<template>
    <div class="container">
        <!-- 客服设置 -->
        <div class="bg-gray p10">
            <button
                :class="curr_service==='qq_wechat'?'btn-blue-large':'btn-plain-large'"
                @click="serviceClick('qq_wechat')"
            >QQ/微信客服</button>
            <button
                :class="curr_service==='online'?'btn-blue-large':'btn-plain-large'"
                @click="serviceClick('online')"
            >在线客服</button>
            <button class="btn-blue-large ml50" @click="addService">添加客服</button>
        </div>
        <div class="mt20">
            <QQwechatService ref="qqWechat" v-show="curr_service==='qq_wechat'" />
            <OnlineService ref="online" v-show="curr_service==='online'" />
        </div>
    </div>
</template>

<script>
import QQwechatService from './ServiceSetDir/QQwechatService'
import OnlineService from './ServiceSetDir/OnlineService'
export default {
    components: {
        QQwechatService,
        OnlineService
    },
    data() {
        return {
            curr_service: 'qq_wechat',
            filter: {
                acc: ''
            }
        }
    },
    methods: {
        serviceClick(val) {
            this.curr_service = val
        },
        addService() {
            switch (this.curr_service) {
                case 'qq_wechat':
                    this.$refs.qqWechat.addclick()
                    break;
                case 'online':
                    this.$refs.online.addclick()
                    break
                default:
                    break;
            }
        }
    },
    mounted() {}
}
</script>

<style scoped>
</style>