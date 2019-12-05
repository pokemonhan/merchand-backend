<template>
    <div class="container">
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <!-- <Date v-model="filter.dates[0]" @update="timeUpdate()" /> -->
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input class="w100" v-model="filter.account" />
                </li>
                <li>
                    <span>订单号</span>
                    <Input class="w100" v-model="filter.order_id" />
                </li>
                <li>
                    <span>申请时间</span>
                    <Date v-model="filter.apply_dates[0]" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.apply_dates[1]" @update="timeUpdate()" />
                </li>
                <li>
                    <span>出款类型</span>
                    <Select v-model="filter.payment_type" :options="payment_type_opt"></Select>
                </li>
                <li>
                    <span>正式账号</span>
                    <Select v-model="filter.offcial_acc" :options="official_opt"></Select>
                </li>
                <li>
                    <span style="width:4em;">会员ID</span>
                    <Input class="w100" v-model="filter.acc_id" />
                </li>
                <li>
                    <span>审核人</span>
                    <Input class="w100" v-model="filter.reviewer" />
                </li>

                <li>
                    <span>审核时间</span>
                    <Date v-model="filter.review_dates[0]" />
                    <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.review_dates[1]" />
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
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">导出</button>
                    <button class="btn-red" @click="clearfilter">清空</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <TwoTable :column="table_list" :headers="table_headers">
                <template v-slot:tdOne="{row,idx}">
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>
                        <i :class="['iconfont',icon_obj[row.a4]]"></i>
                    </td>
                    <td>{{row.a5}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a6}}</td>
                    <td>
                        <span
                            v-if="!show_audit_button[idx]"
                            class="a"
                            @click="audiotButtonShow(idx)"
                        >审核</span>
                        <span v-else>
                            <span class="a" @click="pass(row,idx)">通过</span>
                            <span class="a" @click="refuse(row,idx)">拒绝</span>
                        </span>
                        <span class="a" @click="detail_show=true">查看稽核</span>
                    </td>
                </template>
                <template v-slot:tdTwo="{row}">
                    <td>{{row.a7}}</td>
                    <td>{{row.a8}}</td>
                    <td>{{row.a9}}</td>
                    <td :class="status_color_obj[row.a9].color">{{status_color_obj[row.a9].text}}</td>
                    <td>{{row.a10}}</td>
                    <td>{{row.a11}}</td>
                    <td>{{row.a12}}</td>
                </template>
            </TwoTable>
            <div class="total-table">
                <ul>
                    <li>
                        <span>合计:</span>
                    </li>
                    <li>
                        <span>出款金额:</span>
                        <span>200.00</span>
                    </li>
                    <li>
                        <span>稽核扣款:</span>
                        <span>200.00</span>
                    </li>
                    <li>
                        <span>实际出款金额</span>
                        <span>200.00</span>
                    </li>
                    <li>
                        <span>手续费统计</span>
                        <span>200.00</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>总计:</span>
                    </li>
                    <li>
                        <span>出款金额:</span>
                        <span>200.00</span>
                    </li>
                    <li>
                        <span>稽核扣款:</span>
                        <span>200.00</span>
                    </li>
                    <li>
                        <span>实际出款金额</span>
                        <span>200.00</span>
                    </li>
                    <li>
                        <span>手续费统计</span>
                        <span>200.00</span>
                    </li>
                </ul>
            </div>
        </div>
        <Dialog :show.sync="detail_show" title="查看稽核">
            <div class="dia-inner">
                <PaymentReviewDetail :userid="userid"></PaymentReviewDetail>
            </div>
        </Dialog>
    </div>
</template>


<script>
import PaymentReviewDetail from './PaymentReviewDetail'
export default {
    components: {
        PaymentReviewDetail
    },
    data() {
        return {
            quick_query: [],
            filter: {
                account: '',        // 会员账号
                order_id: '',       // 订单号
                apply_dates: [],    // 申请时间
                payment_type: '',   // 出款类型
                offcial_acc: '',   // 正式账号
                acc_id: '',         // 会员ID
                reviewer: '',       // 审核人
                review_dates: [],   // 审核时间
                review_status: ''   // 审核状态
            },
            payment_type_opt: [
                { label: '全部', value: '' },
                { label: '支付宝', value: 1 },
                { label: '银行卡', value: 2 }
            ],
            official_opt: [
                { label: '全部', value: '' },
                { label: '是', value: '1' },
                { label: '否', value: '0' }
            ],
          
            review_status_opt: [
                { label: '全部', value: '' },
                { label: '通过', value: '1' },
                { label: '拒绝', value: '0' }
            ],
            audit_withhold_opt: [
                { label: '全部', value: '' },
                { label: '是', value: '1' },
                { label: '否', value: '0' }
            ],
            // table
            table_headers: [
                [
                    '订单号',
                    '会员号',
                    '会员ID',
                    '正式账号',
                    '出款金额',
                    '稽核扣款',
                    '实际出款',
                    '手续费',
                    '存款次数',
                    '操作'
                ],
                [
                    '今日出款次数',
                    '申请时间',
                    '状态',
                    '账号余额',
                    '上级账号',
                    '存款总额',
                    '操作时间',
                    '操作人',
                    '备注'
                ]
            ],
            table_list: [
                {
                    a1: 'aD201909201252',
                    a2: '13245678942',
                    a3: '4561234',
                    a4: '0',
                    a5: '红牛商户',
                    a6: '微信充值',
                    a7: '100',
                    a8: '99.9',
                    a9: '1',
                    a10: '2019/09/20 12:25:20',
                    a11: '2019/09/20 12:25:20',
                    a12: '2019/09/20 12:25:20'
                },
                {
                    a1: 'aD201909201252',
                    a2: '13245678942',
                    a3: '4561234',
                    a4: '1',
                    a5: '红牛商户',
                    a6: '微信充值',
                    a7: '100',
                    a8: '99.9',
                    a9: '2',
                    a10: '2019/09/20 12:25:20',
                    a11: '2019/09/20 12:25:20',
                    a12: '2019/09/20 12:25:20'
                }
            ],
            icon_obj: {
                '0': 'iconcha red',
                '1': 'icongou green'
            },
            status_color_obj: {
                '0': {
                    color: 'red',
                    text: '拒绝'
                },
                '1': {
                    color: 'green',
                    text: '通过'
                },
                '2': {
                    color: 'purple',
                    text: '审核中'
                }
            },
            show_audit_button: [],
            detail_show: false,
            userid: ''
        }
    },
    methods: {
        qqUpd(dates) {
            //同步时间筛选值
            this.filter.apply_dates = dates
            this.filter = Object.assign(this.filter)
        },
        timeUpdate() {
            //同步快捷查询按钮状态
            this.quick_query = this.filter.apply_dates
        },
        clearfilter() {
            this.filter = {
                account: '', // 会员账号
                order_id: '', // 订单号
                apply_dates: [], // 申请时间
                payment_type: '', // 出款类型
                offcial_acc: '', // 正式账号
                acc_id: '', // 会员ID
                reviewer: '', // 审核人
                review_dates: [], // 审核时间
                review_status: '' // 审核状态
            }
        },
        audiotButtonShow(index) {
            // this.show_audit_button.splice(index, 1, true)
            this.$set(this.show_audit_button, index, true)
        },
        pass(row, index) {
            this.$set(this.show_audit_button, index, false)
        },
        refuse(row, index) {
            this.$set(this.show_audit_button, index, false)
        }
    },
    mounted() {}
}
</script>

<style scoped>
/* .filer .left 有全局样式 见App.vue */
.filter {
    padding-left: 10px;
    padding-bottom: 10px;
}
.filter .left > li {
    margin-top: 10px;
}
.dia-inner {
    width: 900px;
    max-height: 80vh;
    overflow: auto;
}
</style>