<template>
    <!-- ------------------------------------    线下   --------------------------------------------------------->
    <div>
        <QuickQuery :date="quick_query" @update="quickDateUpdate($event)" />

        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input limit="en-num" v-model="filter.id" />
                </li>

                <li>
                    <span>时间范围</span>
                    <Date
                        type="datetimerange"
                        style="width:300px;"
                        v-model="filter.dates"
                        @update="timeUpdate()"
                    />
                </li>
                <li>
                    <span>审核状态</span>
                    <Select v-model="filter.review_status" :options="review_status_opt"></Select>
                </li>
                <li>
                    <span>入款账号</span>
                    <Input v-model="filter.income_acc" />
                </li>
                <li>
                    <span>正式状态</span>
                    <Select v-model="filter.formal_status" :options="formal_status_opt"></Select>
                </li>
                <li>
                    <span>订单号</span>
                    <Input limit="en-num" v-model="filter.order_id" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="exportExcel()">导出Excel</button>
                    <button class="btn-red" @click="clearClick">清空</button>
                </li>
            </ul>
            <!-- <div class="right mb10"></div> -->
        </div>
        <div class="table">
            <Table :column="list" :headers="headers">
                <template v-slot:item="{row}">
                    <td>{{row.order_no}}</td>
                    <td>{{row.user && row.user.mobile}}</td>
                    <td>{{row.user && row.user.guid}}</td>
                    <td>
                        <i
                            v-if="row.user && row.user.is_tester=='0'"
                            class="iconfont icongou green"
                        ></i>
                        <i v-if="row.user && row.user.is_tester=='1'" class="iconfont iconcha red"></i>
                    </td>
                    <td>{{row.snap_finance_type}}</td>
                    <td>{{row.snap_account}}</td>
                    <td>{{row.money}}</td>
                    <td>{{row.arrive_money}}</td>
                    <td
                        :class="(review_status_obj[row.status]).color"
                    >{{(review_status_obj[row.status]||{}).text}}</td>
                    <td>{{row.created_at}}</td>
                    <td>
                        <button
                            :class="['btn-green',row.status==1?'visit-view':'visit-hide']"
                            @click="passShow(row)"
                        >通过</button>
                        <button
                            :class="['btn-red',row.status==1?'visit-view':'visit-hide']"
                            @click="rejectShow(row)"
                        >拒绝</button>
                        <button class="btn-blue" @click="showDetail(row)">详情</button>
                    </td>
                </template>
            </Table>
            <div class="total-table">
                <table>
                    <ul>
                        <li>
                            <span>充值金额-合计:</span>
                            <span>{{all_money}}</span>
                        </li>
                        <li>
                            <span>实际到账-合计:</span>
                            <span>{{all_withDraw_money}}</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <span>充值到账-总计:</span>
                            <span>{{''}}</span>
                        </li>
                        <li>
                            <span>实际到账-总计:</span>
                            <span>{{''}}</span>
                        </li>
                    </ul>
                </table>
            </div>
        </div>

        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @updateNo="updateNo"
            @updateSize="updateSize"
        />
        <!-- offline 线下入款详情 modal------------------------------- -->
        <Dialog :show.sync="offline_dia_show" title="线下详情">
            <div class="dialog">
                <div class="mask-detail">
                    <canvas
                        style="border:1px solid white"
                        ref="offlineCanvas"
                        width="650"
                        height="280"
                    ></canvas>
                </div>

                <div class="save-btn">
                    <button class="btn-blue-large" @click="offlineSavePicture('offlineCanvas')">保存图片</button>
                </div>
            </div>
        </Dialog>
        <Modal
            :show.sync="offline_conf"
            :title="offline_title"
            :content="offline_content"
            @cancel="offline_conf=false"
            @confirm="offlineIncomeConfirm"
        ></Modal>
    </div>
</template>
<script>
export default {
    name: "Offline",
    data() {
        return {
            curr_list: "offline",
            quick_query: ["2019-11-26", "2019-11-26"],
            filter: {
                account: "",
                id: "",
                dates: [],
                review_status: "",
                income_acc: "",
                formal_status: "",
                order_id: ""
            },
            review_status_opt: [
                { label: "全部", value: "" },
                { label: "未确认支付", value: "0" },
                { label: "审核中", value: "1" },
                { label: "审核通过", value: "2" },
                { label: "审核拒绝", value: "3" },
                { label: "取消订单", value: "4" }
            ],
            formal_status_opt: [
                { label: "全部", value: "" },
                { label: "是", value: "0" },
                { label: "否", value: "1" }
            ],
            review_status_obj: {
                "0": { text: "未确认支付", color: "orange" },
                "2": { text: "审核通过", color: "green" },
                "3": { text: "审核拒绝", color: "red" },
                "1": { text: "审核中", color: "yellow" },
                "4": { text: "取消订单", color: "gray" }
            },
            headers: [
                "订单号",
                "会员账号",
                "会员ID",
                "正式账号",
                "支付方式",
                "入款账号",
                "充值金额",
                "实际到账",
                "审核状态",
                "充值时间",
                "操作"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            offline_dia_show: false,
            offline_conf: false,
            offline_title: "",
            offline_content: "",
            offline_status: "",
            curr_row: {},
            all_money: "",
            all_withDraw_money: "",
            total_money: "",
            menu_list: []
        };
    },
    methods: {
        quickDateUpdate(dates) {
            // 同步时间筛选值
            let arr = [dates[0] + " 00:00:00", dates[1] + " 00:00:00"];
            this.$set(this.filter, "dates", arr);
        },
        timeUpdate() {
            // 同步快捷查询时间
            this.quick_query = this.filter.dates;
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
                    if (firstList[j].path == "/funds/incomeorder") {
                        fatherList = fatherTemplate;
                        childList = firstList[j];
                    }
                }
            }
            import("../../../../js/config/Export2Excel").then(excel => {
                const tHeaders = this.headers;
                const data = this.list.map(item => {
                    return [
                        item.order_no,
                        item.user && item.user.mobile,
                        item.user && item.user.guid,
                        item.is_tester == 0 ? "否" : "是",
                        item.snap_finance_type,
                        item.snap_account,
                        item.money,
                        item.arrive_money,
                        item.status == 0
                            ? "审核中"
                            : item.status == 1
                            ? "审核通过"
                            : item.status == -1
                            ? "审核拒绝"
                            : item.status == -2
                            ? "订单过期"
                            : item.status == 3
                            ? "客户确认收款"
                            : item.status == -3
                            ? "客户撤销订单"
                            : "",
                        item.created_at,
                        item.curr_list
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeaders,
                    data,
                    filename: fatherList.label + "-" + "线下-入款订单",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        },
        clearClick() {
            this.filter = {
                account: "",
                id: "",
                dates: [],
                review_status: "0",
                income_acc: "",
                formal_status: "0",
                order_id: ""
            };
        },
        showDetail(row) {
            this.offline_dia_show = true;
            setTimeout(() => {
                this.$nextTick(() => {
                    // 获取像素比
                    let getPixelRatio = function(context) {
                        let backingStore =
                            context.backingStorePixelRatio ||
                            context.webkitBackingStorePixelRatio ||
                            context.mozBackingStorePixelRatio ||
                            context.msBackingStorePixelRatio ||
                            context.oBackingStorePixelRatio ||
                            context.backingStorePixelRatio ||
                            1;
                        return (window.devicePixelRatio || 1) / backingStore;
                    };
                    //画文字
                    let ele = this.$refs.offlineCanvas;
                    let context = ele.getContext("2d");
                    let ratio = getPixelRatio(context);

                    ele.style.width = ele.width + "px";
                    ele.style.height = ele.height + "px";

                    ele.width = ele.width * ratio;
                    ele.height = ele.height * ratio;

                    // 放大倍数
                    context.scale(ratio, ratio);

                    context.font = "16px Arial";
                    //背景色
                    context.fillStyle = "#fff";
                    context.fillRect(0, 0, 720, 400);
                    // 绘制 字体内容
                    context.fillStyle = "#444";
                    let ml = 50; // 左边框
                    let w = 350; // 左边文字所占宽度, 右边col起始位置
                    let mt = 40; //上下行间距
                    // row1

                    context.fillText("会员账号：", ml, mt);
                    // context.font = "16px Arial";
                    // context.fillStyle = "#444";
                    context.fillText(row.user && row.user.mobile, ml + 100, mt);

                    context.fillText("会员ID：", w, mt);
                    context.fillText(row.user && row.user.guid, w + 100, mt);

                    // row2   -------------------
                    // 会员等级 ----
                    context.fillText("会员等级：", ml, mt * 2);
                    context.fillText(row.snap_user_grade, ml + 100, mt * 2);
                    //  row3
                    context.fillText("转入银行：", ml, mt * 3);
                    context.fillText(row.bank, ml + 100, mt * 3);
                    context.fillText("转入账号：", w, mt * 3);
                    context.fillText(row.card_number, w + 100, mt * 3); //ok
                    // row4
                    context.fillText("充值金额：", ml, mt * 4);
                    context.fillText(row.money, ml + 100, mt * 4);
                    //  row5
                    context.fillText("收款银行：", ml, mt * 5);
                    context.fillText(row.snap_bank, ml + 100, mt * 5);
                    context.fillText("收款账号：", w, mt * 5);
                    context.fillText(row.snap_account, w + 100, mt * 5);
                    // row 6
                    context.fillText("交易时间：", ml, mt * 6);
                    context.fillText(row.created_at, ml + 100, mt * 6);
                });
            }, 110);
        },
        passShow(row) {
            this.offline_conf = true;
            this.offline_title = "通过";
            this.offline_content = "是否通过该订单？";
            this.offline_status = "pass";
            this.curr_row = row;
        },
        passCfm() {
            // console.log(1);
            let datas = {
                id: String(this.curr_row.id)
            };
            // console.log("请求数据", datas);
            let data = window.all.tool.rmEmpty(datas);
            let {
                method,
                url
            } = this.$api.founds_incomeorder_examination_passed;
            this.$http({ method, url, data }).then(res => {
                // console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.offline_conf = false;
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        rejectShow(row) {
            this.offline_conf = true;
            this.offline_title = "拒绝";
            this.offline_content = "是否拒绝该订单？";
            this.offline_status = "reject";
            this.curr_row = row;
        },
        rejectCfm() {
            // console.log(2);
            let datas = {
                id: String(this.curr_row.id)
            };
            // console.log("请求数据", datas);
            let data = window.all.tool.rmEmpty(datas);
            let {
                method,
                url
            } = this.$api.founds_incomeorder_examination_rejected;
            this.$http({ method, url, data }).then(res => {
                // console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.offline_conf = false;
                    this.$toast.success(res && res.message);
                    this.getList();
                }
            });
        },
        offlineSavePicture(ref) {
            this.exportCanvasAsPNG(ref, "线下入款");
        },
        offlineIncomeConfirm() {
            if (this.offline_status == "pass") {
                this.passCfm();
            }
            if (this.offline_status == "reject") {
                this.rejectCfm();
            }
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },

        // canvas 转png 图片
        exportCanvasAsPNG(ref, fileName) {
            // let canvasElement = document.getElementById(id);
            let canvasElement = this.$refs[ref];

            let MIME_TYPE = "image/png";

            let imgURL = canvasElement.toDataURL(MIME_TYPE);

            let aLink = document.createElement("a");
            // let fileName = "线上入款详情";
            aLink.download = fileName;
            aLink.href = imgURL;
            aLink.dataset.downloadurl = [
                MIME_TYPE,
                aLink.download,
                aLink.href
            ].join(":");

            document.body.appendChild(aLink);
            aLink.click();
            document.body.removeChild(aLink);
        },
        getList() {
            // console.log(1);
            let created_at = "";
            if (this.filter.dates[0] && this.filter.dates[1]) {
                created_at = JSON.stringify([
                    this.filter.dates[0],
                    this.filter.dates[1]
                ]);
            }
            let datas = {
                is_online: 0,
                mobile: this.filter.account,
                guid: this.filter.id,
                created_at: created_at,
                status: this.filter.review_status,
                snap_account: this.filter.income_acc,
                is_tester: this.filter.formal_status,
                order_no: this.filter.order_id,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            // console.log("请求数据", datas);
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.founds_incomeorder_list;
            this.$http({ method: method, url: url, data: data }).then(res => {
                // console.log("返回数据：", res);
                if (res && res.code == "200") {
                    this.list = res.data.data;
                    this.total = res.data.total;
                    this.countFunction(res.data && res.data.data);
                }
            });
        },
        countFunction(count) {
            // console.log("count", count);
            let top_up_money = 0;
            for (var i = 0; i < count.length; i++) {
                if (!count[i].money) {
                    top_up_money = 0;
                } else {
                    top_up_money += parseInt(count[i].money);
                }
            }
            this.all_money = top_up_money;
            // console.log('钱',this.all_money)
            let withDraw_money = 0;
            for (var i = 0; i < count.length; i++) {
                if (!count[i].arrive_money) {
                    withDraw_money = 0;
                } else {
                    withDraw_money += parseInt(count[i].arrive_money);
                }
            }
            this.all_withDraw_money = withDraw_money;
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        }
    },
    mounted() {
        this.getList();
        this.getMenuList();
    }
};
</script>

<style scoped>
.visit-hide {
    visibility: hidden;
}
.visit-view {
    visibility: visible;
}
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
.total-table ul {
    display: flex;
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    font-weight: bold;
    color: #4c8bfd;
    background: rgba(229, 247, 255, 1);
}
.total-table ul > li {
    margin-right: 100px;
}
table {
    border-collapse: collapse;
    width: 100%;
}
.table {
    margin-top: 8px;
    width: 100%;
    overflow-x: auto;
}
.table .v-table {
    /* min-height: 0; */
    min-width: 2000px;
}
.total-table {
    text-align: center;
    margin-top: 10px;
    min-width: 2000px;
}
.total-table > ul {
    justify-content: center;
}
.total-table ul li {
    /* margin-left: 100px; */
    width: 20%;
}
/* .g-modal-mask     样式在公共区... */
.g-v-modal {
    min-width: 660px;
    height: 430px;
    position: absolute;
    /* top: 100px; */
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;
    background-color: #fff;
    border-radius: 7px;
}
.dialog {
    width: 750px;
    text-align: center;
}
.g-modal-mask .iconcuowuguanbi- {
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 35px;
    color: #4c8bfd;
}
.g-modal-mask .iconcuowuguanbi-:hover {
    color: #6999f1;
}
.g-v-modal .detail td {
    padding-top: 10px;
    padding-bottom: 10px;
}
.g-v-modal .detail tr td > :nth-child(2) {
    padding-left: 10px;
    font-size: 14px;
    color: #555;
}
.save-btn {
    text-align: center;
    margin-top: 20px;
}
.save-btn .btn-blue-large {
    text-align: center;
}
</style>