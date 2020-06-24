<template>
    <div class="container">
        <!-- 出款审核 -->

        <QuickQuery :date="quick_query" @update="qqUpd" />
        <!-- <Date v-model="filter.dates[0]" @update="timeUpdate()" /> -->
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>订单号</span>
                    <Input limit="en-num" v-model="filter.order_id" />
                </li>
                <li>
                    <span>申请时间</span>
                    <Date
                        type="datetimerange"
                        style="width:300px;"
                        v-model="filter.apply_dates"
                        @update="timeUpdate()"
                    />
                </li>
                <li>
                    <span style="width:4em;">会员ID</span>
                    <Input limit="en-num" v-model="filter.acc_id" />
                </li>
                <li>
                    <span>审核人</span>
                    <Input v-model="filter.operater" />
                </li>

                <li>
                    <span>审核时间</span>
                    <Date
                        type="datetimerange"
                        style="width:300px;"
                        v-model="filter.operater_dates"
                        @update="reviewUpdate()"
                    />
                </li>
                <li>
                    <span>审核状态</span>
                    <Select v-model="filter.review_status" :options="review_status_opt"></Select>
                </li>

                <li>
                    <span>是否被稽核扣款</span>
                    <Select v-model="filter.is_audit_withhold" :options="audit_withhold_opt"></Select>
                </li>

                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="exportExcel()">导出</button>
                    <button class="btn-red" @click="clearfilter">清空</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.user && row.user.mobile}}</td>
                    <td>{{row.user && row.user.guid}}</td>
                    <td>{{row.amount}}</td>
                    <td>{{row.audit_fee}}</td>
                    <td>{{row.amount_received}}</td>
                    <td>{{row.handing_fee}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.reviewer &&row.reviewer.name }}</td>
                    <td>{{row.review_at}}</td>
                    <td :class="status_obj[row.status].color">{{status_obj[row.status].text}}</td>
                    <td>
                        <button
                            v-if="row.status==1"
                            :class="status_obj[row.status].button"
                            @click="statusShow(row)"
                        >详情</button>
                        <button
                            v-if="row.status==3"
                            :class="status_obj[row.status].button"
                            @click="statusShow(row)"
                        >详情</button>
                        <button
                            v-if="row.status==2"
                            :class="status_obj[row.status].button"
                            @click="statusShow(row)"
                        >详情</button>
                        <button
                            v-if="row.status==4"
                            :class="status_obj[row.status].button"
                            @click="statusShow(row)"
                        >详情</button>
                        <button
                            v-if="row.status==0"
                            :class="status_obj[row.status].button"
                            @click="statusShow(row)"
                        >{{status_obj[row.status].text}}</button>
                        <button class="btns-blue" @click="checkAudit(row)">查看稽核</button>
                    </td>
                </template>
            </Table>
            <div class="total-table">
                <ul>
                    <li>
                        <span>出款金额-合计:</span>
                        <span>{{all_withDraw_money}}</span>
                    </li>
                    <li>
                        <span>稽核扣款-合计:</span>
                        <span>{{all_audit_fee}}</span>
                    </li>
                    <li>
                        <span>实际出款金额-合计:</span>
                        <span>{{all_amount_received}}</span>
                    </li>
                    <li>
                        <span>手续费统计-合计:</span>
                        <span>{{all_handing_fee}}</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>出款金额-总计:</span>
                        <span></span>
                    </li>
                    <li>
                        <span>稽核扣款-总计:</span>
                        <span></span>
                    </li>
                    <li>
                        <span>实际出款金额-总计:</span>
                        <span></span>
                    </li>
                    <li>
                        <span>手续费统计-总计:</span>
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
                <PaymentReviewStatus
                    v-if="dia_status==='statusShow'"
                    :row="curr_row"
                    @getList="getList"
                    @closeDia="closeDia"
                />
                <PaymentReviewDetail v-if="dia_status==='checkAudit'" :all="curr_row" />
            </div>
        </Dialog>
    </div>
</template>


<script>
import PaymentReviewStatus from "./paymentReviewCont/PaymentReviewStatus";
import PaymentReviewDetail from "./paymentReviewCont/PaymentReviewDetail.vue";

export default {
    name: "PaymentReview",
    components: {
        PaymentReviewStatus,
        PaymentReviewDetail
    },
    data() {
        return {
            quick_query: [],
            filter: {
                account: "", // 会员账号
                order_id: "", // 订单号
                apply_dates: [], // 申请时间
                payment_type: "", // 出款类型
                offcial_acc: "", // 正式账号
                acc_id: "", // 会员ID
                operater: "", // 操作人
                operater_dates: [], // 操作时间
                review_status: "", // 审核状态
                is_audit_withhold: "" // 是否被稽核扣款
            },
            payment_type_opt: [
                { label: "全部", value: "" },
                { label: "支付宝", value: 1 },
                { label: "银行卡", value: 2 }
            ],
            official_opt: [
                { label: "全部", value: "" },
                { label: "是", value: "1" },
                { label: "否", value: "0" }
            ],

            review_status_opt: [
                { label: "全部", value: "" },
                { label: "审核中", value: "0" },
                { label: "审核通过", value: "1" },
                // { label: "出款成功", value: "2" },
                { label: "审核拒绝", value: "3" },
                // { label: "拒绝出款", value: "4" }
            ],
            audit_withhold_opt: [
                { label: "全部", value: "" },
                { label: "是", value: "1" },
                { label: "否", value: "0" }
            ],
            status_obj: {
                "3": {
                    color: "red",
                    button: "btns-red",
                    text: "审核拒绝"
                },
                "1": {
                    color: "green",
                    button: "btns-green",
                    text: "审核通过"
                },
                "0": {
                    color: "purple",
                    button: "btns-yellow",
                    text: "审核中"
                },
                "2": {
                    color: "green",
                    button: "btns-greenn",
                    text: "出款成功"
                },
                "4": {
                    color: "red",
                    button: "btns-red",
                    text: "拒绝出款"
                }
            },
            // show_audit_button: [],
            headers: [
                "会员账号",
                "会员ID",
                "出款金额",
                "稽核扣款",
                "实际出款",
                "出款手续费",
                "申请时间",
                "审核人",
                "审核时间",
                "状态",
                "操作"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            // dialog
            curr_row: {},
            dia_show: false,
            dia_status: "",
            dia_title: "",
            all_withDraw_money: "",
            all_audit_fee: "",
            all_amount_received: "",
            all_handing_fee: ""
        };
    },
    methods: {
        qqUpd(dates) {
            //同步时间筛选值
            let arr = [dates[0] + " 00:00:00", dates[1] + " 00:00:00"];
            this.$set(this.filter, "apply_dates", arr);
            this.$set(this.filter, "operater_dates", arr);
        },
        timeUpdate() {
            //同步快捷查询按钮状态
            this.quick_query = this.filter.apply_dates;
        },
        reviewUpdate() {
            this.quick_query = this.filter.operater_dates;
        },
        clearfilter() {
            this.filter = {
                account: "", // 会员账号
                order_id: "", // 订单号
                apply_dates: [], // 申请时间
                payment_type: "", // 出款类型
                offcial_acc: "", // 正式账号
                acc_id: "", // 会员ID
                reviewer: "", // 审核人
                operater_dates: [], // 审核时间
                review_status: "" // 审核状态
            };
        },
        audiotButtonShow(index) {
            // this.show_audit_button.splice(index, 1, true)
            // this.$set(this.show_audit_button, index, true)
        },
        checkStatusShow(row) {
            if (row.status == 0) {
            }
        },
        statusShow(row) {
            this.curr_row = row;
            this.dia_status = "statusShow";
            this.dia_show = true;
            this.dia_title = "出款订单审核";
        },
        checkAudit(row) {
            this.curr_row = row;
            this.dia_status = "checkAudit";
            this.dia_show = true;
            this.dia_title = "查看稽核";
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        getList() {
            let created_at = "";
            if (this.filter.apply_dates[0] && this.filter.apply_dates[1]) {
                created_at = JSON.stringify([
                    this.filter.apply_dates[0],
                    this.filter.apply_dates[1]
                ]);
            }
            let review_at = "";
            if (
                this.filter.operater_dates[0] &&
                this.filter.operater_dates[1]
            ) {
                review_at = JSON.stringify([
                    this.filter.operater_dates[0],
                    this.filter.operater_dates[1]
                ]);
            }
            let datas = {
                mobile: this.filter.account,
                order_no: this.filter.order_no,
                created_at: created_at,
                guid: this.filter.acc_id,
                review: this.filter.operater,
                review_at: review_at,
                status: this.filter.review_status,
                is_audit: this.filter.is_audit_withhold,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            // console.log('请求数据',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.founds_interface_list;
            this.$http({ method: method, url: url, data: data }).then(res => {
                // console.log("出款数据", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                    this.countFunction(res.data && res.data.data);
                }
            });
        },
        countFunction(count) {
            // console.log("count", count);
            let withDraw_money = 0;
            for (var i = 0; i < count.length; i++) {
                if (!count[i].amount) {
                    withDraw_money = 0;
                } else {
                    withDraw_money += parseInt(count[i].amount);
                }
            }
            this.all_withDraw_money = withDraw_money;

            let audit_fee = 0;
            for (var i = 0; i < count.length; i++) {
                if (!count[i].audit_fee) {
                    audit_fee = 0;
                } else {
                    audit_fee += parseInt(count[i].audit_fee);
                }
            }
            this.all_audit_fee = audit_fee;

            let amount_received = 0;
            for (var i = 0; i < count.length; i++) {
                if (!count[i].amount_received) {
                    amount_received = 0;
                } else {
                    amount_received += parseInt(count[i].amount_received);
                }
            }
            this.all_amount_received = amount_received;

            let handing_fee = 0;
            for (var i = 0; i < count.length; i++) {
                if (!count[i].handing_fee) {
                    handing_fee = 0;
                } else {
                    handing_fee += parseInt(count[i].handing_fee);
                }
            }
            this.all_handing_fee = handing_fee;
            // console.log('钱',this.all_handing_fee)
        },
        getMenuList() {
            if (!window.all.tool.getLocal("Authorization")) return;
            if (window.all.tool.getLocal("menu")) {
                this.menu_list = window.all.tool.getLocal("menu");
            }
        },
        exportExcel() {
            // console.log("列表", this.menu_list);
            let firstList = {};
            let childList = {};
            let fatherList = {};
            for (var i = 0; i < this.menu_list.length; i++) {
                firstList = this.menu_list[i].children;
                let fatherTemplate = this.menu_list[i];
                for (var j = 0; j < firstList.length; j++) {
                    if (firstList[j].path == "/funds/paymentreview") {
                        fatherList = fatherTemplate;
                        childList = firstList[j];
                    }
                }
            }
            import("../../../js/config/Export2Excel").then(excel => {
                const tHeaders = this.headers;
                const data = this.list.map(item => {
                    return [
                        item.user && item.user.mobile,
                        item.user && item.user.guid,
                        item.amount,
                        item.audit_fee,
                        item.amount_received,
                        item.handing_fee,
                        item.created_at,
                        item.reviewer && item.reviewer.name,
                        item.review_at,
                        item.status == 0 ? "审核中": item.status == 1? "审核通过":item.status==2? "出款成功":item.status==3?"审核拒绝":item.status==4?"出款拒绝":"--"
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeaders,
                    data,
                    filename: fatherList.label + "-" + "出款审核",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
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
/* .filer .left 有全局样式 见App.vue */
.filter {
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
.filter .left {
    margin-left: 10px;
}
.filter .left li {
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