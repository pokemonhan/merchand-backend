<template>
    <div>
        <QuickQuery :date="quick_query" @update="quickDateUpdate($event)" />
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input style="width:100px" limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input style="width:100px" limit="en-num" v-model="filter.id" />
                </li>

                <li>
                    <span>时间范围</span>
                    <Date style="width:110px" v-model="filter.start_date" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date style="width:110px" v-model="filter.end_date" @update="timeUpdate()" />
                </li>
                <li>
                    <span>审核状态</span>
                    <Select
                        style="width:110px"
                        v-model="filter.review_status"
                        :options="review_status_opt"
                    ></Select>
                </li>
                <li>
                    <span>入款账号</span>
                    <Input class="w100" v-model="filter.income_acc" />
                </li>
                <li>
                    <span>订单号</span>
                    <Input style="width:110px" limit="en-num" v-model="filter.order_id" />
                </li>
            </ul>
            <div class="right">
                <li>
                    <button class="btn-blue">查询</button>
                </li>
                <li>
                    <button class="btn-blue">导出Excel</button>
                </li>
            </div>
        </div>

        <!-- <TwoTable :column="on_list" :headers="theaders">
            <template v-slot:tdOne="{row}">
                <td></td>
                <td>{{row.a}}</td>
                <td>{{row.b}}</td>
                <td>{{row.c}}</td>
                <td>{{row.d}}</td>
                <td>{{row.e}}</td>
                <td>{{row.f}}</td>
                <td>{{row.g}}</td>
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
        </TwoTable>-->
        <div style="margin-top:20px;"></div>
        <Table :headers="theaders" :column="on_list">
            <template v-slot:item="{row}">
                <td>{{row.a}}</td>
                <td>{{row.b}}</td>
                <td>{{row.c}}</td>
                <td>{{row.d}}</td>
                <td>{{row.e}}</td>
                <td
                    :class="color[row.f]"
                >{{row.f==='1'?'通过':row.f==='2'?'审核中':row.f==='0'?'拒绝':'??'}}</td>
                <td>{{row.g}}</td>
                <td>
                    <span>
                        <span class="a" @click="conf_mod_show(row,true)">通过</span>
                        <span class="a" @click="conf_mod_show(row,false)">拒绝</span>
                        <span class="a" @click="showDetail(row)">详情</span>
                    </span>
                </td>
                <td>{{row.h}}</td>
            </template>
        </Table>
        <div class="total-table">
            <table>
                <tr>
                    <th>合计:</th>
                    <th>{{'200'}}</th>
                </tr>
                <tr>
                    <th>总计:</th>
                    <th>{{'200'}}</th>
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

        <div class="modal-mask" v-if="is_show_online_detail">
            <div class="v-modal">
                <div @click="is_show_online_detail=false">
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
                                <span>转入银行:</span>
                                <span>{{'招商银行'}}</span>
                            </td>
                            <td>
                                <span>转入账号:</span>
                                <span>{{'红牛支付支付宝扫码'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>充值金额:</span>
                                <span>{{'654646565465'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>收款金额:</span>
                                <span>{{'654646565465'}}</span>
                            </td>
                            <td>
                                <span>收款账号:</span>
                                <span>{{'2019-09-20 12:59:30'}}</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>交易时间:</span>
                                <span>{{'2019-09-20 12:59:30'}}</span>
                            </td>
                        </tr>
                </div>-->
                <div class="mask-detail">
                    <canvas
                        style="border:1px solid white"
                        ref="onlineCanvas"
                        width="520"
                        height="270"
                    ></canvas>
                </div>
                <div class="save-btn">
                    <!-- <a href="/i/w3school_logo_white.gif" download="w3logo"> -->
                    <a class="btn-blue-large" @click="savePicture('onlineCanvas')">保存图片</a>
                </div>
            </div>
        </div>

        <Modal
            :show="is_show_online_conf"
            title="入款审核"
            :content="conf_mod_content"
            @cancel="is_show_online_conf=false"
            @confirm="confClick"
        ></Modal>
    </div>
</template>


<script>
export default {
    name: "Online",

    data() {
        return {
            quick_query: [],
            filter: {
                account: "",
                id: "",
                start_date: "",
                end_date: "",
                pay_way: "",
                review_status: 0,
                income_acc: ""
            },
            review_status_opt: [
                { lable: "全部", value: 0 },
                { lable: "审核中", value: 1 },
                { lable: "通过", value: 2 },
                { lable: "拒绝", value: 3 }
            ],
            pay_way_opt: [
                { lable: "全部", value: 0 },
                { lable: "审核中", value: 1 },
                { lable: "通过", value: 2 },
                { lable: "拒绝", value: 3 }
            ],
            theaders: [
                "订单号",
                "会员账号",
                "会员ID",
                "入款账号",
                "充值金额",
                "审核状态",
                "充值时间",
                "操作",
                "操作人"
            ],
            on_list: [
                {
                    a: "aD201909201252",
                    b: "13245678942",
                    c: "4561234",
                    d: "支付宝转账",
                    e: "100.00",
                    f: "1",
                    g: "100",
                    h: "admin",
                    i: "admin"
                },
                {
                    a: "aD201909201252",
                    b: "13245678942",
                    c: "4561234",
                    d: "支付宝转账",
                    e: "100.00",
                    f: "2",
                    g: "100",
                    h: "admin",
                    i: "admin"
                },
                {
                    a: "aD201909201252",
                    b: "13245678942",
                    c: "4561234",
                    d: "支付宝转账",
                    e: "100.00",
                    f: "0",
                    g: "100",
                    h: "admin",
                    i: "admin"
                }
            ],
            color: {
                "1": "green",
                "2": "purple",
                "0": "red"
            },
            total: 0,
            pageNo: 1,
            pageSize: 25,

            conf_mod_content: "",
            is_show_online_detail: false,
            is_show_online_conf: false,
            online_conf_button: "" // 点击的是 1. 通过按钮('pass'), 2.拒绝('refuse')
        };
    },
    methods: {
        quickDateUpdate(dates, name) {
            // 同步时间筛选值
            this.filter.start_date = dates[0];
            this.filter.end_date = dates[1];
            this.filter = Object.assign(this.filter);
        },
        // canvas 转png 图片
        timeUpdate() {
            // if(name==='start_data'){

            // }
            // 同步快捷查询时间
            this.quick_query = [this.filter.start_date, this.filter.end_date];
        },
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
        savePicture(ref) {
            this.exportCanvasAsPNG(ref, "线上入款");
        },
        conf_mod_show(row, is_confirm) {
            this.is_show_online_conf = true;
            if (is_confirm) {
                this.online_conf_button = "pass";
                this.conf_mod_content = "是否通过该订单";
            } else {
                this.conf_mod_content = "是否拒绝该订单";
                this.online_conf_button = "refuse";
            }
        },
        showDetail(row) {
            this.is_show_online_detail = true;
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
                // let onlineCanvas = document.getElementById("onlineCanvas");
                let onlineCanvas = this.$refs.onlineCanvas
                let context = onlineCanvas.getContext("2d");
                let ratio = getPixelRatio(context);

                onlineCanvas.style.width = onlineCanvas.width + "px";
                onlineCanvas.style.height = onlineCanvas.height + "px";

                onlineCanvas.width = onlineCanvas.width * ratio;
                onlineCanvas.height = onlineCanvas.height * ratio;

                // 放大倍数
                context.scale(ratio, ratio);

                context.font = "16px Arial";
                //背景色
                context.fillStyle = "#fff";
                context.fillRect(0, 0, 520, 270);
                // 绘制 字体内容
                context.fillStyle = "#444";
                let ml = 50; // 左边框
                let w = 280; // 左边文字所占宽度, 右边col起始位置
                let mt = 40; //上下行间距
                // row1

                context.fillText("会员账号", ml, mt);
                // context.font = "16px Arial";
                // context.fillStyle = "#444";
                context.fillText("65464646", ml + 100, mt);

                context.fillText("会员ID", w, mt);
                context.fillText("65464646", w + 100, mt);

                // row2   -------------------
                // 会员等级 ----
                context.fillText("会员等级", ml, mt * 2);
                context.fillText("VIP7", ml + 100, mt * 2);
                //  row3
                context.fillText("转入银行", ml, mt * 3);
                let bank_name = "招商银行";
                context.fillText(bank_name, ml + 100, mt * 3);
                context.fillText("转入账号", w, mt * 3);
                let account = "234324";
                context.fillText(account, w + 100, mt * 3);
                // row4
                context.fillText("充值金额", ml, mt * 4);
                context.fillText("235353255", ml + 100, mt * 4);
                //  row5
                context.fillText("收款银行", ml, mt * 5);
                let receipt_bank = "招商银行";
                context.fillText(receipt_bank, ml + 100, mt * 5);
                context.fillText("收款账号", w, mt * 5);
                let receipt_account = "324324";
                context.fillText(receipt_account, w + 100, mt * 5);
                // row 6
                let deal_time = window.all.tool.formatDate(new Date());
                context.fillText("收款时间", ml, mt * 6);
                context.fillText(deal_time, ml + 100, mt * 6);
            });
        },
        confClick() {
            if (this.online_conf_button === "pass") {
                console.log("确认 通过.");
            } else {
                console.log("确认 拒绝!");
            }
        },
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
};
</script>

<style scoped>
.filter {
    position: relative;
}
.filter .left li {
    margin-top: 10px;
}
.right {
    position: absolute;
    bottom: 0;
    right: 50px;
}

.red {
    color: rgba(255, 51, 0, 0.979);
}
.purple {
    color: rgb(224, 16, 224);
}
.green {
    color: rgb(7, 219, 88);
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
</style>
