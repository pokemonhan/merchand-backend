<template>
    <div class="container">
        <!-- 活动报表 -->
        
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>活动名称</span>
                    <Input class="w100" v-model="filter.acount" />
                </li>
                <li>
                    <span>日期范围</span>
                    <Date v-model="filter.dates[0]" />
                    <span class="ph5">~</span>
                    <Date v-model="filter.dates[1]"  />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue" style="margin-left:10px;" @click="exportExcel()">导出Excel</button> 
                </li>
            </ul>   
        </div>
        <div class="table">
            <Table :headers="headers" :column="list" >
                <template v-slot:item="{row}">
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
                    <td>
                        <span class="a" @click="show_detail=true" >参与详情</span>
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
        <Dialog :show.sync="show_detail" title="参与详情" >
            <div class="dia-inner">
                <ActiveReportDetail></ActiveReportDetail>
            </div>
        </Dialog>
    </div>
</template>


<script>
import ActiveReportDetail from './ActiveReportDetail'
export default {
    components:{
        ActiveReportDetail
    },
    data() {
        return {
            filter:{
                acount:'',
                dates:[],
            },
            headers:[
                '编号',
                '日期',
                '活动类型',
                '参与人数',
                '领取金额',
                '详情',
            ],
            list:[
                {

                },
            ],
            total:50,
            pageNo:1,
            pageSize:25,
            show_detail:false,
        };
    },
    methods: {
        exportExcel(){
            import('../../../js/config/Export2Excel').then(excel=>{
                const tHeader=this.headers
                const data=this.list.map(item=>{
                    return[item.a1,item.a2,item.a3,item.a4,item.a5]
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
    },
    mounted() {

    },
};
</script>

<style scoped>

</style>
