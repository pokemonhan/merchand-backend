<template>
    <div class="withhold">
        <QuickQuery :date="quick_query" @update="qqUpd" />

        <div class="filter">
            <ul class="left withhold-filter">
                <li>
                    <span>会员账号</span>
                    <Input style="width:100px;" limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>游戏ID</span>
                    <Input style="width:100px;" limit="en-num" v-model="filter.game_id" />
                </li>
                <li>
                    <span>扣款时间</span>
                    <Date type="datetimerange" style="width:300px;" v-model="filter.dates" @update="timeUpdate()" />
                </li>
                <li>
                    <span>正式账号</span>
                    <Select v-model="filter.offcial_acc" :options="official_opt"></Select>
                </li>
                <li>
                    <span>扣款类型</span>
                    <Select v-model="filter.withhold_type" :options="withhold_opt"></Select>
                </li>
                <li class="right">
                    <button class="btn-blue" @click="getList" >查询</button>
                    <button class="btn-blue" @click="exportExccel()" >导出Excel</button>
                    <button class="btn-red" @click="clearFilter">清空</button>
                    <button class="btn-blue" @click="without">人工扣款</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
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
                @updateNo="withholdUpdateNo"
                @updateSize="withholdUpdateSize"
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
                        <span>扣款类型</span>
                        <Select
                            style="width:250px;"
                            v-model="form.withhold_type"
                            :options="withhold_type_opt"
                        ></Select>
                    </li>
                    <li>
                        <span>扣款金额</span>
                        <Input class="w250" v-model="form.withhold_amount" />
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
                    <button class="btn-blue-large ml50" @click="withHoldCfm" >确定</button>
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
                account: '',
                game_id: '',
                dates: [],
                offcial_acc: '',
                withhold_type: ''
            },
            official_opt: [
                { label: '全部', value: '' },
                { label: '是', value: '1' },
                { label: '否', value: '0' }
            ],
            withhold_opt: [
                { label: '全部', value: '' },
                { label: '误存提款', value: '1' }
            ],
            icon_obj: {
                '1': 'iconfont icongou green',
                '0': 'iconfont iconyuanquan red'
            },
            headers: [
                '订单号',
                '会员账号',
                '会员ID',
                '扣款类型',
                '正式账号',
                '扣款金额',
                '账户余额',
                '扣款时间',
                '操作人',
                '备注'
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            //dialog
            dia_show: false,
            form:{
                account: '',
                withhold_type: '',
                withhold_amount: '',
                remark: '',
            },
            withhold_type_opt:[
                {label:'误存提款',value:'1'}
            ],
        }
    },
    methods: {
        qqUpd(dates) {
            //同步时间筛选值
            let arr=[dates[0]+' 00:00:00',dates[1]+' 00:00:00']
            this.$set(this.filter, "dates", arr);
        },
        timeUpdate() {
            //同步快捷查询时间
            this.quick_query = this.filter.dates
        },
        clearFilter(){
            this.filter = {
                account: '',
                game_id: '',
                dates: [],
                offcial_acc: '',
                withhold_type: ''
            }
        },
        clearForm(){
            this.form={
                account: '',
                withhold_type: '',
                withhold_amount: '',
                remark: '',
            }
        },
        withholdUpdateNo(val) {
            this.getList();
        },
        withholdUpdateSize(val) {
            this.pageNo=1;
            this.getList();
        },
        getList(){
            let created_at = ''
            if (this.filter.dates[0] && this.filter.dates[1]) {
                created_at = [this.filter.dates[0],this.filter.dates[1]]
            }
            let datas={
                mobile:this.filter.account,
                guid:this.filter.game_id,
                created_at:created_at,
                is_tester:this.filter.offcial_acc,
                type:this.filter.withhold_type,
                page:this.pageNo,
                pageSize:this.pageSize,
            };
            console.log('请求数据',datas);
            let data=window.all.tool.rmEmpty(datas);
            let {method,url}=this.$api.founds_manualaccess_artificial_charge_recording;
            this.$http({method:method,url:url,data:data}).then(res=>{
                console.log('返回数据：',res)
                if(res && res.code=='200'){
                    this.list=res.data.data;
                    this.total=res.data.total;
                }
            })
        },
        exportExccel(){
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
                    filename: "人工扣款记录",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });   
        },
        without(){
            this.dia_show=true;
            this.clearForm();
        },
        withHoldCfm(){
            let data={
               user:this.form.account,
               type:this.form.withhold_type,
               money:this.form.withhold_amount,
               remark:this.form.remark,
            }
            console.log(data)
            let {url,method}=this.$api.founds_manualaccess_artificial_charge;
            this.$http({method,url,data}).then(res=>{
                // console.log('返回数据',res)
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message);
                    this.dia_show=false;
                    this.getList();
                }
            })
        },
    },
    mounted() {
        this.getList();
    }
}
</script>
<style scoped>
/* .filter 全局样式 */
.filter {
    padding-bottom: 10px;
    padding-left: 10px;
    margin-bottom: 10px;
}
.withhold-filter li {
    margin-top: 10px;
}
.dia-inner{
    width: 700px;
    height: 350px;
   
}
.dia-inner .form {
    width: 360px;
    margin: 0 auto;
}
.dia-inner .form li{
    display: flex;
    margin-top: 20px;
}
.form li >span:first-child{
    min-width: 80px;
    text-align: right;
    margin-right: 10px;
}
.w250{
    width: 250px;
}
.dia-buttons{
    margin-top: 50px;
    text-align: center;
}
.ml50{
    margin-left: 50px;
}
</style>
