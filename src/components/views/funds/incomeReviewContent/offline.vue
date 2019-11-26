<template>
    <!-- ------------------------------------    线下   --------------------------------------------------------->
    <div>
        <QuickQuery :date="quick_query" @update="quickDateUpdate($event)" />
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input style="width:120px" limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input style="width:110px" limit="en-num" v-model="filter.id" />
                </li>
                <li>
                    <span>时间范围</span>
                    <Date style="width:110px" v-model="filter.start_date" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date style="width:110px" v-model="filter.end_date" @update="timeUpdate()" />
                </li>
                <li>
                    <span>商户号</span>
                    <Input style="width:110px" limit="number" v-model="filter.vendor" />
                </li>
                <li>
                    <span>支付状态</span>
                    <Select v-model="filter.pay_status" :options="pay_status_opt"></Select>
                </li>

                <li>
                    <span>支付方式</span>
                    <Select style="width:100px" v-model="filter.pay_way" :options="pay_way_opt"></Select>
                </li>
                <li>
                    <span>账号类型</span>
                    <Select
                        v-model="filter.pay_way"
                        :options="[{label:'测试账号',value:0},{label:'正式账号', value:1}]"
                    ></Select>
                </li>
                <li>
                    <span>订单号</span>
                    <Input style="width:110px" limit="en-num" v-model="filter.order_id" />
                </li>
                <li>
                    <span>商户编号</span>
                    <Input style="width:110px" limit="en-num" v-model="filter.order_id" />
                </li>
                <li>
                    <span>商户</span>
                    <Input style="width:110px" limit="number" v-model="filter.vendor" />
                </li>
                <li style="margin-left:-10px">
                    <button class="btn-blue">查询</button>
                </li>
                <li>
                    <button class="btn-blue">导出Excel</button>
                </li>
            </ul>
            <div class="right1"></div>
        </div>

        <TwoTable :column="off_list" :headers="offline_table_headers">
            <template v-slot:tdOne="{row}">
                <td></td>
                <td>{{row.a}}</td>
                <td>{{row.b}}</td>
                <td>{{row.c}}</td>
                <td>{{row.d}}</td>
                <td>{{row.e}}</td>
                <td>{{row.f}}</td>
                <td>
                    <span class="a" @click="offlineShowDetail(row)">详情</span>
                    <span class="a" @click="offConfShow">通过</span>
                </td>
            </template>
            <template v-slot:tdTwo="{row}">
                <td>{{row.a}}</td>
                <td>{{row.b}}</td>
                <td>{{row.c}}</td>
                <td>{{row.d}}</td>
                <td>{{row.e}}</td>
                <td>{{row.f}}</td>
                <td>{{row.f}}</td>
            </template>
        </TwoTable>

        <div class="total-table">
            <table>
                <tr>
                    <th>合计:</th>
                    <th>{{'200'}}</th>
                    <th>出款统计</th>
                    <th>{{'200'}}</th>
                    <th>手续费统计:</th>
                    <th>{{'20'}}</th>
                </tr>
                <tr>
                    <th>总计:</th>
                    <th>{{'200'}}</th>
                    <th>出款统计</th>
                    <th>{{'200'}}</th>
                    <th>手续费统计:</th>
                    <th>{{'20'}}</th>
                </tr>
            </table>
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
        <div class="modal-mask" v-if="is_show_offline_detail">
            <div class="v-modal">
                <div @click="is_show_offline_detail=false">
                    <i class="iconfont iconcuowuguanbi-"></i>
                </div>
                <!-- <div class="detail">
                        <tr>
                            <td>
                                <span>会员账号:</span>
                                <span>{{'1234324324'}}</span>
                            </td>
                            <td>
                                <span>会员ID:</span>
                                <span>{{'1234324324'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>会员等级:</span>
                                <span>{{'1234324324'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>平台名称:</span>
                                <span>{{'红牛平台'}}</span>
                            </td>
                            <td>
                                <span>支付类型:</span>
                                <span>{{'红牛支付支付宝扫码'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>第三方支付订单号:</span>
                                <span>{{'654646565465'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>充值金额:</span>
                                <span>{{'654646565465'}}</span>
                            </td>
                            <td>
                                <span>交易时间:</span>
                                <span>{{'2019-09-20 12:59:30'}}</span>
                            </td>
                        </tr>
                </div>-->
                <div class="mask-detail">
                    <canvas
                        style="border:1px solid green"
                        ref="offlineCanvas"
                        width="520"
                        height="280"
                    ></canvas>
                </div>
                <div class="save-btn">
                    <!-- <a href="/i/w3school_logo_white.gif" download="w3logo"> -->
                    <a class="btn-blue-large" @click="offlineSavePicture('offlineCanvas')">保存图片</a>
                </div>
            </div>
        </div>

        <Modal
            :show="offline_conf"
            title="入款审核"
            content="通过该入款订单"
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
                start_date: "",
                end_date: "",
                order_id: "",
                vendor: "",
                pay_status: "",
                pay_way: ""
            },

            pay_status_opt: [
                { label: "全部", value: "" },
                { label: "已支付", value: 1 },
                { label: "未支付", value: 2 }
            ],
            pay_way_opt: [
                { label: "全部", value: "" },
                { label: "微信充值", value: 1 },
                { label: "支付宝充值", value: 2 },
                { label: "京东充值", value: 3 }
            ],
            offline_table_headers: [
                [
                    "订单号",
                    "会员账号",
                    "会员ID",
                    "上级代理",
                    "账号类型",
                    "商户编号",
                    "操作"
                ],
                [
                    "商户号",
                    "商户",
                    "支付方式",
                    "充值金额",
                    "实际到账",
                    "支付状态",
                    "充值时间"
                ]
            ],
            off_list: [
                {
                    a: "aD201909201252",
                    b: "13245678942",
                    c: "4561234",
                    d: "13256689796",
                    e: "红牛商户",
                    f: "微信充值",
                    g: "100",
                    h: "99.9",
                    i: "已支付",
                    j: "2019/09/20 12:25:20"
                },
                {
                    a: "aD201909201252",
                    b: "13245678942",
                    c: "4561234",
                    d: "13256689796",
                    e: "红牛商户",
                    f: "微信充值",
                    g: "100",
                    h: "99.9",
                    i: "已支付",
                    j: "2019/09/20 12:25:20"
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            is_show_offline_detail: false,
            offline_conf: false
        };
    },
    methods: {
        quickDateUpdate(dates) {
            // 同步时间筛选值
            this.filter.start_date = dates[0];
            this.filter.end_date = dates[1];
            this.filter = Object.assign(this.filter);
        },
        timeUpdate() {
            // 同步快捷查询时间
            this.quick_query = [this.filter.start_date, this.filter.end_date];
        },
        offlineShowDetail(row) {
            this.is_show_offline_detail = true;
            this.$nextTick(() => {
                // 高清屏模糊问题
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

                // let offlineCanvas = document.getElementById("offlineCanvas");
                let offlineCanvas = this.$refs.offlineCanvas;
                let context = offlineCanvas.getContext("2d");
                let ratio = getPixelRatio(context);

                offlineCanvas.style.width = offlineCanvas.width + "px";
                offlineCanvas.style.height = offlineCanvas.height + "px";

                offlineCanvas.width = offlineCanvas.width * ratio;
                offlineCanvas.height = offlineCanvas.height * ratio;

                // 放大倍数
                context.scale(ratio, ratio);
                //   画文字
                context.font = "16px Arial";
                //背景色
                context.fillStyle = "#fff";
                context.fillRect(0, 0, 520, 280);
                // 绘制 字体内容
                context.fillStyle = "#444";
                let ml = 50; // 左边框
                let w = 250; // 左边文字所占宽度, 右边col起始位置
                let mt = 50; //上下行间距
                // row1

                context.fillText("会员账号:", ml, mt);
                context.fillText("65464646", ml + 80, mt);
                context.fillText("会员ID:", w, mt);
                context.fillText("65464646", w + 80, mt);

                // row2   -------------------
                // 会员等级 ----
                context.fillText("会员等级:", ml, mt * 2);
                context.fillText("VIP7", ml + 80, mt * 2);
                //  row3
                context.fillText("平台名称:", ml, mt * 3);
                context.fillText("红牛平台", ml + 80, mt * 3);
                context.fillText("支付类型:", w, mt * 3);
                context.fillText("红牛支付宝扫码", w + 80, mt * 3);
                // row4
                context.fillText("第三方支付订单号:", ml, mt * 4);
                context.fillText("235353255", ml + 160, mt * 4);
                //  row35
                context.fillText("充值金额:", ml, mt * 5);
                context.fillText("6464", ml + 80, mt * 5);
                context.fillText("交易时间:", w, mt * 5);
                context.fillText(
                    window.all.tool.formatDate(new Date(), true),
                    w + 80,
                    mt * 5
                );
            });
        },
        offConfShow(row) {
            this.offline_conf = true;
        },
        offlineSavePicture(ref) {
            this.exportCanvasAsPNG(ref, "线下入款");
        },
        offlineIncomeConfirm() {},
        updateNo(val) {},
        updateSize(val) {
            this.pageNo = 1;
        },
        offlineGetList() {
            // this.$http
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
        }
    },
    mounted() {}
};
</script>

<style scoped>
/* .container {
    padding: 20px 8px 20px 8px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #fff;
} */
.head {
    margin-left: 20px;
}
.select-list {
    padding: 10px;
    border-bottom: 1px solid #eee;
    /* margin-bottom: 10px; */
}
/*  */
.filter ul li {
    margin: 10px 10px 10px 0;
}
table {
    border-collapse: collapse;
    width: 100%;
}
.total-table table tr th {
    padding: 6px 8px;
    color: #6d93db;
    background: #eef7fc;
    font-weight: 400;
}
/* .modal-mask     样式在公共区... */
.v-modal {
    min-width: 660px;
    height: 430px;
    position: absolute;
    top: 100px;
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 40px;
    background-color: #fff;
    border-radius: 7px;
}
.modal-mask .iconcuowuguanbi- {
    position: absolute;
    right: 12px;
    top: 12px;
    font-size: 35px;
    color: #4c8bfd;
}
.modal-mask .iconcuowuguanbi-:hover {
    color: #6999f1;
}
.v-modal .detail td {
    padding-top: 10px;
    padding-bottom: 10px;
}
.v-modal .detail tr td > :nth-child(2) {
    padding-left: 10px;
    font-size: 14px;
    color: #555;
}
.save-btn {
    text-align: center;
    margin-top: 40px;
}
.save-btn .btn-blue-large {
    text-align: center;
    /* padding: 8px 12px; */
}
/* .a{
    font-size: 14px;
} */
</style>