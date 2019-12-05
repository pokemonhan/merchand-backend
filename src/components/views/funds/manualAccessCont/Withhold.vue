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
                    <Date v-model="filter.dates[0]" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.dates[1]" @update="timeUpdate()" />
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
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">导出Excel</button>
                    <button class="btn-red" @click="clearFilter">清空</button>
                    <button class="btn-blue" @click="dia_show=true">人工扣款</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
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
            list: [
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
                    a5: '1',
                    a6: 'admin',
                    a7: '备注'
                },
                {
                    a1: 'D456123456789',
                    a2: '13245678942',
                    a3: '4561234',
                    a4: '100.00',
                    a5: '1',
                    a6: 'admin',
                    a7: '备注'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            //dialog
            dia_show: false,
            form:{
                account: '',
                withhold_type: '1',
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
            this.filter.dates = dates
            this.filter = Object.assign(this.filter)
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
        withholdUpdateNo(val) {
            let a = 5
            console.log(a)
        },
        withholdUpdateSize(val) {}
    },
    mounted() {}
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
