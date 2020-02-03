<template>
    <div class="cont">
         <!-- <div> 出款订单审核 </div> -->
         <div>
             <div class="order">
                 <span >订单号: {{'D201909201401'}}</span>
             </div>
             <div>
                 <table class="table">
                     <tr>
                         <td>会员账号:</td>
                         <td>{{'13245689654'}}</td>
                         <td>会员ID</td>
                         <td>{{'5654654'}}</td>
                         <td>是否是正式账号</td>
                         <td>
                             <i :class="icon_obj[isOfficialAcc]"></i>
                         </td>
                     </tr>
                     <tr>
                         <td>上级账号:</td>
                         <td>{{'13245689654'}}</td>
                         <td>出款金额</td>
                         <td>{{'5654654'}}</td>
                         <td>稽核扣款</td>
                         <td>{{'50'}}</td>
                     </tr>
                     <tr>
                         <td>实际出款:</td>
                         <td class="blue">{{'689654'}}</td>
                         <td>手续费</td>
                         <td>{{'5654654'}}</td>
                         <td>扣款余额</td>
                         <td>{{'50'}}</td>
                     </tr>
                     <tr>
                         <td>存款总额:</td>
                         <td>{{'13245689654'}}</td>
                         <td>今日存款次数</td>
                         <td>{{'5654654'}}</td>
                         <td>今日出款次数</td>
                         <td>{{'50'}}</td>
                     </tr>
                     <tr>
                         <td>状态:</td>
                         <td :class="status_obj[status].color">{{status_obj[status].text}}</td>
                         <td>申请时间</td>
                         <td>{{'2019/02/24 23:00:00'}}</td>
                         <td>操作时间</td>
                         <td>{{'50'}}</td>
                     </tr>
                     <tr>
                         <td>操作人:</td>
                         <td colspan="5">{{'13245689654'}}</td>
                         
                     </tr>
                     <tr>
                         <td>备注</td>
                         <td colspan="5"></td>
                     </tr>
                 </table>
                 <div class="all-btn">
                     <button class="btn-plain-large mr50">拒绝</button>
                     <button class="btn-blue-large">通过</button>
                 </div>
             </div>
         </div>
    </div>
</template>
<script>
export default {
    props:{
        row: Object
    },
    data() {
        return {
            filter: {
                acc: ''
            },
            isOfficialAcc: '0',
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
            status:'1'
        }
    },
    methods: {},
    mounted() {}
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