<template>
    <div class="container">
        <!-- 入款审核 -->

        <QuickQuery :date="quick_query" @update="qqUpd" />
        <!-- <Date v-model="filter.dates[0]" @update="timeUpdate()" /> -->
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input v-model="filter.account" />
                </li>
                <li>
                    <span>订单号</span>
                    <Input v-model="filter.order_id" />
                </li>
                <li>
                    <span>申请时间</span>
                    <Date v-model="filter.apply_dates[0]" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.apply_dates[1]" @update="timeUpdate()" />
                </li>

                <li>
                    <span style="width:4em;">会员ID</span>
                    <Input v-model="filter.acc_id" />
                </li>
                <li>
                    <span>审核人</span>
                    <Input v-model="filter.operater" />
                </li>

                <li>
                    <span>审核时间</span>
                    <Date v-model="filter.operater_dates[0]" />
                    <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.operater_dates[1]" />
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
                    <button class="btn-blue" @click="getLsit" >查询</button>
                    <button class="btn-blue">导出</button>
                    <button class="btn-red" @click="clearfilter">清空</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.user && row.user.mobile}}</td>
                    <td>{{row.user && row.user.id}}</td>
                    <td>{{row.amount}}</td>
                    <td>{{row.audit_fee}}</td>
                    <td>{{row.amount_received}}</td>
                    <td>{{row.handing_fee}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.reviewer_id}}</td>
                    <td>{{row.review_at}}</td>
                    <td :class="status_obj[row.status].color">{{status_obj[row.status].text}}</td>
                    <td>
                        <button
                            :class="status_obj[row.status].button"
                            @click="statusShow(row)"
                        >{{status_obj[row.status].text}}</button>
                        <button class="btns-blue" @click="checkAudit">查看稽核</button>
                    </td>
                </template>
            </Table>

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
                <PaymentReviewStatus v-if="dia_status==='statusShow'" :row="curr_row" />
                <PaymentReviewDetail v-if="dia_status==='checkAudit'" :userid="userid" />
            </div>
        </Dialog>
    </div>
</template>


<script>
import PaymentReviewStatus from './paymentReviewCont/PaymentReviewStatus'
import PaymentReviewDetail from './paymentReviewCont/PaymentReviewDetail.vue'

export default {
    components: {
        PaymentReviewStatus,
        PaymentReviewDetail
    },
    data() {
        return {
            quick_query: [],
            filter: {
                account: '', // 会员账号
                order_id: '', // 订单号
                apply_dates: [], // 申请时间
                payment_type: '', // 出款类型
                offcial_acc: '', // 正式账号
                acc_id: '', // 会员ID
                operater: '', // 操作人
                operater_dates: [], // 操作时间
                review_status: '', // 审核状态
                is_audit_withhold: '' // 是否被稽核扣款
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
            status_obj: {
                '0': {
                    color: 'red',
                    button: 'btns-red',
                    text: '已拒绝'
                },
                '1': {
                    color: 'green',
                    button: 'btns-green',
                    text: '已通过'
                },
                '2': {
                    color: 'purple',
                    button: 'btns-yellow',
                    text: '审核中'
                }
            },
            // show_audit_button: [],
            headers: [
                '会员账号',
                '会员ID',
                '出款金额',
                '稽核扣款',
                '实际出款',
                '出款手续费',
                '申请时间',
                '审核人',
                '操作时间',
                '状态',
                '操作'
            ],
            list: [
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30',
                    status: '0'
                },
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30',
                    status: '1'
                },
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30',
                    status: '2'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            // dialog
            curr_row: {},
            dia_show: false,
            dia_status: '',
            userid: '',
            dia_title:''
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
                operater_dates: [], // 审核时间
                review_status: '' // 审核状态
            }
        },
        audiotButtonShow(index) {
            // this.show_audit_button.splice(index, 1, true)
            // this.$set(this.show_audit_button, index, true)
        },
        statusShow() {
            this.dia_status = 'statusShow'
            this.dia_show = true
            this.dia_title='出款订单审核'
        },
        checkAudit() {
            console.log('点击')
            this.dia_status = 'checkAudit'
            this.dia_show = true
            this.dia_title='查看稽核'
        },
        updateNo(val) {},
        updateSize(val) {},
        getLsit(){
           let para={
               mobile:this.filter.account,
               order_no:this.filter.order_no,
               created_at:[this.filter.apply_dates[0],this.filter.apply_dates[1]],
               guid:this.filter.acc_id,
               review:this.filter.operater,
               review_at:[this.filter.operater_dates[0],this.filter.operater_dates[1]],
               status:this.filter.review_status,
               is_audit:this.filter.is_audit_withhold,
           };
           let params=window.all.tool.rmEmpty(para);
           let {method,url}=this.$api.founds_interface_list;
           this.$http({method:method,url:url,params:params}).then(res=>{
            //    console.log(res)
                if(res && res.code=='200'){
                    this.list=res.data.data;
                    this.total=res.data.total;
                }
           }) 
        },
    },
    mounted() {
        this.getLsit();
    }
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