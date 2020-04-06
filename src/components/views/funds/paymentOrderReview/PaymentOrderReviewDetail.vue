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
                         <td>{{row.user && row.user.parent && row.user.parent.mobile}}</td>
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
                         <td :class="status_obj[row.status].color">{{status_obj[row.status].text}}</td>
                         <td>审核时间</td>
                         <td>{{row.review_at}}</td>
                         <td>审核人</td>
                         <td>{{row.reviewer && row.reviewer.name}}</td>
                     </tr>
                     <tr>
                         <td>操作人</td>
                         <td>{{row.admin_id}}</td>
                         <td>操作时间</td>
                         <td>{{row.operation_at}}</td>
                         <td>出款方式</td>
                         <td>{{withdraw_obj[row.account_type].text}}</td>
                     </tr>
                     <tr>
                         <td>收款姓名</td>
                         <td>{{row.account_snap && row.account_snap.owner_name }}</td>
                         <td>收款账号</td>
                         <td>{{row.account_snap && row.account_snap.card_number}}</td>
                         <td>开户行</td>
                         <td>{{row.account_snap && row.account_snap.branch}}</td>
                     </tr>
                     <tr>
                         <td>备注</td>
                         <td colspan="5">
                             <input type="text" class="remarkText" v-model="table.remark" >{{row.remark}}
                         </td>
                     </tr>
                 </table>
                 <div class="all-btn" v-if="row.status==1" >
                     <button class="btn-plain-large mr50" @click="reject" >拒绝</button>
                     <button class="btn-blue-large" @click="pass" >通过</button>
                 </div>
             </div>
         </div>
    </div>
</template>
<script>
export default {
    props:{
        row: Object,
        dia_show:Boolean,
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
                '-2': {
                    color: 'red',
                    button: 'btns-red',
                    text: '已拒绝'
                },
                '2': {
                    color: 'green',
                    button: 'btns-green',
                    text: '已通过'
                },
                '1': {
                    color: 'purple',
                    button: 'btns-yellow',
                    text: '审核中'
                }
            },
            withdraw_obj:{
                '1':{text:'银行'},
                '2':{text:'支付宝'},
                '3':{text:'微信'}
            },
            table:{
                remark:'',
            }
        }
    },
    methods: {
        reject(){
            let datas={
                id:this.row.id,
                remark:String(this.table.remark),
            }
            console.log('订单审核请求数据',data)
            let data=window.all.tool.rmEmpty(datas)
            let{method,url}=this.$api.founds_paymentorder_examination_rejected;
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.dia_show=false
                    this.$emit("getList")
                }
            })
        },
        pass(){
            let datas={
                id:this.row.id,
                remark:String(this.table.remark),
            } 
            let data=window.all.tool.rmEmpty(datas)
            let {method,url}=this.$api.founds_paymentorder_examination_passed;
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.dia_show=false
                    this.$emit("getList")
                }
            })
        }
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
.remarkText{
    width: 100%;
    height: 100%;
    border: none;
    float: left;
}
</style>