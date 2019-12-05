<template>
    <div class="cont">
        <QuickQuery :date="quick_query" @update="quickDateUpdate" />
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>进入黑名单日期</span>
                    <Date style="width:95px;" v-model="filter.dates[0]" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date style="width:95px;" v-model="filter.dates[1]" @update="timeUpdate()" />
                </li>
                <li>
                    <span>状态</span>
                    <Select v-model="filter.status" :options="status_opt"></Select>
                </li>
                <li>
                    <span>进入黑名单次数</span>
                    <Input style="width:110px" limit="en-num" v-model="filter.times" />
                </li>
                <li style="margin-bottom:0;">
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue" @click="clear">清空</button>
                </li>
            </ul>
        </div>
        <Table class="table" :headers="headers" :column="list">
            <template v-slot:item="{row}">
                <td>{{row.a1}}</td>
                <td>{{row.a2}}</td>
                <td>{{row.a3}}</td>
                <td>{{row.a4}}</td>
                <td>{{row.a5}}</td>
                <td>{{row.a6}}</td>
                <td>{{row.a7}}</td>
                <td>{{row.a8}}</td>
                <td>
                    <p style="width:120px;">{{row.a9}}</p>
                </td>
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
</template>

<script>
export default {
    props: {},
    data() {
        return {
            quick_query: [],
            filter: {
                dates: [],
                times: '',
                status: 0
            },
            status_opt: [
                { label: '全部', value: 0 },
                { label: '已解冻', value: 1 },
                { label: '冻结', value: 2 }
            ],
            headers: [
                '会员账号',
                '会员ID',
                '账户余额',
                '注册时间',
                '最后登录时间',
                '进入黑名单时间',
                '解冻时间',
                '最后登录IP',
                '备注'
            ],
            list: [
                {
                    a1: '13245678998',
                    a2: '456789',
                    a3: '110.0',
                    a4: '2019/11/02 12:30:23',
                    a5: '2019/11/02 12:30:23',
                    a6: '2019/11/02 12:30:23',
                    a7: '2019/11/02 12:30:23',
                    a8: '192.168.1.1',
                    a9:
                        '5246465类似的会计法收到了福建数量的风景收到了福建收代理费就收到了福建464备注'
                },
                {
                    a1: '13245678998',
                    a2: '456789',
                    a3: '110.0',
                    a4: '2019/11/02 12:30:23',
                    a5: '2019/11/02 12:30:23',
                    a6: '2019/11/02 12:30:23',
                    a7: '2019/11/02 12:30:23',
                    a8: '192.168.1.1',
                    a9: '5246465464备注'
                },
                {
                    a1: '13245678998',
                    a2: '456789',
                    a3: '110.0',
                    a4: '2019/11/02 12:30:23',
                    a5: '2019/11/02 12:30:23',
                    a6: '2019/11/02 12:30:23',
                    a7: '2019/11/02 12:30:23',
                    a8: '192.168.1.1',
                    a9: '5246465464备注'
                },
                {
                    a1: '13245678998',
                    a2: '456789',
                    a3: '110.0',
                    a4: '2019/11/02 12:30:23',
                    a5: '2019/11/02 12:30:23',
                    a6: '2019/11/02 12:30:23',
                    a7: '2019/11/02 12:30:23',
                    a8: '192.168.1.1',
                    a9: '5246465464备注'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25
        }
    },
    methods: {
        quickDateUpdate(dates) {
            this.filter.dates = dates
            this.filter = Object.assign(this.filter)
        },
        timeUpdate() {
            // 同步快捷查询时间
            this.quick_query = this.filter.dates
        },
        clear() {
            this.filter = {
                dates: [],
                times: '',
                status: 0
            }
        },
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
}
</script>

<style scoped>
/* .filter .p10 全局样式 */
.table {
    margin-top: 15px;
}
</style>
