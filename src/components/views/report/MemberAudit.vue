<template>
    <div class="container">
        <QuickQuery :date="quick_query" @update="qqUpd" />
        <div class="filter">
            <ul class="left">
                <li>
                    <span>会员账号</span>
                    <Input class="w90" v-model="filter.account" />
                </li>
                <li>
                    <span>会员ID</span>
                    <Input class="w90" v-model="filter.userid" />
                </li>
                <li>
                    <span>生成日期</span>
                    <Date
                        type="datetimerange"
                        style="width:300px;"
                        v-model="filter.dates"
                        @update="timeUpdate()"
                    />
                </li>
                <li>
                    <span>状态</span>
                    <Select
                        v-model="filter.user_state"
                        :options="filter.user_state_opt"
                        style="width:100px;"
                    ></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getList()">查询</button>
                    <button
                        class="btn-blue"
                        style="margin-left:10px;"
                        @click="exportExcel()"
                    >导出Excel</button>
                    <button class="btn-red" @click="clearFilter()">清空</button>
                </li>
            </ul>
        </div>
        <div class="table">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row}">
                    <td>{{row.mobile}}</td>
                    <td>{{row.guid}}</td>
                    <td>{{row.order_number}}</td>
                    <td>{{row.type}}</td>
                    <td>{{row.amount}}</td>
                    <td>{{row.demand_bet}}</td>
                    <td>{{row.achieved_bet}}</td>
                    <td>
                        <span :class="status_opt[row.status].color">{{status_opt[row.status].text}}</span>
                    </td>
                    <td>{{row.created_at}}</td>
                    <td>{{row.achieved_time}}</td>
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
    name: 'MemberAudit',
    data() {
        return {
            filter: {
                account: '',
                userid: '',
                dates: [],
                user_state: '',
                user_state_opt: [
                    { label: '全部', value: '' },
                    { label: '已完成', value: '1' },
                    { label: '未完成', value: '0' }
                ]
            },
            headers: [
                '会员账号',
                '会员ID',
                '订单号',
                '金额类型',
                '金额',
                '需求打码',
                '当前打码',
                '状态',
                '生成时间',
                '稽核时间'
            ],
            list: [],
            status_opt: {
                '1': { text: '已完成', color: 'green' },
                '0': { text: '未完成', color: 'red' }
            },
            quick_query: [],
            total: '',
            pageNo: 1,
            pageSize: 25
        }
    },
    methods: {
        qqUpd(dates) {
            let arr = [dates[0] + ' 00:00:00', dates[1] + ' 00:00:00']
            this.$set(this.filter, 'dates', arr)
        },
        timeUpdate() {
            this.quick_query = this.filter.dates
        },
        getMenuList(){
            if(!window.all.tool.getLocal('Authorization')) return
            if(window.all.tool.getLocal('menu')){
                this.menu_list=window.all.tool.getLocal('menu')
            }
        },
        exportExcel() {
            console.log('列表',this.menu_list)
            let firstList={}
            let childList={}
            let fatherList={}
            for(var i=0;i<this.menu_list.length;i++){
                firstList=this.menu_list[i].children
                let fatherTemplate=this.menu_list[i]
                for(var j=0;j<firstList.length;j++){
                    if(firstList[j].path=='/report/memberaudit'){
                        fatherList=fatherTemplate
                        childList=firstList[j]
                    }
                }
            }
            import('../../../js/config/Export2Excel').then(excel => {
                const tHeader = this.headers
                const data = this.list.map(item => {
                    return [
                        item.mobile,
                        item.guid,
                        item.order_number,
                        item.type,
                        item.amount,
                        item.demand_bet,
                        item.achieved_bet,
                        item.status==1 ? '已完成' : '未完成',
                        item.created_at,
                        item.achieved_time
                    ]
                })
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename:fatherList.label+'-'+ '会员稽核列表',
                    autoWidth: true,
                    bookType: 'xlsx'
                })
            })
        },
        clearFilter() {
            this.filter = {
                account:'',
                userid:'',
                dates: [],
                user_state:''
            }
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        getList(){
            let created_at = "";
            if (this.filter.dates[0] && this.filter.dates[1]) {
                createdAt = JSON.stringify([
                    this.filter.dates[0],
                    this.filter.dates[1]
                ]);
            }
            let datas={
                mobile:this.filter.account,
                guid:this.filter.userid,
                created_at:created_at,
                status:this.filter.user_state
            }
            console.log('请求数据',datas)
            let data =window.all.tool.rmEmpty(datas)
            let {method,url}=this.$api.member_audit_list
            this.$http({method,url,data}).then(res=>{
                console.log('返回数据',res)
                if(res && res.code=='200'){
                    this.list=res.data.data
                    this.total=res.data.total
                }
            })
        }
    },
    mounted() {
        this.getList();
        this.getMenuList();
    }
}
</script>

<style scoped>
.filter {
    /* margin-top: 10px; */
    margin-bottom: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
}

.filter .left li {
    margin-top: 10px;
    /* margin-bottom: 10px; */
}
.ph5 {
    margin-left: 5px;
    margin-right: 5px;
}
.p10 {
    padding: 10px;
}
.table {
    margin-top: 20px;
}
</style>
