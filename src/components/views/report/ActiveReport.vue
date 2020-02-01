<template>
    <div class="container">
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
            <Table :headeres="headers" :column="list" >
                <template v-slot:item="{row}">
                    <td>{{row.a1}}</td>
                    <td>{{row.a2}}</td>
                    <td>{{row.a3}}</td>
                    <td>{{row.a4}}</td>
                    <td>{{row.a5}}</td>
                    <td>{{row.a6}}</td>
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
                acount:'',
                dates:[],
            },
            headers:[],
            list:[],
            total:50,
            pageNo:1,
            pageSize:25,
        };
    },
    methods: {

    },
    mounted() {

    },
};
</script>

<style scoped>

</style>
