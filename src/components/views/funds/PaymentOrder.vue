<template>
    <div class="container">
        <!---------------------------------- 出款订单 -------------------------->
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <div class="filter">
            <ul class="left filter-item">
                <li>
                    <span>订单号</span>
                    <Input limit="en-num" v-model="filter.order_no" />
                </li>
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input limit="en-num" v-model="filter.acc_id" />
                </li>
                <li>
                    <span>出款方式</span>
                    <Select v-model="filter.payment_type" :options="type_opt"></Select>
                </li>
                <li>
                    <span>出款状态</span>
                    <Select v-model="filter.payment_status" :options="payment_status_opt"></Select>
                </li>
                <li>
                    <span>是否被稽核扣款</span>
                    <Select v-model="filter.is_audit_withhold" :options="is_audit_withhold_opt"></Select>
                </li>
                <li>
                    <span>审核人</span>
                    <Input v-model="filter.auditor" />
                </li>
                <li>
                    <span>审核时间</span>
                    <Date
                        type="datetimerange"
                        style="width:300px;"
                        v-model="filter.operate_dates"
                        @update="timeUpdate()"
                    />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="exportExcel()">导出excel</button>
                    <button class="btn-red" @click="clearAll">清空</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :column="list" :headers="headers">
                <template v-slot:item="{row}">
                    <td>{{row.order_no || '--'}}</td>
                    <td>{{row.user && row.user.mobile || '--'}}</td>
                    <td>{{row.user && row.user.guid || '--'}}</td>
                    <td>{{withdraw_obj[row.account_type].text || '--'}}</td>
                    <td>{{row.amount || '--'}}</td>
                    <td>{{row.audit_fee || '--'}}</td>
                    <td>{{row.amount_received || '--'}}</td>
                    <td>{{row.handing_fee || '--'}}</td>
                    <td>{{row.created_at || '--'}}</td>
                    <td>{{row.reviewer && row.reviewer.name || '--'}}</td>
                    <td>
                        <span :class="color_obj[row.status].color">{{color_obj[row.status].text}}</span>
                    </td>
                    <td>
                        <button
                            v-if="row.status==2"
                            :class="status_obj[row.status].button"
                            @click="statusShow(row)"
                        >详情</button>
                        <button
                            v-if="row.status!=2"
                            :class="status_obj[row.status].button"
                            @click="statusShow(row)"
                        >{{status_obj[row.status].text}}</button>
                    </td>
                </template>
            </Table>
            <div class="total-table">
                <ul>
                    <li>
                        <span>出款金额-合计:</span>
                        <span>{{all_amount}}</span>
                    </li>
                    <li>
                        <span>实际出款-合计:</span>
                        <span>{{all_amount_received}}</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>出款金额-总计:</span>
                        <span></span>
                    </li>
                    <li>
                        <span>实际出款-总计:</span>
                        <span></span>
                    </li>
                </ul>
            </div>
            <Page
                class="table-page"
                :total="total"
                :pageNo.sync="pageNo"
                :pageSize.sync="pageSize"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <Dialog :show.sync="dia_show" :title="dia_title">
            <div class="dia-inner">
                <PaymentOrderReviewDetail :row="curr_row" @getList="getList" @closeDia="closeDia" />
            </div>
        </Dialog>
    </div>
</template>

<script>
import PaymentOrderReviewDetail from "./paymentOrderReview/PaymentOrderReviewDetail";

export default {
    name: "PaymentOrder",
    components: {
        PaymentOrderReviewDetail
    },
    data() {
        return {
            quick_query: [],
            filter: {
                account: "",
                acc_id: "",
                auditor: "",
                operator: "",
                payment_status: "",
                order_id: "",
                operate_dates: [],
                payment_type: "",
                is_audit_withhold: ""
            },
            type_opt: [
                { label: "全部", value: "" },
                { label: "银行卡", value: "1" },
                { label: "支付宝", value: "2" },
                { label: "微信", value: "3" }
            ],
            color_obj: {
                "-2": {
                    color: "red",
                    text: "已拒绝"
                },
                "2": {
                    color: "green",
                    text: "已通过"
                },
                "1": {
                    color: "purple",
                    text: "待审核"
                }
            },
            total: 0,
            pageNo: 1,
            pageSize: 25,
            dia_show: false,
            dia_title: "出款订单审核",
            curr_row: {},

            modal_conf_content: "",
            is_audit_withhold_opt: [
                { label: "全部", value: "" },
                { label: "是", value: "1" },
                { label: "否", value: "0" }
            ],
            payment_status_opt: [
                { label: "全部", value: "" },
                { label: "待出款", value: "1" },
                { label: "已出款", value: "2" },
                { label: "已拒绝", value: "-2" }
            ],
            status_obj: {
                "-2": {
                    color: "red",
                    button: "btns-red",
                    text: "已拒绝"
                },
                "2": {
                    color: "green",
                    button: "btns-green",
                    text: "已出款"
                },
                "1": {
                    color: "purple",
                    button: "btns-yellow",
                    text: "待审核"
                }
            },
            withdraw_obj: {
                "1": { text: "银行" },
                "2": { text: "支付宝" },
                "3": { text: "微信" }
            },
            // table
            headers: [
                "订单号",
                "会员账号",
                "会员ID",
                "出款方式",
                "出款金额",
                "稽核扣款",
                "实际出款",
                "手续费",
                "审核时间",
                "审核人",
                "出款状态",
                "操作"
            ],

            list: [],
            all_amount: "",
            all_amount_received: ""
        };
    },

    methods: {
        getMenuList() {
            if (!window.all.tool.getLocal("Authorization")) return;
            if (window.all.tool.getLocal("menu")) {
                this.menu_list = window.all.tool.getLocal("menu");
            }
        },
        exportExcel() {
            console.log("列表", this.menu_list);
            let firstList = {};
            let childList = {};
            let fatherList = {};
            for (var i = 0; i < this.menu_list.length; i++) {
                firstList = this.menu_list[i].children;
                let fatherTemplate = this.menu_list[i];
                for (var j = 0; j < firstList.length; j++) {
                    if (firstList[j].path == "/funds/paymentorder") {
                        fatherList = fatherTemplate;
                        childList = firstList[j];
                    }
                }
            }
            import("../../../js/config/Export2Excel").then(excel => {
                const tHeaders = this.headers;
                const data = this.list.map(item => {
                    return [
                        item.order_no,
                        item.user && item.user.mobile,
                        item.user && item.user.guid,
                        item.account_type == 1
                            ? "银行"
                            : item.account_type == 2
                            ? "支付宝"
                            : item.account_type == 3
                            ? "微信"
                            : "",
                        item.amount,
                        item.audit_fee,
                        item.amount_received,
                        item.handing_fee,
                        item.created_at,
                        item.reviewer && item.reviewer.name,
                        item.status == -2
                            ? "已拒绝"
                            : item.status == 2
                            ? "已通过"
                            : item.status == 1
                            ? "待审核"
                            : ""
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeaders,
                    data,
                    filename: fatherList.label + "-" + "出款订单",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        },
        qqUpd(dates) {
            //同步时间筛选值
            let arr = [dates[0] + " 00:00:00", dates[1] + " 00:00:00"];
            this.$set(this.filter, "operate_dates", arr);
        },
        timeUpdate() {
            //同步快捷查询按钮状态
            this.quick_query = this.filter.operate_dates;
        },
        clearAll() {
            this.filter = {
                account: "",
                acc_id: "",
                auditor: "",
                operator: "",
                payment_status: "",
                order_id: "",
                operate_dates: [],
                payment_type: "",
                is_audit_withhold: ""
            };
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        statusShow(row) {
            this.dia_show = true;
            this.dia_title = "出款订单审核";
            this.curr_row = row;
        },
        getList() {
            let operation_at = "";
            if (this.filter.operate_dates[0] && this.filter.operate_dates[1]) {
                operation_at = JSON.stringify([
                    this.filter.operate_dates[0],
                    this.filter.operate_dates[1]
                ]);
            }
            let datas = {
                order_no: this.filter.order_no,
                mobile: this.filter.account,
                guid: this.filter.acc_id,
                amount_type: this.filter.payment_type,
                status: this.filter.payment_status,
                is_audit: this.filter.is_audit_withhold,
                admin: this.filter.auditor,
                operation_at: operation_at,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.founds_paymentorder_list;
            this.$http({ method: method, url: url, data: data }).then(res => {
                console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                    this.countFunction(res.data && res.data.data);
                }
            });
        },
        countFunction(count) {
            let amount = 0;
            for (var i = 0; i < count.length; i++) {
                if (!count[i].amount) {
                    amount = 0;
                } else {
                    amount += parseInt(count[i].amount);
                }
            }
            this.all_amount = amount;

            let amount_received = 0;
            for (var i = 0; i < count.length; i++) {
                if (!count[i].amount_received) {
                    amount_received = 0;
                } else {
                    amount_received += parseInt(count[i].amount_received);
                }
            }
            this.all_amount_received = amount_received;
        },
        closeDia() {
            this.dia_show = false;
        }
    },
    mounted() {
        this.getList();
        this.getMenuList();
    }
};
</script>

<style scoped>
/* ----- .w100   width:100px 已经放入公共区 (App.vue) */
/* ----- .filter  --和下面的ul li样式已经放入公共区  */
/* ----- .container 公共区 */

.filter {
    padding-left: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
.filter-item > li {
    margin-top: 10px;
}
.dia-inner {
    width: 900px;
    max-height: 80vh;
    overflow: auto;
}
.total-table {
    text-align: center;
    margin-top: 10px;
    width: 100%;
}
.total-table > ul {
    justify-content: center;
}
.total-table ul li {
    /* margin-left: 100px; */
    width: 20%;
}
/* .table .v-table {
    min-height: 0;
} */
</style>
