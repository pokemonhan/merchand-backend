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
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a7}}</td>
                    <td>{{row.a8}}</td>
                    <td>{{row.a9}}</td>
                    <td>{{row.a10}}</td>
                    <td>
                        <span :class="status_opt[row.a11].color">{{status_opt[row.a11].text}}</span>
                    </td>
                    <td>{{row.a12}}</td>
                    <td>{{row.a13}}</td>
                    <td>{{row.a14}}</td>
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
    </div>
</template>


<script>
export default {
    name: 'PlatFormbet',
    data() {
        return {
            quick_query: [],
            filter: {
                account: '',
                userid: '',
                dates: [],
                payOut_status: '',
                user_payOut_status: [
                    { label: '全部', value: '' },
                    { label: '已派彩', value: '1' },
                    { label: '未派彩', value: '2' }
                ],
                gaming: '',
                order_num: '',
                bet_slip_dates: [],
                warehouse_dates: []
            },
            headers: [
                '主单号',
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
                '入库时间'
            ],
            list: [
                {
                    a1: 'D45678944654',
                    a2: '13245678942',
                    a3: '4563287',
                    a4: 'VIP1',
                    a5: '开元棋盘',
                    a6: '抢注牛牛',
                    a7: '100',
                    a8: '100',
                    a9: '0',
                    a10: '-450',
                    a11: '0',
                    a12: '2019/09/25 18：17：30',
                    a13: '2019/09/25 18：17：30',
                    a14: '2019/09/25 18：17：30'
                },
                {
                    a1: 'D45678944654',
                    a2: '13245678942',
                    a3: '4563287',
                    a4: 'VIP1',
                    a5: '开元棋盘',
                    a6: '抢注牛牛',
                    a7: '100',
                    a8: '100',
                    a9: '0',
                    a10: '-450',
                    a11: '1',
                    a12: '2019/09/25 18：17：30',
                    a13: '2019/09/25 18：17：30',
                    a14: '2019/09/25 18：17：30'
                }
            ],
            status_opt: {
                '1': { text: '已派彩', color: 'green' },
                '0': { text: '未派彩', color: 'red' }
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
        updateSize(val) {}
    },
    mounted() {}
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
</style>
