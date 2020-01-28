<template>
    <div class="container">
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>游戏名称</span>
                    <Input class="w100" v-model="filter.account" />
                </li>
               <li>
                   <span style="margin-left:10px ">起始时间</span>
                   <Date v-model="filter.dates[0]" @update="timeUpdate()" />
                   <span class="ph5">~</span>
                   <Date v-model="filter.dates[0]" @update="timeUpdate()" />
               </li>
               <li>
                   <button class="btn-blue">查询</button>
                   <button class="btn-blue" style="margin-left:10px;">导出Excel</button>
               </li>
            </ul>
            <div class="right">
                <a href="">返回上一级</a>
            </div>
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
                </template>
            </Table>
             <Page 
                class="table-page" 
                :total="total" 
                :pageNo.sync="pageNo" 
                :pageSize.sync="pageSize" 
                @updateNo="updateNo" 
                @updateSize="updateSize"/>
        </div>
    </div>
</template>


<script>
export default {
  
    data() {
        return {
            filter: {
                account:'',
                dates:[],
            },
            headers:[
                '日期',
                '平台名称',
                '有效下注',
                '游戏税收',
                '总投注额',
                '佣金/返利',
                '游戏盈亏',
            ],
            list:[
                {
                    a1: '2019/10/30',
                    a2: '开元棋盘',
                    a3: '1000000',
                    a4: '500',
                    a5: '500000000',
                    a6: '50000/40000',
                    a7: '800000'
                },
                {
                    a1: '2019/10/30',
                    a2: 'AG电子',
                    a3: '1000000',
                    a4: '500',
                    a5: '500000000',
                    a6: '50000/40000',
                    a7: '800000'
                },
            ],
            total:55,
            pageNo:1,
            pageSize:25,
        };
    },
    methods: {
        timeupdate(){
            this.quicky_query=this.filter.dates
        },
    },
    mounted() {

    },
};
</script>

<style scoped>
    .ph5{
        margin-left: 5px;
        margin-right: 5px;
    }
    .table{
        margin-top: 20px;
    }
</style>
