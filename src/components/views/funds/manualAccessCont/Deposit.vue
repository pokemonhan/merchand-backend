<template>
    <div class="deposit">
        <!-- ----------------------   人工存款  -------------------------------->
        <QuickQuery :date="quick_query" @update="qqUpd" />

        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input limit="en-num" v-model="filter.account_id" />
                </li>
                <li>
                    <span>充值时间</span>
                    <Date type="datetimerange" style="width:300px;" v-model="filter.dates" @update="timeUpdate()" />
                </li>
                <li>
                    <span>正式账号</span>
                    <Select v-model="filter.official_account" :options="official_opt"></Select>
                </li>
                <li>
                    <span>充值类型</span>
                    <Select v-model="filter.charge_type" :options="charge_type_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getList">查询</button>
                    <button class="btn-blue" @click="exportExcel()">导出Excel</button>
                    <button class="btn-red" @click="clearAll">清空</button>
                    <button class="btn-blue" @click="add">人工充值</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <!-- '订单号','会员账号','会员ID','充值类型','正式账号','充值金额','账户余额','充值时间','操作人','备注' -->
                <template v-slot:item="{row}">
                    <td>{{row.order_no}}</td>
                    <td>{{row.user && row.user.mobile}}</td>
                    <td>{{row.user && row.user.guid}}</td>
                    <td>{{row.type}}</td>
                    <td>
                        <i :class="icon_obj[row.user && row.user.is_tester]"></i>
                    </td>
                    <td>{{row.money}}</td>
                    <td>{{row.balance}}</td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.admin && row.admin.name}}</td>
                    <td>{{row.remark}}</td>
                </template>
            </Table>
            <Page
                class="table-page"
                :total="total"
                :pageNo.sync="pageNo"
                :pageSize.sync="pageSize"
                @updateNo="updateNo"
                @updateSize="updateSize"
            />
        </div>
        <Dialog :show.sync="dia_show" title="人工充值">
            <div class="dia-inner">
                <ul class="form">
                    <li>
                        <span>会员账号/ID</span>
                        <Input class="w250" v-model="form.account" />
                    </li>
                    <li>
                        <span>存款类型</span>
                        <Select
                            style="width:250px;"
                            v-model="form.deposit_type"
                            :options="deposit_type_opt"
                        ></Select>
                    </li>
                    <li>
                        <span>存款金额</span>
                        <Input class="w250" v-model="form.deposit_amount" />
                    </li>
                    <li>
                        <span>备注</span>
                        <textarea
                            style="width:250px;height:100px;"
                            name="textarea"
                            class="textarea"
                            v-model="form.remark"
                        ></textarea>
                    </li>
                </ul>
                <div class="dia-buttons">
                    <button class="btn-plain-large" @click="dia_show=false">取消</button>
                    <button class="btn-blue-large ml50" @click="addCfm" >确定</button>
                </div>
            </div>
        </Dialog>
    </div>
</template>


<script>
export default {
    props: {},
    data() {
        return {
            quick_query: [],
            filter: {
                account: "",
                account_id: "",
                dates: [],
                official_account: "",
                charge_type: ""
            },
            official_opt: [
                { label: "全部", value: "" },
                { label: "是", value: "1" },
                { label: "否", value: "0" }
            ],
            charge_type_opt: [
                { label: "全部", value: "" },
                { label: "优惠赠送", value: "1" },
                { label: "洗码增送", value: "2" }
            ],
            icon_obj: {
                "1": "iconfont icongou green",
                "0": "iconfont iconyuanquan red"
            },
            headers: [
                "订单号",
                "会员账号",
                "会员ID",
                "充值类型",
                "正式账号",
                "充值金额",
                "账户余额",
                "充值时间",
                "操作人",
                "备注"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            // 人工充值 添加-dialog
            dia_show: false,
            form: {
                account:'',
                deposit_type:'',
                deposit_amount:'',
                remark:'',
            },
            deposit_type_opt: [
                // 目前就一个
                { label: "优惠存款", value: "1"}
            ]
        };
    },
    methods: {
        qqUpd(dates) {
            //同步时间筛选值
             let arr=[dates[0]+' 00:00:00',dates[1]+' 00:00:00']
            this.$set(this.filter, "dates", arr);
        },
        clearAll() {
            this.filter = {
                account: "",
                account_id: "",
                dates: [],
                official_account: "",
                charge_type: ""
            };
        },
        clearForm(){
            this.form={
                account:'',
                deposit_type:'',
                deposit_amount:'',
                remark:'',
            }
        },
        timeUpdate() {
            //同步快捷查询时间
            this.quick_query = this.filter.dates;
        },
        getList() {
            let created_at = ''
            if (this.filter.dates[0] && this.filter.dates[1]) {
                created_at = JSON.stringify([this.filter.dates[0],this.filter.dates[1]])
            }
            let datas = {
                mobile: this.filter.account,
                guid: this.filter.account_id,
                created_at: created_at,
                is_tester: this.filter.official_account,
                type: this.filter.charge_type,
                page:this.pageNo,
                pageSize:this.pageSize
            };
            // console.log('请求数据',para);
            let data = window.all.tool.rmEmpty(datas);
            let {
                method,
                url
            } = this.$api.founds_manualaccess_artificial_recharge_recording;
            this.$http({ method: method, url: url, data:data }).then(
                res => {
                    console.log("返回数据：", res);
                    if (res && res.code == "200") {
                        this.list = res.data.data;
                        this.total = res.data.total;
                    }
                }
            );
        },
        exportExcel() {
            import("../../../../js/config/Export2Excel").then(excel => {
                const tHeaders = this.headers;
                const data = this.list.map(item => {
                    return [
                        item.order_no,
                        item.user.mobile,
                        item.user.guid,
                        item.type,
                        item.user.is_tester,
                        item.money,
                        item.balance,
                        item.created_at,
                        item.admin.name,
                        item.remark,
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeaders,
                    data,
                    filename: excel,
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        },
        add(){
            this.dia_show=true;
            this.clearForm();
        },
        addCfm(){
            let data={
               user:this.form.account,
               type:this.form.deposit_type,
               money:this.form.deposit_amount,
               remark:this.form.remark,
            }
            console.log(data)
            let {url,method}=this.$api.founds_manualaccess_artificial_recharge;
            this.$http({method,url,data}).then(res=>{
                console.log('返回数据',res)
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message);
                    this.dia_show=false;
                    this.getList();
                }
            })
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo=1;
            this.getList();
        }
    },
    mounted() {
        this.getList();
    }
};
</script>




<style scoped>
/* .filter 部分样式为全局 App.vue中 */
.filter {
    /* margin-top: 10px; */
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
.left li {
    margin-top: 10px;
}

.dia-inner {
    width: 700px;
    height: 350px;
}
.dia-inner .form {
    width: 360px;
    margin: 0 auto;
}
.dia-inner .form li {
    display: flex;
    margin-top: 20px;
}
.form li > span:first-child {
    min-width: 80px;
    text-align: right;
    margin-right: 10px;
}
/* .w250{
    width: 250px;
} */
.dia-buttons {
    margin-top: 50px;
    text-align: center;
}
.ml50 {
    margin-left: 50px;
}
</style>
