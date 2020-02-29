<template>
    <div class="cont">
        <QuickQuery :date="quick_query" @update="quickDateUpdate" />
        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>进入黑名单日期</span>
                    <Date style="width:95px;" v-model="filter.dates[0]" @update="timeUpdate()" />
                    <span style="margin:0 5px;">~</span>
                    <Date style="width:95px;" v-model="filter.dates[1]" @update="timeUpdate()" />
                </li>
                <li>
                    <span>状态</span>
                    <Select v-model="filter.status" :options="status_opt"></Select>
                </li>
                <li>
                    <span>进入黑名单次数</span>
                    <Input style="width:110px" limit="en-num" v-model="filter.times" />
                </li>
                <li style="margin-bottom:0;">
                    <button class="btn-blue" @click="getList" >查询</button>
                    <button class="btn-blue" @click="clear">清空</button>
                </li>
            </ul>
        </div>
        <Table class="table" :headers="headers" :column="list">
            <template v-slot:item="{row}">
                <td>{{row.mobile}}</td>
                <td>{{row.guid}}</td>
                <td>{{row.account}}</td>
                <td>{{row.register}}</td>
                <td>{{row.last_login_time}}</td>
                <td>{{row.created_at}}</td>
                <td>{{row.remove_time}}</td>
                <td>{{row.last_login_ip}}</td>
                <td>{{row.remark}}</td>
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
</template>

<script>
export default {
    props: {
        curr_row:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            quick_query: [],
            filter: {
                dates: [],
                times: '',
                status: '',
            },
            status_opt: [
                { label: '全部', value: ""},
                { label: '已解冻', value: "1" },
                { label: '冻结', value: "0"}
            ],
            headers: [
                '会员账号',
                '会员ID',
                '账户余额',
                '注册时间',
                '最后登录时间',
                '进入黑名单时间',
                '解冻时间',
                '最后登录IP',
                '备注'
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25
        }
    },
    methods: {
        quickDateUpdate(dates) {
            this.filter.dates = dates
            this.filter = Object.assign(this.filter)
        },
        timeUpdate() {
            // 同步快捷查询时间
            this.quick_query = this.filter.dates
        },
        clear() {
            this.filter = {
                dates: [],
                times: '',
                status: '',
            }
        },
        updateNo(val) {},
        updateSize(val) {},
        getList(){
            let para={
                guid:this.curr_row.id,
                createAt:[this.filter.dates[0],this.filter.dates[1]],
                status:this.filter.status,
            }
            let params = window.all.tool.rmEmpty(para)
            let {method,url} =this.$api.black_list_detail_list;
            this.$http({method:method,url:url,params:params}).then(res=>{
                // console.log(res)
                if(res && res.code=='200'){
                    this.list=res.data.data;
                    this.total=res.data.total;
                }
            })
        }
    },
    mounted() {
        this.getList();
    }
}
</script>

<style scoped>
/* .filter .p10 全局样式 */
.table {
    margin-top: 15px;
}
</style>
