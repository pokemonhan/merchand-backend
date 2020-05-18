<template>
    <div class="container">
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <div class="filter-group">
            <div class="filter">
                <ul class="left">
                    <li>
                        <span>会员账号</span>
                        <Input class="w100" v-model="filter.account" />
                    </li>
                    <li>
                        <span>会员ID</span>
                        <Input class="w100" v-model="filter.userid" />
                    </li>
                    <li>
                        <span>派彩时间</span>
                        <Date
                            type="datetimerange"
                            style="width:300px;"
                            v-model="filter.dates"
                            @update="timeUpdate()"
                        />
                    </li>
                    <li>
                        <span>派彩状态</span>
                        <Select
                            v-model="filter.payOut_status"
                            :options="filter.user_payOut_status"
                            style="width:100px;"
                        ></Select>
                    </li>
                    <li>
                        <span>游戏平台</span>
                        <Input class="w100" v-model="filter.gaming" />
                    </li>
                    <li>
                        <span>注单号</span>
                        <Input class="w100" v-model="filter.order_num" />
                    </li>
                    <li>
                        <span>注单时间</span>
                        <Date
                            type="datetimerange"
                            style="width:300px"
                            v-model="filter.bet_slip_dates"
                            @update="betSlipUpdate()"
                        />
                    </li>
                    <li>
                        <span>入库时间</span>
                        <Date
                            type="datetimerange"
                            style="width:300px;"
                            v-model="filter.warehouse_dates"
                            @update="warehouseUpdate()"
                        />
                    </li>
                    <li>
                        <button class="btn-blue" @click="getList()">查询</button>
                        <button
                            class="btn-blue"
                            style="margin-left:10px;"
                            @click="exportExcel()"
                        >导出Excel</button>
                        <button class="btn-red" @click="clearFilter()">清空</button>
                        <button class="btn-blue" @click="dia_show=true">手动获取注单</button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.serial_number || '--'}}</td>
                    <td>{{row.mobile || '--'}}</td>
                    <td>{{row.guid || '--'}}</td>
                    <td>{{row.level_name || '--'}}</td>
                    <td>{{row.game_vendor || '--'}}</td>
                    <td>{{row.game_name || '--'}}</td>
                    <td>{{row.bet_money || '--'}}</td>
                    <td>{{row.effective_bet || '--'}}</td>
                    <td>{{row.charged_fees || '--'}}</td>
                    <td :class="row.win_money-row.bet_money>0?'green':'red' ">
                        <span v-if="row.win_money-row.bet_money>0">+</span>
                        {{row.win_money-row.bet_money || '--'}}
                    </td>
                    <td>
                        <span :class="status_opt[row.status].color">{{status_opt[row.status].text}}</span>
                    </td>
                    <td>{{row.their_create_time}}</td>
                    <td>{{row.delivery_time}}</td>
                    <td>{{row.created_at}}</td>
                    <td>
                        <button class="btns-blue" @click="detailShow(row)" >详情</button>
                    </td>
                </template>
            </Table>
        </div>
        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @updateNo="updateNo"
            @updateSize="updateSize"
        />
        <Dialog :show.sync="dia_show" title="手动获取清单">
            <div class="dia-inner">
                <ul class="form">
                    <li>
                        <span>选择平台:</span>
                        <div>
                            <Select
                                style="width:300px;"
                                v-model="form.type"
                                :options="[{label:'AG',value:0},{label:'开元棋盘',value:1},{label:'BBIN',value:2}]"
                            ></Select>
                        </div>
                    </li>
                    <li>
                        <span>选择游戏:</span>
                        <Select
                            style="width:300px;"
                            v-model="form.game"
                            :options="[{label:'抢庄牛牛',value:0},{label:'百家乐',value:1},{label:'炸金花',value:2}]"
                        ></Select>
                    </li>
                    <li>
                        <span>选择时间:</span>
                        <Date type="datetimerange" style="width:300px;" v-model="form.dates_range" />
                    </li>
                </ul>
                <div class="dia-buttons">
                    <button class="btn-plain-large" @click="dia_show=false">取消</button>
                    <button class="btn-blue-large ml50">确定</button>
                </div>
            </div>
        </Dialog>
        <Dialog :show.sync="detail_show" title="详情">
            <div class="detail-show">
                <ul>
                    <li>三方通知单号号：{{detailList.their_notifyId}}</li>
                    <li>用户名：{{detailList.username}}</li>
                    <li>IP：{{detailList.ip}}</li>
                </ul>
            </div>
        </Dialog>
    </div>
</template>


<script>
export default {
    name: 'PlatFormbet',
    data() {
        return {
            dHeaders:[
                '三方通知单号',
                '用户名',
                'ip',
            ],
            detailList:[],
            detail_show:false,
            quick_query: [],
            filter: {
                account: '',
                userid: '',
                dates: [],
                payOut_status: '',
                user_payOut_status: [
                    { label: '全部', value: '' },
                    { label: '已投注', value:'0'},
                    { label: '已撤销', value: '1' },
                    { label: '未中奖', value: '2' },
                    { label: '已中奖', value: '3'},
                    { label: '已派奖', value: '4'}
                ],
                gaming: '',
                order_num: '',
                bet_slip_dates: [],
                warehouse_dates: []
            },
            headers: [
                '注单号',
                '会员账号',
                '会员ID',
                'VIP等级',
                '游戏平台',
                '游戏名称',
                '投注额',
                '有效下注',
                '抽水',
                '输赢',
                '派彩状态',
                '注单时间',
                '派彩时间',
                '入库时间',
                '详情'
            ],
            list: [],
            status_opt: {
                '0': { text: '已投注', color: 'yellow' },
                '1': { text: '已撤销', color: 'orange' },
                '2': { text: '未中奖', color: 'red'},
                '3': { text: '已中奖', color: 'blue'},
                '4': { text: '已派奖', color: 'green'},
            },
            total: 100,
            pageNo: 1,
            pageSize: 25,
            form: {
                type: '',
                game: '',
                dates_range: []
            },
            dia_show: false
        }
    },
    methods: {
        detailShow(row){
            this.detail_show=true
            this.detailList=row
        },
        qqUpd(dates) {
            let arr = [dates[0] + ' 00:00:00', dates[1] + ' 00:00:00']
            this.$set(this.filter, 'dates', arr)
            this.$set(this.filter, 'bet_slip_dates', arr)
            this.$set(this.filter, 'warehouse_dates', arr)
        },
        timeUpdate() {
            this.quick_query = this.filter.dates
        },
        betSlipUpdate() {
            this.quick_query = this.filter.bet_slip_dates
        },
        warehouseUpdate() {
            this.quick_query = this.filter.warehouse_dates
        },
        exportExcel() {
            import('../../../js/config/Export2Excel').then(excel => {
                const tHeader = this.headers
                const data = this.list.map(item => {
                    return [
                        item.a1,
                        item.a2,
                        item.a3,
                        item.a4,
                        item.a5,
                        item.a6,
                        item.a7,
                        item.a8,
                        item.a9,
                        item.a10,
                        item.a11,
                        item.a12,
                        item.a13,
                        item.a14
                    ]
                })
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: excel,
                    autoWidth: true,
                    bookType: 'xlsx'
                })
            })
        },
        clearFilter() {
            this.filter = {
                dates: []
            }
        },
        updateNo(val) {},
        updateSize(val) {},
        getList(){
            let delivery_time="";
            if(this.filter.dates[0] && this.filter.dates[1]){
                delivery_time=JSON.stringify([this.filter.dates[0],this.filter.dates[1]])
            }
            let their_create_time="";
            if(this.filter.bet_slip_dates[0] && this.filter.bet_slip_dates[1]){
                their_create_time=JSON.stringify([this.filter.bet_slip_dates[0],this.filter.bet_slip_dates[1]])
            }
            let created_at="";
            if(this.filter.warehouse_dates[0] && this.filter.warehouse_dates[1]){
                created_at=JSON.stringify([this.filter.warehouse_dates[0],this.filter.warehouse_dates[1]])
            }
            let datas={
                mobile:this.filter.account,
                guid:this.filter.userid,
                delivery_time:delivery_time,
                status:this.filter.payOut_status,
                game_vendor_sign:this.filter.gaming,
                serial_number:this.filter.order_num,
                their_create_time:their_create_time,
                created_at:created_at,
            }
            console.log('请求数据',datas)
            let data=window.all.tool.rmEmpty(datas)
            let {method,url}=this.$api.platform_note_list
            this.$http({method,url,data}).then(res=>{
                console.log('请求返回数据',res)
                if(res && res.code=='200'){
                    this.list=res.data.data
                    this.total=res.data.total
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
.filter {
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
.filter .left {
    margin-left: 10px;
}
.filter .left li {
    margin-top: 10px;
}
.ph5 {
    margin-left: 5px;
    margin-right: 5px;
}

.container .table {
    width: 100%;
    overflow-x: auto;
}
.container .table .v-table {
    min-height: 0;
    width: 1900px;
    margin-top: 20px;
}
.dia-inner {
    width: 700px;
    height: 350px;
}
.dia-inner .form {
    width: 400px;
    margin: 0 auto;
}
.dia-inner .form li {
    display: flex;
    align-items: center;
    margin-top: 20px;
}
.form li > span:first-child {
    min-width: 80px;
    text-align: right;
    margin-right: 10px;
}
.dia-buttons {
    margin-top: 50px;
    text-align: center;
}
.ml50 {
    margin-left: 50px;
}
.detail-show{
    
}
</style>
