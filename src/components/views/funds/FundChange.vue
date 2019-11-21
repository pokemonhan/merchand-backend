<template>
    <div class="container">
        <h4 style="margin:5px 0;">资金账变</h4>
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号:</span>
                    <Input class="w100" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID:</span>
                    <Input class="w100" v-model="filter.userid" />
                </li>
                <li>
                    <span>充值时间:</span>
                    <Date v-model="filter.date" />
                </li>
                <li>
                    <span>支付状态</span>
                    <Select v-model="filter.status" :options="status_opt"></Select>
                </li>
            </ul>
            <div class="right">
                <button class="btn-blue">查询</button>
                <button class="btn-blue">导出excel</button>
            </div>
        </div>
        <div style="margin-top:20px;">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a7}}</td>
                    <td>{{row.a8}}</td>
                </template>
            </Table>
            <Page
                class="page"
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
            filter: {
                account: "",
                userid: "",
                date: "",
                status: "3"
            },
            status_opt: [
                { label: "取款", value: "0" },
                { label: "转出", value: "1" },
                { label: "转入", value: "2" },
                { label: "优惠", value: "3" },
                { label: "签到", value: "4" },
                { label: "抢红包", value: "5" },
                { label: "首充送", value: "6" },
                { label: "注册送", value: "7" },
                { label: "幸运转盘", value: "8" },
                { label: "有奖竞猜", value: "9" }
            ],
            headers: [
                { label: "流水编号" },
                { label: "资金类型" },
                { label: "账变类型" },
                { label: "会员账户" },
                { label: "帐变前金额" },
                { label: "账变金额" },
                { label: "账变后金额" },
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
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
};
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
