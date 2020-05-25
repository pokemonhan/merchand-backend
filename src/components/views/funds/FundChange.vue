<template>
    <div class="container">
        <!---------------------- 资金账变 ----------------------->
        <QuickQuery :date="quick_query" @update="dateUpdate" />
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input limit="en-num" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input limit="en-num" v-model="filter.userid" />
                </li>
                <li>
                    <span>账变时间</span>
                    <Date
                        type="datetimerange"
                        style="width:300px;"
                        v-model="filter.date"
                        @update="timeUpdate()"
                    />
                </li>
                <li>
                    <span>账变类型</span>
                    <Select style="width:220px" v-model="filter.status" :options="acc_change_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getList()">查询</button>
                    <button class="btn-blue" @click="exportExcel">导出Excel</button>
                    <button class="btn-red" @click="clearFilter">清空</button>
                </li>
            </ul>
        </div>
        <div style="margin-top:20px;">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.serial_number}}</td>
                    <td>{{row.type_name}}</td>
                    <td>{{row.game_vendor_name}}</td>
                    <td>{{row.mobile}}</td>
                    <td>{{row.guid}}</td>
                    <td>{{row.before_balance}}</td>
                    <td :class="row.in_out==1? 'green': 'red'" >
                        <span v-if="row.in_out==1" >+</span>
                        <span v-if="row.in_out==2" >-</span>
                        {{row.amount}}
                    </td>
                    <td>{{row.balance}}</td>
                    <td>{{row.frozen_balance}}</td>
                    <td>{{row.created_at}}</td>
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
import axios from 'axios'
export default {
    name: "FundChange",
    // props: {},
    data() {
        return {
            quick_query: [],
            filter: {
                account: "",
                userid: "",
                date: [],
                status: ""
            },
            acc_opt: [],
            acc_change_opt: [],
            headers: [
                "流水编号",
                "账变类型",
                "资金流向" ,
                "会员账户",
                "会员ID",
                "帐变前金额",
                "账变金额" ,
                "账变后金额",
                "冻结金额",
                "账变时间" 
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            jsonList:{},
            foundChangeData:[],
        };
    },
    methods: {
        dateUpdate(dates) {
            let arr = [dates[0] + " 00:00:00", dates[1] + " 00:00:00"];
            this.$set(this.filter, "date", arr);
        },
        timeUpdate() {
            this.quick_query = this.filter.date;
        },
        clearFilter() {
            this.filter = {
                account: "",
                userid: "",
                date: [],
                status: ""
            };
        },
        //获取json资源
        getTypeOfAccount() {
            axios.get('http://pic.397017.com/common/linter.json').then(res=>{
                console.log('json',res)
                if(res && res.status=='200'){
                    this.jsonList=res.data
                    if(this.jsonList){
                        let foundChangeList=this.jsonList.frontend_users_accounts_types
                        if(foundChangeList){
                            let foundChangeListPath=foundChangeList.path
                            // console.log('账变地址',foundChangeListPath)
                            axios.get(foundChangeListPath).then(res=>{
                                if(res && res.status=='200'){
                                    this.foundChangeData=res.data
                                    // console.log('类型列表',this.foundChangeData)
                                    this.acc_change_opt=this.backToSelOpt(res.data)
                                }
                            })
                        }
                    }
                }
            })
        },
        backToSelOpt(list=[]){
            // console.log('list',list)
            let allFoundChangeData=[]
            let everyFoundChangeData=[]
            for(var i=0;i<list.length;i++){
                // console.log('儿子',list[0])
                let oneFoundChangeData=list[i].account_type
                for(var j=0;j<oneFoundChangeData.length;j++){
                    everyFoundChangeData.push(oneFoundChangeData[j])
                }
            }
            // console.log('下级',everyFoundChangeData)
            let all=[
                {
                    label:"全部",
                    value:""
                }
            ]
            let all_list=everyFoundChangeData.map(item=>{
                return {label:item.name,valu:item.id}
            })
            return all.concat(all_list)
        },
        getList(){
            let created_at="";
            if(this.filter.date[0] && this.filter.date[1]){
                created_at=JSON.stringify([this.filter.date[0],this.filter.date[1]])
            }
            let type_in=""
            if(this.filter.status){
                type_in=JSON.stringify([this.filter.status])
            }
            let datas={
                mobile:this.filter.account,
                guid:this.filter.userid,
                created_at:created_at,
                type_in:type_in
            }
            // console.log('请求数据',datas)
            let data=window.all.tool.rmEmpty(datas)
            let {method,url}=this.$api.capital_account_change_list
            this.$http({method,url,data}).then(res=>{
                // console.log('返回数据',res)
                if(res && res.code=='200'){
                    this.list=res.data.data
                    this.total=res.data.total
                }
            })
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        getMenuList(){
            if(!window.all.tool.getSession('Authorization')) return
            if(window.all.tool.getSession('menu')){
                this.menu_list=window.all.tool.getSession('menu')
            }
        },
        exportExcel() {
            // console.log('列表',this.menu_list)
            let firstList={}
            let childList={}
            let fatherList={}
            for(var i=0;i<this.menu_list.length;i++){
                firstList=this.menu_list[i].children
                let fatherTemplate=this.menu_list[i]
                for(var j=0;j<firstList.length;j++){
                    if(firstList[j].path=='/funds/fundchange'){
                        fatherList=fatherTemplate
                        childList=firstList[j]
                    }
                }
            }
            import("../../../js/config/Export2Excel").then(excel => {
                const tHeaders = this.headers;
                const data = this.list.map(item => {
                    return [
                        item.serial_number,
                        item.type_name,
                        item.game_vender_name,
                        item.mobile,
                        item.guid,
                        item.before_balance,
                        item.in_out==1?'+'+item.amount:'-'+item.amount,
                        item.balance,
                        item.frozen_balance,
                        item.created_at
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeaders,
                    data,
                    filename:fatherList.label+'-'+ "资金账变",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        }
    },
    mounted() {
        this.getTypeOfAccount();
        this.getList();
        this.getMenuList();
    }
};
</script>

<style scoped>
/* .container  在公共区 App.vue */
.filter {
    /* margin-top: 10px; */
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}
.filter .left {
    margin-left: 10px;
}
.filter .left li {
    margin-top: 10px;
    /* margin-bottom: 10px; */
}
.button-export {
    background: #4c8bfd;
    color: #fff;
}
</style>
