<template>
    <div class="container">
       <!-- 全域设置 -->
        <div class="head-set">
            <div class="set-label">设置选项:</div>
            <button :class="['mt20',item.value===curr_set_btn?'btn-blue':'btn-plain']" v-for="(item, index) in set_btns" :key="index" @click="setChange(item)">{{item.label}}</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            set_btns: [
                { label: '注册登录设定', value: 1 },
                { label: '游戏设定', value: 2 },
                { label: '金额限制设定', value: 3 },
                { label: '出入款设定', value: 4 },
            ],
            curr_set_btn: 1,
        }
    },
    methods: {
        setChange(item) {
            this.curr_set_btn = item.value
        }
    },
    mounted() {

    }
}
</script>

<style scoped>
.head-set {
    background: #f2f2f2;
    padding: 20px 10px 20px 10px;
}
.set-label {
    font-size:16px;
    font-family:PingFang SC;
    font-weight:800;
}
</style>