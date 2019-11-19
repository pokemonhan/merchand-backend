<template>
    <div class="container">
        <h2>出款审核</h2>
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input v-model="filter.user_account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input v-model="filter.userid" />
                </li>
                <li>
                    <span>申请时间</span>
                    <Date />
                </li>
                 <li>
                    <span>订单号</span>
                    <Input v-model="filter.userid" />
                </li>
                 <li>
                    <span>出款类型</span>
                    <Select v-model="filter.withdrawal_type" :options="withdrawal_type_opt"></Select>
                </li>
                li
            </ul>
            <div>
                <button class="btn-blue">查询</button>
                <button class="btn-blue">导出excel</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            filter:{
                user_account: '',
                userid: '',
                withdrawal_type: '',

            },
            withdrawal_type_opt:[
                {label: '支付宝', value: 1},
                {label: '银行卡', value: 2},
            ]
        }
    },
    methods: {

    },
    mounted() {

    }
}
</script>

<style scoped>
.container {
    padding: 20px 8px 20px 8px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #fff;
}
</style>