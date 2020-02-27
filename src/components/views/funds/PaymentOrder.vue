<template>
    <div class="container">
        <!---------------------------------- 出款订单 -------------------------->
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <div class="filter">
            <ul class="left filter-item">
                <li>
                    <span>订单号</span>
                    <Input v-model="filter.order_no" />
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
                    <Select
                        v-model="filter.payment_status"
                        :options="payment_status_opt"
                    ></Select>
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
                    <Date v-model="filter.review_dates[0]" @update="timeUpdate()" />
                    <span style="margin: 0 5px;">~</span>
                    <Date v-model="filter.review_dates[1]" @update="timeUpdate()" />
                </li>
                <li>
                    <button class="btn-blue" @click="getList" >查询</button>
                    <button class="btn-blue">导出excel</button>
                    <button class="btn-red" @click="clearAll">清空</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :column="list" :headers="headers">
                <template v-slot:item="{row}">
                    <td>{{row.order_no}}</td>
                    <td>{{row.user && row.user.mobile}}</td>
                    <td>{{row.user && row.user.guid}}</td>
                    <td>{{row.account_type}}</td>
                    <td>{{row.amount}}</td>
                    <td>{{row.audit_fee}}</td>
                    <td>{{row.amount_received}}</td>
                    <td>{{row.handing_fee}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.reviewer && row.reviewer.name}}</td>
                    <td>
                        <span :class="color_obj[row.status].color">{{color_obj[row.status].text}}</span>
                    </td>
                    <td>
                        <button 
                            :class="status_obj[row.status].button"
                            @click="statusShow(row)"
                        >{{status_obj[row.status].text}}</button>
                    </td>
                </template>
            </Table>
            <div class="total-table">
                <ul>
                    <li>
                        <span>合计:</span>
                    </li>
                    <li>
                        <span>充值金额:</span>
                        <span>200.00</span>
                    </li>
                    <li>
                        <span>实际到账</span>
                        <span>200.00</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <span>总计:</span>
                    </li>
                    <li>
                        <span>充值金额:</span>
                        <span>200.00</span>
                    </li>
                    <li>
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
        </div>
        <Dialog :show.sync="dia_show" :title="dia_title" >
            <div class="dia-inner" >
                <PaymentOrderReviewDetail  :row="curr_row"  />
            </div>
        </Dialog>
    </div>
</template>

<script>
import PaymentOrderReviewDetail from './paymentOrderReview/PaymentOrderReviewDetail'

export default {
    components:{
        PaymentOrderReviewDetail,
    },
    data() {
        return {
            quick_query: [],
            filter: {
                account: "",
                acc_id: "",
                review_dates: [],
                auditor: "",
                operator: "",
                payment_status: "",
                order_id: "",
                operate_dates: [],
                payment_type: "",
                is_audit_withhold: ""
            },
            type_opt: [
                { label: "全部", value: ""},
                { label: "银行卡", value: "1"},
                { label: "支付宝", value: "2" },
                { label: "微信", value: "3"}
            ],
            color_obj: {
                "0": {
                    color: "red",
                    text: "已拒绝"
                },
                "1": {
                    color: "green",
                    text: "已通过"
                },
                "2": {
                    color: "purple",
                    text: "待审核"
                }
            },
            total: 0,
            pageNo: 1,
            pageSize: 25,
            dia_show:true,
            dia_title:'出款订单审核',
            curr_row:{},

            modal_conf_content: "",
            is_audit_withhold_opt: [
                { label: "全部", value: "" },
                { label: "是", value: "1" },
                { label: "否", value: "0" }
            ],
            payment_status_opt: [
                { label: "全部", value: "" },
                { label: "待出款", value: "0" },
                { label: "已出款", value: "1"},
                { label: "已拒绝", value: "2" },
            ],
            status_obj: {
                '0': {
                    color: 'red',
                    button: 'btns-red',
                    text: '已拒绝'
                },
                '2': {
                    color: 'green',
                    button: 'btns-green',
                    text: '已出款'
                },
                '1': {
                    color: 'purple',
                    button: 'btns-yellow',
                    text: '待审核'
                }
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
        };
    },

    methods: {
        qqUpd(dates) {
            //同步时间筛选值
            this.filter.review_dates = dates;
            this.filter = Object.assign(this.filter);
        },
        timeUpdate() {
            //同步快捷查询按钮状态
            this.quick_query = this.filter.review_dates;
        },
        clearAll() {
            this.filter = {
                account: "",
                acc_id: "",
                review_dates: [],
                auditor: "",
                operator: "",
                payment_status: "",
                order_id: "",
                operate_dates: [],
                payment_type: "",
                is_audit_withhold: ""
            };
        },
        updateNo(val) {},
        updateSize(val) {},
        updateNo(val) {},
        updateSize(val) {},
        statusShow(){
            this.dia_show=true
            this.dia_title='出款订单审核'
        },
        getList(){
            let para={
                order_no:this.filter.order_no,
                mobile:this.filter.account,
                guid:this.filter.acc_id,
                amount_type:this.filter.payment_type,
                status:this.filter.payment_status,
                is_audit:this.filter.is_audit_withhold,
                admin:this.filter.auditor,
                operation_at:[this.filter.review_dates[0],this.filter.review_dates[1]],
            }
            let params=window.all.tool.rmEmpty(para);
            let {method,url}=this.$api.founds_paymentorder_list;
            this.$http({method:method,url:url,params:params}).then(res=>{
                // console.log('返回数据',res)
                if(res && res.code=='200'){
                    this.list=res.data.data;
                    this.total=res.data.total;
                }
            })
        },
    },

    mounted() {
        this.getList();
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
</style>
