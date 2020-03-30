<template>
    <div class="container">
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <div class="filter" >
            <ul  class="left">
                <li>
                    <span>会员账号</span>
                    <Input class="w90" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input class="w90" v-model="filter.userId" />
                </li>
                <li>
                    <span>日期</span>
                    <Date type="datetimerange" style="width:300px;" v-model="filter.dates" @update="timeUpdate()" />
                </li>
                <li>
                    <span>游戏平台</span>
                    <Select v-model="filter.game_platform" :options="filter.game_platform_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue" @click="exportExcel()">导出Excel</button>
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
                    <td>{{row.a8}}</td>
                    <td>
                        <span class="a" @click="show_detail=true">查看</span>
                    </td>
                </template>
            </Table>
        </div>
        <Page class="table-page" :total="total" :pageNo.sync="pageNo" :pageSize.sync="pageSize" @update="updateNo" @updateSize="updateSize" />
        <Dialog :show.sync="show_detail" title="明细" >
            <UserWashDetail></UserWashDetail>
        </Dialog>
    </div>
</template>


<script>
import UserWashDetail from './UserWashDetail'
export default {
  components:{
      UserWashDetail,
  },
    data() {
        return {
            quick_query:[],
            filter:{
                accpunt:'',
                userId:'',
                dates:[],
                game_platform:'',
                game_platform_opt:[
                    {label:'全部',value:''},
                    {label:'开元棋盘',value:'1'},
                    {label:'龙城棋盘',value:'2'},
                ]
            },
            headers:[
                '日期',
                '会员账号',
                '游戏平台',
                '会员ID',
                '累计有效投注',
                '历史累计洗码',
                '当前有效投注',
                '洗码彩金',
                '查看洗码明细',
            ],
            list:[
                {

                },
            ],
            show_detail:false,
            total:100,
            pageNo:1,
            pageSize:25,
        };
    },
    methods: {
        qqUpd(dates){
            let arr = [dates[0] + " 00:00:00", dates[1] + " 00:00:00"];
            this.$set(this.filter, "dates", arr);
        },
        timeUpdate(){
            this.quick_query=this.filter.dates
        },
        clearFilter(){
            this.filter={
                dates:[]
            }
        },
        updateNo(val){},
        updateSize(val){},
        exportExcel(){
            import('../../../js/config/Export2Excel').then(excel=>{
                const tHeader=this.headers
                const data=this.list.map(item=>{
                    return[item.a1,item.a2,item.a3,item.a4,item.a5,item.a6,item.a7,item.a8,]
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
    .table{
        margin-top:20px;
    }
</style>
