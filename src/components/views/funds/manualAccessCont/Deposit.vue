<template>
    <div class="deposit">
        <!-- ----------------------   人工存款  -------------------------------->
        <QuickQuery :date="quick_query" @update="qqUpd" />

        <div class="filter" >
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
                    <Date v-model="filter.dates[0]" @update="timeUpdate()" />
                    <span style="margin:0 5px">~</span>
                    <Date v-model="filter.dates[1]" @update="timeUpdate()" />
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
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">导出Excel</button>
                    <button class="btn-red" @click="clearAll">清空</button>
                    <button class="btn-blue" @click="dia_show=true">人工充值</button>
                </li>
            </ul>
            <div class="right"></div>
        </div>
        <div class="table">
            <Table :headers="theads" :column="list">

                <!-- '订单号','会员账号','会员ID','充值类型','正式账号','充值金额','账户余额','充值时间','操作人','备注' -->
                <template v-slot:item="{row}">
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>
                        <i :class="icon_obj[row.a5]"></i>
                    </td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a7}}</td>
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
                        <Select style="width:250px;" v-model="form.deposit_type" :options="deposit_type_opt" ></Select>
                    </li>
                    <li>
                        <span>存款金额</span>
                        <Input class="w250" v-model="form.deposit_amount" />
                    </li>
                    <li>
                        <span>备注</span>
                        <textarea style="width:250px;height:100px;" name="textarea" class="textarea" v-model="form.remark"></textarea>
                    </li>
                </ul>
                <div class="dia-buttons">
                    <button class="btn-plain-large" @click="dia_show=false">取消</button>
                    <button class="btn-blue-large ml50">确定</button>
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
                account_id: '',
                dates: [],
                official_account: '',
                charge_type: ''
            },
            official_opt: [
                { label: '全部', value: '' },
                { label: '是', value: '1' },
                { label: '否', value: '0' }
            ],
            charge_type_opt: [
                { label: '全部', value: '' },
                { label: '优惠赠送', value: '1' },
                { label: '洗码增送', value: '2' }
            ],
            icon_obj: {
                '1': 'iconfont icongou green',
                '0': 'iconfont iconyuanquan red'
            },
            theads:['订单号','会员账号','会员ID','充值类型','正式账号','充值金额','账户余额','充值时间','操作人','备注'],
            list: [
                {
                    a1: 'D456123456789',
                    a2: '13245678942',
                    a3: '4561234',
                    a4: '100.00',
                    a5: '1',
                    a6: 'admin',
                    a7: '备注'
                },
                {
                    a1: 'D456123456789',
                    a2: '13245678942',
                    a3: '4561234',
                    a4: '100.00',
                    a5: '0',
                    a6: 'admin',
                    a7: '备注'
                },
                {
                    a1: 'D456123456789',
                    a2: '13245678942',
                    a3: '4561234',
                    a4: '100.00',
                    a5: '0',
                    a6: 'admin',
                    a7: '备注'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            // 人工充值 添加-dialog
            dia_show: false,
            form:{

            },
            deposit_type_opt:[  // 目前就一个
                {label:'优惠存款',value:0}
            ]

        }
    },
    methods: {
        qqUpd(dates) {
            //同步时间筛选值
            this.filter.dates = dates
            this.filter = Object.assign(this.filter)
        },
        clearAll() {
            this.filter = {
                account: '',
                account_id: '',
                dates: [],
                official_account: '',
                charge_type: ''
            }
        },
        timeUpdate() {
            //同步快捷查询时间
            this.quick_query = this.filter.dates
        },
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
}
</script>




<style scoped>
/* .filter 部分样式为全局 App.vue中 */
.filter{
    /* margin-top: 10px; */
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
.left li{
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
/* .w250{
    width: 250px;
} */
.dia-buttons{
    margin-top: 50px;
    text-align: center;
}
.ml50{
    margin-left: 50px;
}
</style>
