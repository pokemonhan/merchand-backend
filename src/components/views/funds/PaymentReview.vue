<template>
    <div class="container">
        <h2>出款审核</h2>
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input class="w100" limit="en-num" v-model="filter.user_account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input class="w100" limit="en-num" v-model="filter.userid" />
                </li>
                <li>
                    <span>申请时间</span>
                    <Date />
                </li>
                <li>
                    <span>订单号</span>
                    <Input class="w100" limit="en-num" v-model="filter.userid" />
                </li>
                <li>
                    <span>出款类型</span>
                    <Select
                        style="width:100px;"
                        v-model="filter.withdrawal_type"
                        :options="withdrawal_type_opt"
                    ></Select>
                </li>
            </ul>
            <div>
                <button class="btn-blue">查询</button>
                <button class="btn-blue">导出excel</button>
            </div>
        </div>
        <div style="margin-top:30px;"></div>
        <div v-for="(row, index) in list" :key="index">
            <table class="first-table">
                <tr>
                    <th @click="expand(index)">
                        <i :class="['iconfont',is_show[index]?'iconjianshao':'icontianjia']"></i>
                    </th>
                    <th v-for="(th, th_index) in headers1" :key="th_index">{{th.label}}</th>
                </tr>
                <tr>
                    <td></td>
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a7}}</td>
                    <td>{{row.a8}}</td>
                    <td>
                        <span class="a" @click="confShow(row,'pass')">通过</span>
                        <span class="a" @click="confShow(row, 'reject')">拒绝</span>
                        <span class="a" @click="seeAudit(row)">查看稽核</span>
                    </td>
                </tr>
            </table>

            <div class="second-table" :ref="'table_'+index">
                <table>
                    <tr>
                        <th v-for="(item, index) in headers2" :key="index">{{item.label}}</th>
                    </tr>
                    <tr>
                        <td>{{row.a1}}</td>
                        <td>{{row.a2}}</td>
                        <td>{{row.a3}}</td>
                        <td>{{row.a4}}</td>
                        <td>{{row.a5}}</td>
                        <td>{{row.a6}}</td>
                        <td>{{row.a7}}</td>
                    </tr>
                </table>
            </div>
            
        </div>
        
        <div class="total-table">
                <table>
                    <tr>
                        <th>合计:</th>
                        <th>{{'200'}}</th>
                        <th>出款统计</th>
                         <th>{{'200'}}</th>
                        <th>手续费统计:</th>
                        <th>{{'20'}}</th>
                    </tr>
                    <tr>
                        <th>总计:</th>
                        <th>{{'200'}}</th>
                        <th>出款统计</th>
                         <th>{{'200'}}</th>
                        <th>手续费统计:</th>
                        <th>{{'20'}}</th>
                    </tr>
                </table>
        </div>
         <Page class="table-page" :total="total" :pageNo.sync="pageNo" :pageSize.sync="pageSize" @updateNo="updateNo" @updateSize="updateSize"/>
        <Modal :show="show_conf!==''" :title="confirm.title" :content="confirm.content" @cancel="show_conf=''" @confirm="paymentConfirm"></Modal>
        <div v-if="show_detail" class="modal-mask">
            <div class="v-modal">
                <PaymentReviewDetail :userid="'userid__34234324'" @close="show_detail=false" />
            </div>
        </div>
    </div>
</template>

<script>
import PaymentReviewDetail from './PaymentReviewDetail.vue'
export default {
    components:{
            'PaymentReviewDetail': PaymentReviewDetail
        },
    data() {
        return {
          
            filter: {
                user_account: "",
                userid: "",
                withdrawal_type: ""
            },
            withdrawal_type_opt: [
                { label: "支付宝", value: 1 },
                { label: "银行卡", value: 2 }
            ],
            headers1: [
                { label: "订单号" },
                { label: "会员账号" },
                { label: "会员ID" },
                { label: "出款金额" },
                { label: "手续费" },
                { label: "需求打码" },
                { label: "当前打码" },
                { label: "申请时间" },
                { label: "操作" } // 9
            ],
            headers2: [
                { label: "账号余额" },
                { label: "上级账号" },
                { label: "存款总额" },
                { label: "存款次数" },
                { label: "今日出款次" },
                { label: "操作人" },
                { label: "备注" }
            ],
            is_show: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            list: [ { a1: "D20190920140", a2: "13245689654", a3: "5654654", a4: "100.00", a5: "10.0", a6: "1000", a7: "1000", a8: "2019/09/20 12:25:20" }, { a1: "D20190920140", a2: "13245689654", a3: "5654654", a4: "100.00", a5: "10.0", a6: "1000", a7: "1000", a8: "2019/09/20 12:25:20" } ],
            total:0,
            pageNo: 1,
            pageSize: 25,
            show_conf: '',
           
            confirm:{
                title:'出款审核',
                content:'',
            },
            show_detail: false,
        };
    },
    methods: {
        expand(i) {
            this.is_show.splice(i, 1, !this.is_show[i]);
            $(this.$refs["table_" + i]).slideToggle(200);
        },
        updateNo(val){
        },
        updateSize(val){
        },
        paymentConfirm() {
            if(this.show_conf==='pass'){
                
            }else if(this.show_conf==='refuse'){
                 this.conf_title = '出款审核'
                this.conf_content = '是否拒绝该订单'
            }
        },
        pass(row) {
            this.show_conf = 'pass'
            this.conf_title = '出款审核'
            this.conf_content = '是否通过该订单'
        },
        refuse(row) {
            this.show_conf = 'refuse'
        },
        confShow(row,status){

        },
        seeAudit(row) {
            this.show_detail = true
        }
    },
    mounted() {}
};
</script>

<style scoped>
.container {
    padding: 20px 8px 20px 8px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background: #fff;
}
table {
    border-collapse: collapse;
    width: 100%;
}

tbody tr:nth-child(2n) {
    background: rgb(250, 249, 249);
}
tr td {
    text-align: center;
    padding: 8px 4px;
    /* border: 1px solid rgb(238, 238, 238); */
    font-size: 13px;
}
tbody tr:hover {
    background: #eee;
}
.container .first-table th {
    padding: 8px 6px;
    /* border: 1px solid rgb(230, 229, 229); */
    font-weight: 400;
    color: #4c8bfc;
    background: #e6f7ff;
}
.second-table{
    display: none;
    box-shadow: 0 -1px 7px -1px rgb(197, 222, 245) inset;

}

.container .second-table th {
    padding: 2px 6px;
    /* border: 1px solid rgb(230, 229, 229); */
    font-weight: 400;
    color: #6d93db;
    background: #eef7fc;
    
}

.total-table table tr td{
    border: none;
}
.total-table table tr th{
    padding: 6px 8px;
    color: #6d93db;
    background: #eef7fc;
    font-weight: 400;
}

.v-modal{
    width: 1000px;
    max-height: 80vh;
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
/* .w100  width:100px 已经放入公共区 (App.vue) */
</style>