<template>
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
                    <Input limit="en-num" v-model="filter.acc_id" />
                </li>
                <li>
                    <span>时间范围</span>
                    <Date v-model="filter.start_date" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.end_date" @update="timeUpdate()" />
                </li>
                <li>
                    <span>商户号</span>
                    <Input limit="number" v-model="filter.vendor_num" />
                </li>
                <li>
                    <span>支付状态</span>
                    <Select v-model="filter.pay_status" :options="pay_status_opt"></Select>
                </li>

                <li>
                    <span>支付方式</span>
                    <Select v-model="filter.pay_way" :options="pay_way_opt"></Select>
                </li>
                <li>
                    <span>正式账号</span>
                    <Select v-model="filter.official_acc" :options="official_opt"></Select>
                </li>
                <li>
                    <span>系统订单号</span>
                    <Input limit="en-num" v-model="filter.system_id" />
                </li>
                <li>
                    <span>商户订单号</span>
                    <Input limit="en-num" v-model="filter.vendor_order_id" />
                </li>
                <li>
                    <span>商户编号</span>
                    <Input limit="en-num" v-model="filter.vendor_num_id" />
                </li>
                <li class="mb10">
                    <span>商户</span>
                    <Input limit="number" v-model="filter.vendor" />
                </li>
                <li style="margin-left:-10px"></li>
                <li class="mb10">
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="exportExcel()">导出Excel</button>
                    <button class="btn-red" @click="clearClick">清空</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :column="list" :headers="headers">
                <template v-slot:item="{row}">
                    <td>{{row.order_no}}</td>
                    <td>{{row.platform_no}}</td>
                    <td>{{row.user && row.user.mobile}}</td>
                    <td>{{row.user && row.user.id}}</td>
                    <td>{{row.parent && row.parent.mobile}}</td>
                    <td>
                        <i
                            v-if="row.user && row.user.is_tester==='1'"
                            class="iconfont icongou green"
                        ></i>
                        <i v-if="row.user && row.user.is_tester==='0'" class="iconfont iconcha red"></i>
                    </td>
                    <td>{{row.snap_merchant_no}}</td>
                    <td>{{row.snap_merchant_code}}</td>
                    <td>{{row.snap_merchant}}</td>
                    <td>{{row.snap_finance_type}}</td>
                    <td>{{row.money}}</td>
                    <td>{{row.arrive_money}}</td>
                    <td :class="[row.status==='1'?'green': 'red']">{{row.status==='1'?'已支付':'未支付'}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>
                        <span class="a" @click="showDetail(row)">详情</span>
                        <span class="a" @click="manualDepositclick(row)">手动入款</span>
                    </td>
                </template>
            </Table>
        </div>
        <div class="total-table">
            <ul>
                <li>
                    <span>合计:</span>
                    <span>{{''}}</span>
                </li>
                <li>
                    <span>充值金额:</span>
                    <span>{{''}}</span>
                </li>
                <li>
                    <span>实际到账:</span>
                    <span>{{''}}</span>
                </li>
            </ul>
            <ul>
                <li>
                    <span>总计:</span>
                    <span>{{''}}</span>
                </li>
                <li>
                    <span>实际到账:</span>
                    <span>{{''}}</span>
                </li>
                <li>
                    <span>实际到账:</span>
                    <span>{{''}}</span>
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
        <!-- ------------------------手动入款 ------------------------>
        <Dialog :show.sync="dialog_show" title="手动入款">
            <div class="manu-dialog">
                <span class="dia-head">是否确定手动到账？</span>
                <div class="dia-content">
                    <span>备注:</span>
                    <textarea class="textarea ml10" cols="30" rows="10"></textarea>
                </div>
                <div>
                    <button class="btn-plain" @click="dialog_show=false">取消</button>
                    <button class="btn-blue btn-conf" @click="manualDepositCfm">确认</button>
                </div>
            </div>
        </Dialog>
        <!-- --------------------详情 -------------------------------->
        <div class="modal-mask" v-if="is_show_online_detail">
            <div class="v-modal">
                <div class="mod-head">
                    <span>线上入款详情</span>
                    <i class="iconfont iconcuowuguanbi-" @click="is_show_online_detail=false"></i>
                </div>
                <div class="mod-body" style="margin-top:10px;">
                    <div class="mask-detail">
                        <canvas
                            style="border:1px solid white"
                            ref="onlineCanvas"
                            width="520"
                            height="320"
                        ></canvas>
                    </div>
                    <div class="save-btn">
                        <!-- <a href="/i/w3school_logo_white.gif" download="w3logo"> -->
                        <button class="btn-blue-large" @click="savePicture('onlineCanvas')">保存图片</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: "Online",

    data() {
        return {
            quick_query: [],

            filter: {
                account: "", // 会员账号
                acc_id: "", // 会员id
                start_date: "", // 时间范围 开始
                end_date: "", // 时间范围 结束
                vendor_num: "", // 商户号
                pay_status: "", // 支付状态
                pay_way: "", // 支付方式
                official_acc: "", // 正式账号
                system_id: "", // 系统订单号
                vendor_order_id: "", // 商户订单号
                vendor_num_id: "", // 商户编号
                vendor: "" //商户
            },
            pay_status_opt: [
                { label: "全部", value: "" },
                { label: "已支付", value: "1" },
                { label: "未支付", value: "2" }
            ],
            pay_way_opt: [],
            official_opt: [
                { label: "全部", value: "" },
                { label: "是", value: "1" },
                { label: "否", value: "2" }
            ],
            headers: [
                "系统订单",
                "商户订单",
                "会员账号",
                "会员ID",
                "上级代理",
                "正式账号",
                "商户编号",
                "商户号",
                "商户",
                "支付方式",
                "充值金额",
                "实际到账",
                "支付状态",
                "充值时间",
                "到账时间",
                "操作"
            ],
            list: [],
            color: {
                "1": "green",
                "2": "purple",
                "0": "red"
            },
            total: 0,
            pageNo: 1,
            pageSize: 25,

            conf_mod_content: "",
            dialog_show: false,
            is_show_online_detail: false
        };
    },
    methods: {
        quickDateUpdate(dates, name) {
            // 同步时间筛选值
            this.filter.start_date = dates[0];
            this.filter.end_date = dates[1];
            this.filter = Object.assign(this.filter);
        },
        exportExcel() {
            import("../../../../js/config/Export2Excel").then(excel => {
                const tHeaders = this.headers;
                const data = this.list.map(item => {
                    return [
                        item.order_no,
                        item,
                        platform_no,
                        item.user.mobile,
                        item.user.id,
                        item.parent.mobile,
                        item.user.is_tester,
                        item.snap_merchant_no,
                        item.snap_merchant_code,
                        item.snap_merchant,
                        item.snap_finance_type,
                        item.money,
                        item.arrive_money,
                        item.status,
                        item.created_at,
                        item.updated_at
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeaders,
                    data,
                    filename: excel,
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        },
        clearClick() {
            this.filter = {
                account: "", // 会员账号
                acc_id: "", // 会员id
                start_date: "", // 时间范围 开始
                end_date: "", // 时间范围 结束
                vendor_num: "", // 商户号
                pay_status: "", // 支付状态
                pay_way: "", // 支付方式
                official_acc: "", // 正式账号
                system_id: "", // 系统订单号
                vendor_order_id: "", // 商户订单号
                vendor_num_id: "", // 商户编号
                vendor: "" //商户
            };
        },
        timeUpdate() {
            // 同步快捷查询时间
            this.quick_query = [this.filter.start_date, this.filter.end_date];
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
        savePicture(ref) {
            this.exportCanvasAsPNG(ref, "线上入款");
        },
        manualDepositclick(row, is_confirm) {
            this.dialog_show = true;
        },
        manualDepositCfm() {},
        showDetail(row) {
            this.is_show_online_detail = true;
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

                let ele = this.$refs.onlineCanvas;
                let context = ele.getContext("2d");
                let ratio = getPixelRatio(context);

                ele.style.width = ele.width + "px";
                ele.style.height = ele.height + "px";

                ele.width = ele.width * ratio;
                ele.height = ele.height * ratio;

                // // 放大倍数
                context.scale(ratio, ratio);
                //   画文字
                context.font = "16px Arial";
                //背景色
                context.fillStyle = "#fff";
                context.fillRect(0, 0, 520, 520);
                // context.fillRect(0, 0, 320, 220)
                // 绘制 字体内容
                context.fillStyle = "#444";
                let ml = 50; // 左边框_距离 当做.marginlet
                let w = 250; // 左边文字所占宽度, (即右边col起始位置)
                let mt = 50; //上下行间距 margintop
                // 80  标题和内容的间隔
                // row1

                context.fillText("会员账号:", ml, mt);
                context.fillText("65464646", ml + 80, mt);
                context.fillText("会员ID:", w, mt);
                context.fillText("65464646", w + 80, mt);

                // row2   -------------------
                context.fillText("会员等级:", ml, mt * 2);
                context.fillText("VIP7", ml + 80, mt * 2);
                //  row3
                context.fillText("商户编号:", ml, mt * 3);
                context.fillText("红牛平台", ml + 80, mt * 3);
                context.fillText("支付方式:", w, mt * 3);
                let pay_method = "微信支付";
                context.fillText(pay_method, w + 80, mt * 3);

                // row4
                context.fillText("订单号:", ml, mt * 4);
                context.fillText("235353255", ml + 80, mt * 4);
                //  row5
                context.fillText("充值金额:", ml, mt * 5);
                context.fillText("6464", ml + 80, mt * 5);
                context.fillText("实际到账:", w, mt * 5);
                context.fillText("6464", w + 80, mt * 5);
                // row 6
                context.fillText("交易时间:", ml, mt * 6);
                context.fillText(
                    window.all.tool.formatDate(new Date(), true),
                    ml + 80,
                    mt * 6
                );
            });
        },
        getPayMethodSel() {
            let params = {
                is_online: 1
            };
            // console.log("请求数据", param);

            let { url, method } = this.$api.founds_incomeorder_pay_method;
            this.$http({ method, url, params }).then(res => {
                // console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.pay_way_opt = this.backToSelOpt(res.data);
                }
            });
        },
        backToSelOpt(list = []) {
            let all = [
                {
                    label: "全部",
                    value: ""
                }
            ];
            let back_list = list.map(item => {
                return { label: item.name, value: item.id };
            });
            return all.concat(back_list);
        },
        getList() {
            let created_at = "";
            if (this.filter.start_date && this.filter.end_date) {
                created_at = JSON.stringify([
                    this.filter.start_date,
                    this.filter.end_date
                ]);
            }
            let para = {
                is_online: "1",
                mobile: this.filter.account,
                guid: this.filter.acc_id,
                created_at: created_at,
                snap_merchant_code: this.filter.vendor_num,
                status: this.filter.pay_status,
                finance_type_id: this.filter.pay_way,
                is_tester: this.filter.official_acc,
                order_no: this.filter.system_id,
                platform_no: this.filter.vendor_order_id,
                snap_merchant_no: this.filter.vendor_num_id,
                snap_merchant: this.filter.vendor,
                page:this.pageNo,
                pageSize:this.pageSize,
            };
            console.log("para: ", para);
            let params = window.all.tool.rmEmpty(para);
            let { method, url } = this.$api.founds_incomeorder_list;
            this.$http({ method: method, url: url, params: params }).then(
                res => {
                    // console.log("列表返回数据",res)
                    if (res && res.code == "200") {
                        this.list = res.data.data;
                        this.total = res.data.total;
                    }
                }
            );
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo=1;
            this.getList();
        }
    },
    mounted() {
        this.getPayMethodSel();
        this.getList();
    }
};
</script>

<style scoped>
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
/* .mb10 {
    margin-bottom: 10px;
} */
.red {
    color: rgba(255, 51, 0, 0.979);
}
.purple {
    color: rgb(224, 16, 224);
}
.green {
    color: rgb(7, 219, 88);
}
/* ------------------   手动入款   ---------------*/
.manu-dialog {
    width: 480px;
    /* min-height: 270px; */
    text-align: center;
}
.manu-dialog .dia-head {
    font-size: 17px;
    color: red;
}
.manu-dialog .dia-content {
    display: flex;
    justify-content: center;
    align-items: baseline;
    margin-top: 20px;
}
.btn-conf {
    margin-top: 30px;
    margin-left: 100px;
}

/* ---------------------- 详情 ---------------*/
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
    width: 2000px;
}
.total-table table tr th {
    padding: 6px 8px;
    color: #6d93db;
    background: #eef7fc;
    font-weight: 400;
}
/*  .v-modal 公共区 App.vue */
.mod-body {
    padding: 0 100px 50px 100px;
}
.save-btn {
    text-align: center;
    margin-top: 20px;
}

.textarea {
    border: 1px solid #666;
    border-radius: 5px;
    padding: 8px;
    resize: none;
}
.ml10 {
    margin-left: 10px;
}
</style>
