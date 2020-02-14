<template>
    <div class="container">
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>游戏名称</span>
                    <Select></Select>
                </li>
                <li>
                    <span>日期</span>
                    <Date v-model="filter.dates[0]" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue" @click="exportExcel()">导出Excel</button>
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
                </template>
            </Table>
        </div>
        <Page
            class="table-page"
            :total="total"
            :pageNo.sync="pageNo"
            :pageSize.sync="pageSize"
            @update="updateNo"
            @updateSize="updateSize"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
            filter: {
                dates: []
            },
            headers: ['游戏名称', '下注额度', '有效投注', '洗码金额', '日期'],
            list: [
                {
                    a1: 'a'
                }
            ],
            total: 50,
            pageNo: 1,
            pageSize: 25
        }
    },
    methods: {
        updateNo(val) {},
        updateSize(val) {},
        exportExcel() {
            import('../../../js/config/Export2Excel').then(excel => {
                const tHeader = this.headers
                const data = this.list.map(item => {
                    return [item.a1, item.a2, item.a3, item.a4, item.a5]
                })
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: '',
                    autoWidth: true,
                    bookType: 'xlsx'
                })
            })
        }
    },
    mounted() {}
}
</script>

<style scoped>
    
    .table{
        margin-top: 20px;
    }
</style>
