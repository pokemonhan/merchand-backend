<template>
    <div class="container">
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>游戏名称</span>
                    <Input class="w100" v-model="filter.acount" />
                </li>
                <li>
                    <span>起止时间</span>
                    <Date v-model="filter.dates[0]" />
                    <span class="ph5">~</span>
                    <Date v-model="filter.dates[1]" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue" style="margin-left:10px;" @click="exportExcel()">导出Excel</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
<<<<<<< HEAD
                <template v-slot:item="{row}">
=======
                <template v-slot:item="{row}"> 
>>>>>>> test
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
                    <td>{{row.a6}}</td>
                    <td>{{row.a7}}</td>
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
    </div>
</template>


<script>
export default {
  
    data() {
        return {
            filter:{
                account:'',
                dates:[],
            },
            headers:[
                '日期',
                '游戏名称',
                '有效下注',
                '游戏税收',
                '总投注额',
                '佣金/返利',
                '游戏盈亏'
            ],
            list:[
                {
                    a1: '2019/10/30',
                    a2: '开元棋盘',
                    a3: '10000',
                    a4: '100',
                    a5: '50000',
                    a6: '500/400',
                    a7: '50000'
                },
                {
                    a1: '2019/10/30',
                    a2: '开元棋盘',
                    a3: '10000',
                    a4: '100',
                    a5: '50000',
                    a6: '500/400',
                    a7: '50000'
                },
            ],
            total:66,
            pageNo:1,
            pageSize:25,
        };
    },
    methods: {
         exportExcel(){
            import('../../../js/config/Export2Excel').then(excel=>{
                const tHeader=this.headers
                const data=this.list.map(item=>{
                    return[item.a1,item.a2,item.a3,item.a4,item.a5,item.a6,item.a7]
                })
                excel.export_json_to_excel({
                    header:tHeader,
                    data,
                    filename:excel,
                    autoWidth:true,
                    bookType:'xlsx'
                })
            })
        },
        updateNo(val){},
        updateSize(val){},
    },
    mounted() {

    },
};
</script>

<style scoped>
    .ph5 {
    padding-left: 5px;
    padding-right: 5px;
    }
    .p10{
        padding: 10px;
    }
    .table{
        margin-top: 20px;
    }
</style>