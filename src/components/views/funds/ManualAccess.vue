<template>
    <div class="container">
        <h4>人工存取</h4>
        <div class="select-list">
            <button
                :class="[curr_list==='deposit'?'btn-blue':'btn']"
                @click="curr_list='deposit'"
            >人工存款记录</button>
            <button
                :class="[curr_list==='withdrawal'?'btn-blue':'btn']"
                @click="curr_list='withdrawal'"
            >人工取款记录</button>
        </div>
        <!-- 人工存款_记录 -->

        <div class="deposit" v-if="curr_list==='withdrawal'">
            <div class="filter" style="margin-top:15px;">
                <ul class="left">
                    <li>
                        <span>会员账号:</span>
                        <Input limit="en-num" v-model="deposit_filter.orderid" />
                    </li>
                    <li>
                        <span>会员ID:</span>
                        <Input limit="en-num" v-model="deposit_filter.orderid" />
                    </li>
                    <li>
                        <span>充值时间:</span>
                        <Date />
                    </li>
                </ul>
                <div class="right">
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">导出</button>
                    <button class="btn-blue">人工充值</button>
                </div>
            </div>
            <div class="table">
                <Table :headers="deposit_headers" :column="deposit_list">
                    <template v-slot:item="{row}">
                        <td>{{row.a1}}</td>
                        <td>{{row.a2}}</td>
                        <td>{{row.a3}}</td>
                        <td>{{row.a4}}</td>
                        <td>{{row.a5}}</td>
                        <td>{{row.a6}}</td>
                        <td>{{row.a7}}</td>
                    </template>
                </Table>
                <Page
                    class="page"
                    :total="deposit_total"
                    :pageNo.sync="deposit_pageNo"
                    :pageSize.sync="deposit_pageSize"
                    @updateNo="depositUpdateNo"
                    @updateSize="depositUpdateSize"
                />
            </div>
        </div>

        <!-- 人工取款_记录 -->
        <div class="withdrawal" v-else>
            <div class="filter" style="margin-top:15px;">
                <ul class="left">
                    <li>
                        <span>会员账号:</span>
                        <Input limit="en-num" v-model="withdrawal_filter.orderid" />
                    </li>
                    <li>
                        <span>游戏ID:</span>
                        <Input limit="en-num" v-model="withdrawal_filter.orderid" />
                    </li>
                    <li>
                        <span>充值时间:</span>
                        <Date />
                    </li>
                </ul>
                <div class="right">
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">导出</button>
                    <button class="btn-blue">人工取款</button>
                </div>
            </div>
            <div class="table">
                <Table :headers="withdrawal_headers" :column="withdrawal_list">
                    <template v-slot:item="{row}">
                        <td>{{row.a1}}</td>
                        <td>{{row.a2}}</td>
                        <td>{{row.a3}}</td>
                        <td>{{row.a4}}</td>
                        <td>{{row.a5}}</td>
                        <td>{{row.a6}}</td>
                        <td>{{row.a7}}</td>
                    </template>
                </Table>
                <Page
                    class="table-page"
                    :total="withdrawal_total"
                    :pageNo.sync="withdrawal_pageNo"
                    :pageSize.sync="withdrawal_pageSize"
                    @updateNo="withdrawalUpdateNo"
                    @updateSize="withdrawalUpdateSize"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            curr_list: 'deposit',
            deposit_filter: {
                orderid: "",
                userid: "",
                recharge_date: ""
            },
            deposit_headers: [
                { label: "订单号" },
                { label: "会员账号" },
                { label: "会员ID" },
                { label: "充值金额" },
                { label: "充值时间" },
                { label: "操作人" },
                { label: "备注" }
            ],
            deposit_list: [
                {
                    a1: "D456123456789",
                    a2: "13245678942",
                    a3: "4561234",
                    a4: "100.00",
                    a5: "2019/09/20 12:25:20",
                    a6: "admin",
                    a7: "备注"
                },
                {
                    a1: "D456123456789",
                    a2: "13245678942",
                    a3: "4561234",
                    a4: "100.00",
                    a5: "2019/09/20 12:25:20",
                    a6: "admin",
                    a7: "备注"
                },
                {
                    a1: "D456123456789",
                    a2: "13245678942",
                    a3: "4561234",
                    a4: "100.00",
                    a5: "2019/09/20 12:25:20",
                    a6: "admin",
                    a7: "备注"
                }
            ],
            deposit_total: 0,
            deposit_pageNo: 1,
            deposit_pageSize: 25,
            deposit_total: 0,
            withdrawal_filter: {
                orderid: "",
                userid: "",
                recharge_date: ""
            },
            withdrawal_headers: [
                { label: "订单号" },
                { label: "会员账号" },
                { label: "会员ID" },
                { label: "扣款金额" },
                { label: "扣款时间" },
                { label: "操作人" },
                { label: "备注" }
            ],
            withdrawal_list: [
                { a1: "D456123456789", a2: "13245678942", a3: "4561234", a4: "100.00", a5: "2019/09/20 12:25:20", a6: "admin", a7: "备注" },
                { a1: "D456123456789", a2: "13245678942", a3: "4561234", a4: "100.00", a5: "2019/09/20 12:25:20", a6: "admin", a7: "备注" },
                { a1: "D456123456789", a2: "13245678942", a3: "4561234", a4: "100.00", a5: "2019/09/20 12:25:20", a6: "admin", a7: "备注" }
            ],
            withdrawal_total: 0,
            withdrawal_pageNo: 1,
            withdrawal_pageSize: 25,
            withdrawal_total: 0
        };
    },
    methods: {
        depositUpdateNo(val) {},
        depositUpdateSize(val) {},

        withdrawalUpdateNo(val) {},
        withdrawalUpdateSize(val) {},
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
.select-list {
    padding: 10px;
    border-bottom: 1px solid #eee;
    /* margin-bottom: 10px; */
}
.table {
    margin-top: 20px;
}
</style>