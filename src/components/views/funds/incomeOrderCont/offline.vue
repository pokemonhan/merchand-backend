<template>
    <!-- ------------------------------------    线下   --------------------------------------------------------->
    <div>
        <QuickQuery :date="quick_query" @update="quickDateUpdate($event)" />

        <div class="filter p10">
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
                <li class="mt10">
                    <span>正式状态</span>
                    <Select
                        style="width:110px"
                        v-model="filter.formal_status"
                        :options="formal_status_opt"
                    ></Select>
                </li>
                <li class="mt10">
                    <span>订单号</span>
                    <Input style="width:110px" limit="en-num" v-model="filter.order_id" />
                </li>
                <li class="mt10">
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">导出Excel</button>
                    <button class="btn-red" @click="clearClick">清空</button>
                </li>
            </ul>
            <!-- <div class="right mb10"></div> -->
        </div>
        <TwoTable :column="off_list" :headers="offline_table_headers">
            <template v-slot:tdOne="{row}">
                <td>{{row.a1}}</td>
                <td>{{row.a2}}</td>
                <td>{{row.a3}}</td>
                 <td>
                    <i v-if="row.a4==='1'" class="iconfont icongou green"></i>
                    <i v-if="row.a4==='0'" class="iconfont iconcha red"></i>
                </td>
                <td>{{row.a5}}</td>
                <td>{{row.a6}}</td>
                   <td>{{row.a7}}</td>
                <td>{{row.a8}}</td>
                <td>
                    <span class="a" @click="showDetail(row)">详情</span>
                    <span class="a" @click="offConfShow">通过</span>
                </td>
            </template>
            <template v-slot:tdTwo="{row}">
             
                <td :class="review_status_obj[row.a9].color">
                    {{review_status_obj[row.a9].text}}
                </td>
                <td>{{row.a10}}</td>
                <td>{{row.a11}}</td>
            </template>
        </TwoTable>

      <div class="total-table">
            <ul>
                <li >
                    <span> 合计: </span>
                </li>
                <li >
                    <span>充值金额:</span>
                    <span>200.00</span>
                </li>
                <li >
                    <span>实际到账</span>
                    <span>200.00</span>
                </li>
            </ul>
            <ul>
                <li >
                    <span> 总计: </span>
                </li>
                <li >
                    <span>充值金额:</span>
                    <span>200.00</span>
                </li>
                <li >
                    <span>实际到账</span>
                    <span>200.00</span>
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
        <!-- offline 线下入款详情 modal------------------------------- -->

        <Dialog :show.sync="offline_dia_show" title="线下详情">
            <div class="dialog">
                  <div class="mask-detail">
                    <canvas
                        ref="offlineCanvas"
                        width="520"
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
            title="入款审核"
            content="通过该入款订单"
            @cancel="offline_conf=false"
            @confirm="offlineIncomeConfirm"
        ></Modal>
    </div>
</template>


<script>
export default {
    name: 'Offline',
    data() {
        return {
            curr_list: 'offline',
            quick_query: ['2019-11-26', '2019-11-26'],
            filter: {
                account: '',
                id: '',
                start_date: '',
                end_date: '',
                review_status: 0,
                income_acc: '',
                formal_status: 0,
                order_id: ''
            },
            review_status_opt: [
                { label: '全部', value: 0 },
                { label: '审核中', value: 1 },
                { label: '通过', value: 2 },
                { label: '拒绝', value: 3 }
            ],
            formal_status_opt: [
                { label: '全部', value: 0 },
                { label: '是', value: 1 },
                { label: '否', value: 2 }
            ],
            pay_way_opt: [
                { label: '全部', value: 0 },
                { label: '审核中', value: 1 },
                { label: '通过', value: 2 },
                { label: '拒绝', value: 3 }
            ],
            review_status_obj:{
                '0':{text:'拒绝',color:'red'},
                '1':{text:'通过',color:'green'},
                '2':{text:'审核中',color:'purple'}
            },
            offline_table_headers: [
             ['订单号','会员账号','会员ID','正式账号','支付方式','入款账号','充值金额','实际到账','操作'],['审核状态','充值时间','操作人']
            ],
            off_list: [
                { a1: 'aD201909201252', a2: '13245678942', a3: '4561234', a4: '1', a5: '红牛商户', a6: '1', a7: '100', a8: '99.9', a9: '1', a10: '2019/09/20 12:25:20', a11: '1', a12: '1', a13: '2019/09/20 12:25:20', a14: '2019/09/20 12:25:20', },
                { a1: 'aD201909201252', a2: '13245678942', a3: '1', a4: '0', a5: '红牛商户', a6: '0', a7: '100', a8: '99.9', a9: '0', a10: '2019/09/20 12:25:20', a11: '2019/09/20 12:25:20', a12: '1' },
                { a1: 'aD201909201252', a2: '13245678942', a3: '1', a4: '0', a5: '红牛商户', a6: '0', a7: '100', a8: '99.9', a9: '2', a10: '2019/09/20 12:25:20', a11: '2019/09/20 12:25:20', a12: '1' }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            offline_dia_show: false,
            offline_conf: false
        }
    },
    methods: {
        quickDateUpdate(dates) {
            // 同步时间筛选值
            this.filter.start_date = dates[0]
            this.filter.end_date = dates[1]
            this.filter = Object.assign(this.filter)
        },
        timeUpdate() {
            // 同步快捷查询时间
            this.quick_query = [this.filter.start_date, this.filter.end_date]
        },
        clearClick() {
            this.filter = {
                account: '',
                id: '',
                start_date: '',
                end_date: '',
                review_status: 0,
                income_acc: '',
                formal_status: 0,
                order_id: ''
            }
        },
        showDetail(row) {
            this.offline_dia_show = true
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
                        1
                    return (window.devicePixelRatio || 1) / backingStore
                }
                //画文字
                let ele = this.$refs.offlineCanvas
                let context = ele.getContext('2d')
                let ratio = getPixelRatio(context)

                ele.style.width = ele.width + 'px'
                ele.style.height = ele.height + 'px'

                ele.width = ele.width * ratio
                ele.height = ele.height * ratio

                // 放大倍数
                context.scale(ratio, ratio)

                context.font = '16px Arial'
                //背景色
                context.fillStyle = '#fff'
                context.fillRect(0, 0, 520, 300)
                // 绘制 字体内容
                context.fillStyle = '#444'
                let ml = 50 // 左边框
                let w = 280 // 左边文字所占宽度, 右边col起始位置
                let mt = 40 //上下行间距
                // row1

                context.fillText('会员账号', ml, mt)
                // context.font = "16px Arial";
                // context.fillStyle = "#444";
                context.fillText('65464646', ml + 100, mt)

                context.fillText('会员ID', w, mt)
                context.fillText('65464646', w + 100, mt)

                // row2   -------------------
                // 会员等级 ----
                context.fillText('会员等级', ml, mt * 2)
                context.fillText('VIP7', ml + 100, mt * 2)
                //  row3
                context.fillText('转入银行', ml, mt * 3)
                let bank_name = '招商银行'
                context.fillText(bank_name, ml + 100, mt * 3)
                context.fillText('转入账号', w, mt * 3)
                let account = '234324'
                context.fillText(account, w + 100, mt * 3)
                // row4
                context.fillText('充值金额', ml, mt * 4)
                context.fillText('235353255', ml + 100, mt * 4)
                //  row5
                context.fillText('收款银行', ml, mt * 5)
                let receipt_bank = '招商银行'
                context.fillText(receipt_bank, ml + 100, mt * 5)
                context.fillText('收款账号', w, mt * 5)
                let receipt_account = '324324'
                context.fillText(receipt_account, w + 100, mt * 5)
                // row 6
                let deal_time = window.all.tool.formatDate(new Date())
                context.fillText('交易时间', ml, mt * 6)
                context.fillText(deal_time, ml + 100, mt * 6)
            })
        },
        offConfShow(row) {
            this.offline_conf = true
        },
        offlineSavePicture(ref) {
            this.exportCanvasAsPNG(ref, '线下入款')
        },
        offlineIncomeConfirm() {},
        updateNo(val) {},
        updateSize(val) {
            this.pageNo = 1
        },
        offlineGetList() {
            // this.$http
        },

        // canvas 转png 图片
        exportCanvasAsPNG(ref, fileName) {
            // let canvasElement = document.getElementById(id);
            let canvasElement = this.$refs[ref]

            let MIME_TYPE = 'image/png'

            let imgURL = canvasElement.toDataURL(MIME_TYPE)

            let aLink = document.createElement('a')
            // let fileName = "线上入款详情";
            aLink.download = fileName
            aLink.href = imgURL
            aLink.dataset.downloadurl = [
                MIME_TYPE,
                aLink.download,
                aLink.href
            ].join(':')

            document.body.appendChild(aLink)
            aLink.click()
            document.body.removeChild(aLink)
        }
    },
    mounted() {}
}
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
.mt10{
    margin-top: 10px;
}
/* .total-table ul {
    display: flex;
    height:40px;
    line-height: 40px;
    padding-left: 10px;
    font-weight: bold;
    color: #4c8bfd;
    background:rgba(229,247,255,1);
}
.total-table ul > li {
    margin-right: 100px;
} */
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
.dialog{
    width: 520px;
    text-align: center;
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