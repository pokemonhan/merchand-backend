<template>
    <div class="container">
        <h3>出款列表</h3>
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" style="width:100px" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input limit="en-num" class="w100" v-model="filter.id" />
                </li>
                <li>
                    <span>申请时间</span>
                    <Date :value="filter.date" />
                </li>
                <li>
                    <span>订单号</span>
                    <Input limit="en-num" class="w100" v-model="filter.orderid" />
                </li>
                <li>
                    <span>出款类型</span>
                    <Select style="width:100px" v-model="filter.type" :options="type_opt"></Select>
                </li>
            </ul>
            <div class="right">
                <button class="btn-blue">查询</button>
                <button class="btn-blue">导出excel</button>
            </div>
        </div>
        <div style="margin-top:30px;"></div>
        <div v-for="(row, index) in list" :key="index">
            <table class="first-table">
                <tr>
                    <th @click="expand(index)">
                        <i
                            :class="['iconfont',is_show_sec_menu[index]?'iconjianshao':'icontianjia']"
                        ></i>
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
                    <td>{{row.a9}}</td>
                    <td>
                        <span class="a" @click="pass(row)">确认出款</span>
                        <span class="a" @click="refuse(row)">拒绝出款</span>
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
        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @updateNo="updateNo"
            @updateSize="updateSize"
        />
      <Modal :show="show_conf!==''" title="出款列表" :content="modal_conf_content" @cancel="show_conf=''" @confirm="paymentConfirm"></Modal>
    </div>
</template>

<script>
export default {
    props: {},
    data() {
        return {
            filter: {
                account: "",
                orderid: "",
                id: "",
                date: "",
                orderid: "",
                type: 1
            },
            type_opt: [
                { label: "全部", value: 0 },
                { label: "支付宝", value: 1 },
                { label: "银行卡", value: 2 }
            ],
            list: [
                { a1: "D20190920140", a2: "13245689654", a3: "5654654", a4: "100.00", a5: "10.0", a6: "1000", a7: "1000", a8: "2019/09/20 12:25:20", a9: "dfdsfdfdfsdf" },
                { a1: "D20190920140", a2: "13245689654", a3: "5654654", a4: "100.00", a5: "10.0", a6: "1000", a7: "1000", a8: "2019/09/20 12:25:20", a9: "dfdsfdfdfsdf" },
                { a1: "D20190920140", a2: "13245689654", a3: "5654654", a4: "100.00", a5: "10.0", a6: "1000", a7: "1000", a8: "2019/09/20 12:25:20", a9: "dfdsfdfdfsdf" }
            ],
            is_show_sec_menu: [],
            headers1: [
                { label: "订单号" },
                { label: "会员账号" },
                { label: "会员ID" },
                { label: "出款金额" },
                { label: "手续费" },
                { label: "出款方式" },
                { label: "出款账号" },
                { label: "审核时间" },
                { label: "审核人" },
                { label: "操作" }
            ],
            headers2: [
                { label: "账号余额" },
                { label: "上级账号" },
                { label: "收款姓名" },
                { label: "开户行" },
                { label: "今日出款次" },
                { label: "操作时间" },
                { label: "操作人" },
                { label: "备注" }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,

            show_conf: '',
            modal_conf_content: ''
        };
    },

    methods: {
        expand(i) {
            this.is_show_sec_menu.splice(i, 1, !this.is_show_sec_menu[i]);
            // $(this.$refs["table_" + i]).slideToggle(200);
        },
        updateNo(val) {},
        updateSize(val) {},
        paymentConfirm() {
            if (this.show_conf === "pass") {
                // console.log("pass");
            } else if (this.show_conf === "refuse") {
                // console.log("refuse");
            }
        },
        pass(row) {
            this.show_conf = "pass";
            this.modal_conf_content = '是否确认出款'
        },
        refuse(row) {
            this.show_conf = "refuse";
            this.modal_conf_content = '是否拒绝出款'
        },
          updateNo(val){
        },
        updateSize(val){
        },
    },

    mounted() {}
};
</script>

<style scoped>
/* .w100   width:100px 已经放入公共区 (App.vue) */
/* .filter  --和下面的ul li样式已经放入公共区  */
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
th {
    padding: 8px 6px;
    font-weight: 400;
    color: #4c8bfc;
    background: #e6f7ff;
}

table tr td {
    text-align: center;
    padding: 8px 4px;
    /* border: 1px solid rgb(238, 238, 238); */
    font-size: 13px;
}

table tr:hover {
    background: rgb(248, 248, 248);
}
/* .container .first-table th {
    padding: 8px 6px;
    font-weight: 400;
    color: #4c8bfc;
    background: #e6f7ff;
} */
.second-table {
    display: none;
    box-shadow: 0 -1px 7px -1px rgb(197, 222, 245) inset;
}

/* .container .second-table th {
    padding: 2px 6px;
    font-weight: 400;
    color: #6d93db;
    background: #eef7fc;
    
} */

.total-table table tr td {
    border: none;
}
/* .total-table table tr th{
    padding: 6px 8px;
    color: #6d93db;
    background: #eef7fc;
    font-weight: 400;
} */
</style>
