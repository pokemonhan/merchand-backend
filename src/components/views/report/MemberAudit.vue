<template>
    <div class="container">
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input class="w90" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input class="w90" v-model="filter.userid" />
                </li>
                <li>
                    <span>生成日期</span>
                    <Date
                        type="datetimerange"
                        style="width:300px;"
                        v-model="filter.dates"
                        @update="timeUpdate()"
                    />
                </li>
                <li>
                    <span>状态</span>
                    <Select
                        v-model="filter.user_state"
                        :options="filter.user_state_opt"
                        style="width:100px;"
                    ></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getList()">查询</button>
                    <button
                        class="btn-blue"
                        style="margin-left:10px;"
                        @click="exportExcel()"
                    >导出Excel</button>
                    <button class="btn-red" @click="clearFilter()">清空</button>
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
                    <td>{{row.a5}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a7}}</td>
                    <td>
                        <span :class="status_opt[row.a8].color">{{status_opt[row.a8].text}}</span>
                    </td>
                    <td>{{row.a9}}</td>
                    <td>{{row.a10}}</td>
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
    </div>
</template>


<script>
export default {
    name: 'MemberAudit',
    data() {
        return {
            filter: {
                account: '',
                userid: '',
                dates: [],
                user_state: '',
                user_state_opt: [
                    { label: '全部', value: '' },
                    { label: '已完成', value: '1' },
                    { label: '未完成', value: '2' }
                ]
            },
            headers: [
                '会员账号',
                '会员ID',
                '订单号',
                '金额类型',
                '金额',
                '需求打码',
                '当前打码',
                '状态',
                '生成时间',
                '稽核时间'
            ],
            list: [
                {
                    a1: '13245678942',
                    a2: '4563287',
                    a3: 'D45678944654',
                    a4: '优惠存款',
                    a5: '100',
                    a6: '100',
                    a7: '100',
                    a8: '1',
                    a9: '2019/5/8 18:17:30',
                    a10: '2019/5/10 18:17:30'
                },
                {
                    a1: '13245678942',
                    a2: '4563287',
                    a3: 'D45678944654',
                    a4: '优惠存款',
                    a5: '100',
                    a6: '100',
                    a7: '100',
                    a8: '0',
                    a9: '2019/5/8 18:17:30',
                    a10: '2019/5/10 18:17:30'
                },
                {
                    a1: '13245678942',
                    a2: '4563287',
                    a3: 'D45678944654',
                    a4: '优惠存款',
                    a5: '100',
                    a6: '100',
                    a7: '100',
                    a8: '1',
                    a9: '2019/5/8 18:17:30',
                    a10: '2019/5/10 18:17:30'
                }
            ],
            status_opt: {
                '1': { text: '已完成', color: 'green' },
                '0': { text: '未完成', color: 'red' }
            },
            quick_query: [],
            total: 100,
            pageNo: 1,
            pageSize: 25
        }
    },
    methods: {
        qqUpd(dates) {
            let arr = [dates[0] + ' 00:00:00', dates[1] + ' 00:00:00']
            this.$set(this.filter, 'dates', arr)
        },
        timeUpdate() {
            this.quick_query = this.filter.dates
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
                        item.a10
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
    /* margin-top: 10px; */
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}

.filter .left li {
    margin-top: 10px;
    /* margin-bottom: 10px; */
}
.ph5 {
    margin-left: 5px;
    margin-right: 5px;
}
.p10 {
    padding: 10px;
}
.table {
    margin-top: 20px;
}
</style>
