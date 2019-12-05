<template>
    <div class="container">
        <!---------------------------------- 出款订单 -------------------------->
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <div class="filter">
            <ul class="left filter-item">
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" style="width:100px" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input limit="en-num" class="w100" v-model="filter.acc_id" />
                </li>
                <li>
                    <span>审核时间</span>
                    <Date v-model="filter.rewiew_dates[0]" @update="timeUpdate()" />
                    <span style="margin: 0 5px;">~</span>
                    <Date v-model="filter.rewiew_dates[1]" @update="timeUpdate()" />
                </li>
                <li>
                    <span>审核人</span>
                    <Input class="w100" v-model="filter.auditor" />
                </li>
                <li>
                    <span>操作人</span>
                    <Input class="w100" v-model="filter.operator" />
                </li>
              
                <li>
                    <span>正式账号</span>
                    <Select style="width:100px;" v-model="filter.official_acc" :options="official_acc_opt"></Select>
                </li>
                <li>
                    <span>订单号</span>
                    <Input class="w100" v-model="filter.order_id" />
                </li>
              
                <li>
                    <span>操作时间</span>
                    <Date v-model="filter.operate_dates[0]" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.operate_dates[1]" @update="timeUpdate()" />
                </li>
                  <li>
                    <span>出款类型</span>
                    <Select v-model="filter.payment_type" :options="[{label:'测试账号',value:0},]"></Select>
                </li>
                <li>
                    <span>是否被稽核扣款</span>
                    <Select v-model="filter.is_audit_withhold" :options="is_audit_withhold_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">导出excel</button>
                    <button class="btn-red" @click="clearAll">清空</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <TwoTable :column="table_list" :headers="table_headers">
                <template v-slot:tdOne="{row}">
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a7}}</td>
                    <td>{{row.a8}}</td>
                    <td>{{row.a9}}</td>
                    <td>{{row.a9}}</td>
                    <td>
                        <span class="a" @click="pass(row)">确认出款</span>
                        <span class="a" @click="refuse(row)">拒绝出款</span>
                    </td>
                </template>
                <template v-slot:tdTwo="{row}">
                    <td>{{row.a7}}</td>
                    <td>
                        <span :class="color_obj[row.a7].color">{{color_obj[row.a7].text}}</span>
                    </td>
                    <td >
                        <i :class="icon_obj[row.a8]"></i>
                    </td>
                    <td>{{row.a8}}</td>
                    <td>{{row.a8}}</td>
                    <td>{{row.a8}}</td>
                    <td>{{row.a8}}</td>
                    <td>{{row.a9}}</td>
                    <td>{{row.a10}}</td>
                    <td>{{row.a11}}</td>
                    <td>{{row.a12}}</td>
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
        </div>

        <Modal :show="show_conf!==''" title="出款订单" :content="modal_conf_content" @cancel="show_conf=''" @close="show_conf=''" @confirm="paymentConfirm" ></Modal>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            quick_query: [],
            filter: {
                account: '',
                acc_id: '',
                rewiew_dates: [],
                auditor: '',
                operator: '',
                official_acc: '',
                order_id: '',
                operate_dates: [],
                payment_type: '',
                is_audit_withhold: '',
            },
            type_opt: [
                { label: '全部', value: 0 },
                { label: '支付宝', value: 1 },
                { label: '银行卡', value: 2 }
            ],
            color_obj:{
                '0':{
                    color:'red',
                    text: '已拒绝'
                },
                '1':{
                    color:'green',
                    text: '已通过'
                },
                '2':{
                    color:'purple',
                    text: '待审核'
                },
                
            },
            icon_obj:{
                '0':'iconfont iconcha red',                
                '1':'iconfont icongou green',                
            },
            total: 0,
            pageNo: 1,
            pageSize: 25,

            show_conf: '',
            modal_conf_content: '',
            is_audit_withhold_opt: [
                { label: '全部', value: '' },
                { label: '是', value: '1' },
                { label: '否', value: '0' }
            ],
            official_acc_opt: [
                { label: '全部', value: '' },
                { label: '是', value: '1' },
                { label: '否', value: '0' }
            ],
            // table
            table_headers: [
                ['订单号','会员账号', '会员ID', '出款金额', '稽核扣款', '实际出款', '手续费', '出款方式', '出款账号', '审核时间', '操作'], 
                ['审核人','出款状态','正式账号', '账号余额', '上级账号', '收款姓名', '开户行', '今日出款次','操作时间', '操作人', '备注']
            ],
            table_list: [
                { a1: 'aD201909201252', a2: '13245678942', a3: '4561234', a4: '13256689796', a5: '红牛商户', a6: '微信充值', a7: '1', a8: '1', a9: '0', a10: '2019/09/20 12:25:20', a11: '2019/09/20 12:25:20', a12: '2019/09/20 12:25:20' },
                { a1: 'aD201909201252', a2: '13245678942', a3: '4561234', a4: '13256689796', a5: '红牛商户', a6: '微信充值', a7: '0', a8: '0', a9: '1', a10: '2019/09/20 12:25:20', a11: '2019/09/20 12:25:20', a12: '2019/09/20 12:25:20' },
            ],
        }
    },

    methods: {
        qqUpd(dates) {
            //同步时间筛选值
            this.filter.rewiew_dates = dates
            this.filter = Object.assign(this.filter)
        },
        timeUpdate() {
            //同步快捷查询按钮状态
            this.quick_query = this.filter.rewiew_dates
        },
        clearAll() {
            this.filter = {
                account: '',
                acc_id: '',
                rewiew_dates: [],
                auditor: '',
                operator: '',
                official_acc: '',
                order_id: '',
                operate_dates: [],
                payment_type: '',
                is_audit_withhold: '',
            }
        },
        updateNo(val) {},
        updateSize(val) {},
        paymentConfirm() {
            if (this.show_conf === 'pass') {
                console.log('pass')
            } else if (this.show_conf === 'refuse') {
                console.log('refuse')
            }
        },
        pass(row) {
            this.show_conf = 'pass'
            this.modal_conf_content = '是否确认出款'
        },
        refuse(row) {
            this.show_conf = 'refuse'
            this.modal_conf_content = '是否拒绝出款'
        },
        updateNo(val) {},
        updateSize(val) {}
    },

    mounted() {}
}
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
</style>
