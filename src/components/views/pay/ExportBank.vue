<template>
    <div class="container">
        <!-- 出款银行管理 -->

        <div class="filter p10">
            <ul class="left">
                <li>
                    <span>银行名称</span>
                    <Input v-model="filter.acc" />
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
export default {
    name: "ExportBank",
    data() {
        return {
            filter: {
                acc: "",
                status: ""
            },
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
        updateNo(val) {
            this.getList();
        },
        updateSize(val) {
            this.pageNo = 1;
            this.getList();
        },
        getList() {
            let datas = {
                bank: this.filter.acc,
                status: this.filter.status,
                page: this.pageNo,
                pageSize: this.pageSize
            };
            let data = window.all.tool.rmEmpty(datas);
            let { method, url } = this.$api.payment_bank_list;
            this.$http({ method, url, data }).then(res => {
                console.log("返回数据", res);
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
    }
};
</script>

<style scoped>
</style>