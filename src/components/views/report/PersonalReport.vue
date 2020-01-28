<template>
    <div class="container">
        <!-- ------------- 个人报表 ---------------- -->
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input class="w100" v-model="filter.acount" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input class="w100" v-model="filter.acount" />
                </li>
                <li>
                    <span>起止时间</span>
                    <Date v-model="filter.dates[0]" @update="timeUpdate()" />
                    <span class="ph5">~</span>
                    <Date v-model="filter.dates[0]" @update="timeUpdate()" />
                </li>
                <li>
                    <button class="btn-blue">查询</button>
                    <button class="btn-blue" style="margin-left:10px;">导出Excel</button>
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
                    <td>{{row.a9}}</td>
                    <td>{{row.a10}}</td>
                    <td>{{row.a11}}</td>
                    <td>{{row.a12}}</td>
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
            filter:{
                account:'',
                dates:[],
            },
            headers:[
              '日期',
              '会员账号', 
              '会员ID', 
              '入款金额/笔数', 
              '出款金额/笔数', 
              '总投注/笔数', 
              '优惠金额', 
              '有效投注额', 
              '佣金/返利', 
              '活动金额', 
              '游戏盈亏', 
              '实际盈亏'  
            ],
            list:[
              {
                    a1: '2019/10/30',
                    a2: '13245678942',
                    a3: '4563287',
                    a4: '10000/10',
                    a5: '5000/10',
                    a6: '100/20',
                    a7: '500',
                    a8: '5000',
                    a9: '500/500',
                    a10: '500',
                    a11: '5000',
                    a12: '555'
                },  
                {
                    a1: '2019/10/30',
                    a2: '13245678942',
                    a3: '4563287',
                    a4: '10000/10',
                    a5: '5000/10',
                    a6: '100/20',
                    a7: '500',
                    a8: '5000',
                    a9: '500/500',
                    a10: '500',
                    a11: '5000',
                    a12: '555'
                } ,
            ],
            total:60,
            pageNo:1,
            pageSize:25,
        };
    },
    methods: {
       
    },
    mounted() {
        this.getList()
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
