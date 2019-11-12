<template>
    <div class="container">
        会员登录平台
        <div class="filter">
            <!-- 左 -->
            <ul>
                <li>
                    <span>会员账号</span>
                    <span>
                        <Input size="small" v-model="user_acc" />
                    </span>
                </li>
                <li>
                    <span>游戏ID</span>
                    <span>
                        <Input placeholder="请输入游戏ID" size="small" v-model="game_id" />
                    </span>
                </li>
                <li>
                    <span>资金类型</span>
                    <span>
                        <Select v-model="funds_type" :options="funds_type_option"></Select>
                    </span>
                </li>
            </ul>
        <!--     右边 -->
            <div class="opra-btn right">
                <button class="btn-blue">查询</button>
                <button class="btn-plain">导出Excel</button>
            </div>
        </div>

        <div class="table">
           <Table :headers="table_header" :column="list" >
               <template  v-slot:item="{row}" >
                   <td style="height:30px">{{row.b}}</td>
                   <td>{{row.b}}</td>
                   <td>{{row.b}}</td>
                   <td>{{row.b}}</td>
                   <td>{{row.b}}</td>
                   <td>{{row.b}}</td>
               </template>
           </Table>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user_acc: '',
            funds_type: '',
            funds_type_option: [
                {label:'ds', value: '2'},
                {label:'one', value: '3'},
                {label:'sdfdsf', value: '4'},
            ],
            game_id: '',
            table_header:[
                {label:'会员账号'},
                {label:'会员ID'},
                {label:'资金类型'},
                {label:'支出'},
                {label:'收入'},
                {label:'变更后余额'},
                {label:'时间'},
                {label:'操作人'},
                {label:'备注'},
               
            ],
            list:[
                {a:'1',b:'2',c:'3',d: '4'},
                {a:'1',b:'2',c:'3',d: '4'}
            ],
        }
    },
    methods: {
        sclick(){
        }
    },
     mounted(){
       
      
    }
}
</script>

<style scoped>
    .container{
        padding: 10px 8px;
        background: #fff;
        border-radius: 5px;
        border-top-left-radius: 0;
    }
    .filter{
        height: 37px;
        display: flex;
        justify-content: space-between;
        /* align-items: center; */
        padding: 0 10px;
    }
    .filter > ul{
        display: flex;
    }
    .filter > ul>li{
        display: flex;
         margin-right: 15px;
         line-height: 28px;
     }
    .filter > ul>li>span:first-child{
        padding-right: 8px;
     }
    
    .table{
        margin-top: 15px;
    }
</style>