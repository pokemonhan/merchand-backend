<template>
    <div class="container">
        <!-- 出款银行管理 -->

        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>银行名称</span>
                    <Select input style="width:200px;" v-model="filter.bank" :options="bank_opt"></Select>
                </li>
                <li>
                    <span>状态</span>
                    <Select v-model="filter.status" :options="status_opt"></Select>
                </li>
                <li>
                    <button class="btn-blue" @click="getList()">查询</button>
                </li>
            </ul>
        </div>
        <div class="talbe mt20">
            <Table :headers="headers" :column="list">
                <template v-slot:item="{row,idx}">
                    <td>{{(pageNo-1)*pageSize+idx+1}}</td>
                    <td>{{row.bank}}</td>
                    <td>{{row.last_editor}}</td>
                    <td>{{row.updated_at}}</td>
                    <td>
                        <Switchbox
                            class="switch-select"
                            :value="row.status"
                            @update="switchStatus($event,row)"
                        />
                    </td>
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
    name: "ExportBank",
    data() {
        return {
            filter: {
                bank: "",
                status: ""
            },
            bank_opt: [],
            status_opt: [
                { label: "全部", value: "" },
                { label: "启用", value: 1 },
                { label: "禁用", value: 0 }
            ],
            headers: [
                "编号",
                "银行名称",
                "最后更新人",
                "最后更新时间",
                "是否启用"
            ],
            list: [],
            total: 0,
            pageNo: 1,
            pageSize: 25,
            mod_show: false,
            dia_status: "",
            dia_title: "",
            dia_content: "",
            curr_row: {}
        };
    },
    methods: {
        //获取json资源
        getJsonData(){
            axios.get('http://pic.397017.com/common/linter.json').then(res=>{
                // console.log('json',res)
                if(res && res.status=='200'){
                    this.jsonList=res.data
                    if(this.jsonList){
                        let bankList=this.jsonList.system_banks_available
                        if(bankList){
                            let bankListPath=bankList.path
                            // console.log('银行地址',bankListPath)
                            axios.get(bankListPath).then(res=>{
                                if(res && res.status=='200'){
                                    this.bankListData=res.data
                                    // console.log('银行列表',this.bankListData)
                                    this.bank_opt=this.backToSelOpt(res.data)
                                }
                            })
                        }
                    }
                }
            })
        },
        backToSelOpt(list=[]){
            let all=[
                {
                    label:"全部",
                    value:""
                }
            ];
            let back_list=list.map(item=>{
                return {label:item.name+'('+item.code+')',value:item.id};
            })
            return all.concat(back_list)
        },
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        getList() {
            let datas = {
                name: this.filter.acc,
                status: this.filter.status,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            // console.log('请求数据',datas)
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.payment_bank_list;
            this.$http({ method, url, data }).then(res => {
                // console.log("返回数据", res);
                if (res && res.code == "200") {
                    this.list = res.data;
                    this.total = res.data.length;
                }
            });
        },
        switchStatus(val,row){
            console.log(row)
            let data={
                bank_id:row.id,
                status:val ? 1 : 0
            }
            let {method,url}=this.$api.payment_bank_status
            this.$http({method,url,data}).then(res=>{
                if(res && res.code=='200'){
                    this.$toast.success(res && res.message)
                    this.getList()
                }
            })
        },
    },
    mounted() {
        this.getList();
        this.getJsonData();
    }
};
</script>

<style scoped>
</style>