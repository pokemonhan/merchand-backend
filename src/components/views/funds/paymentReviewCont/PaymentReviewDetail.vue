<template>
    <div>
        <div style="margin-top:5px;" class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input class="w100" v-model="filter.user_account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input class="w100" v-model="filter.userid" />
                </li>
                <li>
                    <span>状态</span>
                    <Select v-model="filter.status" :options="status_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getAuditList()">查询</button>
                </li>
            </ul>
            <!-- <div>
                <button class="btn-blue">查询</button>
                <button class="btn-blue">导出excel</button>
            </div>-->
        </div>

        <Table style="margin-top:20px;" :headers="headers" :column="list">
            <template v-slot:item="{row}">
                <td>{{row.mobile}}</td>
                <td>{{row.guid}}</td>
                <td>{{row.order_number}}</td>
                <td>{{row.type}}</td>
                <td>{{row.amount}}</td>
                <td>{{row.demand_bet}}</td>
                <td>{{row.achieved_bet}}</td>
                <td :class="[row.status==1?'green':'red']">{{row.status==1? '已完成':'未完成'}}</td>
                <td>{{row.created_at}}</td>
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
</template>

<script>
export default {
    name: "PaymentReviewDetail",
    props: {
        all: Object
    },
    data() {
        return {
            filter: {
                user_account: "",
                userid: "",
                status: ""
            },
            status_opt: [
                { label: "全部", value: "" },
                { label: "已完成", value: "1" },
                { label: "未完成", value: "0" }
            ],
            status_color: {
                "0": "red",
                "1": "green"
            },
            headers: [
                "会员账号",
                "会员ID",
                "订单号",
                "金额类型",
                "金额",
                "需求打码",
                "当前打码",
                "状态",
                "稽核时间"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25
        };
    },
    methods: {
        updateNo(val) {
            this.getAuditList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getAuditList();
        },
        getList() {
            // console.log('all',this.all)
            let datas = {
                guid: this.all.user && this.all.user.guid,
                mobile: this.all.user && this.all.user.mobile
            };
            let data = window.all.tool.rmEmpty(datas);
            console.log("请求数据", data);
            let {
                method,
                url
            } = this.$api.founds_interface_examination_view_audit;
            this.$http({ method, url, data }).then(res => {
                console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        },
        getAuditList() {
            // console.log('all',this.all)
            let datas = {
                mobile: this.filter.user_account,
                guid: this.filter.userid,
                status: this.filter.status,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            let data = window.all.tool.rmEmpty(datas);
            console.log("请求数据", data);
            let {
                method,
                url
            } = this.$api.founds_interface_examination_view_audit;
            this.$http({ method, url, data }).then(res => {
                console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                }
            });
        }
    },
    mounted() {
        this.getList();
    }
};
</script>

<style scoped>
.filter {
    padding: 10px;
}
.w100 {
    width: 100px;
}
</style>