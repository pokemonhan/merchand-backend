<template>
    <div class="container">
        <!-- 出款银行管理 -->

        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>银行名称</span>
                    <Input v-model="filter.acc" />
                </li>
                <li>
                    <span>状态</span>
                    <Select v-model="filter.status" :options="status_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                </li>
            </ul>
        </div>
        <div class="talbe mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td
                        :class="row.status?'green':'red'"
                    >{{row.status===1?'开启':row.status===0?'关闭':'???'}}</td>
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a2}}</td>
                    <td>
                        <button
                            :class="row.status===1?'btns-blue':'btns-red'"
                        >{{row.status===1?'启用':row.status===0?'禁用':'???'}}</button>
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
    </div>
</template>
<script>
export default {
    data() {
        return {
            filter: {
                acc: '',
                status: ''
            },
            status_opt: [
                { label: '全部', value: '' },
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 }
            ],
            headers: [ '编号', '银行名称', '状态', '最后更新人', '最后更新时间', '操作' ],
            list: [
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30',
                    status: 1,
                },
                {
                    a1: '64646466',
                    a2: 'sdfsdfdsf',
                    a3: '充支好礼',
                    a4: '1',
                    a5: '2019-02-02 21:30',
                    status: 0,
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
</style>