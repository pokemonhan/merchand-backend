<template>
    <div class="container">
        <QuickQuery :date="quick_query" @update="qqUpd" />

        <div class="filter p10">
            <ul class="left"> 
                <li>
                    <span>起止时间</span>
                    <Date type="datetimerange" style="width:300px;" v-model="filter.dates" @update="timeUpdate()" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue" @click="exportExcel()">导出Excel</button>
                    <button class="btn-red" @click="clearFilter">清空</button>
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
                </template>
            </Table>
            <Page 
                class="table-page" 
                :total="total" 
                :pageNo.sync="pageNo" 
                :pageSize.sync="pageSize"
                @updateNo="updateNo" 
                @updateSize="updateSize" />
        </div>
    </div>
</template>


<script>


export default {
  
    data() {
        return {
            quick_query:[],
            filter:{
                dates:[],
            },
            headers:[
                '日期',
                '提款金额',
                '存入金额',
                '优惠金额',
                '活动金额',
                '盈利金额',
            ],
            list:[
                {
                    a1: '2018/8/8',
                    a2: '10000',
                    a3: '100',
                    a4: '5000',
                    a5: '500',
                    a6: '5000'
                },
                {
                    a1: '2018/8/8',
                    a2: '10000',
                    a3: '100',
                    a4: '5000',
                    a5: '500',
                    a6: '5000'
                }
            ],
            total:100,
            pageNo:1,
            pageSize:25,
        };
    },
    methods: {
        timeUpdate(){
            this.quick_query=this.filter.dates
        },
        qqUpd(dates){
            let arr = [dates[0] + " 00:00:00", dates[1] + " 00:00:00"];
            this.$set(this.filter, "dates", arr);
        },
        updateNo(val){},
        updateSize(val){},
        clearFilter(){
            this.filter={
                dates:[]
            }
        },
        exportExcel(){
            import('../../../js/config/Export2Excel').then(excel=>{
                const tHeader=this.headers
                const data=this.list.map(item=>{
                    return[item.a1,item.a2,item.a3,item.a4,item.a5,item.a6]
                })
                excel.export_json_to_excel({
                    header:tHeader,
                    data,
                    filename:excel,
                    autoWidth:true,
                    bookType:'xlsx'
                })
            })
        }
    },
    mounted() {

    },
};
</script>

<style scoped>
    .p10{
        padding: 10px;
    }
    .table{
        margin-top:20px;
    }
</style>
