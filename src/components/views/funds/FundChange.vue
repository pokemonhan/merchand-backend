<template>
    <div class="container">
        <!---------------------- 资金账变 ----------------------->
        <QuickQuery :date="quick_query" @update="quickDateUpdate($event)" />
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input limit="en-num" v-model="filter.userid" />
                </li>
                <li>
                    <span>账变时间</span>
                    <Date type="datetime" v-model="filter.date" @update="timeUpdate()" />
                </li>
                <li>
                    <span>账变类型</span>
                    <Select v-model="filter.status" :options="acc_change_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">导出Excel</button>
                    <button class="btn-red" @click="clearFilter">清空</button>
                </li>
            </ul>
        </div>
        <div style="margin-top:20px;">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
                    <td>{{row.a5}}</td>
                    <td>{{row.a5}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a7}}</td>
                    <td>{{row.a8}}</td>
                </template>
            </Table>
            <Page
                class="table-page"
                :total="total"
                :pageNo.sync="pageNo"
                :pageSize.sync="pageSize"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            quick_query: [],
            filter: {
                account: "",
                userid: "",
                date: [],
                status: "0"
            },
            acc_change_opt: [
                { label: "全部", value: "0" },
                { label: "充值", value: "1" },
                { label: "取款", value: "2" },
                { label: "转出", value: "3" },
                { label: "转入", value: "4" },
                { label: "优惠", value: "4" },
                { label: "签到", value: "5" },
                { label: "抢红包", value: "6" },
                { label: "首充送", value: "7" },
                { label: "注册送", value: "8" },
                { label: "幸运转盘", value: "9" },
                { label: "有奖竞猜", value: "10" }
            ],
            headers: [
                { label: "流水编号" },
                { label: "账变类型" },
                { label: "资金流向" },
                { label: "会员账户" },
                { label: "会员ID" },
                { label: "帐变前金额" },
                { label: "账变金额" },
                { label: "账变后金额" },
                { label: "冻结金额" },
                { label: "账变时间" }
            ],
            list: [
                {
                    a1: "13245678989",
                    a2: "4561342",
                    a3: "D45678944654",
                    a4: "优惠存款",
                    a5: "100",
                    a6: "100",
                    a7: "50",
                    a8: "2019/09/25 18：17：30"
                },
                {
                    a1: "13245678989",
                    a2: "4561342",
                    a3: "D45678944654",
                    a4: "优惠存款",
                    a5: "100",
                    a6: "100",
                    a7: "50",
                    a8: "2019/09/25 18：17：30"
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25
        };
    },
    methods: {
        quickDateUpdate(dates) {
            this.filter.date = dates;
        },
        timeUpdate() {
            this.quick_query = this.filter.date;
        },
        clearFilter() {
            this.filter = {
                account: "",
                userid: "",
                date: [],
                status: "0"
            };
        },
        
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
};
</script>

<style scoped>
/* .container  在公共区 App.vue */
.filter {
    /* margin-top: 10px; */
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
.filter .left {
    margin-left: 10px;
}
.filter .left li {
    margin-top: 10px;
    /* margin-bottom: 10px; */
}
.button-export {
    background: #4c8bfd;
    color: #fff;
}
</style>
