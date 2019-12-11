<template>
    <div class="sms-detail">
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>发件人</span>
                    <Select v-model="filter.sender" :options="sender_opt"></Select>
                </li>
                <li>
                    <span>发送时间</span>
                    <Date v-model="filter.dates[0]" />
                    <span style="margin: 0 5px;">~</span>
                    <Date v-model="filter.dates[1]" />
                </li>
            </ul>
        </div>

        <!-- --  table  -->
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
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
    props: {},
    data() {
        return {
            filter: {
                sender: '',
                dates: []
            },
            sender_opt: [
                { label: '全部', value: '' },
                { label: '已发送', value: '1' },
                { label: '发送失败', value: '0' }
            ],
            headers: ['会员账号', '会员ID', '推送内容', '发送状态', '发送时间'],
            list: [
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                },
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                },
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                },
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30'
                }
            ],
            total: 0,
            pageNo: 1,
            pageSize: 25
        }
    },
    methods: {
        updateNo(val) {},
        updateSize(val) {}
    },
    mounted() {}
}
</script>

<style scoped>
.sms-detail {
    width: 1000px;
}
.p10 {
    padding: 10px;
}
.table {
    margin-top: 20px;
    max-height: 70vh;
    overflow: auto;
}
</style>
