<template>
    <div class="container">
        <QuickQuery :date="quick_query" @update="qqupd" />

        <div class="filter p10">
            <ul class="left"> 
                <li>
                    <span>起止时间</span>
                    <Date v-model="filter.dates[0]" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date v-model="filter.dates[1]" @update="timeUpdate()" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue">导出Excel</button>
                    <button class="btn-red">清空</button>
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
            quicky_query:[],
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
        };
    },
    methods: {
        timeUpdate(){
            this.quick_query=this.filter.dates
        },
        qqupd(dates){
            this.filter.dates=dates
            this.filter=Object.assign(this.filter)
        },
        updateNo(val){},
        updateSize(val){}
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
