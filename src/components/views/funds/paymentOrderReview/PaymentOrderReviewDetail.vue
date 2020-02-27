<template>
    <div class="cont">
         <!-- <div> 出款订单审核 </div> -->
         <div>
             <div class="order">
                 <span >订单号: {{row.order_no}}</span>
             </div>
             <div>
                 <table class="table">
                     <tr>
                         <td>会员账号</td>
                         <td>{{row.user && row.user.mobile}}</td>
                         <td>会员ID</td>
                         <td>{{row.user && row.user.guid}}</td>
                         <td>是否是正式账号</td>
                         <td>
                             <i :class="icon_obj[row.user && row.user.is_tester]"></i>
                         </td>
                     </tr>
                     <tr>
                         <td>上级账号</td>
                         <td>{{row.parent && row.parent.mobile}}</td>
                         <td>出款金额</td>
                         <td>{{row.amount}}</td>
                         <td>稽核扣款</td>
                         <td>{{row.audit_fee}}</td>
                     </tr>
                     <tr>
                         <td>实际出款</td>
                         <td class="blue">{{row.amount_received}}</td>
                         <td>手续费</td>
                         <td>{{row.handing_fee}}</td>
                         <td>账户余额</td>
                         <td>{{row.before_balance}}</td>
                     </tr>
                     <tr>
                         <td>存款总额</td>
                         <td>{{row.month_total}}</td>
                         <td>今日存款次数</td>
                         <td>{{row.num_top_up}}</td>
                         <td>今日出款次数</td>
                         <td>{{row.num_withdrawal}}</td>
                     </tr>
                     <tr>
                         <td>状态</td>
                         <td :class="status_obj[0].color">{{status_obj[0].text}}</td>
                         <td>审核时间</td>
                         <td>{{row.created_at}}</td>
                         <td>审核人</td>
                         <td>{{row.review_at}}</td>
                     </tr>
                     <tr>
                         <td>审核人</td>
                         <td>{{row.reviewer_id}}</td>
                         <td>操作时间</td>
                         <td>{{row.created_at}}</td>
                         <td>出款方式</td>
                         <td>{{row.review_at}}</td>
                     </tr>
                     <tr>
                         <td>收款姓名</td>
                         <td>{{row.reviewer_id}}</td>
                         <td>收款账号</td>
                         <td>{{row.created_at}}</td>
                         <td>出款方式</td>
                         <td>{{row.review_at}}</td>
                     </tr>
                     <tr>
                         <td>备注</td>
                         <td colspan="5">{{row.remark}}</td>
                     </tr>
                 </table>
                 <div class="all-btn">
                     <button class="btn-plain-large mr50" @click="reject" >拒绝</button>
                     <button class="btn-blue-large">通过</button>
                 </div>
             </div>
         </div>
    </div>
</template>
<script>
export default {
    props:{
        row: Object,
    },
    data() {
        return {
            filter: {
                acc: ''
            },
            icon_obj: {
                '0': 'iconfont iconcha red',
                '1': 'iconfont icongou green'
            },
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
        }
    },
    methods: {
        reject(){
        },
    },
    mounted() {
    }
}
</script>

<style scoped>
.order {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
}
.table {
    margin-top: 20px;
    width: 800px;
    table-layout: fixed;
}

.table tr > td {
    /* padding: ; */
    height: 30px;
    text-align:center;
    border: 1px solid #4c8bfd;
}
.table tr:nth-child(2n) {
    background: rgb(245, 244, 244);
}
.all-btn {
    margin-top: 50px;
    text-align: center;
}
</style>