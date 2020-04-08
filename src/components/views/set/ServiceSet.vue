<template>
    <div class="container">
        <!-- 客服设置 -->
        <div class="bg-gray p10">
            <button
                :class="type===1?'btn-blue-large':'btn-plain-large'"
                @click="serviceClick(1)"
            >QQ/微信客服</button>
            <button
                :class="type===2?'btn-blue-large':'btn-plain-large'"
                @click="serviceClick(2)"
            >在线客服</button>
            <button class="btn-blue-large ml50" @click="addService">添加客服</button>
        </div>
        <div class="mt20">
            <QQwechatService ref="qqWechat" v-show="type===1" :date="QQDate" />
            <OnlineService ref="online" v-show="type===2" :data="onlineDate" />
        </div>
    </div>
</template>

<script>
import QQwechatService from './ServiceSetDir/QQwechatService'
import OnlineService from './ServiceSetDir/OnlineService'
export default {
    name: 'ServiceSet',
    components: {
        QQwechatService,
        OnlineService
    },
    data() {
        return {
            type: 1,
            filter: {
                acc: ''
            },
            QQDate: [],
            onlineDate: []
        }
    },
    methods: {
        serviceClick(val) {
            this.type = val

        },
        addService() {
            switch (this.type) {
                case 1:
                    this.$refs.qqWechat.addclick()
                    break
                case 2:
                    this.$refs.online.addclick()
                    break
                default:
                    break
            }
        },
        
        
    },
    mounted() {
        // this.getList()
    }
}
</script>

<style scoped>
</style>