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
            pageSize: 25
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
        getTypeOfAccount() {
            let { method, url } = this.$api.type_of_fund_account_change_list;
            this.$http({ method, url }).then(res => {
                // console.log("账变类型", res);
                if (res && res.code == "200") {
                    this.acc_opt = res.data;
                }
                // console.log("asdf", this.acc_opt);
                let account_type = [{label:"全部",sign:"",value:""}];
                for (var i = 0; i < this.acc_opt.length; i++) {
                    let item = this.acc_opt[i].account_type;
                    if (item) {
                        for (var j = 0; j < item.length; j++) {
                            // console.log("item", item[j]);
                            account_type.push({label:item[j].name,sign:item[j].id,value:item[j].sign});
                        }
                    }
                }
                this.acc_change_opt=account_type
                // console.log("类型列表", this.acc_change_opt);
            });
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
            console.log('请求数据',datas)
            let data=window.all.tool.rmEmpty(datas)
            let {method,url}=this.$api.capital_account_change_list
            this.$http({method,url,data}).then(res=>{
                console.log('返回数据',res)
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

        //等待接口
        exportExcel() {
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
                        item.amount,
                        item.balance,
                        item.frozen_balance,
                        item.created_at
                    ];
                });
                excel.export_json_to_excel({
                    header: tHeaders,
                    data,
                    filename: "资金账变",
                    autoWidth: true,
                    bookType: "xlsx"
                });
            });
        }
    },
    mounted() {
        this.getTypeOfAccount();
        this.getList();
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
